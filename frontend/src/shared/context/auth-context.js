import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  user: null,
  asignUser: (usuario) => {},
});
