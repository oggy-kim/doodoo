FROM node:lts-alpine
WORKDIR '/app'
COPY ./server/package*.json ./
RUN npm install
ENV NODE_ENV production
COPY . .
CMD ["npm", "run", "start"]