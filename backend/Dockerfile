FROM node:latest


RUN mkdir -p /usr/src/app

RUN npm i -g nodemon 

WORKDIR /usr/src/app
COPY package.json /usr/src/app/package.json
RUN npm install

COPY . /usr/src/app
RUN rm env/web-variables.env
RUN rm env/mysql.env