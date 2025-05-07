FROM node:lts-alpine

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY .env .

COPY . .

EXPOSE 3000

CMD ["npm", "start"]