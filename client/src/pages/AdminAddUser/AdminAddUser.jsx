import "./AdminAddUser.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import { useState } from "react";
import { register } from "../../api/userApi";
import { useNavigate } from "react-router-dom";

const AdminAddUser = () => {
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

      navigate("/admin/users");
    } catch (error) {
      console.log(error);
      console.log(formData);
      console.log(formData.profilePicture);
    }
  };

  return (
    <div className="admin-list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <h2 style={{ paddingLeft: "20px" }}>Kullanıcı Ekle</h2>
        <form
          onSubmit={handleSubmit}
          action="submit"
          style={{ marginTop: "-100px" }}
          className="register-form"
        >
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
          <button type="submit">Ekle</button>
        </form>
      </div>
    </div>
  );
};

export default AdminAddUser;
