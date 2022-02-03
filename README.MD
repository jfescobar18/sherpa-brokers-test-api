# Sherpa Broker Test API

[![Docker badge](https://badges.aleen42.com/src/docker.svg)](#) [![Node badge](https://badges.aleen42.com/src/node.svg)](#) [![Generic badge](https://img.shields.io/badge/build-passing-<COLOR>.svg)](#) [![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](#)


This is the API project for Sherpa Broker application

## Initialization

Add these `ENV` variables to your `Dockerfile`

```
ENV TOKEN SECURE_TOKEN
ENV AWS_DB_HOST MY_SQL_HOST
ENV AWS_DB_PORT 3306
ENV PORT LOCALHOST_PORT
ENV AWS_DB MY_SQL_DATABASE
ENV AWS_DB_USER MY_SQL_USER
ENV AWS_DB_SECRET MY_SQL_PASSWORD
ENV HOST_SMTP EMAIL_HOST
ENV USER_SMTP EMAIL_ADDRESS
ENV PASSWORD_SMTP EMAIL_PASSWORD
```

There is not exposed port, add the one you prefer 

```
version: '3.2'

services:
  node:
    ports:
      - 3000:3000
      - 80:80
```

## Local Development

User Docker Compose for local development

```bash
$ docker-compose up --build
```

However you can use only Docker

```bash
$ docker build . -t sherpa-brokers-test-api
$ docker run -dp 3000:3000 sherpa-brokers-test-api
```

## Heroku Deployment

- Set the `ENV` variables described above in settings
- Connect with GitHub and publish main branch

## Sequelize-auto

Run these commands the first time you run the project

```bash
$ sudo npm install -g sequelize-auto
$ sudo npm install -g sequelize-cli
```

And this commando to auto generate new models

```bash
$ sequelize-auto -o "./src/Models" --indentation 4 -d DB_NAME -h DB_HOST -u DB_USERNAME -p 3306 -x DB_PASSWORD -e mysql
```

## Troubleshooting

- Don't use default or admin My SQL user for this project create a new one specifically for it
- If a Gmail account will be used read this [article](https://support.google.com/accounts/answer/185833) 

## ToDo

- Add Tests
- Implement Swagger

## License
[MIT](https://choosealicense.com/licenses/mit/)