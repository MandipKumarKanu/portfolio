import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Home from "./pages/home"
import DevRoute from "./components/DevRoute";
import "./App.css"

const ProjectAdmin = React.lazy(() => import("./components/project/ProjectAdmin"));

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/admin" 
            element={
              <DevRoute>
                <React.Suspense 
                  fallback={
                    <div style={{
                      padding: '4rem 2rem', 
                      textAlign: 'center', 
                      color: 'var(--font-color)',
                      background: 'var(--primary-color)',
                      minHeight: '100vh',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        border: '3px solid #444',
                        borderTop: '3px solid var(--secondary-color)',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        marginBottom: '20px'
                      }}></div>
                      <p>Loading Admin Panel...</p>
                    </div>
                  }
                >
                  <ProjectAdmin />
                </React.Suspense>
              </DevRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
