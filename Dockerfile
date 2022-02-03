FROM node:13.12.0

RUN mkdir -p /usr/src/

WORKDIR /usr/src/

COPY ["package.json", "package-lock.json", "/usr/src/"]

RUN npm install

COPY [".",  "/usr/src/"]

CMD ["node", "server.js"]

ENV TOKEN pwonTvTjYv9RjzujOZ8OE1erQPLZSjfM
ENV AWS_DB_HOST sherpa-brokers-test-db.cg2clmjvpgdz.us-east-2.rds.amazonaws.com
ENV AWS_DB_PORT 3306
ENV PORT 3000
ENV AWS_DB sherpa-brokers-test-db
ENV AWS_DB_USER sherpa-brokers-user
ENV AWS_DB_SECRET Se@d0gs4rena
ENV HOST_SMTP smtp.gmail.com
ENV USER_SMTP fraescruz@gmail.com
ENV PASSWORD_SMTP ANTOHE2011040399

EXPOSE 3000