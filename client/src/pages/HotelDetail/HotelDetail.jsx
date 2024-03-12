import "./HotelDetail.css";
import "swiper/css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getHotel } from "../../api/hotelApi";
import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import Footer from "../../components/Footer/Footer";
import { Thumbs, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { getFacility } from "../../api/hotelApi";

const HotelDetail = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [facilities, setFacilities] = useState([]);
  const { id } = useParams();

  const [thumbs, setThumbs] = useState(null);
  useEffect(() => {
    const getData = async () => {
      const result = await getHotel(id);
      console.log(result.data.data);
      setData(result.data.data);

      await result.data.data.facilities.map(async (facility, index) => {
        const result = await getFacility(facility);
        console.log(result.data.data);
        setFacilities((prevFacilities) => [
          ...prevFacilities,
          result.data.data,
        ]);
      });

      setLoading(false);
    };

    getData();
    console.log(data);
    console.log(facilities);
  }, []);

  if (loading) {
    return <div>Yükleniyor...</div>;
  }
  return (
    <>
      <Header />
      <Hero
        title={data.hotelName}
        description={data.description}
        width={100}
        height={70}
      />
      <div className="hotel-info">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-3">
                  <div className="hotel-images">
                    <Swiper
                      slidesPerView={3}
                      onSwiper={setThumbs}
                      className="preview-thumbnails"
                    >
                      {data.images.map((image, index) => (
                        <SwiperSlide key={index}>
                          <img src={image} alt="" />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>
                <div className="col-md-9">
                  <Swiper
                    loop={true}
                    modules={[Navigation, Thumbs]} // modified
                    thumbs={{
                      swiper: thumbs && !thumbs.destroyed ? thumbs : null,
                    }} // added
                    navigation
                    className="preview"
                  >
                    {data.images.map((image, index) => (
                      <SwiperSlide key={index}>
                        <img src={image} alt="" />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <h1>{data.hotelName}</h1>
              <p>{data.description}</p>
              <p className="price">Ortalama Fiyat : {data.averagePrice}</p>
              <p className="phone">
                +90{" "}
                {data.phoneNumber[0] +
                  data.phoneNumber[1] +
                  data.phoneNumber[2] +
                  " " +
                  data.phoneNumber[3] +
                  data.phoneNumber[4] +
                  data.phoneNumber[5] +
                  " " +
                  data.phoneNumber[6] +
                  data.phoneNumber[7] +
                  " " +
                  data.phoneNumber[8] +
                  data.phoneNumber[9]}{" "}
              </p>
              <p className="location">
                {data.country[0].toUpperCase() + data.country.slice(1)} |{" "}
                {data.city[0].toUpperCase() + data.city.slice(1)} |{" "}
                {data.district[0].toUpperCase() + data.district.slice(1)}
              </p>

              {facilities
                .slice(0, Math.ceil(facilities.length / 2))
                .map((facility, index) => {
                  return (
                    <>
                      <p>{facility.facilityName}</p>
                    </>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HotelDetail;
