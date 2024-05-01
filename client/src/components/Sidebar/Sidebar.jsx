import "./Sidebar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HotelIcon from "@mui/icons-material/Hotel";
import GroupIcon from "@mui/icons-material/Group";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import SingleBedIcon from "@mui/icons-material/SingleBed";
import DoneIcon from "@mui/icons-material/Done";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import { useContext } from "react";

const Sidebar = () => {
  const { logoutAdminAuth, logoutHotelManagerAuth } = useContext(AuthContext);
  const handleLogoutAdmin = async (event) => {
    event.preventDefault();

    await logoutAdminAuth(sessionStorage.getItem("adminProfile"));
  };

  const handleLogoutHotelManager = async (event) => {
    event.preventDefault();
    await logoutHotelManagerAuth(sessionStorage.getItem("hotelManagerProfile"));
  };

  if (sessionStorage.getItem("adminProfile")) {
    return (
      <div className="sidebar">
        <div className="top">
          <span className="logo">PLAIDESSA</span>
        </div>
        <hr />
        <div className="center">
          <ul>
            <p className="title">GENEL</p>
            <Link to={"/admin/dashboard"}>
              <DashboardIcon className="icon" />
              <span>Kontrol Paneli</span>
            </Link>
            <p className="title">YÖNETİM</p>
            <Link to={"/admin/users"}>
              <GroupIcon className="icon" />
              <span>Kullanıcılar</span>
            </Link>
            <Link to={"/admin/adduser"}>
              <AddIcon className="icon" />
              <span>Kullanıcı Ekle</span>
            </Link>
            <Link to={"/admin/hotelmanagers"}>
              <ManageAccountsIcon className="icon" />
              <span>Otel Yöneticileri</span>
            </Link>
            <Link to={"/admin/addhotelmanager"}>
              <AddIcon className="icon" />
              <span>Otel Yöneticisi Ekle</span>
            </Link>
            <Link to={"/admin/hotels"}>
              <HotelIcon className="icon" />
              <span>Oteller</span>
            </Link>
            <Link to={"/admin/reservations"}>
              <AccessTimeIcon className="icon" />
              <span>Rezervasyonlar</span>
            </Link>
            <p className="title">SİSTEM</p>
            <Link onClick={handleLogoutAdmin}>
              <LogoutIcon className="icon" />
              <span>Çıkış Yap</span>
            </Link>
          </ul>
        </div>
        <div className="bottom">
          <div className="color-option"></div>
          <div className="color-option"></div>
        </div>
      </div>
    );
  } else if (sessionStorage.getItem("hotelManagerProfile")) {
    return (
      <div className="sidebar">
        <div className="top">
          <span className="logo">PLAIDESSA</span>
        </div>
        <hr />
        <div className="center">
          <ul>
            <p className="title">GENEL</p>
            <Link to={"/hotelmanager/dashboard"}>
              <DashboardIcon className="icon" />
              <span>Kontrol Paneli</span>
            </Link>
            <p className="title">YÖNETİM</p>
            <Link to={"/hotelmanager/hotels"}>
              <HotelIcon className="icon" />
              <span>Oteller</span>
            </Link>
            <Link to={"/hotelmanager/addhotel"}>
              <AddIcon className="icon" />
              <span>Otel Ekle</span>
            </Link>
            <Link to={"/hotelmanager/rooms"}>
              <SingleBedIcon className="icon" />
              <span>Odalar</span>
            </Link>
            <Link to={"/hotelmanager/addroom"}>
              <AddIcon className="icon" />
              <span>Oda Ekle</span>
            </Link>
            <Link to={"/hotelmanager/reservations"}>
              <AccessTimeIcon className="icon" />
              <span>Rezervasyonlar</span>
            </Link>
            <Link to={"/hotelmanager/confirmreservation"}>
              <DoneIcon className="icon" />
              <span>Onay Bekleyen Rezervasyonlar</span>
            </Link>
            <p className="title">SİSTEM</p>
            <Link onClick={handleLogoutHotelManager}>
              <LogoutIcon className="icon" />
              <span>Çıkış Yap</span>
            </Link>
          </ul>
        </div>
        <div className="bottom">
          <div className="color-option"></div>
          <div className="color-option"></div>
        </div>
      </div>
    );
  }
  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">PLAIDESSA</span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">GENEL</p>
          <Link>
            <DashboardIcon className="icon" />
            <span>Kontrol Paneli</span>
          </Link>
          <p className="title">YÖNETİM</p>
          <Link>
            <GroupIcon className="icon" />
            <span>Kullanıcılar</span>
          </Link>
          <Link>
            <ManageAccountsIcon className="icon" />
            <span>Otel Yöneticileri</span>
          </Link>
          <Link>
            <HotelIcon className="icon" />
            <span>Oteller</span>
          </Link>
          <Link>
            <AccessTimeIcon className="icon" />
            <span>Rezervasyonlar</span>
          </Link>
          <p className="title">SİSTEM</p>
          <Link>
            <LogoutIcon className="icon" />
            <span>Çıkış Yap</span>
          </Link>
        </ul>
      </div>
      <div className="bottom">
        <div className="color-option"></div>
        <div className="color-option"></div>
      </div>
    </div>
  );
};

export default Sidebar;
