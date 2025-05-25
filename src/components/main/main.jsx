import "./main.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faGithub,
  faInstagram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import pic from "../img/pic.png";
import RandomShape from "../randomshape/randomshape";
import { Parallax } from 'react-scroll-parallax';

const Main = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      {/* The Parallax component wraps the entire section */}
      <Parallax speed={-5}>
        <section id="main" data-aos="fade-in"> {/* Added data-aos */}
          <RandomShape /> {/* This should remain in the background */}
          <div className="mains">
            <div className="main">
              <div className="main-right">
                <div className="circle1"></div>
                <div className="circle2"></div>
                <div className="img-container">
                  <img src={pic} alt="photo" />
                </div>
              </div>

              <div className="main-left">
                <h3>Welcome I&apos;m</h3>
                <h2 className="name">Mandip Kumar Kanu</h2>
                <h4>Frontend Developer</h4>
                <br />
                <p>
                  BCA Student | Innovator in Coding | Crafting a Digital Future
                </p>
                <button className="cta" onClick={scrollToContact}>
                  <span>Contact Me</span>
                  <svg viewBox="0 0 13 10" height="10px" width="15px">
                    <path d="M1,5 L11,5"></path>
                    <polyline points="8 1 12 5 8 9"></polyline>
                  </svg>
                </button>
              </div>
            </div>
            <div className="main-side">
              <div className="main-last">
                Follow Me On:{"  "}----{"  "}
                <a href="https://www.facebook.com/mand1pshah/" target="__blank">
                  <FontAwesomeIcon icon={faFacebookF} className="main-ico" />
                </a>
                <a href="https://www.instagram.com/mand1pshah/" target="__blank">
                  <FontAwesomeIcon icon={faInstagram} className="main-ico" />
                </a>
                <a href="https://www.twitter.com/mand1pshah/" target="__blank">
                  <FontAwesomeIcon icon={faXTwitter} className="main-ico" />
                </a>
                <a
                  href="https://www.github.com/mandipkumarkanu/"
                  target="__blank"
                >
                  <FontAwesomeIcon icon={faGithub} className="main-ico" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </Parallax>
    </>
  );
};

export default Main;
