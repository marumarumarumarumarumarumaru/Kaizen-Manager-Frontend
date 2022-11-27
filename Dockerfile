FROM node:19.0.0 as build
WORKDIR /kaizen-manager-frontend

COPY package*.json .
RUN npm install
COPY . .

RUN npm run build
FROM nginx:1.19
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /kaizen-manager-frontend/build /usr/share/nginx/html