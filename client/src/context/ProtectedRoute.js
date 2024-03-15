import { useContext } from "react";
import { useNavigate,Navigate } from "react-router-dom";
import AuthContext from "./AuthProvider";

const ProtectedRoute = ({ children, accessBy, authType }) => {
  const navigate = useNavigate();
  /*
  const { admin } = useContext(AuthContext);
  const { hotelManager } = useContext(AuthContext);*/
  const { user } = useContext(AuthContext);
  /*
  if (authType === "admin") {
    if (accessBy === "non-authenticated") {
      if (!admin) return children;
      else navigate("/admin/dashboard");
    } else if (accessBy === "authenticated") {
      if (admin) return children;
      else navigate("/admin/login");
    } else navigate("/admin/login");
  } else if (authType === "hotelManager") {
    if (accessBy === "non-authenticated") {
      if (!hotelManager) return children;
      else navigate("/hotelmanager/dashboard");
    } else if (accessBy === "authenticated") {
      if (hotelManager) return children;
      else navigate("/hotelmanager/login");
    } else navigate("/hotelmanager/login");
    */
   if (authType === "user") {
    if (accessBy === "non-authenticated") {
      if (!user) return children;
      else ; return <Navigate to={"/"}/>
    } else if (accessBy === "authenticated") {
      if (user) return children;
      else return <Navigate to={"/login"}/>
    } else return <Navigate to={"/login"}/>
  } else if (authType === "all") {
    if(accessBy === "non-authenticated") {
      if(!user) return children;
      //else if (!admin) return children;
      //else if (!hotelManager) return children;
      else return <Navigate to={"/"}/>
    }else if (accessBy === "authenticated") {
      if (user) return children;
      //else if (admin) return children;
      //else if (hotelManager) return children;
      else return  <Navigate to={"/login"}/>
    }
  }
};

export default ProtectedRoute;
