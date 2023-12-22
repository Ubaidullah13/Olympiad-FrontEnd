import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import '../../Styles/LandingPage/Banner.css';
// import '../../Styles/LandingPage/AboutUsSection.css';
import Modal from "react-bootstrap/Modal";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
const Olympiad = () => {

    const [modalShow, setModalShow] = useState(false);

    const handleVideoClick = () => {
      setModalShow(true);
    };


  return (
    <>
      <div id="Olympiad">
        <div className="row align-items-start">
          <div className="col-lg-6 col-md-6 mt-4 pt-2 mt-sm-0 opt-sm-0">
            <div className="section-title ml-lg-5">
              <h2 className="font-weight-normal mb-3" id="about-us-title">
                What is Olympiad?
              </h2>
              <h5 className="title mb-4">
              Where Passion Meets Potential in a Symphony of Talent and Tenacity
              </h5>
              <p className="Abouttext mb-0">
              Embark on a thrilling four-day journey where passion ignites, talents converge, and spirits soar! Olympiad is not just an event; it's a celebration of dynamism and diversity, a vibrant tapestry woven with the threads of competition, camaraderie, and jubilation. From the adrenaline-fueled intensity of outdoor sports to the strategic battles in the world of indoor games, every moment is a pulse-pounding adventure.
              </p>
              <br></br>
              <p className="Abouttext mb-0">
              Join us in this grand arena where champions are made, friendships are forged, and the essence of youth is celebrated in its most vivid and vivacious form. Olympiad is more than just a competition; it's a festival of dreams, a place where every heartbeat resonates with the spirit of victory and every night is a carnival of stars. Be a part of this extraordinary extravaganza and dive into an unforgettable experience that defines the epitome of exuberance and excellence!
              </p>
            </div>
          </div>
        

        <div className="col-lg-6 col-md-6 col-12">
        <div className="video-container" onClick={handleVideoClick}>
            <video loop playsInline className="w-100" style={{ border: "none" }}>
              <source src="intro.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="play-icon">
              <PlayCircleOutlineIcon style={{ fontSize: 60, color: 'var(--primary-dark)' }} />
            </div>
          </div>
        </div>
      </div>
      </div>
      <Modal
  className="custom-modal-size"
  show={modalShow}
  onHide={() => setModalShow(false)}
  aria-labelledby="contained-modal-title-vcenter"
  centered
>
  <Modal.Body>
    <video controls autoPlay className="w-100">
      <source src="intro.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </Modal.Body>
</Modal>
    </>
  );
};

export default Olympiad;
