import React, { useContext, useEffect } from "react";

import Button from "../../shared/components/FormElements/Button";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";

import "./Login.css";

const Login = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const loginHandler = () => {
    // window.open("http://localhost:5000/api/users/steam", "_self");
    auth.login();
  };

  // auth.login();

  //   // try {
  //   //   const responseData = await sendRequest(
  //   //     "http://localhost:5000/api/users/auth/steam"
  //   //   );
  //   //   //
  //   //   console.log(responseData.users);
  //   // } catch (error) {
  //   //   console.log("Error autenticando");
  //   // }

  //   // try {
  //   //   const user = await sendRequest("http://localhost:5000/api/users/account");
  //   //   if (user) {
  //   //     console.log(user);
  //   //     auth.login();
  //   //   }
  //   // } catch (error) {
  //   //   console.log(error);
  //   // }
  //   auth.login();
  //   // Axios({
  //   //   method: "GET",
  //   //   withCredentials: true,
  //   //   url: "http://localhost:5000/api/users/steam",
  //   // }).then((res) => console.log(res));
  // };

  return (
    <React.Fragment>
      <Button onClick={loginHandler}>Boton Steam</Button>
    </React.Fragment>
  );
};

export default Login;
