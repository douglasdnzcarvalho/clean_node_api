FROM node:16-alpine
WORKDIR /usr/clean-node-api
COPY ./package.json .
RUN npm install --force --only=prod
COPY ./dist ./dist
EXPOSE 5000
CMD npm start