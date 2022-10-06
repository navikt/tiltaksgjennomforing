FROM navikt/node-express:12.2.0-alpine

# Workaround: får tilfeldige feil ved npm install uten neste linje
RUN npm config set unsafe-perm true
RUN npm install -g helmet@3.21.3
RUN npm install -g http-proxy-middleware@2.0.1
RUN npm install -g node-cache@4.2.0
RUN npm install -g jsdom@16.4.0
RUN npm install -g fs-extra@8.1.0
RUN npm install -g node-fetch@2.6.1

RUN npm install -g openid-client@3.7.2
RUN npm install -g express-http-proxy@1.6.2
RUN npm install -g @navikt/arbeidsgiver-notifikasjoner-brukerapi-mock@^5.0.0


WORKDIR /app
COPY server/ ./server
COPY ./src/setupProxy.js ./src/setupProxy.js
COPY ./src/whitelist.js ./src/whitelist.js
COPY server.js ./
COPY build/ ./build
EXPOSE 3000

