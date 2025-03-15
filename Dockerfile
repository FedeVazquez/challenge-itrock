#Usamos una imagen ligera de Node.js
FROM node:18-alpine

#Definimos el directorio de trabajo dentro del contenedor
WORKDIR /app

#Copiar e instalar solamente dependencias de producción
COPY package.json package-lock.json ./
RUN npm install --only=production

#Copiar el resto del código fuente
COPY . .

#Dar permisos al script de inicio (opcional)
RUN chmod +x ./entrypoint.sh

#compilar TS antes de iniciar
RUN npm run build

#Exponer el puerto de Express (4000)
EXPOSE 4000

#Ejecutar el script de inicio
CMD ["sh", "-c", "./entrypoint.sh"]
