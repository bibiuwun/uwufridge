package http

import (
	"io"
	stdLog "log"
	"net/http"

	"github.com/bibiuwun/uwufridge/internal/pkg/logging"
	"github.com/sirupsen/logrus"
)

func NewServer(log logging.Interface, port string) *http.Server {
	mux := http.NewServeMux()

	errorLog := stdLog.New(log.WrappedLogger().WriterLevel(logrus.ErrorLevel), "", 0)

	return &http.Server{
		Addr:     "0.0.0.0:" + port,
		Handler:  mux,
		ErrorLog: errorLog,
	}
}

func drainCloseRequest(log logging.Interface, r *http.Request) {
	_, err := io.Copy(io.Discard, r.Body)
	if err != nil {
		log.WithError(err).Warn("Internal HTTP server error draining request body")
	}

	err = r.Body.Close()
	if err != nil {
		log.WithError(err).Warn("Internal HTTP server error closing request body")
	}
}
