import React, { useState, useEffect } from "react";
import "./navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faCog,
  faBriefcase,
  faGraduationCap,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [activeSection, setActiveSection] = useState("main");

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = showMobileMenu ? 0 : 60; 
      const sectionPosition = section.getBoundingClientRect().top;
      window.scrollTo({
        top: sectionPosition + window.scrollY - offset,
        behavior: "smooth",
      });
      setShowMobileMenu(false);
      uncheckMenuCheckbox();
    }
  };
  

  const uncheckMenuCheckbox = () => {
    const checkbox = document.querySelector(".check-menu");
    if (checkbox) {
      checkbox.checked = false;
    }
  };

  useEffect(() => {
    const navbarE1 = document.querySelector('.navbar');

    const handleScroll = () => {
      if (window.scrollY > 80) {
        navbarE1.classList.add('scrolled');
      } else {
        navbarE1.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["main", "about", "skill", "qualification", "project", "contact"];
      let inViewSection = "main"; 

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 80 && rect.bottom >= 80) {
            inViewSection = sectionId;
            break;
          }
        }
      }

      setActiveSection(inViewSection);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="navbar">
      <div className="nav">
        <input type="checkbox" id="nav-check" className="check-menu" />
        <div className="nav-left">
          <h3 onClick={() => scrollToSection("main")}>Mandip</h3>
        </div>
        <div className="nav-btn">
          <label
            className="hamburger"
            onClick={toggleMobileMenu}
            htmlFor="nav-check"
          >
            <div className={`bar ${showMobileMenu ? "open" : ""}`}></div>
            <div className={`bar ${showMobileMenu ? "open" : ""}`}></div>
            <div className={`bar ${showMobileMenu ? "open" : ""}`}></div>
          </label>
        </div>
        <ul className="nav-right">
          <li
            onClick={() => scrollToSection("main")}
            className={activeSection === "main" ? "active" : ""}
          >
            <span className="f-icon">
              <FontAwesomeIcon icon={faHome} />
            </span>
            Home
          </li>
          <li
            onClick={() => scrollToSection("about")}
            className={activeSection === "about" ? "active" : ""}
          >
            <span className="f-icon">
              <FontAwesomeIcon icon={faUser} />
            </span>
            About
          </li>
          <li
            onClick={() => scrollToSection("skill")}
            className={activeSection === "skill" ? "active" : ""}
          >
            <span className="f-icon">
              <FontAwesomeIcon icon={faCog} />
            </span>
            Skills
          </li>
          <li
            onClick={() => scrollToSection("qualification")}
            className={activeSection === "qualification" ? "active" : ""}
          >
            <span>
              <FontAwesomeIcon icon={faGraduationCap} className="f-icon" />
            </span>
            Qualification
          </li>
          <li
            onClick={() => scrollToSection("project")}
            className={activeSection === "project" ? "active" : ""}
          >
            <span className="f-icon">
              <FontAwesomeIcon icon={faBriefcase} />
            </span>
            Projects
          </li>
          <li
            onClick={() => scrollToSection("contact")}
            className={activeSection === "contact" ? "active" : ""}
          >
            <span>
              <FontAwesomeIcon icon={faEnvelope} className="f-icon" />
            </span>
            Contact me
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
