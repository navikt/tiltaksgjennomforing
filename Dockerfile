FROM node:11-slim
ENV NODE_PATH=/usr/local/lib/node_modules

WORKDIR /usr/src/app

RUN npm install -g express
RUN npm install -g helmet
RUN npm install -g http-proxy-middleware

COPY build/ ./build
COPY ./src/setupProxy.js ./src/setupProxy.js
COPY server.js ./
COPY package.json ./

EXPOSE 3000
CMD ["npm", "run", "server"]