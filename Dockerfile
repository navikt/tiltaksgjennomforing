FROM navikt/node-express:18

WORKDIR /app

COPY server/ ./server
COPY ./src/setupProxy.js ./src/setupProxy.js
COPY ./src/whitelist.js ./src/whitelist.js
COPY server/server.ts ./
COPY build/ ./build

EXPOSE 3000

CMD [ "node dist/main,.js" ]
