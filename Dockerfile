FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

ENV PORT 3000
EXPOSE $PORT

CMD ["node", "app.js"]
