FROM node:25-alpine

WORKDIR /app

COPY package.json .

RUN npm install --ignore-scripts

RUN npm i -g serve

COPY . .

RUN npm run build

# Default port for serve (https://www.npmjs.com/package/serve)
EXPOSE 3000

CMD [ "serve", "-s", "dist" ]