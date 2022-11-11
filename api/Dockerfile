FROM node:14.17.1-alpine3.13 AS builder

RUN mkdir -p /usr/src/ms-sunculture-api

WORKDIR /usr/src/ms-sunculture-api

COPY .env .

COPY . .

RUN npm config set unsafe-perm true

RUN npm install pm2 -g

RUN pm2 list

RUN npm install
	
EXPOSE 3303

CMD ["pm2-runtime", "./ecosystem.config.js", "--env", "production", "--formatted"]
