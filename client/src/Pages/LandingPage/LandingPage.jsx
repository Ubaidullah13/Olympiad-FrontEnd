import React from 'react';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AboutUsSection from './AboutUsSection';
import Banner from './Banner';
import Contact from './Contact';
import EC from './EC';
import Sponsors from './Sponsors';
import Nav from './Nav';
import Olympiad from './Olympiad';

const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      {isLoading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: 'rgba(255, 255, 255, 0.8)', // Transparent white background
          }}
        >
          {/* Replace the following line with your logo component */}
          <img
            src="logo.png"
            alt="Logo"
            style={{ width: '500px', height: 'auto' }}
          />
        </div>
      ) : (
        <div style={{ backgroundColor: 'white' }}>
          <Nav />
          <Banner />
          <AboutUsSection />
          <Olympiad />
          <EC />
          {/* <Sponsors /> */}
          <Contact />
        </div>
      )}
    </>
  );
};

export default LandingPage;
