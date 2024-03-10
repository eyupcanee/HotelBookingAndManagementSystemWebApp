import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(() => {
    let adminProfile = sessionStorage.getItem("adminProfile");
    if (adminProfile) return JSON.parse(adminProfile);

    return null;
  });
  const [hotelManager, setHotelManager] = useState(() => {
    let hotelManagerProfile = sessionStorage.getItem("hotelManagerProfile");
    if (hotelManagerProfile) return JSON.parse(hotelManagerProfile);

    return null;
  });
  const [user, setUser] = useState(() => {
    let userProfile = sessionStorage.getItem("userProfile");
    if (userProfile) return JSON.parse(userProfile);
    return null;
  });

  return (
    <AuthContext.Provider
      value={{
        admin,
        hotelManager,
        user,
      }}
    ></AuthContext.Provider>
  );
};

export default AuthContext;
