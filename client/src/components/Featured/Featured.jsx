import "./Featured.css";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

const Featured = () => {
  return (
    <div className="featured">
      <div className="top">
        <h2>Toplam Ziyaretçi</h2>
        <MoreVertOutlinedIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featured-chart">
          <CircularProgressbar
            value={70}
            text={"70%"}
            strokeWidth={5}
            styles={buildStyles({
              pathColor: `#ffda85`,
              textColor: "#ffda85",
            })}
          />
        </div>
        <p className="title">Bugünkü toplam ziyaretçi sayısı</p>
        <p className="amount">158</p>
        <div className="summary">
          <div className="item">
            <div className="item-title">Hedef</div>
            <div className="item-result negative">
              <KeyboardArrowDownOutlinedIcon fontSize="small" />
              <div className="result-amount">120</div>
            </div>
          </div>
          <div className="item">
            <div className="item-title">Dün</div>
            <div className="item-result positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="result-amount">260</div>
            </div>
          </div>
          <div className="item">
            <div className="item-title">Geçen Gün</div>
            <div className="item-result positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="result-amount">295</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
