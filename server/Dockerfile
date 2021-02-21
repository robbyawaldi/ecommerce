FROM node:14

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .
COPY .env.production .env

RUN yarn build

RUN yarn typeorm migration:run

ENV NODE_ENV production

EXPOSE 4000
CMD [ "node", "dist/index.js" ]
USER node