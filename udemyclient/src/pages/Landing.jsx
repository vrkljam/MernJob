import React from "react";
import Wrapper from "../assets/wrappers/LandingPage";
import main from "../assets/images/main.svg";
import { Link } from "react-router-dom";
import { Logo } from "../components";

// video did this one first then did wrapper later in video
// import styled from "styled-components";
// const StyledBtn = styled.button`
//   font-size: 1.5rem;
//   background: red;
//   color: white;
// `;

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Job<span>Tracking</span>App
          </h1>
          <p>This site helps you to track your job search journey.</p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login/ Demo User
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

// below is the local wrapper, he uses a wrapper that is imported from the assets folder

// const Wrapper = styled.div`
//   background: red;
//   h1 {
//     color: white;
//   }
//   .content {
//     background: blue;
//     color: white;
//   }
// `;

export default Landing;
