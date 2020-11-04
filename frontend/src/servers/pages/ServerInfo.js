import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Button from "../../shared/components/FormElements/Button";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
//
import useCopyToClipboard from "../../shared/hooks/copy-clipboard-hook";
import Card from "../../shared/components/UIElements/Card";
import GameInfo from "../components/GameInfo";

import "./ServerInfo.css";

const ServerInfo = (props) => {
  const [loadedServer, setLoadedServer] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [isCopied, handleCopy] = useCopyToClipboard();

  const serverId = useParams().serverId;

  useEffect(() => {
    const fetchServer = async () => {
      try {
        const responseData = await sendRequest(
          `https://southamerica-east1-atiweb.cloudfunctions.net/getServers/api/servers/${serverId}`
        );
        setLoadedServer(responseData.server);
        console.log(responseData.server);
      } catch (err) {}
    };
    fetchServer();
  }, [sendRequest, serverId]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedServer && (
        <div>
          <Card className="ServerInfo">
            <div className="imageServer">
              <img
                src="https://static2.cs-bg.net/maps/images/screenshots/maps16/de/cs-2021-de_mirage.jpg"
                alt="#"
                className="pic"
              />
            </div>
            <div className="dataServer">
              <p>Hostname: {loadedServer.name}</p>
              <p>
                Players: {loadedServer.players.length} /{" "}
                {loadedServer.maxplayers}
              </p>
              <p>IP: {loadedServer.connect}</p>
              <p>Ping: {loadedServer.ping}</p>
            </div>
            <div className="serverButtons">
              <Button href={`steam://connect/${loadedServer.connect}`}>
                Unirse
              </Button>
              <Button onClick={() => handleCopy(loadedServer.connect)}>
                Copiar IP
              </Button>
            </div>
            {/* {isCopied && <p>Copiado!</p>} */}
          </Card>
          <Card className="gameInfo">
            <GameInfo items={loadedServer.players}/>
          </Card>
        </div>
      )}
    </React.Fragment>
  );
};

export default ServerInfo;
