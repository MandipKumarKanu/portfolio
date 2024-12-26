import React, { useState } from "react";
import "./skill.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCode,
  faDatabase,
  faFileAlt,
  faFireAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  faHtml5,
  faCss3,
  faJsSquare,
  faReact,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { SiCplusplus, SiCsharp, SiMongodb, SiPython } from "react-icons/si";
import { FaJava } from "react-icons/fa6";

const Skill = () => {
  const skillCategories = [
    {
      name: "Web Development",
      skills: [
        {
          name: "HTML",
          icon: <FontAwesomeIcon icon={faHtml5} />,
          progress: 85,
        },
        {
          name: "CSS",
          icon: <FontAwesomeIcon icon={faCss3} />,
          progress: 65,
        },
        {
          name: "JavaScript",
          icon: <FontAwesomeIcon icon={faJsSquare} />,
          progress: 80,
        },
        {
          name: "React",
          icon: <FontAwesomeIcon icon={faReact} />,
          progress: 75,
        },
      ],
    },
    {
      name: "Programming Languages",
      skills: [
        { name: "C++", icon: <SiCplusplus size={25} />, progress: 80 },
        { name: "C#", icon: <SiCsharp size={25} />, progress: 60 },
        {
          name: "Java",
          icon: <FaJava />,
          progress: 60,
        },
        {
          name: "Python",
          icon: <SiPython size={25} />,
          progress: 40,
        },
      ],
    },
    {
      name: "Database Management",
      skills: [
        {
          name: "MySQL",
          icon: <FontAwesomeIcon icon={faDatabase} />,
          progress: 75,
        },
        {
          name: "Firebase",
          icon: <FontAwesomeIcon icon={faFireAlt} size="md" />,
          progress: 70,
        },
        {
          name: "MongoDB",
          icon: <SiMongodb size={25} />,
          progress: 40,
        },
      ],
    },
    {
      name: "Software Tools",
      skills: [
        {
          name: "Git",
          icon: <FontAwesomeIcon icon={faGithub} />,
          progress: 50,
        },
        {
          name: "MS Word/Excel/PowerPoint",
          icon: <FontAwesomeIcon icon={faFileAlt} />,
          progress: 90,
        },
      ],
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    // If the clicked index is already open, close it, otherwise set it as open
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="skill">
      <div className="skill">
        <div className="abt-top">
          <h2>SKILLS</h2>
          <p>My Technical Level</p>
        </div>
        <div className="skill-out">
          <div className="skill-btm">
            {skillCategories.map((category, index) => (
              <div key={index}>
                <div
                  className={`skill-summary ${
                    openIndex === index ? "opened" : ""
                  }`}
                  onClick={() => handleToggle(index)}
                >
                  <h4 className="skillll">
                    <span>
                      <FontAwesomeIcon icon={faCode} />
                      {"    "}
                    </span>
                    {category.name}
                  </h4>
                  <span>
                    <FontAwesomeIcon
                      icon={faCaretDown}
                      className={`drop-down ${
                        openIndex === index ? "rotate" : ""
                      }`}
                    />
                  </span>
                </div>
                <div className={`ans ${openIndex === index ? "open" : ""}`}>
                  {category.skills.map((skill, skillIndex) => (
                    <div className="ans1" key={skillIndex}>
                      <div className="name">
                        <div className="ico-name">
                          <span>{skill.icon}</span>
                          {skill.name}
                        </div>
                        <div>{skill.progress}%</div>
                      </div>
                      <progress
                        className="progress"
                        value={skill.progress}
                        max="100"
                      />
                    </div>
                  ))}
                </div>
                <hr />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skill;
