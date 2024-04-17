FROM node:latest

WORKDIR /vue_app

EXPOSE 8080

CMD [ "npm", "run", "serve" ]
