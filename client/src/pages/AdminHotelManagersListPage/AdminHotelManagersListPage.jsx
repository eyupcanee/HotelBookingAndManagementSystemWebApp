import "./AdminHotelManagersListPage.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Datatable from "../../components/Datatable/Datatable";
import { useEffect, useState } from "react";
import { getAllHotelManagers } from "../../api/hotelManagerApi";

const AdminHotelManagersListPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const result = await getAllHotelManagers(
        sessionStorage.getItem("adminProfile")
      );
      setUsers(result.data.data);
      console.log(result.data.data);
      setLoading(false);
    };

    getData();
  }, []);
  if (loading) {
    return <>Yükleniyor...</>;
  }
  return (
    <div className="admin-list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <h2 style={{ padding: "20px", paddingBottom: "0" }}>
          Otel Yöneticileri
        </h2>
        <Datatable data={users} dataInfo={"hotelmanager"} />
      </div>
    </div>
  );
};

export default AdminHotelManagersListPage;
