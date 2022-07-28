package http

import (
	"encoding/json"
	"io"
	stdLog "log"
	"net/http"
	"strconv"

	"github.com/bibiuwun/uwufridge/internal/pkg/auth"
	"github.com/bibiuwun/uwufridge/internal/pkg/diet"
	"github.com/bibiuwun/uwufridge/internal/pkg/logging"
	"github.com/julienschmidt/httprouter"
	"github.com/sirupsen/logrus"
)

func NewServer(log logging.Interface, port string) *http.Server {
	router := httprouter.New()

	router.POST("/api/login", auth.Login)
	router.POST("/api/logout", auth.Logout)
	router.GET("/", RootHandler(log))
	router.POST("/api/macro_split", PersonHandler)
	router.POST("/api/intake_lower", PersonIntakeLowerHandler)
	router.POST("/api/intake_upper", PersonIntakeUpperHandler)

	errorLog := stdLog.New(log.WrappedLogger().WriterLevel(logrus.ErrorLevel), "", 0)

	return &http.Server{
		Addr:     "0.0.0.0:" + port,
		Handler:  router,
		ErrorLog: errorLog,
	}
}

func PersonIntakeLowerHandler(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	age, err := strconv.ParseInt(r.FormValue("age"), 10, 64)
	if err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}
	sex := r.FormValue("sex")
	weight, err := strconv.ParseFloat(r.FormValue("weight"), 64)
	if err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}
	height, err := strconv.ParseFloat(r.FormValue("height"), 64)
	if err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}
	goal := r.FormValue("goal")
	activity_level, err := strconv.ParseInt(r.FormValue("activity_level"), 10, 64)

	if err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	p := &diet.Person{
		Age:            age,
		Sex:            diet.Gender(sex),
		Weight:         weight,
		Height:         height,
		Goal:           diet.Goal(goal),
		Activity_level: diet.ActivityLevel(activity_level),
	}

	calorie := p.CalorieIntakeLower()

	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"calorie": calorie,
	})
}

func PersonIntakeUpperHandler(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	age, err := strconv.ParseInt(r.FormValue("age"), 10, 64)
	if err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}
	sex := r.FormValue("sex")
	weight, err := strconv.ParseFloat(r.FormValue("weight"), 64)
	if err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}
	height, err := strconv.ParseFloat(r.FormValue("height"), 64)
	if err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}
	goal := r.FormValue("goal")
	activity_level, err := strconv.ParseInt(r.FormValue("activity_level"), 10, 64)

	if err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	p := &diet.Person{
		Age:            age,
		Sex:            diet.Gender(sex),
		Weight:         weight,
		Height:         height,
		Goal:           diet.Goal(goal),
		Activity_level: diet.ActivityLevel(activity_level),
	}

	calorie := p.CalorieIntakeUpper()

	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"calorie": calorie,
	})
}

func PersonHandler(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	age, err := strconv.ParseInt(r.FormValue("age"), 10, 64)
	if err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}
	sex := r.FormValue("sex")
	weight, err := strconv.ParseFloat(r.FormValue("weight"), 64)
	if err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}
	height, err := strconv.ParseFloat(r.FormValue("height"), 64)
	if err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}
	goal := r.FormValue("goal")
	activity_level, err := strconv.ParseInt(r.FormValue("activity_level"), 10, 64)

	if err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	p := &diet.Person{
		Age:            age,
		Sex:            diet.Gender(sex),
		Weight:         weight,
		Height:         height,
		Goal:           diet.Goal(goal),
		Activity_level: diet.ActivityLevel(activity_level),
	}

	calorie_per_day, err := strconv.ParseInt(r.FormValue("calorie_per_day"), 10, 64)
	if err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	carb, protein, fat := p.MacroSplit(calorie_per_day)

	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"carb":    carb,
		"protein": protein,
		"fat":     fat,
	})
}

func RootHandler(log logging.Interface) httprouter.Handle {
	return func(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
		drainCloseRequest(log, r)
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
