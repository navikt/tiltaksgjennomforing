FROM gcr.io/distroless/nodejs24-debian13
COPY ./dist .
COPY ./server /server
COPY package.json package.json

ENV NODE_EXTRA_CA_CERTS=/etc/ssl/ca-bundle.pem

CMD ["server/index.cjs"]
