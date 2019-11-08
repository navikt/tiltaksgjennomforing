FROM navikt/node-express:12.2.0-alpine
RUN npm install -g helmet
RUN npm install -g http-proxy-middleware
WORKDIR /app
COPY ./src/setupProxy.js ./src/setupProxy.js
COPY server.js ./
COPY build/ ./build
EXPOSE 3000

