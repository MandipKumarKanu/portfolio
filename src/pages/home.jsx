import { useEffect } from "react";
import Main from "../components/main/main";
import About from "../components/about/about";
import Skill from "../components/skills/skill";
import Qualification from "../components/qualification/qualification";
import Project from "../components/project/project";
import Contact from "../components/contact/contact";
import Footer from "../components/footer/footer";

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Main />
      <About />
      <Skill />
      <Qualification />
      <Project />
      <Contact />
      <Footer />
    </>
  );
}

export default Home;
