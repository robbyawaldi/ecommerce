FROM node:14

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn

COPY . .

RUN yarn build

ENV NODE_ENV production

ENV PORT 3000

EXPOSE 3000
CMD [ "yarn", "start" ]