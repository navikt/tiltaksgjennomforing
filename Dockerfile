FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:24-slim

COPY ./dist .
COPY ./server /server
COPY package.json package.json

ENV NODE_EXTRA_CA_CERTS=/etc/ssl/ca-bundle.pem
ENV TZ="Europe/Oslo"

EXPOSE 3000

CMD ["server/index.cjs"]
