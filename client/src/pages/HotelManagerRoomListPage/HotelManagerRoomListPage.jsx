import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { getAllHotelsByManager } from "../../api/hotelApi.js";
import { getRoomsByHotel } from "../../api/hotelApi";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Datatable from "../../components/Datatable/Datatable";

const HotelManagerRoomListPage = () => {
  const [selectedHotel, setSelectedHotel] = useState();
  const [rooms, setRooms] = useState([]);
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

  useEffect(() => {
    const getData = async () => {
      if (selectedHotel != null && selectedHotel !== "") {
        const result = await getRoomsByHotel(selectedHotel);

        setRooms(result.data.data);
      } else {
        setRooms(null);
      }
    };

    getData();
  }, [selectedHotel]);

  const handleSelectChange = (event) => {
    setSelectedHotel(event.target.value);
  };

  if (loading) {
    return <>Yükleniyor...</>;
  }
  return (
    <div className="admin-list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <h2 style={{ padding: "20px", paddingBottom: "0" }}>Odalar</h2>

        <h3 style={{ marginLeft: "20px" }}>
          Odalarını görüntülemek istediğiniz oteli seçiniz.
        </h3>
        <select
          style={{
            marginLeft: "20px",
            padding: " 5px 20px",
            border: "1px solid black",
            fontWeight: "600",
            fontSize: "1rem",
            borderRadius: "6px",
          }}
          value={selectedHotel}
          onChange={handleSelectChange}
        >
          <option value="">Lütfen Otel Seçiniz</option>
          {hotels.map((hotel) => (
            <option value={hotel._id}>{hotel.hotelName}</option>
          ))}
        </select>

        {rooms && rooms.length > 0 ? (
          <Datatable data={rooms} dataInfo={"hotel"} />
        ) : (
          <div
            style={{ marginLeft: "20px", marginTop: "40px", fontSize: "2rem" }}
          >
            Otel seçmediniz veya seçtiğiniz otelin hiç odası yok.
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelManagerRoomListPage;
