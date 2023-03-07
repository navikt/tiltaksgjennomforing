FROM navikt/node-express:18

WORKDIR /app

COPY ./server/node_modules ./node_modules
COPY ./server/dist ./dist
COPY ./build ./build

EXPOSE 3000

ENTRYPOINT ["sh", "-c"]
CMD ["node dist/server.js"]
