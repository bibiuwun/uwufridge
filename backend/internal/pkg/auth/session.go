package auth

import (
	"context"
	"net/http"
	"time"

	"github.com/gorilla/sessions"
	"github.com/julienschmidt/httprouter"
)

var (
	key   = make([]byte, 64)
	store = sessions.NewCookieStore(key)
)

type id int

const (
	userIDKey id = iota
)

func Middleware(next httprouter.Handle) httprouter.Handle {
	return func(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
		session, err := store.Get(r, "authentication")
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		userID, ok := session.Values["userID"].(string)
		if !ok {
			http.Error(w, "Forbidden", http.StatusForbidden)
			return
		}

		ctx := r.Context()
		ctx = context.WithValue(ctx, userIDKey, userID)
		r = r.WithContext(ctx)

		next(w, r, ps)
	}
}

func Login(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	session, err := store.Get(r, "authentication")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Verify user credentials

	// Fetch the userID from the database

	session.Values["userID"] = "userID"
	session.Options.MaxAge = int(time.Hour * 24)
	session.Save(r, w)
}

func Logout(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	session, err := store.Get(r, "authentication")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	session.Values["userID"] = ""
	session.Options.MaxAge = -1
	session.Save(r, w)
}
