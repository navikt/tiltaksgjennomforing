FROM navikt/node-express:18.14.0-alpine

WORKDIR /app

COPY server/ ./server
COPY ./src/setupProxy.js ./src/setupProxy.js
COPY ./src/whitelist.js ./src/whitelist.js
COPY server.js ./
COPY build/ ./build

EXPOSE 3000

CMD [ "node dist/main,.js" ]
