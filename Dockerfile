# ---------- Stage 1: build ----------
FROM node:24-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npx ng build --configuration production,docker --base-href /

# ---------- Stage 2: serve ----------
FROM nginxinc/nginx-unprivileged:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/form-builder/browser /usr/share/nginx/html

EXPOSE 8080