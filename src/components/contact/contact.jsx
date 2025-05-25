import React from "react";
import "./contact.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPhoneAlt,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { Parallax } from 'react-scroll-parallax';

function Contact() {
  return (
    <>
      <Parallax speed={15}>
        <section id="contact" data-aos="fade-right"> {/* Added data-aos for section */}
          <div className="abt-top" data-aos="fade-down"> {/* Inner element animation */}
            <h2>Contact Me</h2>
            <p>Say Hi</p>
          </div>
          <div className="container">
            <div className="content">
              <div className="left-side" data-aos="fade-right" data-aos-delay="200"> {/* Inner element animation */}
                <div className="address details">
                  <FontAwesomeIcon icon={faLocationDot} className="contact-ico" />
                  <div className="topic">Address</div>
                  <div className="text-one">Aadarshnagar 03</div>
                  <div className="text-two">Birgunj, Parsa</div>
                </div>
                <div className="phone details">
                  <FontAwesomeIcon icon={faPhoneAlt} className="contact-ico" />
                  <div className="topic">Phone</div>
                  <div className="text-one">+977 9811209589</div>
                </div>
                <div className="email details">
                  <FontAwesomeIcon icon={faEnvelope} className="contact-ico" />
                  <div className="topic">Email</div>
                  <div className="text-one">mandipshah3@gmail.com</div>
                </div>
              </div>
              <div className="right-side" data-aos="fade-left" data-aos-delay="200"> {/* Inner element animation */}
                <div className="topic-text">Send us a message</div>
                <p>
                  If you have any tasks or questions regarding my work, please
                  feel free to drop me a message. I'm here to assist you with a
                  smile.
                </p>
                <form action="https://formspree.io/f/mgejdgvq" method="POST">
                  <div className="input-box">
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your name *"
                      required
                    />
                  </div>
                  <div className="input-box">
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email *"
                      required
                    />
                  </div>
                  <div className="input-box">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div className="input-box message-box">
                    <textarea
                      name="message"
                      rows="4"
                      placeholder="Enter your message *"
                      required></textarea>
                  </div>
                  <div className="button">
                    <input type="submit" value="Submit" formTarget="__blank"/>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </Parallax>
    </>
  );
}

export default Contact;
