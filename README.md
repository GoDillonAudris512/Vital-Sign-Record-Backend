# Vital Sign Record Backend
> Back-end side for simple vital sign recording using ExpressJS and MongoDB

## General Information
This program is created to record user vital sign that consists of blood pressure, heartbeat, respiratory rate, and body temperature! This vital sign is crucial to maintain life-health balance and detect potential disease. Vital sign records can also help by giving deeper insight to your body.

## Project Structure
```bash
.
├─── app
│   ├─── config
│   │    ├─── database.js
│   │    └─── server.js
│   ├─── index.js
│   ├─── middleware.js
│   └─── mongodb.js
├─── components
│   ├─── general
│   │    └─── hello-api.js
│   ├─── record
│   │    ├─── record-api.js
│   │    ├─── record-controller.js
│   │    └─── record-model.js
│   └─── user
│        ├─── user-api.js
│        ├─── user-controller.js
│        └─── user-model.js
├─── .dockerignore
├─── .env.example
├─── .gitignore
├─── docker-compose.yml
├─── Dockerfile
├─── package.json
├─── README.md
├─── server.js
└─── yarn.lock
```

## User Interfaces
User Interface is designed and implemented on the front-end side. Further implementation stated on [this repository](https://github.com/GoDillonAudris512/Vital-Sign-Record-Frontend.git)

## ⚙️ &nbsp;How to Run the Program

Clone this repository from terminal with this command
``` bash
$ git clone https://github.com/GoDillonAudris512/Vital-Sign-Record-Backend.git
```

### Run the application on development server
1. Create a .env file inside the repository directory using .env.example file as the template. You can keep the variables as it is. The server should automatically use port 9090 as the default port 
2. Run the server using this following command
    ``` bash
    docker compose up
    ```

If you do it correctly, the back-end development server should be running. You can also check the server by opening http://localhost:9090/api. To use back-end side functionalities, don't forget to also run the front-end side. Further explanation on how to run the front-end development server stated on [this repository](https://github.com/GoDillonAudris512/Vital-Sign-Record-Frontend.git)


## 🔑 &nbsp;Endpoints
| Endpoint                             |  Method  |   Usage  |
| ------------------------------------ | :------: | -------- |
| /api/user/register                   | POST     | Users can register email and password |
| /api/user/login                      | POST     | Users can perform login using registered email and password |
| /api/record                          | GET      | Users can retrieve vital sign records related to them |
| /api/record                          | POST     | Users can add new vital sign record |
| /api/record                          | PUT      | Users can update existing vital sign record |
| /api/record                          | DELETE   | Users can delete existing vital sign record |

## Authors
Created by Go Dillon Audris