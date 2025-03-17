FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --only=production

COPY . .

RUN echo "dist/" >> .dockerignore

RUN chmod +x ./entrypoint.sh || true

RUN npm run build

EXPOSE 4000

CMD ["sh", "-c", "[ -f ./entrypoint.sh ] && ./entrypoint.sh || node dist/server.js"]

