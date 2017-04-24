# Gochu

[![npm version](https://badge.fury.io/js/gochu.svg)](https://www.npmjs.com/package/gochu)
[![Build Status](https://travis-ci.org/bbmoz/gochu.svg)](https://travis-ci.org/bbmoz/gochu)
[![Code Climate](https://codeclimate.com/github/bbmoz/gochu/badges/gpa.svg)](https://codeclimate.com/github/bbmoz/gochu)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/bbmoz/gochu/blob/master/LICENSE)

![gochu](/media/example.png)

> View a graph of your project!

## Get Started

```bash
$ npm install -g gochu
```

There are two ways to generate a graph:

1. **Screenshot**
```bash
$ gochu start
$ gochu run -s -t 'example/**/*.js'   # see .gochu/ for screenshots
```

2. **Live Graph**
```bash
$ gochu start
$ gochu run -t 'example/**/*.js'  # open http://localhost:8080
```

*Make sure to start the gochu web server before generating a graph.

## CLI

```bash
$ gochu start             # start web server at localhost:8080
$ gochu stop              # stop web server
$ gochu run [-s|--screenshot] [-t|--target '<glob>']  # generate graph
$ gochu [-h|--help]       # show all commands
$ gochu run [-h|--help]   # show "run" command info
```

## Features

- visual graph of project files and their relationships
- real-time graph each time `gochu run -t` is executed
- generate screenshots with `-s` option
- support ES6 modules (`import` and `export`)

Enjoy!

[![NPM](https://nodei.co/npm/gochu.png?compact=true)](https://www.npmjs.com/package/gochu)

[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](https://github.com/bbmoz/gochu)
