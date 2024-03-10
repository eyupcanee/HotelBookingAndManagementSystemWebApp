import "./Hero.css";
import Search from "../Search/Search";
const Hero = ({ title, description, height, width, search }) => {
  if (search) {
    return (
      <section id="hero" style={{ height: height + "dvh", width: width + "%" }}>
        <div className="container">
          <article>
            <h1>{title}</h1>
            <p>{description}</p>
            <Search page={"hero"} />
          </article>
        </div>
      </section>
    );
  } else {
    return (
      <section id="hero" style={{ height: height + "dvh", width: width + "%" }}>
        <div className="container">
          <article>
            <h1>{title}</h1>
            <p>{description}</p>
          </article>
        </div>
      </section>
    );
  }
};

export default Hero;
