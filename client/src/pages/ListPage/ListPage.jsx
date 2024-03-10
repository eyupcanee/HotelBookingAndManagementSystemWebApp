/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { getHotelsByCriteria } from "../../api/hotelApi";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
const ListPage = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      const result = await getHotelsByCriteria(location.state.data);
      setData(result.data.data);
      console.log(result.data.data);
      setLoading(false);
    };

    getData();
  }, []);
  if (loading) {
    return <div>Yükleniyor...</div>;
  }
  return (
    <>
      <Header />
      <Hero
        title={"Oteller"}
        description={"Anasayfa | Oteller"}
        height={70}
        width={100}
      />
      <div>
        {data.map((item, index) => {
          return (
            <>
              <div key={index}>
                <div className="title">{item.hotelName}</div>
                <div className="country">{item.country}</div>
                <div className="city">{item.city}</div>
                <div className="district">{item.district}</div>
              </div>
              ;
            </>
          );
        })}
      </div>
    </>
  );
};

export default ListPage;
