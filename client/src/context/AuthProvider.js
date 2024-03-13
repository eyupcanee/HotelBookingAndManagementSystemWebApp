import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser,logoutUser } from "../api/userApi";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  /*
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
  */
  const [user, setUser] = useState(() => {
    let userProfile = sessionStorage.getItem("userProfile");
    if (userProfile) return JSON.parse(userProfile);
    return null;
  });

  const loginUserAuth = async(user) => {
    loginUser(user).then((res) => {
      if(res.data.status === "no") {
        setUser(null)
        
      } else {
        sessionStorage.setItem("userProfile",JSON.stringify(res.data.token));
        setUser(res.data.token);
        console.log(res.data.token);
        navigate("/")
      }
    })
  }

  const logoutUserAuth = async(token) => {
    logoutUser(token).then((res) => {
      if(res.data.status !== "no"){
        sessionStorage.removeItem("userProfile");
        setUser(null);
        navigate("/user/login");
      }
    })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loginUserAuth,
        logoutUserAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
