FROM node:20 as builder

WORKDIR /app

COPY package.json /app
RUN npm install
COPY . /app

FROM ghcr.io/puppeteer/puppeteer:latest

WORKDIR /app
COPY --from=builder /app /app

CMD ["node", "server.js"]
