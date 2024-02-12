FROM navikt/node-express:18

# Workaround: får tilfeldige feil ved npm install uten neste linje
RUN npm config set unsafe-perm=true 

WORKDIR /app

COPY ./dist ./dist

COPY ./server/dist ./server
COPY ./server/node_modules ./server/node_modules

EXPOSE 3000

ENTRYPOINT ["sh", "-c"]
CMD ["node server/server.js"]
