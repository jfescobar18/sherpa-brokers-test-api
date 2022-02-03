FROM node:13.12.0

RUN mkdir -p /usr/src/

WORKDIR /usr/src/

COPY ["package.json", "package-lock.json", "/usr/src/"]

RUN npm install

COPY [".",  "/usr/src/"]

CMD ["node", "server.js"]