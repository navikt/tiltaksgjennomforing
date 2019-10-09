FROM navikt/node-express:12.2.0-alpine
RUN npm install -g helmet
RUN npm install -g http-proxy-middleware
WORKDIR /app

COPY build/ ./build
COPY ./src/setupProxy.js ./src/setupProxy.js
COPY server.js ./

EXPOSE 3000

