/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "./HotelManagerAddHotelPage.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import { getFacilities, addHotel } from "../../api/hotelApi";

const HotelManagerAddHotelPage = () => {
  const [selectedValues, setSelectedValues] = useState([]);
  const navigate = useNavigate();
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = sessionStorage.getItem("hotelManagerProfile");
  useEffect(() => {
    const getData = async () => {
      const result = await getFacilities();
      console.log(result);
      setFacilities(result.data.data);
      console.log(result.data.data);
      console.log(facilities);
      setLoading(false);
    };

    getData();
  }, []);

  const [formData, setFormData] = useState({
    hotelName: "",
    description: "",
    country: "",
    city: "",
    district: "",
    addressDetail: "",
    phoneNumber: "",
    averagePrice: "",
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
      console.log(formData.images);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        !formData.hotelName ||
        !formData.description ||
        !formData.country ||
        !formData.city ||
        !formData.description ||
        !formData.addressDetail ||
        !formData.phoneNumber ||
        !formData.averagePrice ||
        !formData.images ||
        !formData.facilities
      ) {
        throw new Error("Lütfen tüm alanları doldurun.");
      }
      console.log(selectedValues);
      const formDataToSend = new FormData();
      formDataToSend.append("hotelName", formData.hotelName);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("country", formData.country);
      formDataToSend.append("city", formData.city);
      formDataToSend.append("district", formData.district);
      formDataToSend.append("addressDetail", formData.addressDetail);
      formDataToSend.append("phoneNumber", formData.phoneNumber);
      formDataToSend.append("averagePrice", formData.averagePrice);

      const imagesArray = Array.from(formData.images);

      imagesArray.forEach((image, index) => {
        formDataToSend.append(`image${index}`, image);
      });

      selectedValues.forEach((value) => {
        formDataToSend.append("facilities[]", value);
      });

      await addHotel(formDataToSend, token);

      navigate("/hotelmanager/hotels");
    } catch (error) {
      console.log(error);
      console.log(formData);
    }
  };
  if (loading) {
    return "Yükleniyor...";
  }
  return (
    <div className="admin-list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <h2 style={{ paddingLeft: "20px" }}>Otel Ekle</h2>
        <form
          onSubmit={handleSubmit}
          action="submit"
          style={{ marginTop: "-100px" }}
          className="register-form"
        >
          <label htmlFor="hotelName">Otel Adı</label>
          <input
            type="text"
            name="hotelName"
            onChange={handleChange}
            required
          />

          <label htmlFor="description">Açıklama</label>
          <input
            type="text"
            name="description"
            onChange={handleChange}
            required
          />

          <label htmlFor="country">Ülke</label>
          <input type="text" name="country" onChange={handleChange} required />

          <label htmlFor="city">Şehir</label>
          <input type="text" name="city" onChange={handleChange} required />

          <label htmlFor="district">İlçe</label>
          <input type="text" name="district" onChange={handleChange} required />

          <label htmlFor="addressDetail">Adres Detayı</label>
          <input
            type="text"
            name="addressDetail"
            onChange={handleChange}
            required
          />

          <label htmlFor="phoneNumber">Telefon Numarası</label>
          <input
            type="text"
            name="phoneNumber"
            onChange={handleChange}
            required
          />

          <label htmlFor="averagePrice">Ortalama Fiyat</label>
          <input
            type="text"
            name="averagePrice"
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
      </div>
    </div>
  );
};

export default HotelManagerAddHotelPage;
