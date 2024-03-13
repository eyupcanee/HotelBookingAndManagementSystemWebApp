import "./Header.css";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import { useContext } from "react";
const Header = () => {
  const {logoutUserAuth} = useContext(AuthContext);
  
  const handleLogoutUser = async (event) => {
    event.preventDefault();

    await logoutUserAuth(sessionStorage.getItem("userProfile"));
  }


  if(sessionStorage.getItem("userProfile")) {
    return (<header>
      <div className="container">
        <div className="logo">PLAIDESSA</div>
        <div className="links">
          <Link to={"/"}>Ana Sayfa</Link>
          <Link to={"/list"}>Oteller</Link>
          <Link >Rezervasyonlarım</Link>
          <Link onClick={handleLogoutUser}>Çıkış Yap</Link>
        </div>
      </div>
    </header>)
  } else if (sessionStorage.getItem("adminProfile")) {
    return (<header>
      <div className="container">
        <div className="logo">PLAIDESSA</div>
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
        <div className="logo">PLAIDESSA</div>
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
        <div className="logo">PLAIDESSA</div>
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
