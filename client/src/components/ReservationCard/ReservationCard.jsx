/* eslint-disable react-hooks/exhaustive-deps */
import "./ReservationCard.css";
import "swiper/css";
import { getHotel, getRoom } from "../../api/hotelApi";
import { useEffect, useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
const ReservationCard = ({ reservation }) => {
  const [hotel, setHotel] = useState();
  const [room, setRoom] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getData = async () => {
      const hotelRes = await getHotel(reservation.hotelId);
      setHotel(hotelRes);
      const roomRes = await getRoom(reservation.roomId);
      setRoom(roomRes);

      setLoading(false);
    };

    getData();
  }, []);
  return (
    <>
      <div className="row">
        <div className="col4">
          <Swiper modules={[Autoplay]} autoplay={{ delay: 2500 }}>
            {room.images.map((image, index) => (
              <SwiperSlide key={index}>
                <img src={image} alt="" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="col-4">
          <h1>{hotel.hotelName}</h1>
          <p>Oda Açıklaması : {room.description}</p>
          <p>
            CheckIn : {reservation.checkIn} / CheckOut : {reservation.checkOut}
          </p>
          <p>
            Toplam Fiyat : <span>{reservation.totalCharge}</span>
          </p>
          <p>
            Kişi Sayısı : <span>{reservation.numberOfPeople}</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default ReservationCard;
