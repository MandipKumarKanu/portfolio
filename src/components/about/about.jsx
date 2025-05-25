import { useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faCode,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import Pic from "../img/pic.png";
import Resume from "./resume.pdf";
import "./about.css";
import { Parallax } from 'react-scroll-parallax';

const About = () => {
  const profileRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (profileRef.current) {
        const rect = profileRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        profileRef.current.style.transform = `perspective(1000px) 
          rotateX(${(y - rect.height / 2) / 20}deg) 
          rotateY(${-(x - rect.width / 2) / 20}deg)`;
      }
    };

    const currentRef = profileRef.current;
    if (currentRef) {
      currentRef.addEventListener("mousemove", handleMouseMove);
      return () => {
        currentRef.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, []);

  return (
    <Parallax speed={10}>
      <section id="about" className="about" data-aos="fade-up"> {/* Added data-aos */}
        <div className="about-container">
          <div className="abt-top">
            <h2>About Me</h2>
            <p>My Digital Journey</p>
          </div>
          <div className="abt-btm">
            <div className="abt-left">
              <div
                ref={profileRef}
                className="abt-img-container profile-3d-hover"
              >
                <img src={Pic} alt="Profile" className="newImg" />
              </div>
            </div>
            <div className="abt-right">
              <h3 className="abt-heading">Hi, I&apos;m Mandip!</h3>
              <p className="abt-description">
                I am a passionate web developer specializing in React and modern
                web technologies. My mission is to create intuitive,
                user-friendly, and visually stunning web experiences. Every
                project I undertake reflects my dedication to functionality and
                design.
              </p>
              <div className="abt-stats">
                <div className="abt-card">
                  <h4>2+</h4>
                  <p>Years Experience</p>
                  <FontAwesomeIcon icon={faCode} className="card-icon" />
                </div>
                <div className="abt-card">
                  <h4>20+</h4>
                  <p>Projects Completed</p>
                  <FontAwesomeIcon icon={faTrophy} className="card-icon" />
                </div>
              </div>
              <div className="abt-cta">
                <a href={Resume} download="resume">
                  <button className="download-btn button">
                    Download CV <FontAwesomeIcon icon={faDownload} />
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Parallax>
  );
};

export default About;
