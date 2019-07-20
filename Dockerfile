FROM node:alpine
MAINTAINER "Luis Arboleda"

ENV ENV='prod'

COPY ./ /home/node/app

WORKDIR /home/node/app

EXPOSE 3000
