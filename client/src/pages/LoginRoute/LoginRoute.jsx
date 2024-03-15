import React from 'react'
import "./LoginRoute.css";
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Hero from '../../components/Hero/Hero';

const LoginRoute = () => {
  return (
    <>
        <div className="row">
        <Header isNotMenu />
        <Hero title={"Giriş Yap"} description={"Giriş yapmak istediğiniz yetkiyi seçin"} width={50} height={100}/>
        <div className="col-6">
            <div className="login-route-links">
                <Link to={"/admin/login"}>Admin Olarak Giriş Yap</Link>
                <Link to={"/hotelmanager/login"}>Otel Yöneticisi Olarak Giriş Yap</Link>
                <Link to={"/user/login"}>Kullanıcı Olarak Giriş Yap</Link>
            </div>
        </div>
        </div>
    </>
  )
}

export default LoginRoute