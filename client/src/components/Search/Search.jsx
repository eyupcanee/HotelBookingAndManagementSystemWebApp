import "./Search.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFacilities } from "../../api/hotelApi";
const Search = ({ page }) => {
  const [country, setCountry] = useState();
  const [city, setCity] = useState();
  const [facilities, setFacilities] = useState([]);
  const [numberOfPeople, setNumberOfPeople] = useState();
  const [loading, setLoading] = useState(true);
  const [selectedValues, setSelectedValues] = useState([]);
  const [district, setDistrict] = useState();
  const [maxPrice, setMaxPrice] = useState(10000);
  const navigate = useNavigate();

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

  const submitHandle = async (event) => {
    event.preventDefault();
    const criteria = {};

    if (country) criteria.country = country;
    if (city) criteria.city = city;
    if (numberOfPeople) criteria.numberOfPeople = numberOfPeople;
    navigate("/list", { state: { data: criteria } });
  };

  const submitHandleForOtherPages = async (event) => {
    event.preventDefault();
    const criteria = {};

    if (country) criteria.country = country;
    if (city) criteria.city = city;
    if (numberOfPeople) criteria.numberOfPeople = numberOfPeople;
    if (maxPrice) criteria.maxPrice = maxPrice;
    if (selectedValues) criteria.facilities = selectedValues;
    if (district) criteria.district = district;

    navigate("/list", { state: { data: criteria } });
  };

  const handleInputChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      setSelectedValues([...selectedValues, value]);
    } else {
      setSelectedValues(selectedValues.filter((item) => item !== value));
    }
  };

  const handlePriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  if (loading) {
    return <div>Yükleniyor...</div>;
  } else if (page === "hero") {
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
    return (
      <>
        <form
          action="post
              "
          className="other"
        >
          <div className="row">
            <div className="col-2 input-group">
              <label htmlFor="country">Ülke</label>
              <input
                type="text"
                name="country"
                id="country"
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <div className="col-2 input-group">
              <label htmlFor="city">Şehir</label>
              <input
                type="text"
                name="city"
                id="city"
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="col-2 input-group">
              <label htmlFor="city">İlçe</label>
              <input
                type="text"
                name="district"
                id="district"
                onChange={(e) => setDistrict(e.target.value)}
              />
            </div>
            <div className="col-2 input-group">
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
            <div className="col-2 input-group range">
              <label htmlFor="">
                Maksimum Fiyat
                <div className="priceBox">
                  <input
                    type="range"
                    min="50"
                    max="10000"
                    value={maxPrice}
                    onChange={handlePriceChange}
                  />
                  <input
                    type="number"
                    min="50"
                    max="10000"
                    value={maxPrice}
                    onChange={handlePriceChange}
                  />
                </div>
              </label>
            </div>
            <div className="col-2 input-group">
              <button
                className="other-button"
                type="submit"
                id="btn-search"
                onClick={submitHandleForOtherPages}
              >
                Ara
              </button>
            </div>
          </div>
        </form>
        <div className="container">
          <div className="facility">
            <label htmlFor="">İmkanlar</label>

            <div className="facilities">
              {facilities.map((facility) => {
                return (
                  <>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                      }}
                    >
                      <input
                        type="checkbox"
                        value={facility._id}
                        onChange={handleInputChange}
                        checked={selectedValues.includes(facility._id)}
                      />
                      <label htmlFor="">{facility.facilityName}</label>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Search;
