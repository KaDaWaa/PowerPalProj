import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useAppContext } from "./appContext";

const userContext = createContext(null);

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const { apiUrl } = useAppContext();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await AsyncStorage.getItem("user");
        if (data) {
          const userId = JSON.parse(data)._id;
          const response = await axios.get(`${apiUrl}/users/${userId}`);
          if (response.data) {
            setUser(response.data);
          } else {
            setUser(null);
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      }
    };

    fetchUser();
  }, [apiUrl]);
  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
}
export function useUserContext() {
  return useContext(userContext);
}
