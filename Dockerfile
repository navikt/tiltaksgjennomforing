FROM navikt/node-express:18

# Workaround: får tilfeldige feil ved npm install uten neste linje
RUN npm config set unsafe-perm=true 

# Test

WORKDIR /app

COPY server/ ./server
COPY ./server/node_modules ./node_modules
COPY ./src/setupProxy.js ./src/setupProxy.js
COPY ./src/whitelist.js ./src/whitelist.js
COPY server.js ./
COPY build/ ./build
EXPOSE 3000
