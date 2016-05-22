package main

import (
	"crypto/md5"
	"encoding/hex"
	"encoding/json"
	gocache "github.com/pmylund/go-cache"
	"github.com/rs/cors"
	"github.com/unrolled/render"
	"github.com/wpioneer/embedly"
	"io"
	"net/http"
	"os"
	"strings"
	"time"
)

const (
	DEFAULT_CONTENT_DIR    string = "---"
	EMBEDLY_KEY            string = "---"
	EMBEDLY_DISPLAY_RESIZE string = "http://i.embed.ly/1/display/resize"
	POCKET_ACCESS_TOCKET   string = "---"
	POCKET_CONSUMER_KEY    string = "---"
	POCKET_GET             string = "https://getpocket.com/v3/get"
	GITHUB_REPOS           string = "https://api.github.com/users/wpioneer/repos"
)

var (
	cache = gocache.New(5*time.Minute, 30*time.Second)
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

/* Generic */
/* ------------------------------------------ */

func getJson(this interface{}, url string) error {
	res, err := http.Get(url)
	if err != nil {
		return err
	}
	defer res.Body.Close()

	return json.NewDecoder(res.Body).Decode(this)
}

func generateFileName(url string) string {
	if url != "" {
		data := []byte(url)
		hash := md5.Sum(data)

		return hex.EncodeToString(hash[:])
	}

	return ""
}

func getFileExtension(url string) string {
	if num := strings.LastIndexByte(url, '.'); num != 0 {
		return url[num:]
	}

	return ""
}

func checkFileExist(path string) bool {
	if _, err := os.Stat(path); os.IsNotExist(err) {
		return false
	}

	return true
}

func saveFile(url string, path string, ext string) (string, error) {
	fileName := generateFileName(url)
	filePath := path + fileName + ext

	fileExist := checkFileExist(filePath)
	if fileExist != true {
		res, err := http.Get(url)
		if err != nil {
			return "", err
		}
		defer res.Body.Close()

		file, err := os.Create(filePath)
		if err != nil {
			return "", err
		}
		defer file.Close()

		_, err = io.Copy(file, res.Body)
		if err != nil {
			return "", err
		}
	}

	return fileName + ext, nil
}

func setDefaultHeaders(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	w.Header().Set("Cache-Control", "no-store, no-cache, must-revalidate, post-check=0, pre-check=0")
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.Header().Set("Vary", "Accept-Encoding")
}

func setCacheHeader(w http.ResponseWriter, found bool) {
	v := "MISS"
	if found {
		v = "HIT"
	}
	w.Header().Set("X-Cache", v)
}

/* ------------------------------------------ */

func loadRepos(this *[]Repos, url string) (interface{}, bool) {
	if cached, found := cache.Get("repos"); found {
		cache.Set("repos_tmp", cached, gocache.NoExpiration)
		return cached, found
	}

	if cached_tmp, found_tmp := cache.Get("repos_tmp"); found_tmp {
		go func() {
			getJson(this, url)
			cache.Set("repos", this, gocache.DefaultExpiration)
		}()
		return cached_tmp, found_tmp
	}

	getJson(this, url)
	cache.Set("repos", this, gocache.DefaultExpiration)

	return this, false
}

func loadBookmarks(this *Bookmarks, url string) (interface{}, bool) {
	if cached, found := cache.Get("bookmarks"); found {
		cache.Set("bookmarks_tmp", cached, gocache.NoExpiration)
		return cached, found
	}

	if cached_tmp, found_tmp := cache.Get("bookmarks_tmp"); found_tmp {
		go func() {
			getJson(this, url)
			setBookmarksThumbnails(this)
			cache.Set("bookmarks", this.List, gocache.DefaultExpiration)
		}()
		return cached_tmp, found_tmp
	}

	getJson(this, url)
	setBookmarksThumbnails(this)
	cache.Set("bookmarks", this.List, gocache.DefaultExpiration)

	return this.List, false
}

func setBookmarksThumbnails(this *Bookmarks) error {
	embedlyClient := embedly.NewClient(EMBEDLY_KEY)
	embedlyOptions := embedly.Options{}
	thumbnailPath := DEFAULT_CONTENT_DIR
	list := this.List

	for i, _ := range list {
		var tmp = list[i]

		url := tmp.Url
		res, err := embedlyClient.ExtractOne(url, embedlyOptions)
		if err != nil {
			return err
		}

		if len(res.Images) != 0 {
			thumbnailEmbedlyUrl := EMBEDLY_DISPLAY_RESIZE + "?key=" + EMBEDLY_KEY + "&url=" + res.Images[0].URL + "&grow=true&height=220"
			thumbnailExtension := getFileExtension(res.Images[0].URL)
			thumbnailUrl, err := saveFile(thumbnailEmbedlyUrl, thumbnailPath, thumbnailExtension)
			if err != nil {
				return err
			}
			tmp.Thumbnail = thumbnailUrl
			list[i] = tmp
		}
	}

	this.List = list

	return nil
}

func main() {
	render := render.New()
	mux := http.NewServeMux()

	mux.HandleFunc("/feed/repos", func(w http.ResponseWriter, r *http.Request) {
		// Set Default Headers
		setDefaultHeaders(w)

		// Load Repos
		repos := new([]Repos)
		url := GITHUB_REPOS + "?sort=created&direction=desc"

		res, found := loadRepos(repos, url)
		setCacheHeader(w, found)

		// Render Repos JSON
		render.JSON(w, http.StatusOK, res)
	})

	mux.HandleFunc("/feed/bookmarks", func(w http.ResponseWriter, r *http.Request) {
		// Set Default Headers
		setDefaultHeaders(w)

		// Load Bookmarks
		bookmarks := new(Bookmarks)
		url := POCKET_GET + "?consumer_key=" + POCKET_CONSUMER_KEY + "&access_token=" + POCKET_ACCESS_TOCKET + "&count=6&sort=newest"

		res, found := loadBookmarks(bookmarks, url)
		setCacheHeader(w, found)

		// Render Bookmarks JSON
		render.JSON(w, http.StatusOK, res)
	})

	handler := cors.Default().Handler(mux)
	http.ListenAndServe(":8000", handler)
}
