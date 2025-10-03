# Dockerfile
FROM node:18-alpine

# ARGs para fijar UID/GID (útil para que coincida con tu usuario host)
ARG USER_ID=1000
ARG USER_GID=1000

# crear grupo y usuario con UID/GID fijos
RUN addgroup -g ${USER_GID} -S appgroup \
 && adduser -u ${USER_ID} -G appgroup -S appuser

WORKDIR /app

# copiar package.json e instalar dependencias (se ejecuta como root en build)
COPY package*.json ./
RUN npm install --production

# copiar el código
COPY . .

# Crear directorio del volumen y dar permisos al usuario creado
RUN mkdir -p /data \
 && chown -R appuser:appgroup /app /data

# cambiar a usuario no-root
USER appuser

ENV VOLUME_PATH=/data
EXPOSE 3000

CMD ["node", "app.js"]
