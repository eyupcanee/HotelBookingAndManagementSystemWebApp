import "./LoginAdmin.css";
import Hero from "../../components/Hero/Hero"
import AuthContext from "../../context/AuthProvider";


import React, { useContext } from 'react'
import { useState } from "react"
import Header from "../../components/Header/Header"
const LoginAdmin = () => {
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [loading,setLoading] = useState(false); 
    const {loginAdminAuth} = useContext(AuthContext);


    const handleSubmit =async (event) => {
        event.preventDefault();

        
            const admin = {
                email,
                password,
            }
            
            await loginAdminAuth(admin);
            setLoading(false);
       
    }


    if(loading) {
        return <div>Yükleniyor..</div>
    }
  return (
    <div className="loginpage">
    <div className="row">
    <Header isNotMenu/>
    <Hero width={50} height={100} title={"Giriş Yap"} description={"Admin"}/>
        <div className="col-6">
            <div className="login-form">
                <div className="form-content">
                    <label htmlFor="">E-posta</label>
                    <input type="mail" required onChange={(e) => setEmail(e.target.value)}/>
                    <label htmlFor="">Şifre</label>
                    <input type="password" required onChange={(e) => setPassword(e.target.value)}/>
                    <button onClick={handleSubmit}>Giriş Yap</button>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default LoginAdmin