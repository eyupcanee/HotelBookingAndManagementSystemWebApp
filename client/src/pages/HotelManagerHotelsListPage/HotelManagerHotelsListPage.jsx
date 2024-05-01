import "./HotelManagerHotelsListPage.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Datatable from "../../components/Datatable/Datatable";
import { useEffect, useState } from "react";
import { getAllHotelsByManager } from "../../api/hotelApi";
import { jwtDecode } from "jwt-decode";

const HotelManagerHotelsListPage = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const id = await jwtDecode(sessionStorage.getItem("hotelManagerProfile"))
        .id;
      const result = await getAllHotelsByManager(id);

      setHotels(result.data.data);

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
        {hotels && hotels.length > 0 ? (
          <Datatable data={hotels} dataInfo={"hotel"} />
        ) : (
          <div>Otel Bulunmadı!</div>
        )}
      </div>
    </div>
  );
};

export default HotelManagerHotelsListPage;
