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
  const [loading, setLoading] = useState(true);

  let checkIn = new Date(reservation.checkIn);
  const formattedCheckIn = checkIn.toLocaleDateString("en-US", {
    timeZone: "UTC",
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  let checkOut = new Date(reservation.checkOut);
  const formattedCheckOut = checkOut.toLocaleDateString("en-US", {
    timeZone: "UTC",
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  useEffect(() => {
    const getData = async () => {
      const hotelRes = await getHotel(reservation.hotelId);
      setHotel(hotelRes.data.data);
      console.log(hotelRes.data.data);
      const roomRes = await getRoom(reservation.roomId);
      setRoom(roomRes.data.data);
      console.log(roomRes.data.data);
      setLoading(false);
    };

    getData();
  }, []);
  if (loading) {
    return <div>Yükleniyor...</div>;
  }
  return (
    <div style={{ marginTop: "40px" }}>
      <div className="row">
        <div className="col-4">
          <Swiper modules={[Autoplay]} autoplay={{ delay: 2500 }}>
            {room.images.map((image, index) => (
              <SwiperSlide className="roomSlide" key={index}>
                <img src={image} alt="" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="col-4">
          <div className="reservationDetail">
            <h1>{hotel.hotelName}</h1>
            <p>
              <span>Oda Açıklaması : </span>
              {room.description}
            </p>
            <p>
              <span>CheckIn :</span> {formattedCheckIn}{" "}
              <span>/ CheckOut :</span> {formattedCheckOut}
            </p>
            <p>
              <span>Toplam Fiyat :</span> {reservation.totalCharge}
            </p>
            <p>
              <span>Kişi Sayısı :</span> {reservation.numberOfPeople}
            </p>
          </div>
        </div>
        <div
          className="col-4"
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="confirmationStatus">
            {reservation.confirmation === true && (
              <>
                <div className="confirmBox confirmed">
                  <h1>Onaylandı!</h1>
                </div>
              </>
            )}
            {reservation.confirmation === false && (
              <>
                <div className="confirmBox unconfirmed">
                  <h1>Onaylanmadı!</h1>
                </div>
              </>
            )}
            {reservation.confirmation === null && (
              <>
                <div className="confirmBox waiting">
                  <h1>Onay Bekleniyor...</h1>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationCard;
