FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install 

COPY . .

RUN chmod +x ./entrypoint.sh || true

RUN npm run build

EXPOSE 4000

CMD ["sh", "-c", "[ -f ./entrypoint.sh ] && ./entrypoint.sh || node dist/server.js"]
