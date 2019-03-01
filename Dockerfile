FROM navikt/node-express:9-common

WORKDIR /app

RUN npm install -g helmet
RUN npm install -g http-proxy-middleware

COPY build/ ./build
COPY ./src/setupProxy.js ./src/setupProxy.js
COPY server.js ./
COPY package.json ./