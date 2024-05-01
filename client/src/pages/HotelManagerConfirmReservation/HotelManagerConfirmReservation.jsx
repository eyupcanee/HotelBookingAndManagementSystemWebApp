import "./HotelManagerConfirmReservation.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Datatable from "../../components/Datatable/Datatable";
import { useEffect, useState } from "react";
import { getAllReservationsByManagerAndUnconfirmed } from "../../api/reservationApi";
import { jwtDecode } from "jwt-decode";

const HotelManagerConfirmReservation = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const id = await jwtDecode(sessionStorage.getItem("hotelManagerProfile"))
        .id;
      const result = await getAllReservationsByManagerAndUnconfirmed(
        id,
        sessionStorage.getItem("hotelManagerProfile")
      );
      setReservations(result.data.data);
      console.log(result.data.data);
      console.log(result.data);
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
        <h2 style={{ padding: "20px", paddingBottom: "0" }}>Rezervasyonlar</h2>
        {reservations && reservations.length > 0 ? (
          <Datatable data={reservations} dataInfo={"reservationmanager"} />
        ) : (
          <div>Rezervasyon Bulunmadı!</div>
        )}
      </div>
    </div>
  );
};

export default HotelManagerConfirmReservation;
