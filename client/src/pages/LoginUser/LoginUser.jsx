import "./LoginUser.css";
import Hero from "../../components/Hero/Hero"
import AuthContext from "../../context/AuthProvider";


import React, { useContext } from 'react'
import { useState } from "react"
import Header from "../../components/Header/Header"
const LoginUser = () => {
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [loading,setLoading] = useState(false); 
    const {loginUserAuth} = useContext(AuthContext);


    const handleSubmit =async (event) => {
        event.preventDefault();

        
            const user = {
                email,
                password,
            }
            
            await loginUserAuth(user);
       
    }


    if(loading) {
        return <div>Yükleniyor..</div>
    }
  return (
    <div className="loginpage">
    <div className="row">
    <Header isNotMenu/>
    <Hero width={50} height={100} title={"Giriş Yap"} description={"Kullanıcı"}/>
        <div className="col-6">
            <div className="login-user-form">
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

export default LoginUser