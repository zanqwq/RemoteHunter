import { fetchCurrentUser } from "@/lib/api";
import { GlobalContext as GlobalContextType, User } from "@/lib/type";
import { router } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";

const defaultValue: GlobalContextType = {
  user: null,
  setUser: user => {},
};
export const GlobalContext = createContext<GlobalContextType>(defaultValue);

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalContextProvider = ({ children }) => {
  const [user, setUser] = useState<GlobalContextType['user']>(null);
  useEffect(() => {
    fetchCurrentUser().then(currentUser => {
      setUser(currentUser);
    }).catch(e => {
      setUser(null);
    });
  }, []);

  useEffect(() => {
    router.push(user ? '/seek_job' : 'sign_in');
  }, [user]);
  return (
    <GlobalContext.Provider value={{ user, setUser }}>
      {children}
    </GlobalContext.Provider>
  )
};
