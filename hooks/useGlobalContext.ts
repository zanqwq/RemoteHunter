import { createContext, useContext } from "react";

const Context = createContext({
  isLogIn: false,
});

export const useGlobalContext = () => {
  const ctx = useContext(Context);
  return { ctx };
};