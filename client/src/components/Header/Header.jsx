import "./Header.css";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { getUserAsUser } from "../../api/userApi";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
const Header = ({isNotMenu}) => {
  const criteria = {
    country:"turkey"
  }
  const navigate = useNavigate();
  const {logoutUserAuth} = useContext(AuthContext);
  const [user,setUser] = useState();
  const [loading,setLoading] = useState(true);
  const handleLogoutUser = async (event) => {
    event.preventDefault();

    await logoutUserAuth(sessionStorage.getItem("userProfile"));
  }

  useEffect(() => {
    const getData = async () => {
      if(sessionStorage.getItem("userProfile")) {
        const id = await jwtDecode(sessionStorage.getItem("userProfile")).id;
        const result = await getUserAsUser(id,sessionStorage.getItem("userProfile"))
        setUser(result.data.data);
        setLoading(false);
      }
      setLoading(false);
    }

    getData();
  },[]);
if(loading) {
  return <div>Yükleniyor...</div>
}
  else if(isNotMenu){
    return (<header>
      <div className="container">
      
      <div className="logo"><Link to={"/"}>PLAIDESSA</Link></div>
      </div>
    </header>)
  }
  else if(sessionStorage.getItem("userProfile")) {
    
    
    return (<header>
      <div className="container">
        <div className="logo"><Link to={"/"}>PLAIDESSA</Link></div>
        <div className="links">
          <div className="user-link">
          <p>Hoşgeldin {user.firstName} |</p></div>
          <Link to={"/"}>Ana Sayfa</Link>
          <Link to={"/list"}>Oteller</Link>
          <Link >Rezervasyonlarım</Link>
          <Link onClick={handleLogoutUser}>Çıkış Yap</Link>
          <img src={user.profilePicture} alt="" />
        </div>
      </div>
    </header>)
  } else if (sessionStorage.getItem("adminProfile")) {
    return (<header>
      <div className="container">
      <div className="logo"><Link to={"/"}>PLAIDESSA</Link></div>
        <div className="links">
          <Link to={"/"} >Ana Sayfa</Link>
          <Link to={"/list"}>Oteller</Link>
          <Link >Admin Panel</Link>
          <Link >Çıkış Yap</Link>
        </div>
      </div>
    </header>)
  } else if (sessionStorage.getItem("hotelManagerProfile")) {
    return (<header>
      <div className="container">
      <div className="logo"><Link to={"/"}>PLAIDESSA</Link></div>
        <div className="links">
          <Link  to={"/"}>Ana Sayfa</Link>
          <Link to={"/list"}>Oteller</Link>
          <Link >Otel Yönetici Pabel</Link>
          <Link >Çıkış Yap</Link>
        </div>
      </div>
    </header>)
  }
  return (
    
    <header>
      <div className="container">
      <div className="logo"><Link to={"/"}>PLAIDESSA</Link></div>
        <div className="links">
          <Link to={"/"}>Ana Sayfa</Link>
          <Link to={"/list"}>Oteller</Link>
          <Link to={"/user/login"}>Giriş Yap</Link>
          <Link >Kaydol</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
