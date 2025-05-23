FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

ARG REACT_APP_BUFFET_ID
ENV REACT_APP_BUFFET_ID=$REACT_APP_BUFFET_ID
RUN npm run build



FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html