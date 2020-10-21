import React, { useEffect, useState } from "react";

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
          "http://localhost:5000/api/servers"
        );
//
        setLoadedServers(responseData);
        console.log(responseData);
      } catch (error) {
        console.log("Error server not found");
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
