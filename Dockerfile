FROM node

WORKDIR /usr/src/app

COPY public/ ./public
COPY build/ ./build
COPY server.js ./
COPY node_modules/ ./node_modules
COPY package.json ./

EXPOSE 3000
CMD ["npm", "run", "start:server"]