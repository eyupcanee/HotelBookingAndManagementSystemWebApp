/* eslint-disable react-hooks/exhaustive-deps */
import "./UserReservations.css";
import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import Footer from "../../components/Footer/Footer";
import ReservationCard from "../../components/ReservationCard/ReservationCard";
import { useEffect, useState } from "react";
import { getReservatşonsByUser } from "../../api/reservationApi";
import { jwtDecode } from "jwt-decode";
import Title from "../../components/Title/Title";
const UserReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = sessionStorage.getItem("userProfile");

  useEffect(() => {
    const getData = async () => {
      const userId = await jwtDecode(sessionStorage.getItem("userProfile")).id;
      const result = await getReservatşonsByUser(userId, token);

      setReservations(result.data.data);

      console.log(result.data.data);

      setLoading(false);
    };

    getData();
  }, []);

  if (loading) {
    <div>Yükleniyor...</div>;
  }
  return (
    <>
      <Header />
      <Hero
        title={"Rezervasyonlarım"}
        description={
          "Onaylanan, onaylanmayan veya onay bekleyen rezervasyonlarınızı burada görüntüleyebilrisiniz."
        }
        width={100}
        height={70}
      />
      <div
        className="container"
        style={{ marginTop: "40px", marginBottom: "40px" }}
      >
        {reservations && reservations.length > 0 ? (
          <></>
        ) : (
          <div
            className="center-title"
            style={{
              textAlign: "center",
              marginBottom: "200px",
              marginTop: "200px",
            }}
          >
            <Title
              title={"Rezervasyon Bulunamadı :("}
              description={
                "Herhangi bir rezervasyon yaptırmadınız. Rezervasyon yaptırmak için oteller sayfasını ziyaret ediniz."
              }
            />
          </div>
        )}
        {reservations.map((reservation, index) => {
          return (
            <>
              <ReservationCard reservation={reservation} />
            </>
          );
        })}
      </div>
      <Footer />
    </>
  );
};

export default UserReservations;
