FROM node:24-alpine

ENV NODE_ENV=production
WORKDIR /app
RUN chown node:node /app
USER node
RUN mkdir -p /app/data

COPY --chown=node:node package.json package-lock.json ./
RUN npm ci --omit=dev

COPY --chown=node:node . .

EXPOSE 3000
CMD ["node", "index.js"]