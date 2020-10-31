import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Button from "../../shared/components/FormElements/Button";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
//
import useCopyToClipboard from "../../shared/hooks/copy-clipboard-hook";

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
          `http://localhost:5000/api/servers/${serverId}`
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
          <div className="serverinfo">
            <div className="topServerInfo">
              <div className="imageServer">
                <img src="#" alt="#" />
              </div>
              <p>Hostname: {loadedServer.name}</p>
              <p>
                Players: {loadedServer.players.length} /{" "}
                {loadedServer.maxplayers}
              </p>
            </div>
            <div className="downServerInfo">
              <p>IP: {loadedServer.connect}</p>
              <p>Ping: {loadedServer.ping}</p>

              <Button href={`steam://connect/${loadedServer.connect}`}>
                Unirse
              </Button>
              <Button onClick={() => handleCopy(loadedServer.connect)}>
                Copiar IP
              </Button>
              {/* {isCopied && <p>Copiado!</p>} */}
            </div>
          </div>
          <div className="gameinfo"></div>
        </div>
      )}
    </React.Fragment>
  );
};

export default ServerInfo;
