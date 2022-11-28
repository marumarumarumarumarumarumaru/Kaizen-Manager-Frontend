# Kaizen-Manager-Frontend

> This is the frontend respository for the Kaizen Manager project. See [Kaizen-Manager-Backend](https://github.com/marumarumarumarumarumarumaru/Kaizen-Manager-Backend) for the backend codebase.

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](CODE_OF_CONDUCT.md) 

Kaizen Manager (Kaizen for short) is an open source, minimal project management web-based software. 

---

## What's Kaizen?

Kaizen (改善) is a Japanese word that means "improvement". We want this software to not only improve your task/project management, but also for this software to continuously improve by having it open sourced. 

In Kaizen, user(s) can setup and have multiple projects under each workspace, keeping track of their tasks and checking out metrics to understand team (or solo) performance.

---

## Installation Instruction
1. Git clone the repository
2. Run `npm install` to install all the dependent packages
3. Create an `.env` file in the root directory with the following information:
```
REACT_APP_BACKEND_URL={url_of_the_backend_server}
REACT_APP_DRAWER_WIDTH=260
REACT_APP_OAUTH_CLIENT_ID={your_oauth_client_id}
```
  - `your_oauth_client_id` may look something like `123456-abcd7891011123.apps.googleusercontent.com`. Follow the instruction on Google to create your OAuth setup
  - `url_of_the_backend_server` may be `http://localhost:8080` if you clone the [Kaizen-Manager-Backend](https://github.com/marumarumarumarumarumarumaru/Kaizen-Manager-Backend) and run that in the backend
4. Run `npm start` and the frontend will run locally on `http://localhost:3000`