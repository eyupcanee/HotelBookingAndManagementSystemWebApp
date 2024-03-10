import "./Search.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Search = ({ page }) => {
  const [country, setCountry] = useState();
  const [city, setCity] = useState();
  const [numberOfPeople, setNumberOfPeople] = useState();
  const navigate = useNavigate();
  const submitHandle = async (event) => {
    event.preventDefault();
    const criteria = {};

    if (country) criteria.country = country;
    if (city) criteria.city = city;
    if (numberOfPeople) criteria.numberOfPeople = numberOfPeople;
    navigate("/list", { state: { data: criteria } });
  };
  if (page === "hero") {
    return (
      <form action="post">
        <div className="row">
          <div className="col-3 input-group">
            <label htmlFor="country">Ülke</label>
            <input
              type="text"
              name="country"
              id="country"
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div className="col-3 input-group">
            <label htmlFor="city">Şehir</label>
            <input
              type="text"
              name="city"
              id="city"
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="col-3 input-group">
            <label htmlFor="numberOfPeople">Kişi Sayısı</label>
            <select
              name="numberOfPeople"
              id="numberOfPeople"
              onChange={(e) => setNumberOfPeople(e.target.value)}
            >
              <option value="" selected disabled hidden></option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="100">5+</option>
            </select>
          </div>
          <div className="col-3 input-group">
            <button type="submit" id="btn-search" onClick={submitHandle}>
              Ara
            </button>
          </div>
        </div>
      </form>
    );
  } else {
    <form
      action="post
              "
    >
      <div className="row">
        <div className="col-3">
          <label htmlFor=""></label>
          <input type="text" />
        </div>
        <div className="col-3">
          <label htmlFor=""></label>
          <input type="text" />
        </div>
        <div className="col-3">
          <label htmlFor=""></label>
          <input type="text" />
        </div>
        <div className="col-3">
          <label htmlFor=""></label>
          <input type="text" />
        </div>
        <div className="col-3">
          <label htmlFor=""></label>
          <input type="text" />
        </div>
        <div className="col-3">
          <label htmlFor=""></label>
          <input type="text" />
        </div>
      </div>
    </form>;
  }
};

export default Search;
