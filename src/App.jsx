import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Home from "./pages/home";
import About from "./components/about/about"; // This import seems unused, consider removing if not needed for routing
import "./App.css";

import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // values from 0 to 3000, with step 50ms
      once: true, // whether animation should happen only once - while scrolling down
    });
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* If About component is meant to be a separate page, it needs its own Route:
          <Route path="/about" element={<About />} /> 
          Otherwise, if it's part of Home, this import isn't strictly needed here.
          */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
