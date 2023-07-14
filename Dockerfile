FROM node:20-slim

RUN apt-get update && apt-get install -y iputils-ping

WORKDIR /home/node/app

USER node

CMD [ "tail", "-f", "/dev/null" ]