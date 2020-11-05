import React from "react";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import "bootstrap/dist/css/bootstrap.css";

import "./ServerItem.css";

const ServerItem = (props) => {
  return (
    <Card className="card text-center">
      <img
        src="https://static2.cs-bg.net/maps/images/screenshots/maps16/de/cs-2021-de_mirage.jpg"
        alt="..."
        className="card-img-top"
      />
      {/* <p>{props.ping}</p>
        <p>{props.mapName}</p> */}

      <ul className="list-group list-group-flush">
        <li class="list-group-item w-100">NAME: {props.name}</li>
        <li class="list-group-item w-100">PLAYERS: {props.players.length}</li>
        <li class="list-group-item w-100">IP: {props.ip}</li>
        <li class="list-group-item w-100">MAP: {props.map}</li>
        <li class="list-group-item w-100">PING: {props.ping}</li>
      </ul>
      <div className="card-body p-0 pt-1">
        <a
          href={`steam://connect/${props.ip}`}
          className="btn btn-primary btn-block align-middle"
        >
          Unirse
        </a>
        <Button
          estilo="secondary"
          block
          to={`/${props.id}`}
          exact
          className="align-middle"
        >
          {" "}
          Copiar data
        </Button>
      </div>
    </Card>
  );
};

export default ServerItem;
