package main

import (
	"net/http"
	"encoding/json"
	"github.com/rs/cors"
	"github.com/unrolled/render"
	"github.com/wpioneer/embedly"
)

const (
	EMBEDLY_KEY          string = "---"
	POCKET_ACCESS_TOCKET string = "---"
	POCKET_CONSUMER_KEY  string = "---"
	POCKET_GET           string = "https://getpocket.com/v3/get"
	GITHUB_REPOS         string = "https://api.github.com/users/wpioneer/repos"
)

type Repos struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	Url         string `json:"html_url"`
	Fork        bool   `json:"fork"`
}

type Bookmarks struct {
	List BookmarksList `json:"list"`
}

type BookmarksList map[string]struct {
	Title       string `json:"resolved_title"`
	Description string `json:"excerpt"`
	Url         string `json:"given_url"`
	Thumbnail   string
	IsArticle   string `json:"is_article"`
	HasVideo    string `json:"has_video"`
	HasImage    string `json:"has_image"`
	WordCount   string `json:"word_count"`
}

func getJson(url string, this interface{}) error {
	res, err := http.Get(url)
	if err != nil {
		return err
	}
	defer res.Body.Close()

	return json.NewDecoder(res.Body).Decode(this)
}

func setPocketThumbnails(this *Bookmarks) error {
	embedlyClient := embedly.NewClient(EMBEDLY_KEY)
	embedlyOptions := embedly.Options{}
	list := this.List

	for i, _ := range list {
		var tmp = list[i]

		url := tmp.Url
		res, err := embedlyClient.ExtractOne(url, embedlyOptions)
		if err != nil {
			return err
		}

		if len(res.Images) != 0 {
			tmp.Thumbnail = res.Images[0].URL
			list[i] = tmp
		}
	}

	this.List = list

	return nil
}

func main() {
	render := render.New()
	mux := http.NewServeMux()

	repos := new([]*Repos)
	bookmarks := new(Bookmarks)

	mux.HandleFunc("/feed/repos", func(w http.ResponseWriter, r *http.Request) {
		// Get Repos
		params := "?sort=created&direction=desc"
		url := GITHUB_REPOS + params
		getJson(url, repos)

		// Render JSON
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET")
		w.Header().Set("Cache-Control", "no-store, no-cache, must-revalidate, post-check=0, pre-check=0")
		w.Header().Set("Content-Type", "application/json; charset=UTF-8")
		w.Header().Set("Cache-Control", "max-age=3600")
		w.Header().Set("Vary", "Accept-Encoding")

		render.JSON(w, http.StatusOK, repos)
	})

	mux.HandleFunc("/feed/bookmarks", func(w http.ResponseWriter, r *http.Request) {
		// Get Bookmarks
		params := "?consumer_key=" + POCKET_CONSUMER_KEY + "&access_token=" + POCKET_ACCESS_TOCKET + "&count=6&sort=newest"
		url := POCKET_GET + params
		getJson(url, bookmarks)
		setPocketThumbnails(bookmarks)

		// Render JSON
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET")
		w.Header().Set("Cache-Control", "no-store, no-cache, must-revalidate, post-check=0, pre-check=0")
		w.Header().Set("Content-Type", "application/json; charset=UTF-8")
		w.Header().Set("Cache-Control", "max-age=3600")
		w.Header().Set("Vary", "Accept-Encoding")

		render.JSON(w, http.StatusOK, bookmarks.List)
	})

	handler := cors.Default().Handler(mux)
	http.ListenAndServe(":8000", handler)
}
