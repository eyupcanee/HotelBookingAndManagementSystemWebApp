import React from "react";

const Title = ({ title, description }) => {
  return (
    <div id="title" className="container">
      <h1>{title}</h1>
      <article>{description}</article>
    </div>
  );
};

export default Title;
