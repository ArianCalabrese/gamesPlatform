// const uuid = require('uuid/v4');
const Gamedig = require("gamedig");
const axios = require("axios");
const googleController = require("./googleController");
const HttpError = require("../models/http-error");
const { google } = require("googleapis");

let DUMMY_SERVER = [
  {
    id: "s1",
    hostname: "Servidor Arian",
    ip: "192.168.1.1",
    players: 4,
    maxplayers: 15,
    creator: "u1",
  },
  {
    id: "s2",
    hostname: "Servidor Arian",
    ip: "192.168.1.1",
    players: 4,
    maxplayers: 15,
    creator: "u1",
  },
  {
    id: "s3",
    hostname: "Servidor Arian",
    ip: "192.168.1.1",
    players: 4,
    maxplayers: 15,
    creator: "u1",
  },
];

const getServerById = (req, res, next) => {
  const serverId = req.params.sid;

  const server = DUMMY_SERVER.find((p) => {
    return p.id === serverId;
  });

  if (!server) {
    const error = new HttpError(
      "Could not find a server for the provided id",
      404
    );
    throw error;
  }
  res.json({ server });
};

function getServers(req, res, next) {
  const promesa = googleController.getVMs(
    "arboreal-stage-288722",
    "southamerica-east1-c",
    ""
  );
  promesa
    .then(function (respuesta) {
      console.log(JSON.stringify(respuesta, null, 2));
      let servidores = respuesta.data.items.map(
        (server) => server.networkInterfaces
      );

      let respuestas = servidores.map((s) => {
        let aux = s[0].accessConfigs;
        if (!aux[0].natIP) {
          console.log("no existe pa");
        }
        return aux[0].natIP;
      });

      let servidoresPrendidos = respuestas.filter(function (ser) {
        return ser != null;
      });
      let findServer = function () {
        let promesasGamedig = [];
        servidoresPrendidos.forEach((ip) => {
          promesasGamedig.push(new Promise(resolverPromesa));
          function resolverPromesa(resolve, reject) {
            //UNA PROMESA POR CADA IP
            console.log(ip);
            Gamedig.query({
              type: "cs16",
              host: ip,
              port: 27015,
            })
              .then((state) => {
                console.log("ESTADO");
                console.log(state);
                resolve(state);
              })
              .catch((error) => {
                console.log("Server is offline");
                reject(error);
              });
          }
        });
        return Promise.all(promesasGamedig);
      };
      const prom = findServer();
      prom
        .then(function (serversInfo) {
          console.log("FUNCIONA");
          console.log(serversInfo);
          res.json({ serversInfo });
        })
        .catch(function (error) {
          console.log("Ha ocurrido un error", error);
        });
    })
    .catch(function (error) {
      console.log(error);
    });
}

exports.getServerById = getServerById;
exports.getServers = getServers;
