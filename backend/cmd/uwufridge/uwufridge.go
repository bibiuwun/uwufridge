package main

import (
	"context"
	"errors"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	internalHTTP "github.com/bibiuwun/uwufridge/internal/pkg/http"
	"github.com/bibiuwun/uwufridge/internal/pkg/logging"
	"github.com/caarlos0/env/v6"
)

const (
	contextTimeout = 5 * time.Minute
)

type environmentVariables struct {
	LogLevel            string `env:"LOG_LEVEL" envDefault:"info"`
	LogTimezoneLocation string `env:"LOG_TIMEZONE_LOCATION" envDefault:"UTC"`
	Port                string `env:"PORT" envDefault:"8081"`
}

func startHTTPServer(log logging.Interface, port string) (httpServer *http.Server, stop chan os.Signal) {
	httpServer = internalHTTP.NewServer(log, port)
	stop = make(chan os.Signal, 1)

	go func() {
		if err := httpServer.ListenAndServe(); err != nil {
			if !errors.Is(err, http.ErrServerClosed) {
				log.WithError(err).Error("Internal HTTP server error")
				stop <- syscall.SIGTERM
			}
		}
	}()

	signal.Notify(stop, syscall.SIGTERM)

	return httpServer, stop
}

func main() {
	envVars := &environmentVariables{}
	err := env.Parse(envVars)
	if err != nil {
		panic(err)
	}

	log := logging.New(
		logging.OptionalLogLevel(envVars.LogLevel),
		logging.OptionalTimezoneLocation(envVars.LogTimezoneLocation),
	)

	log.Infof("Starting backend on port %s", envVars.Port)

	httpServer, stop := startHTTPServer(log, envVars.Port)
	<-stop

	shutdownCtx, cancelShutdownCtx := context.WithTimeout(context.Background(), contextTimeout)
	defer cancelShutdownCtx()

	err = httpServer.Shutdown(shutdownCtx)
	if err != nil {
		log.WithError(err).Error("Internal HTTP server error")
	}
}
