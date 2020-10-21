const { google } = require("googleapis");
var compute = google.compute("v1");

function authorize(callback) {
  google.auth
    .getClient({
      scopes: ["https://www.googleapis.com/auth/cloud-platform"],
    })
    .then((client) => {
      callback(client)
        .then(function (respuesta) {
          console.log(JSON.stringify(respuesta, null, 2));
        })
        .catch(function (error) {
          console.log(error);
        });
    })
    .catch((err) => {
      console.error("authentication failed: ", err);
    });
}

function consulta(authClient) {
  var request = {
    project: "arboreal-stage-288722",
    zone: "southamerica-east1-c",
    instance: "",
    auth: authClient,
  };

  const promesa = new Promise(function (resolve, reject) {
    compute.instances.get(request, function (err, response) {
      if (err) {
        console.error(err);
        reject("Error!");
        return;
      }
      // TODO: Change code below to process the `response` object:
      //console.log(JSON.stringify(response, null, 2));
      resolve(response);
    });
  });
  return promesa;
}

authorize(consulta);
