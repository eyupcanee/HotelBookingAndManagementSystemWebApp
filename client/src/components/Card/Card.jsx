import React from "react";
import "./Card.css";
import { useNavigate, Link } from "react-router-dom";

const Card = ({ hotel }) => {
  const navigate = useNavigate();
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
