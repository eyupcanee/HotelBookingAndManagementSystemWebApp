import "./Header.css";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { getUserAsUser } from "../../api/userApi";
import { getAdmin } from "../../api/adminApi";
import { getHotelManager } from "../../api/hotelManagerApi";
import { jwtDecode } from "jwt-decode";

const Header = ({ isNotMenu }) => {
  const { logoutUserAuth, logoutAdminAuth, logoutHotelManagerAuth } =
    useContext(AuthContext);
  const [user, setUser] = useState();
  const [admin, setAdmin] = useState();
  const [hotelManager, setHotelManager] = useState();
  const [loading, setLoading] = useState(true);
  const handleLogoutUser = async (event) => {
    event.preventDefault();

    await logoutUserAuth(sessionStorage.getItem("userProfile"));
  };

  const handleLogoutAdmin = async (event) => {
    event.preventDefault();

    await logoutAdminAuth(sessionStorage.getItem("adminProfile"));
  };

  const handleLogoutHotelManager = async (event) => {
    event.preventDefault();
    await logoutHotelManagerAuth(sessionStorage.getItem("hotelManagerProfile"));
  };

  useEffect(() => {
    const getData = async () => {
      if (sessionStorage.getItem("userProfile")) {
        const id = await jwtDecode(sessionStorage.getItem("userProfile")).id;
        const result = await getUserAsUser(
          id,
          sessionStorage.getItem("userProfile")
        );
        setUser(result.data.data);
        setLoading(false);
      } else if (sessionStorage.getItem("adminProfile")) {
        const id = await jwtDecode(sessionStorage.getItem("adminProfile")).id;
        const result = await getAdmin(
          id,
          sessionStorage.getItem("adminProfile")
        );
        setAdmin(result.data.data);
        setLoading(false);
      } else if (sessionStorage.getItem("hotelManagerProfile")) {
        const id = await jwtDecode(
          sessionStorage.getItem("hotelManagerProfile")
        ).id;
        const result = await getHotelManager(
          id,
          sessionStorage.getItem("hotelManagerProfile")
        );
        setHotelManager(result.data.data);
        setLoading(false);
      }
      setLoading(false);
    };

    getData();
  }, []);
  if (loading) {
    return <div>Yükleniyor...</div>;
  } else if (isNotMenu) {
    return (
      <header>
        <div className="container">
          <div className="logo">
            <Link to={"/"}>PLAIDESSA</Link>
          </div>
        </div>
      </header>
    );
  } else if (sessionStorage.getItem("userProfile")) {
    return (
      <header>
        <div className="container">
          <div className="logo">
            <Link to={"/"}>PLAIDESSA</Link>
          </div>
          <div className="links">
            <div className="user-link">
              <p>Hoşgeldin {user.firstName} |</p>
            </div>
            <Link to={"/"}>Ana Sayfa</Link>
            <Link to={"/list"}>Oteller</Link>
            <Link to={"/user/reservations"}>Rezervasyonlarım</Link>
            <Link onClick={handleLogoutUser}>Çıkış Yap</Link>
            <img src={user.profilePicture} alt="" />
          </div>
        </div>
      </header>
    );
  } else if (sessionStorage.getItem("adminProfile")) {
    return (
      <header>
        <div className="container">
          <div className="logo">
            <Link to={"/"}>PLAIDESSA</Link>
          </div>
          <div className="links">
            <div className="user-link">
              <p>Hoşgeldin {admin.firstName} |</p>
            </div>
            <Link to={"/"}>Ana Sayfa</Link>
            <Link to={"/list"}>Oteller</Link>
            <Link to={"/admin/dashboard"}>Admin Panel</Link>
            <Link onClick={handleLogoutAdmin}>Çıkış Yap</Link>
            <img src={admin.profilePicture} alt="" />
          </div>
        </div>
      </header>
    );
  } else if (sessionStorage.getItem("hotelManagerProfile")) {
    return (
      <header>
        <div className="container">
          <div className="logo">
            <Link to={"/"}>PLAIDESSA</Link>
          </div>
          <div className="links">
            <div className="user-link">
              <p>Hoşgeldin {hotelManager.firstName} |</p>
            </div>
            <Link to={"/"}>Ana Sayfa</Link>
            <Link to={"/list"}>Oteller</Link>
            <Link to={"/hotelmanager/dashboard"}>Otel Yönetici Panel</Link>
            <Link onClick={handleLogoutHotelManager}>Çıkış Yap</Link>
            <img src={hotelManager.profilePicture} alt="" />
          </div>
        </div>
      </header>
    );
  }
  return (
    <header>
      <div className="container">
        <div className="logo">
          <Link to={"/"}>PLAIDESSA</Link>
        </div>
        <div className="links">
          <Link to={"/"}>Ana Sayfa</Link>
          <Link to={"/list"}>Oteller</Link>
          <Link to={"/login"}>Giriş Yap</Link>
          <Link to="/register">Kaydol</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
