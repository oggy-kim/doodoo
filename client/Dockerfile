FROM node:lts-alpine

WORKDIR '/app'

COPY ./client/package*.json ./

RUN npm install
COPY ./client/* ./
RUN npm run build

FROM nginx
EXPOSE 3000
COPY .client/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=0 /app/build /usr/share/nginx/html



