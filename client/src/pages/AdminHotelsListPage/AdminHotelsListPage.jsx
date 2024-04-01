import "./AdminHotelsListPage.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Datatable from "../../components/Datatable/Datatable";
import { useEffect, useState } from "react";
import { getAllHotels } from "../../api/hotelApi";

const AdminHotelsListPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const result = await getAllHotels();
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
        <h2 style={{ padding: "20px", paddingBottom: "0" }}>Oteller</h2>
        <Datatable data={users} />
      </div>
    </div>
  );
};

export default AdminHotelsListPage;
