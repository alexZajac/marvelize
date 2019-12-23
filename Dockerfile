
# Setup and build the client

FROM node:12.10.0-slim as client

WORKDIR /usr/src/app/client/
COPY client/package*.json ./
RUN npm install --quiet
COPY client/ ./
RUN npm run build


# Setup the server
FROM node:12.10.0-alpine

WORKDIR /usr/src/app/
COPY --from=client /usr/src/app/client/build/ ./client/build/

WORKDIR /usr/src/app/server/
COPY server/package*.json ./
RUN npm install --quiet
COPY server/ ./

ENV PORT 8080

EXPOSE 8080

CMD ["npm", "start"]