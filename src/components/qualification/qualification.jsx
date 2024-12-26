import { useState } from "react";
import "./qualification.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faBriefcase,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";

const Qualification = () => {
  const [selected, setSelected] = useState("edu");

  const change = (selected) => {
    setSelected(selected);
  };
  return (
    <>
      <section id="qualification">
        <div className="qualification">
          <div className="abt-top">
            <h2>Qualification</h2>
            <p>My Personal Journey</p>
          </div>
          <div className="we-select">
            <div
              className={`edu-select select ${
                selected === "edu" ? "selected" : ""
              }`}
              onClick={() => change("edu")}
            >
              <span>
                <FontAwesomeIcon icon={faGraduationCap} /> &nbsp;
              </span>
              EDU
            </div>
            <div
              className={`work-select select ${
                selected === "work" ? "selected" : ""
              }`}
              onClick={() => change("work")}
            >
              <span>
                <FontAwesomeIcon icon={faBriefcase} />
                &nbsp;
              </span>
              WORK
            </div>
          </div>

          <div className="design-section">
            <div
              className={`timeline edu ${selected === "edu" ? "selected" : ""}`}
            >
              <div className="timeline-component timeline-content">
                <h3>BCA</h3>
                <p className="edu-name">
                  <a
                    href="https://nationalinfotechcollege.edu.np/"
                    target="__blank"
                  >
                    National Infotech College (TU)
                  </a>
                </p>
                <p className="edu-date">
                  <FontAwesomeIcon icon={faCalendarDays} />
                  &nbsp;2021 - Present
                </p>
              </div>
              <div className="timeline-middle">
                <div className="timeline-circle"></div>
              </div>
              <div className="timeline-empty"></div>
              <div className="timeline-empty"></div>
              <div className="timeline-middle">
                <div className="timeline-circle"></div>
              </div>
              <div className="timeline-component timeline-content">
                <h3>+2 Science</h3>
                <p className="edu-name">
                  <a
                    href="https://www.facebook.com/ominternationalacademy"
                    target="__blank"
                  >
                    Om National Academy (NEB)
                  </a>
                </p>
                <p className="edu-date">
                  <FontAwesomeIcon icon={faCalendarDays} />
                  &nbsp;2019 - 2021
                </p>
              </div>
              <div className="timeline-component timeline-content">
                <h3>SEE</h3>
                <p className="edu-name">
                  <a
                    href="https://www.facebook.com/sesameinternationalschool"
                    target="__blank"
                  >
                    Sesame International School (NEB)
                  </a>
                </p>
                <p className="edu-date">
                  <FontAwesomeIcon icon={faCalendarDays} />
                  &nbsp;Till 2018
                </p>
              </div>
              <div className="timeline-middle">
                <div className="timeline-circle"></div>
              </div>
              <div className="timeline-empty"></div>
            </div>

            <div
              className={`timeline work ${
                selected === "work" ? "selected" : ""
              }`}
            >
              <div className="timeline-component timeline-content">
                <h3>Frontend Developer </h3>
                <p className="edu-name">
                  <a href="http://lennobyte.com/" target="__blank">
                    LennoByte Solutions
                  </a>
                </p>
                <p className="edu-date">
                  <FontAwesomeIcon icon={faCalendarDays} />
                  &nbsp; Oct 2023 - Present
                </p>
              </div>
              <div className="timeline-middle">
                <div className="timeline-circle"></div>
              </div>
              <div className="timeline-empty"></div>

              <div className="timeline-empty"></div>
              <div className="timeline-middle">
                <div className="timeline-circle"></div>
              </div>
              <div className="timeline-component timeline-content">
                <h3>Frontend Developer as Intern</h3>
                <p className="edu-name">
                  <a href="http://lennobyte.com/" target="__blank">
                    LennoByte Solutions
                  </a>
                </p>
                <p className="edu-date">
                  <FontAwesomeIcon icon={faCalendarDays} />
                  &nbsp;May 2023 - Oct 2023
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Qualification;
