import React, { useEffect, useState, useContext } from "react";

import ServerList from "../components/ServerList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

import "./ServersCreated.css";

const ServersCreated = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedServers, setLoadedServers] = useState();
  const auth = useContext(AuthContext);

  useEffect(() => {
    fetch("http://localhost:5000/api/users/login/success", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("failed to authenticate user");
      })
      .then((responseJson) => {
        auth.asignUser(responseJson);
        auth.login();
      })
      .catch((error) => {
        console.log(error);
        auth.logout();
      });
  }, []);

  useEffect(() => {
    const fetchServers = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/servers"
        );
        //
        setLoadedServers(responseData.servidores);
        console.log(responseData.servidores);
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
