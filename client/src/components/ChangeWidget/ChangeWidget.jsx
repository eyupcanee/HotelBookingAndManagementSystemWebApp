import "./ChangeWidget.css";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import HotelIcon from "@mui/icons-material/Hotel";
import GroupIcon from "@mui/icons-material/Group";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const ChangeWidget = ({ type }) => {
  if (type === "user") {
    return (
      <div className="widget">
        <div className="left">
          <span className="title">Kullanıcılar</span>
          <span className="counter">100</span>
          <span className="see-all">Görüntüle</span>
        </div>
        <div className="right">
          <div className="percentage positive">
            <KeyboardArrowUpOutlinedIcon />
            20%
          </div>
          <GroupIcon className="icon" />
        </div>
      </div>
    );
  } else if (type === "hotelmanager") {
    return (
      <div className="widget">
        <div className="left">
          <span className="title">Otel Yöneticileri</span>
          <span className="counter">80</span>
          <span className="see-all">Görüntüle</span>
        </div>
        <div className="right">
          <div className="percentage positive">
            <KeyboardArrowUpOutlinedIcon />
            20%
          </div>
          <ManageAccountsIcon className="icon" />
        </div>
      </div>
    );
  } else if (type === "hotel") {
    return (
      <div className="widget">
        <div className="left">
          <span className="title">Oteller</span>
          <span className="counter">30</span>
          <span className="see-all">Görüntüle</span>
        </div>
        <div className="right">
          <div className="percentage positive">
            <KeyboardArrowUpOutlinedIcon />
            10%
          </div>
          <HotelIcon className="icon" />
        </div>
      </div>
    );
  } else if (type === "reservation") {
    return (
      <div className="widget">
        <div className="left">
          <span className="title">Rezervasyonlar</span>
          <span className="counter">240</span>
          <span className="see-all">Görüntüle</span>
        </div>
        <div className="right">
          <div className="percentage positive">
            <KeyboardArrowUpOutlinedIcon />
            40%
          </div>
          <AccessTimeIcon className="icon" />
        </div>
      </div>
    );
  }
  return (
    <div className="widget">
      <div className="left">
        <span className="title">Kullanıcılar</span>
        <span className="counter">100</span>
        <span className="see-all">Görüntüle</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpOutlinedIcon />
          20%
        </div>
        <GroupIcon className="icon" />
      </div>
    </div>
  );
};

export default ChangeWidget;
