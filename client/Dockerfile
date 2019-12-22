FROM node:12.10.0-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --quiet

COPY . .

EXPOSE 3000

CMD ["npm", "start"]