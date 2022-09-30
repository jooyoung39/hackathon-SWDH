# hackathon-SWDH &middot; [![Build Status](https://img.shields.io/travis/npm/npm/latest.svg?style=flat-square)](https://travis-ci.org/npm/npm) [![npm](https://img.shields.io/npm/v/npm.svg?style=flat-square)](https://www.npmjs.com/package/npm)

> 2022 Yonsei hackathon project repo.

## Getting started

환경 설정 및 실행 방법

```shell
cd web      // main files are in web dir
npm install // setup node libs for this project
npm start   // start (test) web project
```

You need to install node.js to run/build this project.

## Developing

### Built With

node.js, react, bootstrap5

### Prerequisites

Need node.js (tested on node.js v17.8.0)

### Setting up Dev

```shell
git clone https://github.com/jooyoung39/hackathon-SWDH.git
cd web
npm install
```

### Building

```shell
npm build
```

## Style guide

Please follow VSCode's Prettier and ES7+ React/Redux/React-Native snippets

Prettier: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode<br>

ES7+ React/Redux/React-Native snippets: https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets

## Project structure

```bash
web
├── node_modules
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── assets
│   │   ├── font
│   │   ├── image
│   │   ├── js
│   │   └── style
│   ├── components
│   ├── pages
│   └── index.js
├── .gitignore
├── package-lock.json
└── package.json
README.md

```
