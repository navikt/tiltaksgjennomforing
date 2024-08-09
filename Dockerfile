FROM navikt/node-express:18

# Workaround: får tilfeldige feil ved npm install uten neste linje
RUN npm config set unsafe-perm=true

WORKDIR /app

COPY ./dist .

EXPOSE 3000

ENTRYPOINT ["sh", "-c"]
CMD ["DEBUG=http-proxy-middleware* node server/index.cjs"]
