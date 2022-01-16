/** @format */

import { createContext, useState } from "react";
import { useSessionStorage } from "../hooks/useSessionStorage";

export const SessionContext = createContext();

export const SessionProvaider = ({ children }) => {
  const [user, setUser] = useSessionStorage("user", null);

  return (
    <SessionContext.Provider value={{ user, setUser }}>
      {children}
    </SessionContext.Provider>
  );
};
