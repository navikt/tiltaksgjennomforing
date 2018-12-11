FROM node

WORKDIR /usr/src/app

COPY public/ ./public
COPY build/ ./build
COPY server.js ./
COPY package.json ./

EXPOSE 3000
CMD ["npm", "run", "start:server"]