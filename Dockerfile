FROM navikt/node-express:18

WORKDIR /app

COPY ./build ./build

EXPOSE 3000

ENTRYPOINT ["sh", "-c"]
CMD ["node build/server.js"]



