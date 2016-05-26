---
title: 'Разработка CORS веб-сервера на Go'
datePublished: "2016-05-22T23:46:37.121Z"
dateModified: "2016-05-22T23:46:37.121Z"
lang: ru
layout: post
path: "/articles/examples/golang-cors-proxy/"
category: "Go, Examples"
description: "В разработке прогрессивных web-приложений часто поднимается вопрос о кросс-доменных запросах. Это довольно обширный вопрос, который может послужить причиной для чтения Википедии."

---

В разработке прогрессивных web-приложений часто поднимается вопрос о кросс-доменных запросах. Это довольно обширный вопрос, который может послужить причиной для чтения Википедии [ <a href="https://ru.wikipedia.org/wiki/Cross-origin_resource_sharing" title="CORS" target="_blank">1</a> ] [ <a href="https://ru.wikipedia.org/wiki/JSONP" title="JSONP" target="_blank">2</a> ]. Кроме этого, существует много других статей по разным запросам в гугле на данную тему.

Я же постараюсь ударить по нескольким ключевым моментам, а так же покажу как быстро написать **CORS** веб-сервер на **Golang**.

![Golang Cors Proxy](./golang.jpg)

Существует как минимум два способа решить этот вопрос. Первый способ — использовать **JSONP**, второй — **CORS**.

JSONP
--------

> **JSONP** или **«JSON with padding»** — это дополнение к базовому формату JSON. Он предоставляет способ запросить данные с сервера, находящегося в другом домене — операцию, запрещённую в типичных веб-браузерах из-за политики ограничения домена.

Обозначим преимущества **JSONP**:

* Поддержка старыми браузерами.

А так же минусы:

* Проблемы с кешированием. Каждый запрос к **JSONP** должен быть динамичным, даже если используется **Memcached**.
* **JSONP** поддерживает только метод **GET**. В тоже время **CORS** позволяет использовать все возможные методы

CORS
--------

> **Cross-origin resource sharing** (CORS, «совместное использование ресурсов между разными источниками») — технология современных браузеров, которая позволяет предоставить веб-странице доступ к ресурсам другого домена.

Если сравнивать **CORS** с **JSONP**, то всё почти наоборот.

Преимущества **CORS**:

* Можно использовать все преимущества **XMLHttpRequest**
* Нет риска иньекции
* Легко кешировать
* Легко в реализации

Минусы:

* Технология не поддерживается в таких браузерах, как *IE <= 9*, *Opera <12* или *Firefox <3.5*

Поэтому, если вам нужна полноценная поддержка *IE <= 9*, *Opera <12* или *Firefox <3.5* или любых других старых браузеров, где **CORS** отсутстувует, то используйте **JSONP**. Хотелось бы добавить , что в *IE8* и *IE9* всё таки есть поддержка **CORS**, но с нюансами (см. <a href="http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx" title="xdomainrequest restrictions limitations and workarounds" target="_blank">blogs.msdn.com</a>).

Немного кода
--------

Лично мне в одном из проектов приходилось использовать **CORS**, поэтому я решил привести пример облегченного кода на **Go**. Это чистый код, здесь нет кеширования и других манипуляций с JSON (да, кстати, о кешировании, я нашел отличный способ как быстро кешировать и отдавать JSON без блокировок в Go, о чем и будет следующий <a href="http://ashk.io/articles/examples/golang-json-cache/" title="Кеширование JSON в Go" target="_blank">пост</a>).

Перейдем к практике, предварительно выполнив `go get github.com/unrolled/render`, пропишем импорт необходимых пакетов и константы. У нас есть **net/http** для получения ответа, **encoding/json** для декодирования JSON и **unrolled/render** для рендерина JSON на нашем сервере.
```
package main

import (
	"net/http"
	"encoding/json"
	"github.com/unrolled/render"
)
```

Добавим одну константу **GITHUB_API_REPOS** (URL для доступа к **API Github**).
```
const (
	GITHUB_API_REPOS string = "https://api.github.com/users/wpioneer/repos"
)
```

Добавим новую структуру **Repos** в качестве примера.
```
type Repos struct {
	Name        string `json:"name"`
	Description string `json:"description"`
}
```

Функция **getJson()** служит для декодирования JSON. На входе тип **interface{}** и URL типа **string**.
Как вы уже заметили, используем **Decode** вместо **Unmarshal**, так как последнее лучше для статики.
```
func getJson(this interface{}, url string) error {
	res, err := http.Get(url)
	if err != nil {
		return err
	}
	defer res.Body.Close()

	return json.NewDecoder(res.Body).Decode(this)
}
```

Добавим простую функцию для установки новых заголовков в ответ.
Внимание стоит уделить **Access-Control-Allow-Origin** и **Access-Control-Allow-Methods**, здесь можно разрешить доступ с определенных доменов и установить допустимые методы.
```
func setDefaultHeaders(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	w.Header().Set("Cache-Control", "no-store, no-cache, must-revalidate, post-check=0, pre-check=0")
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.Header().Set("Vary", "Accept-Encoding")
}
```

В функции **main()**, как правило, инициализация других фукций, рендеринг и запуск веб-сервера.
```
func main() {
	render := render.New()
	mux := http.NewServeMux()

	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		setDefaultHeaders(w)

		repos := new([]Repos)

		url := GITHUB_API_REPOS
		getJson(repos, url)

		render.JSON(w, http.StatusOK, repos)
	})

	http.ListenAndServe(":8000", mux)
}
```

Если все сделать правильно и запустить веб-сервер с помощью команды `go run server.go`, то мы получим список репозиториев с **Name** и **Description** на локальном хосте под портом **8000**.

На этом всё, надеюсь этот код натолкнул вас на мысли.

Если хотите сохранить код на будущее, то его можно найти на <a href="https://gist.github.com/wpioneer/aad6e11226563e6e52c3696fc8edd1c2" title="Golang CORS Proxy" target="_blank">Github Gist</a>.