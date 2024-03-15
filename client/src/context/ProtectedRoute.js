import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./AuthProvider";

const ProtectedRoute = ({ children, accessBy, authType }) => {  
  const { admin } = useContext(AuthContext);
  const { hotelManager } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  
  if (authType === "admin") {
    if (accessBy === "non-authenticated") {
      if (!admin) return children;
      else return  <Navigate to={"/admin/dashboard"}/>
    } else if (accessBy === "authenticated") {
      if (admin) return children;
      else return  <Navigate to={"/login"}/>
    } else return  <Navigate to={"/login"}/>
  } else if (authType === "hotelManager") {
    if (accessBy === "non-authenticated") {
      if (!hotelManager) return children;
      else return  <Navigate to={"/hotelmanager/dashboard"}/>
    } else if (accessBy === "authenticated") {
      if (hotelManager) return children;
      else return  <Navigate to={"/login"}/>
    } else return  <Navigate to={"/login"}/>
  }
   else if (authType === "user") {
    if (accessBy === "non-authenticated") {
      if (!user) return children;
      else ; return <Navigate to={"/"}/>
    } else if (accessBy === "authenticated") {
      if (user) return children;
      else return <Navigate to={"/login"}/>
    } else return <Navigate to={"/login"}/>
  } else if (authType === "all") {
    if(accessBy === "non-authenticated") {
      if(!user & !admin & !hotelManager) return children 
      else return <Navigate to={"/"}/>
    }else if (accessBy === "authenticated") {
      if (user) return children;
      else if (admin) return children;
      else if (hotelManager) return children;
      else return  <Navigate to={"/login"}/>
    }
  }
};

export default ProtectedRoute
