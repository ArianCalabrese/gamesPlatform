import React, { useEffect, useState, useContext } from "react";

import ServerList from "../components/ServerList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

import "./ServersCreated.css";

const ServersCreated = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedServers, setLoadedServers] = useState();

  useEffect(() => {
    const fetchServers = async () => {
      try {
        const responseData = await sendRequest(
          "https://southamerica-east1-atiweb.cloudfunctions.net/getServers/api/servers"
        );
        console.log(responseData.servidores);
        setLoadedServers(responseData.servidores);
      } catch (error) {
        console.log("Error server not found");
        console.log(error);
      }
    };
    fetchServers();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedServers && <ServerList items={loadedServers} />}
    </React.Fragment>
  );
};

export default ServersCreated;
