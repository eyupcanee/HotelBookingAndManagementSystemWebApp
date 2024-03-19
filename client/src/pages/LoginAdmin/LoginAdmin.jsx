import "./LoginAdmin.css";
import Hero from "../../components/Hero/Hero";
import AuthContext from "../../context/AuthProvider";

import React, { useContext } from "react";
import { useState } from "react";
import Header from "../../components/Header/Header";
const LoginAdmin = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [handleError, setError] = useState("");
  const { loginAdminAuth, error } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const submit = async () => {
      if (error) {
        setError("Eposta veya şifre yanlış");
      }
      if (email && password) {
        const admin = {
          email,
          password,
        };

        await loginAdminAuth(admin);
      } else {
        setError("Lütfen tüm alanları doldurunuz!");
      }
    };

    submit();

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
          description={"Admin"}
        />
        <div className="col-6">
          <div className="login-form">
            <div className="form-content">
              <label htmlFor="">E-posta</label>
              <input
                type="mail"
                id="email"
                required="required"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="">Şifre</label>
              <input
                type="password"
                id="password"
                required="required"
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

export default LoginAdmin;
