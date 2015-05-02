## Gully.js (WIP)
#### Modern, lightweight client-side router written in ECMAScript 6

[![Build Status](https://travis-ci.org/nmabhinandan/gully.svg)](https://travis-ci.org/nmabhinandan/gully)
[![Code Climate](https://codeclimate.com/github/nmabhinandan/gully/badges/gpa.svg)](https://codeclimate.com/github/nmabhinandan/gully)
[![GitHub issues](https://img.shields.io/github/issues/nmabhinandan/gully.svg)](https://github.com/nmabhinandan/gully/issues)
[![Test Coverage](https://codeclimate.com/github/nmabhinandan/gully/badges/coverage.svg)](https://codeclimate.com/github/nmabhinandan/gully)
<img width="12" src="data:image/gif;base64,R0lGODlhAQABAPAAAP">
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/nmabhinandan/gully/master/LICENSE)
[![JS.ORG](https://img.shields.io/badge/js.org-gully.js.org-ffb400.svg?style=flat)](http://js.org)

### Usage

```javascript
var gully = new Gully();

gully.state({
    name: 'home',
    url: '/',
    templateUrl: 'templates/home.html',
    controller: homeCtrl
}).state({
    url: '/about',
    templateUrl: 'templates/about.html',
    controller: aboutCtrl
}).state({
    name: 'user',
    url: '/user/:uid',
    templateUrl: 'templates/user.html',
    controller: userCtrl
}).state({
    name: 'post',
    url: '/post/:pid',
    templateUrl: 'templates/post.html',
    controller: postCtrl
}).state({
    url: '/404',
    templateUrl: 'templates/404.html'
}).init();

```


### Todo:

* HTML5 History API implementation
* Sub states
* More tests
