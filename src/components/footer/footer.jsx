import "./footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faGithub,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import RandomShape from "../randomshape/randomshape";

const Footer = () => {
  return (
    <>
      <section id="footer">
        <RandomShape />
        <div className="footer">
          <div className="say-hi">
            <div className="hi-up">
              <h1>Lets Say Hi</h1>
              <h4>
                <a href="mailto:mandipshah3@gmail.com">mandipshah3@gmail.com</a>
              </h4>
              <hr />
            </div>
            <div className="hi-down">
              <div className="facebook f-ico">
                <a
                  href="https://www.facebook.com/mand1pshah/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FontAwesomeIcon icon={faFacebookF} className="fb" />
                </a>
              </div>

              <div className="twitter f-ico">
                <a
                  href="https://www.github.com/mandipkumarkanu/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FontAwesomeIcon icon={faGithub} className="x" />
                </a>
              </div>

              <div className="instagram f-ico">
                <a
                  href="https://www.instagram.com/mand1pshah/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FontAwesomeIcon icon={faInstagram} className="ig" />
                </a>
              </div>
            </div>
          </div>
          <hr />
          <div className="designed">
            Designed by{" "}
            <a href="https://www.github.com/mandipkumarkanu">Mandy</a> &copy;{" "}
            {new Date().getFullYear()}
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
