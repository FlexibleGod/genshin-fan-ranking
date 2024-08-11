FROM node:lts-alpine

RUN mkdir -p /usr/app/node_modules && chown -R node:node /usr/app

WORKDIR /usr/app

COPY --chown=node:node . .
USER node
RUN npm ci

CMD [ "node", "dist/index.js" ]
