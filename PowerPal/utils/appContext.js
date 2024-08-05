import { createContext, useContext, useEffect, useState } from "react";

const appContext = createContext(null);

export default function AppProvider({ children }) {
  const [apiUrl, setApiUrl] = useState(
    "https://92x144ql-3001.euw.devtunnels.ms/api"
  );
  const [loading, setLoading] = useState(false);

  return (
    <appContext.Provider value={{ apiUrl, setApiUrl, loading, setLoading }}>
      {children}
    </appContext.Provider>
  );
}
export function useAppContext() {
  return useContext(appContext);
}
