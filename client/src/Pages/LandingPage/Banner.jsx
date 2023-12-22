import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/LandingPage/Banner.css';
import olympiad from '../../Images/logo/logo_without_text.png';
const Banner = () => {
    // const [isScrolled, setIsScrolled] = useState(false);

    // const handleScroll = () => {
    //     const scrolled = window.scrollY > 50; // Change this value based on when you want the effect to trigger
    //     setIsScrolled(scrolled);
    // };

    // useEffect(() => {
    //     window.addEventListener('scroll', handleScroll);
    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, []);

    return (
        <div className={`banner-container`} id="banner">
            <video
                autoPlay
                loop
                playsInline
                muted
                className="w-100"
                style={{border: "none"}}
            >
                <source src="NUSTOLYMPIAD.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            {/* {isScrolled && (
                <div className="overlay-content">
                    <img src={olympiad} alt="olympiad logo" width={200} className="mx-auto my-0"/>
                    <h1 className="my-0">NUST OLYMPIAD 24</h1>
                    <p>Come and join us in the biggest event</p>
                    <a href="/signup"><button className="btn btnColor">Register</button></a>
                </div>
            )} */}
        </div>
    );
}

export default Banner;