/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { getHotelsByCriteria } from "../../api/hotelApi";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import Footer from "../../components/Footer/Footer";
import Search from "../../components/Search/Search";
import Title from "../../components/Title/Title";
import "./ListPage.css";
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
      console.log(data);
    };

    getData();
  }, [location.state.data]);
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
      <br />
      <br />

      <div className="container">
        <div className="center-title" style={{ textAlign: "center" }}>
          <Title
            title={"Filtrele"}
            description={"Otelleri dilediğiniz gibi filtreleyin"}
          />
        </div>

        <br />
        <Search page={"list"} />
      </div>

      <div className="hotels">
        <div className="container">
          <div id="card-list" className="row">
            {data.length > 0 ? (
              data.map((item, index) => (
                <div className="col-3">
                  <Card hotel={item} page={"list"} />
                </div>
              ))
            ) : (
              <div
                className="center-title"
                style={{ textAlign: "center", marginBottom: "80px" }}
              >
                <Title
                  title={"Otel Bulunamadı :("}
                  description={"Aradığınız kriterlere uygun otel bulunamadı."}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ListPage;
