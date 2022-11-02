require("yargs/yargs");
const numCpus = require("os").cpus().length;
const { loguear } = require("../lib/logger");

const info = {
  "Argumentos de entrada": process.argv.slice(2),
  "Nombre de la plataforma (sistema operativo)": process.platform,
  "Versión de node.js": process.version,
  "Memoria total reservada (rss)": process.memoryUsage().rss,
  "Path de ejecución": process.execPath,
  "Process id": process.pid,
  "Carpeta del proyecto": process.cwd(),
  "Número de procesadores": numCpus,
};

const getInfo = (req, res) => {
  try {
    res.status(200).json(info);
    loguear(`${req.method} en ${req.originalUrl}`, "info");
  } catch (err) {
    loguear(`Error obteniendo info ${err}`, "error");
    loguear(`Error obteniendo info ${err}`, "error", "devError");
    res.status(500).send("error");
  }
};

module.exports = { getInfo };
