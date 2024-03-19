/* eslint-disable react-hooks/exhaustive-deps */
import "./MakeReservation.css";
import Hero from "../../components/Hero/Hero";
import React from "react";
import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import { useParams, useNavigate } from "react-router-dom";
import { getHotel, getRoom } from "../../api/hotelApi";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { jwtDecode } from "jwt-decode";
import { addReservation } from "../../api/reservationApi";
const MakeReservation = () => {
  const { id } = useParams();
  const [room, setRoom] = useState();
  const [hotel, setHotel] = useState();
  const [hotelId, setHotelId] = useState();
  const [roomId, setRoomId] = useState();
  const [loading, setLoading] = useState(true);

  const [numberOfPeople, setNumberOfPeople] = useState();
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();
  const [totalCharge, setTotalCharge] = useState(null);
  const [capacityOptions, setCapacityOptions] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const roomRes = await getRoom(id);
      setRoom(roomRes.data.data);
      setRoomId(roomRes.data.data._id);
      const capacities = Array.from(
        { length: roomRes.data.data.capacity },
        (_, index) => index + 1
      );
      setCapacityOptions(capacities);
      const hotelRes = await getHotel(roomRes.data.data.hotelId);
      setHotel(hotelRes.data.data);
      setHotelId(hotelRes.data.data._id);

      setLoading(false);
    };

    getData();
  }, []);

  useEffect(() => {
    if (checkIn && checkOut && numberOfPeople) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);

      const differenceInTime = checkOutDate.getTime() - checkInDate.getTime();
      const differenceInDays = differenceInTime / (1000 * 3600 * 24);

      setTotalCharge(differenceInDays * room.pricePerNight * numberOfPeople);
    }
  }, [checkIn, checkOut, numberOfPeople]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = await jwtDecode(sessionStorage.getItem("userProfile")).id;
    const token = sessionStorage.getItem("userProfile");

    const reservation = {
      userId,
      hotelId,
      roomId,
      numberOfPeople,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      totalCharge,
    };

    await addReservation(reservation, token);

    navigate("/user/reservations");
  };

  if (loading) {
    return <div>Yükleniyor..</div>;
  }
  return (
    <div className="row" style={{ "--bs-gutter-x": "0" }}>
      <Header isNotMenu />
      <Hero
        width={50}
        height={100}
        title={"Rezervasyon Yap"}
        description={hotel.hotelName}
      />
      <div className="col-6">
        <div className="addReservation">
          <Swiper
            className="addReservationSlide"
            modules={[Autoplay]}
            autoplay={{ delay: 2500 }}
          >
            {room.images.map((image, index) => (
              <SwiperSlide className="roomSlide" key={index}>
                <img src={image} alt="" />
              </SwiperSlide>
            ))}
          </Swiper>
          <p>
            <span>Otel Adı : </span> {hotel.hotelName}
          </p>
          <p>
            <span>Oda Açıklama : </span> {room.description}{" "}
          </p>
          <p>
            <span>Gecelik Ücret : </span> {room.pricePerNight}
          </p>
          <div className="reservationInputs">
            <form onSubmit={handleSubmit} className="reservationForm">
              <label htmlFor="numberOfPeople">Kişi Sayısı</label>
              <select
                name="numberOfPeople"
                id=""
                onChange={(e) => {
                  setNumberOfPeople(e.target.value);
                  console.log(e.target.value);
                }}
              >
                <option value="" selected disabled hidden></option>
                {capacityOptions.map((capacity, index) => (
                  <option value={capacity}>{capacity}</option>
                ))}
              </select>
              <label htmlFor="checkIn">Check-in Date:</label>
              <input
                type="date"
                id="checkIn"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                required
              />

              <label htmlFor="checkOut">Check-out Date:</label>
              <input
                type="date"
                id="checkOut"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                required
              />

              {totalCharge !== null && (
                <label style={{ marginTop: "40px" }} htmlFor="">
                  Toplam Ücret : {totalCharge}
                </label>
              )}

              <button className="btn-addReservation">Rezervasyon Yap</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakeReservation;
