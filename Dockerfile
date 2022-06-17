FROM node:16-alpine
WORKDIR /usr/clean-node-api
COPY ./package.json .
RUN npm set-script prepare "" && npm install --omit=dev --force