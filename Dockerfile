# gjør det mulig å bytte base-image slik at vi får bygd både innenfor og utenfor NAV
ARG BASE_IMAGE_PREFIX=""
FROM ${BASE_IMAGE_PREFIX}node as node-builder

ADD / /source
ENV CI=true
WORKDIR /source
RUN npm ci && npm run build


FROM nginx
ENV APPLICATION_NAME=tiltaksgjennomforing
COPY --from=node-builder /source/build /usr/share/nginx/html
