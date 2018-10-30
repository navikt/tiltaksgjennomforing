FROM node as node-builder

ADD / /source
ENV CI=true
WORKDIR /source
RUN npm ci && npm run build


FROM nginx
ENV APPLICATION_NAME=tiltaksgjennomforing
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=node-builder /source/build /usr/share/nginx/html/tiltaksgjennomforing
