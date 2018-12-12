FROM node:11-slim
ENV NODE_PATH=/usr/local/lib/node_modules

WORKDIR /usr/src/app

RUN npm install -g express
RUN npm install -g helmet
RUN npm install -g express-http-proxy

COPY public/ ./public
COPY build/ ./build
COPY server.js ./
COPY package.json ./

EXPOSE 3000
CMD ["npm", "run", "start:server"]