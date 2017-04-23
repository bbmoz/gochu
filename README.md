# Gochu

[![npm version](https://badge.fury.io/js/gochu.svg)](https://www.npmjs.com/package/gochu)
[![Build Status](https://travis-ci.org/bbmoz/gochu.svg)](https://travis-ci.org/bbmoz/gochu)
[![Code Climate](https://codeclimate.com/github/bbmoz/gochu/badges/gpa.svg)](https://codeclimate.com/github/bbmoz/gochu)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/bbmoz/gochu/blob/master/LICENSE)

> View a graph of your project's modules!

## Get Started

```bash
$ npm install -g gochu
```

## CLI

You must first start the web client before running `gochu` to generate a graph.

```bash
$ gochu-web                     # start web client at localhost:8080
$ gochu [-t|--target '<glob>']  # parse files and generate graph
$ gochu -h                      # show help
```

Go to `http://localhost:8080` to view your generated graph.

## Features

- visual graph of project files and their relationships
- real-time graph each time `gochu` is executed
- support for ES6 modules (`import` and `export`)

Enjoy!

[![NPM](https://nodei.co/npm/gochu.png?compact=true)](https://www.npmjs.com/package/gochu)

[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](https://github.com/bbmoz/gochu)
