// app.js
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Variables de entorno (serán provistas por docker-compose)
const APP_NAME = process.env.APP_NAME || 'MiApp';
const GREETING = process.env.GREETING || 'Hola desde Docker!';
const VOLUME_PATH = process.env.VOLUME_PATH || '/data';
const FILE_NAME = process.env.FILE_NAME || 'saludo.txt';
const FILE_PATH = path.join(VOLUME_PATH, FILE_NAME);

app.get('/', (req, res) => {
  const contenido = [
    `app: ${APP_NAME}`,
    `greeting: ${GREETING}`,
    `timestamp: ${new Date().toISOString()}`,
  ].join(' | ') + '\n';

  try {
    // Asegurar directorio
    fs.mkdirSync(VOLUME_PATH, { recursive: true });
    // Escribir/añadir al archivo en el volumen
    fs.appendFileSync(FILE_PATH, contenido, 'utf8');
    res.send(`Saludo escrito en: ${FILE_PATH}\nContenido escrito:\n${contenido}`);
  } catch (err) {
    console.error('Error escribiendo archivo:', err);
    res.status(500).send('Error: ' + err.message);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`${APP_NAME} escuchando en ${port}`));
