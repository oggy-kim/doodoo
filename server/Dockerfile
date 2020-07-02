FROM node:lts-alpine
WORKDIR '/app'
COPY ./package*.json ./
RUN npm install
ENV NODE_ENV production
COPY . .
CMD ["npm", "run", "start"]