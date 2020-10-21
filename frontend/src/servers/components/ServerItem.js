import React from "react";
import Card from "../../shared/components/UIElements/Card";

import "bootstrap/dist/css/bootstrap.css";

import "./ServerItem.css";

const ServerItem = (props) => {
  return (
    <Card className="cardServer">
      <div className="container">
        <div className="row justify-content-center rounded">
          <div className="server-item__image p-2">
            <img
              src="https://static2.cs-bg.net/maps/images/screenshots/maps16/de/cs-2021-de_mirage.jpg"
              alt="asd"
              className="pic img-fluid rounded"
            />
            {/* <p>{props.ping}</p>
        <p>{props.mapName}</p> */}
          </div>
          <div className="titulo">
            <p>NAME: {props.name}</p>
            <p>PLAYERS: {props.players.length}</p>
            <p>IP: {props.ip}</p>
            <p>MAP: {props.map}</p>
            <p>PING: {props.ping}</p>
          </div>
          <div className="bottomCard w-100 p-2">
            <a
              href={`steam://connect/${props.ip}`}
              className="btn btn-primary btn-block"
            >
              Unirse
            </a>

            <button
              className="btn btn btn-outline-primary btn-block"
              type="submit"
            >
              Copiar data
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ServerItem;
