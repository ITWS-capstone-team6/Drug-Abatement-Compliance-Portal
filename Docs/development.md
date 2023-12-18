# Building and Development

Dependencies: 

- `node.js` (tested on version 18.x/20.x)
- `npm` (usually installed with node.js)

## Frontend

Starting at the root of the repository, run these commands in order:

1. `cd Frontend`
2. `npm install`
3. `npm run dev`

The frontend of the application will now be accessible through http://localhost:5173


## Backend

Starting at the root of repository, run these commands in order (in a separate terminal instance):

1. `cd Backend`
2. `npm install`
3. `npm run start`

The backend API will now be available through http://localhost:5000




# Project Architecture

## Overview

### Root Directory (`.`)
The root of the repository contains folders for the backend, frontend, documentation, and the readme.

### Frontend
The frontend directory contains all the code related to the frontend of the application.

#### `src/`
This directory contains the source code for the application. 

#### `package.json`
This file lists all of the dependencies and the scripts used to start the frontend.

### Backend
The backend directory contains all the code related to the backend of the application. 

#### `server.js`
This file contains the majority of the driver code for the backend API. 


#### `package.json`
Like the `package.json` file in the `Frontend/` directory, this file contains all of the instructions on how to start the backend API.

### Docs
The docs directory contains all the documentation for the project. 