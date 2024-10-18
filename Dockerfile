FROM gcr.io/distroless/nodejs20-debian12
COPY ./dist /app
COPY ./server /app/server
WORKDIR /app
CMD ["server/index.cjs"]
