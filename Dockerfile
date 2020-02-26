FROM navikt/node-express:12.2.0-alpine

# Workaround: får tilfeldige feil ved npm install uten neste linje
RUN npm config set unsafe-perm true

RUN npm install -g helmet
RUN npm install -g http-proxy-middleware@0.21.0
RUN npm install -g node-cache@4.2.0
RUN npm install -g jsdom
RUN npm install -g request
RUN npm install -g fs-extra

WORKDIR /app
COPY ./src/setupProxy.js ./src/setupProxy.js
COPY ./src/whitelist.js ./src/whitelist.js
COPY server.js ./
COPY build/ ./build
EXPOSE 3000

