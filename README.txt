Configuración:

El archivo .config muestra todas las variables expuestas en la aplicación para configurar cuestiones necesarias para utilizar distintas APIS y habilitar ciertos procesos
(conexiones a BBDD, utilizar entorno de PROD o DEV, habilitar mensajes y mailing, session, etc.).
En el archivo se puede ver que primero se obtiene los argumentos de línea de comando y luego los del archivo .env. Cuestiones básicas como el PORT tiene un valor por defecto también.

Messaging y mailing:
Para testear las funcionalidades se recomienda configurar nuevas credenciales en:
https://ethereal.email/create
https://www.twilio.com/try-twilio

Carrito:
Se decidió crear el carrito con el mismo id del middleware de user de autenticación ya que el carrito persiste al mismo tiempo que el usuario (si se crea un usuario, se crea automáticamente un carrito para este).

