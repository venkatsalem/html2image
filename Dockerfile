FROM node:20 as builder

WORKDIR /fonts
RUN mkdir -p /fonts/source-code-pro \
    && wget https://github.com/adobe-fonts/source-code-pro/archive/2.030R-ro/1.050R-it.zip \
    && unzip 1.050R-it.zip -d /fonts/source-code-pro

RUN mkdir -p /fonts/roboto-mono \
    && wget https://fonts.google.com/download?family=Roboto%20Mono -O roboto-mono.zip \
    && unzip roboto-mono.zip -d /fonts/roboto-mono

RUN mkdir -p /fonts/open-sans \
    && wget https://fonts.google.com/download?family=Open+Sans -O open-sans.zip \
    && unzip open-sans.zip -d /fonts/open-sans

WORKDIR /app

COPY package.json /app
RUN npm install
COPY . /app

FROM ghcr.io/puppeteer/puppeteer:latest

WORKDIR /app
COPY --from=builder /app /app
COPY --from=builder /fonts /usr/share/fonts
RUN fc-cache -f -v

CMD ["node", "server.js"]
