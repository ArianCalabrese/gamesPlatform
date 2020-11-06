import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  user: {},
  asignUser: (usuario) => {},
});
// import React, { createContext, useState, useEffect } from "react";
// import { useHttpClient } from "../../shared/hooks/http-hook";

// const context = createContext(null);

// const UserProvider = ({ children }) => {
//   const { isLoading, error, sendRequest, clearError } = useHttpClient();
//   const [user, setUser] = useState({});

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const responseData = await sendRequest(
//           "https://southamerica-east1-atiweb.cloudfunctions.net/getServers/api/users/login/success"
//         );
//         console.log("responseData");
//         console.log(responseData);
//         setUser(responseData);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     fetchUser();
//     // .then((res) => {
//     //   if (res.ok) {
//     //     console.log(res);
//     //     res
//     //       .json()
//     //       .then((res) => {
//     //         setUser(res);
//     //         console.log(res);
//     //         console.log(user);
//     //       })
//     //       .catch((err) => {
//     //         console.log(err);
//     //       });
//     //   }
//     // })
//     // .catch((err) => console.log(err));
//   }, [sendRequest]);

//   return <context.Provider value={user}>{children}</context.Provider>;
// };

// UserProvider.context = context;

// export default UserProvider;
