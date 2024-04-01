import "./Navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import PublicIcon from "@mui/icons-material/Public";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useState, useEffect } from "react";
import { getAdmin } from "../../api/adminApi";
import { getHotelManager } from "../../api/hotelManagerApi";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const [admin, setAdmin] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      if (sessionStorage.getItem("adminProfile")) {
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
        setAdmin(result.data.data);
        setLoading(false);
      }
      setLoading(false);
    };

    getData();
  }, []);

  if (loading) {
    return <>Yükleniyor...</>;
  }
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search-tab">
          <input type="text" placeholder="Ara" />
          <SearchIcon className="icon" />
        </div>
        <div className="items">
          <div className="item">
            <PublicIcon />
            Türkçe
          </div>
          <div className="item">
            <DarkModeOutlinedIcon />
          </div>
          <div className="item">
            {admin.firstName} {admin.lastName}
          </div>
          <div className="item">
            <img src={admin.profilePicture} alt="" className="avatar" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
