import "./LoginHotelManager.css";
import Hero from "../../components/Hero/Hero";
import AuthContext from "../../context/AuthProvider";

import React, { useContext } from "react";
import { useState } from "react";
import Header from "../../components/Header/Header";
const LoginHotelManager = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [handleError, setError] = useState("");
  const { loginHotelManagerAuth, error } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (error) {
      setError("Eposta veya şifre yanlış");
    }

    if (email && password) {
      const hotelManager = {
        email,
        password,
      };

      await loginHotelManagerAuth(hotelManager);
    } else {
      setError("Lütfen tüm alanları doldurunuz!");
    }

    setLoading(false);
  };

  if (loading) {
    return <div>Yükleniyor..</div>;
  }
  return (
    <div className="loginpage">
      <div className="row" style={{ "--bs-gutter-x": "0" }}>
        <Header isNotMenu />
        <Hero
          width={50}
          height={100}
          title={"Giriş Yap"}
          description={"Otel Yöneticisi"}
        />
        <div className="col-6">
          <div className="login-form">
            <div className="form-content">
              <label htmlFor="">E-posta</label>
              <input
                type="mail"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="">Şifre</label>
              <input
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              {handleError && (
                <div style={{ marginTop: "20px" }} className="form-error">
                  {handleError}
                </div>
              )}
              <button onClick={handleSubmit}>Giriş Yap</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginHotelManager;
