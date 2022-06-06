FROM node:11-alpine

RUN mkdir -p /usr/src/ms-sunculture-gateway

WORKDIR /usr/src/ms-sunculture-gateway

COPY . .

COPY .env .

RUN npm config set unsafe-perm true

RUN npm install pm2 -g

RUN pm2 list

RUN npm install
	
EXPOSE 3030

CMD ["pm2-runtime", "start", "processes.json"]

