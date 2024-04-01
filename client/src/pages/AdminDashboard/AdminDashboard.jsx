import "./AdminDashboard.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import ChangeWidget from "../../components/ChangeWidget/ChangeWidget";
import Featured from "../../components/Featured/Featured";
import Chart from "../../components/Chart/Chart";

const AdminDashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-container">
        <Navbar />
        <div className="widgets">
          <ChangeWidget type="user" />
          <ChangeWidget type="hotelmanager" />
          <ChangeWidget type="hotel" />
          <ChangeWidget type="reservation" />
        </div>
        <div className="charts">
          <Featured />
          <Chart />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
