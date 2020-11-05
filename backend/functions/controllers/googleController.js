const { google } = require("googleapis");
var compute = google.compute("v1");
const HttpError = require("../models/http-error");

function getVMs(project, zone, instance) {
  const promesa = new Promise(function (resolve, reject) {
    function authorize(callback) {
      google.auth
        .getClient({
          scopes: ["https://www.googleapis.com/auth/cloud-platform"],
        })
        .then((client) => {
          callback(client);
        })
        .catch(() => {
          const error = new HttpError("You don't have permission (IAM)", 401);
          throw error;
        });
    }

    function consulta(authClient) {
      var request = {
        project: project,
        zone: zone,
        instance: instance,
        auth: authClient,
      };

      compute.instances.get(request, function (err, response) {
        if (err) reject(err);
        resolve(response);
      });
    }
    authorize(consulta);
  });
  return promesa;
}

function postVM(project, vmName, hostname) {
  const promesa = new Promise(function (resolve, reject) {
    function funcion(authClient) {
      var request = {
        project: project,
        zone: "southamerica-east1-c",

        resource: {
          kind: "compute#instance",
          name: vmName,
          zone: "projects/arboreal-stage-288722/zones/southamerica-east1-c",
          machineType:
            "projects/arboreal-stage-288722/zones/southamerica-east1-c/machineTypes/e2-small",
          displayDevice: {
            enableDisplay: false,
          },
          metadata: {
            kind: "compute#metadata",
            items: [
              {
                key: "startup-script",
                value:
                  "docker run --name CounterStrike -p 27015:27015/udp -p 27015:27015 counterserver:1.0", //--name define el nombre del contenedor, no del servidor.
              },
            ],
          },
          tags: {
            items: ["http-server", "https-server"],
          },
          disks: [
            {
              kind: "compute#attachedDisk",
              type: "PERSISTENT",
              boot: true,
              mode: "READ_WRITE",
              autoDelete: true,
              deviceName: "instance-5",
              initializeParams: {
                sourceImage:
                  "projects/arboreal-stage-288722/global/images/counter",
                diskType:
                  "projects/arboreal-stage-288722/zones/southamerica-east1-c/diskTypes/pd-standard",
                diskSizeGb: "10",
              },
              diskEncryptionKey: {},
            },
          ],
          canIpForward: false,
          networkInterfaces: [
            {
              kind: "compute#networkInterface",
              subnetwork:
                "projects/arboreal-stage-288722/regions/southamerica-east1/subnetworks/default",
              accessConfigs: [
                {
                  kind: "compute#accessConfig",
                  name: "External NAT",
                  type: "ONE_TO_ONE_NAT",
                  networkTier: "PREMIUM",
                },
              ],
              aliasIpRanges: [],
            },
          ],
          description: "",
          labels: {},
          scheduling: {
            preemptible: false,
            onHostMaintenance: "MIGRATE",
            automaticRestart: true,
            nodeAffinities: [],
          },
          deletionProtection: false,
          reservationAffinity: {
            consumeReservationType: "ANY_RESERVATION",
          },
          serviceAccounts: [
            {
              email: "688998148034-compute@developer.gserviceaccount.com",
              scopes: [
                "https://www.googleapis.com/auth/devstorage.read_only",
                "https://www.googleapis.com/auth/logging.write",
                "https://www.googleapis.com/auth/monitoring.write",
                "https://www.googleapis.com/auth/servicecontrol",
                "https://www.googleapis.com/auth/service.management.readonly",
                "https://www.googleapis.com/auth/trace.append",
              ],
            },
          ],
          shieldedInstanceConfig: {
            enableSecureBoot: false,
            enableVtpm: true,
            enableIntegrityMonitoring: true,
          },
          confidentialInstanceConfig: {
            enableConfidentialCompute: false,
          },
        },
        auth: authClient,
      };

      compute.instances.insert(request, function (err, response) {
        if (err) reject(err);
        resolve(response);
      });
    }

    function authorize(callback) {
      google.auth
        .getClient({
          scopes: ["https://www.googleapis.com/auth/cloud-platform"],
        })
        .then((client) => {
          callback(client);
        })
        .catch(() => {
          const error = new HttpError("You don't have permission (IAM)", 401);
          throw error;
        });
    }
    authorize(funcion);
  });
  return promesa;
}

//LA FUNCION AUTHORIZE DEBE SER 1 SOLA, DADO QUE SON IGUALES. EN TODO CASO LO QUE VARIARIA SERIA EL SCOPE, QUE PARA ESTE PROYECTO ES SIEMPRE EL MISMO

exports.getVMs = getVMs;
exports.postVM = postVM;
