TAREA PRACTICA DE DOCKER
_____________________________________________________________________________________________________________________________

*Para levantar:

docker-compose up --build -d

docker-compose build --build-arg USER_ID=1001 --build-arg USER_GID=1001


* Ver logs para confirmar que la app arrancó:

docker-compose logs -f

* Probar la aplicación (desde el host):

curl http://localhost:3000/



* Verifica el archivo en la carpeta data:

cat data/saludo.txt
ls -l data/saludo.txt


* Para ver el mensaje en una página web como el contenedor ya está corriendo y exponiendo el puerto 3000 de tu máquina. En el navegador coloca la siguiente ruta: http://localhost:3000/

En esa URL, la aplicación responde con el mensaje que también escribe en el archivo dentro del volumen.
El formato es algo como esto:


Saludo escrito en: /data/saludo.txt Contenido escrito: app: SaludoApp | greeting: Hola desde Docker Compose! | timestamp: 2025-10-03T06:00:52.225Z


Cada vez que recargas la página (F5), el contenedor escribe una nueva línea en el archivo ./data/saludo.txt en tu host.

Además del navegador, puedes abrir el archivo en tu carpeta local data/saludo.txt y comprobar que se va llenando con cada request.














