const Gamedig = require("gamedig");
const { validationResult } = require("express-validator");
const { v4 } = require("uuid");

const googleController = require("./googleController");
const HttpError = require("../models/http-error");

const getServerById = (req, res, next) => {
  const serverId = req.params.sid;

  const promesa = googleController.getVMs(
    "arboreal-stage-288722",
    "southamerica-east1-c",
    serverId
  );

  promesa
    .then((vm) => {
      const servidor = {
        id: vm.data.name,
        ip: vm.data.networkInterfaces[0].accessConfigs[0].natIP,
      };

      console.log(servidor);
      Gamedig.query({
        type: "cs16",
        host: servidor.ip,
        port: 27015,
      })
        .then((state) => {
          let server = state;
          if (!server) {
            const error = new HttpError(
              "Could not find a server for the provided id",
              404
            );
            throw error;
          }
          res.json({ server });
        })
        .catch(() => {
          const error = new HttpError("Server is not online yet", 404);
          throw error;
        });
    })
    .catch(() => {
      const error = new HttpError("Internal server error", 500);
      throw error;
    });
};

function getServers(req, res, next) {
  const promesa = googleController.getVMs(
    "arboreal-stage-288722",
    "southamerica-east1-c",
    ""
  );
  promesa
    .then(function (respuesta) {
      function ayuda(r) {
        let respuestas = r.data.items
          .filter(
            //FILTRO LOS UNDEFINED. ME RETORNA UN ARREGLO DE TIPO "RESPUESTA"
            (server) =>
              server.networkInterfaces[0].accessConfigs[0].natIP !== undefined
          )
          //MAPEO EL ARRAY ANTERIOR PARA OBTENER SOLAMENTE LAS IPS EXTERNAS QUE ME INTERESAN
          .map((server) => {
            const servidor = {
              id: server.name,
              ip: server.networkInterfaces[0].accessConfigs[0].natIP,
            };
            return servidor;
          });
        return respuestas;
      }

      let servidoresPrendidos = ayuda(respuesta); //servidoresPrendidos es un array de ips.

      let findServer = function () {
        let promesasGamedig = [];
        servidoresPrendidos.forEach((servidor) => {
          promesasGamedig.push(new Promise(resolverPromesa));
          function resolverPromesa(resolve, reject) {
            //UNA PROMESA POR CADA IP
            Gamedig.query({
              type: "cs16",
              host: servidor.ip,
              port: 27015,
            })
              .then((state) => {
                resolve({ id: servidor.id, server: state });
              })
              .catch((error) => {
                reject(error);
              });
          }
        });
        return Promise.all(promesasGamedig);
      };
      const prom = findServer();
      prom
        .then(function (serversInfo) {
          console.log(serversInfo);
          res.json({ servidores: serversInfo });
        })
        .catch(() => {
          const error = new HttpError("Could not find any server", 500);
          throw error;
        });
    })
    .catch(() => {
      const error = new HttpError(
        "Couldn't establish connection to the server",
        500
      );
      throw error;
    });
}

function createServer(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError("Invalid inputs passed", 422);
  }
  //ESTA PORQUERIA ASIGNA UN NOMBRE RANDOM A CADA VM
  const nombreVm = "a" + v4().split("-", 4);
  const promesa = googleController.postVM(
    "arboreal-stage-288722",
    nombreVm.substring(0, 8), //REFACTORIZAR ESTO POR FAVOR
    req.body.name
  );
  promesa
    .then(function (response) {
      console.log("Servidor creado correctamente!");
      res.status(201).json({ response });
    })
    .catch(() => {
      const error = new HttpError(
        "Couldn't establish connection to the server",
        500
      );
      throw error;
    });
}

exports.getServerById = getServerById;
exports.getServers = getServers;
exports.createServer = createServer;
