import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser,logoutUser } from "../api/userApi";
import { loginAdmin,logoutAdmin } from "../api/adminApi";
import { loginHotelManager,logoutHotelManager } from "../api/hotelManagerApi";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  
  const [admin, setAdmin] = useState(() => {
    let adminProfile = sessionStorage.getItem("adminProfile");
    if (adminProfile) return JSON.parse(adminProfile);

    return null;
  });

  const loginAdminAuth = async(admin) => {
    loginAdmin(admin).then((res) => {
      if(res.data.status === "no") {
        setAdmin(null)
      } else {
        sessionStorage.setItem("adminProfile", JSON.stringify(res.data.token));
        setAdmin(res.data.token);
        navigate("/admin/dashboard");
      }
    })
  }

  const logoutAdminAuth = async(token) => {
    logoutAdmin(token).then((res) => {
      if(res.data.status !== "no"){
        sessionStorage.removeItem("adminProfile");
        setAdmin(null);
        navigate("/login");
      }
    })
  }

  const [hotelManager, setHotelManager] = useState(() => {
    let hotelManagerProfile = sessionStorage.getItem("hotelManagerProfile");
    if (hotelManagerProfile) return JSON.parse(hotelManagerProfile);

    return null;
  });


  const loginHotelManagerAuth = async(hotelManager) => {
    loginHotelManager(hotelManager).then((res) => {
      if(res.data.status === "no") {
        setHotelManager(null)
      } else {
        sessionStorage.setItem("hotelManagerProfile", JSON.stringify(res.data.token));
        setHotelManager(res.data.token);
        navigate("/hotelmanager/dashboard");
      }
    })
  }

  const logoutHotelManagerAuth = async(token) => {
    logoutHotelManager(token).then((res) => {
      if(res.data.status !== "no"){
        sessionStorage.removeItem("hotelManagerProfile");
        setHotelManager(null);
        navigate("/login");
      }
    })
  }
  
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
        navigate("/login");
      }
    })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        admin,
        hotelManager,
        loginUserAuth,
        logoutUserAuth,
        loginAdminAuth,
        logoutAdminAuth,
        loginHotelManagerAuth,
        logoutHotelManagerAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
