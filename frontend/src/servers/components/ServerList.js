import React from "react";
import ServerItem from "./ServerItem";
import Card from "../../shared/components/UIElements/Card";

import "bootstrap/dist/css/bootstrap.css";
import "./ServerList.css";

const ServerList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="server-list center">
        <Card>
          <h2>No server found</h2>
        </Card>
      </div>
    );
  }
console.log("items");
console.log(props.items);
  return (
    <div className="container-fluid">
      <div className="row mt-5 justify-content-center">
        <div className="col-md-9 col-xs-12 columnas">
          {props.items.map((server) => (
            <ServerItem
              // image={server.imageUrl}
              // imageTitle={server.imageTitle}
              map={server.map}
              name={server.name}
              players={server.players}
              ip={server.connect}
              ping={server.ping}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServerList;
