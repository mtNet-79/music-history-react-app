import { useEffect } from "react";
import "../styles/nowhere.scss";
import Nav from "./Nav";

const Nowhere = () => {

  useEffect(() => {
    document.body.style.backgroundImage = `url('https://assets.codepen.io/1538474/star.svg'), linear-gradient(to bottom, #05007A, #4D007D)`;
    var links = document.querySelectorAll(".nav-link");
    links.forEach((link) => {
      link.style.color = "white";
    });
    document.querySelector(".nav li span").style.color = "white";
    document.querySelector(".nav").style.borderBottom = " 1px solid white";
    //
    return () => {
      document.body.style.backgroundImage = "none";
      
    };
  }, []);
  return (
    <>
      <Nav />
      <div className="not-found-container">
        <img
          src="https://assets.codepen.io/1538474/404.svg"
          alt=""
          className="logo-404"
        />
        <img src="https://assets.codepen.io/1538474/meteor.svg" alt="" className="meteor" />
        <p className="title">Space uninhabited</p>
        <p className="subtitle">
          You’re either misspelling the URL <br /> or requesting a page that's
          no longer here.
        </p>
        {/* <div align="center">
          <span className="btn-back" onClick={() => navigate("/")}>
            Back to Home page
          </span>
        </div> */}
        <img
        src="https://assets.codepen.io/1538474/astronaut.svg"
        className="astronaut"
        alt="astronaut"
      />
        {/* <img
        src="https://assets.codepen.io/1538474/spaceship.svg"
        className="spaceship"
        alt="spaceship"
      /> */}
      </div>
      <div className="mars"></div>
    </>
  );
};



export default Nowhere;
