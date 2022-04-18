FROM node:16.14.2-alpine3.14

WORKDIR /usr/src/app
COPY package.json .
RUN npm install
RUN chmod 777 -R node_modules/
COPY . .
RUN apk add -U tzdata
ENV TZ=Europe/Paris
RUN rm -rf /var/cache/apk/*
EXPOSE 3143
