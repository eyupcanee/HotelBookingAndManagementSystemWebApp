import React from "react";
import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";

const MainPage = () => {
  return (
    <>
      <Header />
      <Hero
        title={"PLAIDESSA"}
        description={
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, mollitia!"
        }
        percent={100}
        search
      />
    </>
  );
};

export default MainPage;
