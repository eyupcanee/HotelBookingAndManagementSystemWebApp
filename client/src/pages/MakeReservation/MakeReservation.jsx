import "./MakeReservation.css"
import Hero from "../../components/Hero/Hero"

import React from 'react'
import { useState } from "react"
import Header from "../../components/Header/Header"
const MakeReservation = () => {
    const [loading,setLoading] = useState(false); 
    if(loading) {
        return <div>Yükleniyor..</div>
    }
  return (
    <>
    <Header isNotMenu/>
        <Hero width={50} height={100} title={"Rezervasyon Yap"} description={"otelid"}/>
    </>
  )
}

export default MakeReservation