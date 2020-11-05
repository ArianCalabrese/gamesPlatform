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
  // console.log("items");
  // console.log(props.items);
  return (
    <ul class="list-group list-group-horizontal align-items-stretch flex-wrap">
      {props.items.map((vm) => (
        <li class="list-group-item border-0 .mx-auto">
          <ServerItem
            // image={server.imageUrl}
            // imageTitle={server.imageTitle}
            map={vm.server.map}
            name={vm.server.name}
            players={vm.server.players}
            ip={vm.server.connect}
            ping={vm.server.ping}
            id={vm.id}
          />
        </li>
      ))}
    </ul>
  );
};

export default ServerList;
