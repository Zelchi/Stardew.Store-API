# syntax=docker/dockerfile:1

FROM node:20.16.0-alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD npm start