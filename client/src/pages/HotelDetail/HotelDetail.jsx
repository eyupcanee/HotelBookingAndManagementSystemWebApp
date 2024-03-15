/* eslint-disable react-hooks/exhaustive-deps */
import "./HotelDetail.css";
import "swiper/css";
import { useParams,Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getHotel } from "../../api/hotelApi";
import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import Footer from "../../components/Footer/Footer";
import Title from "../../components/Title/Title";
import { Thumbs, Navigation,Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { getFacility } from "../../api/hotelApi";
import { getRoomsByHotel,getCommentsByHotel } from "../../api/hotelApi";
import { getUserAsAdmin } from "../../api/userApi";

const HotelDetail = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [facilities, setFacilities] = useState([]);
  const [rooms,setRooms] = useState([])
  const [comments,setComments] = useState([])
  const { id } = useParams();
  var token  = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTM2MzJlMDQ5YzYyOGE1YmEzNWVmMiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwOTQwMTAwN30.BGWqn4MDc65i_vkAo7i9Xm1EDGGMg7Jr5e8Ff2GHo3"
  const [thumbs, setThumbs] = useState(null);
  useEffect(() => {
    const getData = async () => {
      const result = await getHotel(id);
      console.log(result.data.data);
      setData(result.data.data);

      const getCommentsData = async () => {
        const result = await getCommentsByHotel(id);
        console.log(result.data.data);
        await result.data.data.map((async (item,index) => {
          console.log(item);
          const result = await getUserAsAdmin(item.userId,token);
          console.log(result);
          const comment = {
            user:result.data.data,
            comment:item.comment
          }
          console.log(comment);
          setComments((prevComments) => [...prevComments,comment])
        }))
      }

      await result.data.data.facilities.map(async (facility, index) => {
        const result = await getFacility(facility);
        console.log(result.data.data);
        setFacilities((prevFacilities) => [
          ...prevFacilities,
          result.data.data,
        ]);
        getCommentsData();
      });

      const roomResult = await getRoomsByHotel(id);
      setRooms(roomResult.data.data);

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
                    modules={[Navigation, Thumbs,Autoplay]} // modified
                    thumbs={{
                      swiper: thumbs && !thumbs.destroyed ? thumbs : null,
                    }} // added
                    navigation
                    className="preview"
                    autoplay = {{delay:2500}}
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
              <div className="hotel-info-detail">
              <h1>{data.hotelName}</h1>
              <p><span className="span-important">Açıklama : </span>{data.description}</p>
              <p className="price">Ortalama Fiyat : <span style={{color:"#0077FF",fontWeight:"600"}}>{data.averagePrice}₺</span></p>
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
                <span className="span-important">{data.country[0].toUpperCase() + data.country.slice(1)} </span>|{" "}
                <span style={{color:"#3399FF",fontWeight:"600"}}>{data.city[0].toUpperCase() + data.city.slice(1)} </span>|{" "}
                {data.district[0].toUpperCase() + data.district.slice(1)}
              </p>
              <h1 style={{marginBottom:"0", fontSize:"1.5rem" , color:"#0077FF"}}>İmkanlar</h1>
              <div className="facilities" style={{ display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:"3px"}}>
              
              {facilities
                .slice(0, Math.ceil(facilities.length / 2))
                .map((facility, index) => {
                  return (
                    <>
                      <p><span style={{fontWeight:"600"}}>{facility.facilityName}</span></p>
                    </>
                  );
                })}
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="title-main">
        <Title title={"Odalar"} description={"Rezervasyon yaptırabileceğiniz odalar"}/>
      </div>
      <div className="container">
        <div className="rooms">        
          {rooms.map((room,index) => {
            console.log(room);
            return(<>
                <div className="room-card">
                  <div className="row">
                  <div className="col-4">
                <Swiper
                modules={[Autoplay]}
                autoplay={{delay:2500}}
                className="preview"
                    >
                      {room.images.map((image, index) => (
                        <SwiperSlide key={index}>
                          <img src={image} alt="" />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                </div>
                <div className="col-4">
                  <h3>{room.description}</h3>
                  <p>Gecelik : <span className="span-important">{room.pricePerNight}₺</span></p>
                      <p>Kapasite : <span className="span-important">{room.capacity}</span></p>
                </div>
                <div className="col-4">
                  <div className="button-aligner">
                  <Link to={`/reservation/add/${room._id}`}>Rezervasyon Yap</Link>
                  </div>
                </div>
                  </div>
                </div>

            </>);
          })}
        </div>
      </div>
      <div className="title-main">
        <Title title={"Yorumlar"} description={"Diğer kullanıcıların fikirlerini okuyun"}/>
      </div>
      <div className="comments">
        <div className="container">
        {comments.slice(0, Math.ceil(facilities.length / 2)).map((comment,index) => {
          return (
            <div className="comment">
            <div className="image" style={{backgroundImage:`url(${comment.user.profilePicture})`}}>
            
          </div>
          <div className="comment-info">
            <h1>{comment.user.firstName} {comment.user.lastName}</h1>
            <p>{comment.comment}</p>
          </div>
          
          </div>
          )
        })}
        </div>
        </div>
      
      <Footer />

    </>
  );
};

export default HotelDetail;
