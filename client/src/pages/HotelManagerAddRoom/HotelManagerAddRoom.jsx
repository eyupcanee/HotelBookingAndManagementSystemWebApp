import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { getAllHotelsByManager } from "../../api/hotelApi.js";
import { getFacilities } from "../../api/hotelApi.js";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router";
import { addRoom } from "../../api/roomApi.js";

const HotelManagerAddRoom = () => {
  const [selectedHotel, setSelectedHotel] = useState("");
  const [facilities, setFacilities] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = sessionStorage.getItem("hotelManagerProfile");

  useEffect(() => {
    const getData = async () => {
      const id = await jwtDecode(sessionStorage.getItem("hotelManagerProfile"))
        .id;
      const result = await getAllHotelsByManager(id);

      setHotels(result.data.data);

      const facilitesResult = await getFacilities();

      setFacilities(facilitesResult.data.data);

      setLoading(false);
    };

    getData();
  }, []);

  const handleSelectChange = (event) => {
    const selectedHotelId = event.target.value;
    setSelectedHotel(selectedHotelId);
    setFormData((prevFormData) => ({
      ...prevFormData,
      hotelId: selectedHotelId.toString(),
    }));
  };

  const [formData, setFormData] = useState({
    hotelId: "",
    description: "",
    pricePerNight: "",
    capacity: "",
    images: [],
    facilities: [],
  });

  const handleInputChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      setSelectedValues([...selectedValues, value]);
      console.log(selectedValues);
    } else {
      setSelectedValues(selectedValues.filter((item) => item !== value));
      console.log(selectedValues);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();

    if (e.target.name === "images") {
      setFormData({ ...formData, images: e.target.files });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        !formData.description ||
        !formData.pricePerNight ||
        !formData.facilities ||
        !formData.images ||
        !formData.capacity
      ) {
        throw new Error("Lütfen tüm alanları doldurun.");
      }
      console.log(selectedValues);
      const formDataToSend = new FormData();
      formDataToSend.append("hotelId", formData.hotelId);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("pricePerNight", formData.pricePerNight);
      formDataToSend.append("capacity", formData.capacity);

      const imagesArray = Array.from(formData.images);

      imagesArray.forEach((image) => {
        formDataToSend.append(`images[]`, image);
      });

      selectedValues.forEach((value) => {
        formDataToSend.append("facilities[]", value);
      });
      console.log(formDataToSend);
      await addRoom(formDataToSend, token);

      navigate("/hotelmanager/hotels");
    } catch (error) {
      console.log(formData.hotelId);
      console.log(error);
      console.log(formData);
    }
  };

  if (loading) {
    return <>Yükleniyor...</>;
  }
  return (
    <div className="admin-list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <h2 style={{ padding: "20px", paddingBottom: "0" }}>Oda Ekle</h2>

        <h3 style={{ marginLeft: "20px" }}>
          Oda Eklemek İstediğiniz Oteli Seçiniz!
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

        {selectedHotel != null && selectedHotel !== "" ? (
          <form
            onSubmit={handleSubmit}
            action="submit"
            style={{ marginTop: "-100px" }}
            className="register-form"
          >
            <label htmlFor="description">Oda Açıklaması</label>
            <input
              type="text"
              name="description"
              onChange={handleChange}
              required
            />

            <label htmlFor="pricePerNight">Gecelik Ücret</label>
            <input
              type="text"
              name="pricePerNight"
              onChange={handleChange}
              required
            />

            <label htmlFor="capacity">Kapasite</label>
            <input
              type="text"
              name="capacity"
              onChange={handleChange}
              required
            />

            <div className="addhotelpage-facility">
              <label htmlFor="">İmkanlar</label>

              <div className="addhotelpage-facilities">
                {facilities.map((facility) => {
                  return (
                    <>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          marginLeft: "60px",
                          marginTop: "20px",
                        }}
                      >
                        <label htmlFor="">{facility.facilityName}</label>
                        <input
                          type="checkbox"
                          value={facility._id}
                          onChange={handleInputChange}
                          checked={selectedValues.includes(facility._id)}
                        />
                      </div>
                    </>
                  );
                })}
              </div>
            </div>

            <label style={{ marginTop: "30px" }} htmlFor="images">
              Otel Fotoğrafları
            </label>
            <input
              id="images"
              type="file"
              name="images"
              accept="image/*"
              onChange={handleChange}
              required
              multiple
            />
            <label className="fileInput" name="images" htmlFor="images">
              Fotoğraf Seç
            </label>
            <button type="submit">Ekle</button>
          </form>
        ) : (
          <div
            style={{ marginLeft: "20px", marginTop: "40px", fontSize: "2rem" }}
          >
            Oda eklemek için bir otel seçmelisiniz!
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelManagerAddRoom;
