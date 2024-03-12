import React from "react";
import "./Card.css";
import { useNavigate, Link } from "react-router-dom";

const Card = ({ hotel, page }) => {
  const navigate = useNavigate();
  if (page === "list") {
    return (
      <>
        <div className="card">
          <img src={hotel.images[0]} alt="" />
          <Link className="link" to={`/hotel/${hotel._id}`}>
            <div className="card-content">
              <h2>{hotel.hotelName}</h2>
              <p>{hotel.description}</p>
              <p className="price">Ortalama Fiyat : {hotel.averagePrice}</p>
              <p className="phone">
                +90{" "}
                {hotel.phoneNumber[0] +
                  hotel.phoneNumber[1] +
                  hotel.phoneNumber[2] +
                  " " +
                  hotel.phoneNumber[3] +
                  hotel.phoneNumber[4] +
                  hotel.phoneNumber[5] +
                  " " +
                  hotel.phoneNumber[6] +
                  hotel.phoneNumber[7] +
                  " " +
                  hotel.phoneNumber[8] +
                  hotel.phoneNumber[9]}{" "}
              </p>
              <p className="location">
                {hotel.country[0].toUpperCase() + hotel.country.slice(1)} |{" "}
                {hotel.city[0].toUpperCase() + hotel.city.slice(1)} |{" "}
                {hotel.district[0].toUpperCase() + hotel.district.slice(1)}
              </p>
            </div>
          </Link>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="card">
        <img src={hotel.images[0]} alt="" />
        <Link className="link" to={`/hotel/${hotel._id}`}>
          <div className="card-content">
            <h2>{hotel.hotelName}</h2>
            <p>{hotel.description}</p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Card;
