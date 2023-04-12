FROM navikt/node-express:18

# Workaround: får tilfeldige feil ved npm install uten neste linje
RUN npm config set unsafe-perm=true 

WORKDIR /app


# yarn installl -> server/node_modules
#yarn build -> ../dist

# COPY dist -> dist // output path i webpack config definerer dette.
#COPY server/node_modules -> dist/node_modules // slik at server.js ligger i samme path folder. Og treffer dependencies.

COPY ./dist ./dist
COPY ./server/node_modules ./dist/node_modules


COPY ./build ./build
EXPOSE 3000

ENTRYPOINT ["sh", "-c"]
CMD ["node dist/server.js"]