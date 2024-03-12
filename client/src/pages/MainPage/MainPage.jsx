import React from "react";
import "./MainPage.css";
import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import Card from "../../components/Card/Card";
import Title from "../../components/Title/Title";
import Footer from "../../components/Footer/Footer";
import { getHotelsByCriteria } from "../../api/hotelApi";
import { useEffect, useState } from "react";

const MainPage = () => {
  const criteria = {
    country: "turkey",
  };
  const [data, setData] = useState([""]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      const result = await getHotelsByCriteria(criteria);
      setData(result.data.data);
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
        title={"PLAIDESSA"}
        description={
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, mollitia!"
        }
        height={100}
        width={100}
        search
      />
      <div className="title-main">
        <Title
          title={"Popüler"}
          description={"Türkiye konumundaki popüler oteller"}
        />
      </div>

      <div className="container">
        <div className="card-list">
          <div className="row">
            {data.map((item, index) => {
              if (index < 4) {
                return (
                  <div className="col-6 col-md-4 col-lg-4 col-xl-3">
                    <Card hotel={item} />
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
      <section className="nutshell">
        <div className="container">
          <div className="row">
            <div className="col-4 item">
              <img
                src="https://www.trivago.com.tr/_static/images/ValueProposition/SearchDesktop.svg"
                alt=""
              />
              <h2>Basitçe Arayın</h2>
              <p>Sadece birkaç saniye için binlerce otelde arama yapın.</p>
            </div>
            <div className="col-4 item">
              <img
                src="https://www.trivago.com.tr/_static/images/ValueProposition/CompareDesktop.svg"
                alt=""
              />
              <h2>Güvenli bir şekilde karşılaştırın</h2>
              <p>Aynı anda binlerce otelin fiyartlarını karşılaştırın.</p>
            </div>
            <div className="col-4 item">
              <img
                src="https://www.trivago.com.tr/_static/images/ValueProposition/SaveDesktop.svg"
                alt=""
              />
              <h2>Çok kazanç sağlayın</h2>
              <p>Rezervasyon fırsatlarını keşfedin.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="about">
        <div className="container">
          <div className="row">
            <div className="col-4 item">
              <h2>PLAIDESSA Nedir?</h2>
              <p>
                Plaidessa dünya çapında otelleri bulup, karşılaştırıp
                seçtiklerinize rezervasyon yapabilmenizi sağlayan bir web
                uygulamasıdır.
              </p>
            </div>
            <div className="col-4 item">
              <h2>Nasıl Rezervasyon Yaparım?</h2>
              <p>
                Kriterlerinize uygun aradığınız oteli bulduktan sonra otelin
                detay sayfasına girip rezervasyon yap butonuna tıkladığınızda
                yönlendirildiğiniz formu doldurarak rezervasyon yapabilirsiniz.
              </p>
            </div>
            <div className="col-4 item">
              <h2>Rezervasyonlarımı Nasıl Takip Ederim?</h2>
              <p>
                Plaidessa'ya üye olduktan sonra menüden rezervasyonlarım linkine
                tıkladığınızda yaptırdığınız rezervasyonları veya onay bekleyen
                rezervasyonlarınızı görüntüleyebilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default MainPage;
