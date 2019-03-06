# Fullstack app with React hooks, Hapi.js and Postgresql DB

## Overview

Simple application dashboard showking customers data with additional CRUD operatoins

## Getting started

### Prerequisites

required
- Docker
- Node.js (8+)
- yarn

optional
- VSCode

### Install and run

run this commnads step by step

- `yarn` (install all dependencies)
- `yarn global add nodemon` (install nodemon globally)
- `yarn copy:env` (copy env.example to .env in yarn workspaces)
- `yarn start` (start the app)

last command will run postgresql in docker container, Hapi.js server and frontend app using webpack-dev-server

app will be running on `http://localhost:8080`, try to change the zoom if the components are bigger or smaller

## Used Tools

- **Backend**
  - Docker
  - Postgresql
  - Hapi.js (server)
  - Typescript

- **Frontend**
  - React (v16.8+ with Hooks API)
  - Webpack (4+)
  - Babel (7+)
  - Axios
  - Autoprefixer
  - Purecss (css framework)

## Components structure

- **First table**:
  - show all customers data
  - buttons with CRUD operations
    - create and update buttons will pop up a modal window with a form for submitting the data to the server
    - delete button will remove customer informations from the server
  - the whole component dynamically re-renders after successful CRUD operation
  - extra table features:
    - data filtering inputs
    - sorting data functionality by clicking on headers
    - pagination
    - dropdown to increase number of rows to show
    - horizontal scrolling (use touchpad or hover over bottom of last table row and it will appear)

- **Second table**:
  - show all inactive customers data
  - dynamically re-renders after successful CRUD operation
  - extra features:
    - data filtering inputs
    - sorting data by clicking on headers
    - pagination
    - dropdown to increase number of rows to show
    - horizontal scrolling (use touchpad or hover over bottom of last table row and it will appear)
