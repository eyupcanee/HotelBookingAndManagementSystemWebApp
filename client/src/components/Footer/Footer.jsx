import React from "react";
import "./Footer.css";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="parallax">
        <div className="container">
          <div className="parallax-content">
            <h3>En iyi yerlerde konaklamak için Rezervasyon yap!</h3>
            <button
              className="footer-link"
              onClick={() => {
                navigate("/list", { state: { data: {} } });
              }}
            >
              Rezervasyon Yap
            </button>
          </div>
        </div>
      </div>
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-4">
              <h2>PLAIDESSA</h2>
              <div className="list">
                <Link to="">Anasayfa</Link>
                <Link to="">Oteller</Link>
                <Link to="">Hakkımızda</Link>
                <Link to="">İletişim</Link>
              </div>
            </div>

            <div className="col-4">
              <h3>Address</h3>
              <address>
                Merkur Sok. 34785 <br />
                Sancaktepe / Istanbul
              </address>
              <h3>Mail</h3>
              <Link to="mailto:example.mail.com">eyupcanee@gmail.com</Link>
              <h3>Phone</h3>
              <Link to="tel:905068476779">+90 (546) 593 39 41</Link>
            </div>

            <div className="col-4">
              <h2>Newsletter</h2>
              <form action="">
                <input type="text" placeholder="example.mail.com" />
              </form>
            </div>

            <div className="col-12 copyright">
              Copyright Eyüp Can Esen &copy; 2024
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
