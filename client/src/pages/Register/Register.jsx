import "./Register.css";
import Hero from "../../components/Hero/Hero";
import Header from "../../components/Header/Header";
import { useState } from "react";
import { register } from "../../api/userApi";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    profilePicture: null,
  });

  const handleChange = (e) => {
    e.preventDefault();

    if (e.target.name === "profilePicture") {
      setFormData({ ...formData, profilePicture: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.email ||
        !formData.password ||
        !formData.phoneNumber ||
        !formData.profilePicture
      ) {
        throw new Error("Lütfen tüm alanları doldurun.");
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error("Geçerli bir e-posta adresi girin.");
      }

      const formDataToSend = new FormData();
      formDataToSend.append("firstName", formData.firstName);
      formDataToSend.append("lastName", formData.lastName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("phoneNumber", formData.phoneNumber);
      formDataToSend.append("profilePicture", formData.profilePicture);

      await register(formDataToSend);

      navigate("/user/login");
    } catch (error) {
      console.log(error);
      console.log(formData);
      console.log(formData.profilePicture);
    }
  };

  return (
    <div className="row">
      <Header isNotMenu />
      <Hero
        title={"Kayıt Ol"}
        description={"Websitemizi bütün olanaklarıyla kullanmak için kaydol"}
        height={100}
        width={50}
      />
      <div className="col-6" id="form-container">
        <form onSubmit={handleSubmit} action="submit" className="register-form">
          <label htmlFor="firstName">Ad</label>
          <input
            type="text"
            name="firstName"
            onChange={handleChange}
            required
          />

          <label htmlFor="lastName">Soyad</label>
          <input type="text" name="lastName" onChange={handleChange} required />

          <label htmlFor="email">Eposta</label>
          <input type="text" name="email" onChange={handleChange} required />

          <label htmlFor="password">Şifre</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            required
          />

          <label htmlFor="phoneNumber">Telefon Numarası</label>
          <input
            type="text"
            name="phoneNumber"
            onChange={handleChange}
            required
          />

          <label htmlFor="profilePicture">Profil Fotoğrafı</label>
          <input
            id="profilePicture"
            type="file"
            name="profilePicture"
            accept="image/*"
            onChange={handleChange}
            required
          />
          <label
            className="fileInput"
            name="profilePicture"
            htmlFor="profilePicture"
          >
            Fotoğraf Seç
          </label>
          <button type="submit">Kaydol</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
