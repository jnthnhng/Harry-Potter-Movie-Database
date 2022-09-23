FROM node:latest

COPY ./src/ .

RUN npm install

CMD ["node", "index.js"]
