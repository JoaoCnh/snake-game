FROM node:7

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN yarn

COPY . /usr/src/app

RUN yarn build

EXPOSE 9000

CMD ["yarn", "start"]