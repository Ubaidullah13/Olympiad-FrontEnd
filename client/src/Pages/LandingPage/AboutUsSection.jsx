import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/LandingPage/AboutUsSection.css';
import CelebrationIcon from '@mui/icons-material/Celebration';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import e1 from "../../Images/event/e1.jpg";
import e2 from "../../Images/event/e2.jpg";
import e3 from "../../Images/event/e3.jpg";

const AboutUsSection = () => {
  return (
    <div id="AboutUs">
      <div className="row align-items-center">
        <div className="col-lg-6 col-md-6 order-2 order-md-1 mt-4 pt-2 mt-sm-0 opt-sm-0">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6 col-6">
              <div className="row">
                <div className="col-lg-12 col-md-12 mt-4 pt-2">
                  <div className="card work-desk rounded border-0 shadow-lg overflow-hidden">
                    <img
                      src={e1}
                      className="img-fluid"
                    />
                    <div className="img-overlay bg-dark"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-6">
              <div className="row">
                <div className="col-lg-12 col-md-12">
                  <div className="card work-desk rounded border-0 shadow-lg overflow-hidden">
                    <img
                      src={e2}
                      className="img-fluid"
                    />
                    <div className="img-overlay bg-dark"></div>
                  </div>
                </div>

                <div className="col-lg-12 col-md-12 mt-4 pt-2">
                  <div className="card work-desk rounded border-0 shadow-lg overflow-hidden">
                    <img
                      src={e3}
                      className="img-fluid"
                    />
                    <div className="img-overlay bg-dark"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6 col-md-6 col-12 order-1 order-md-2">
          <div className="section-title ml-lg-5 text-justify">
            <h2 className="font-weight-normal mb-3" id="about-us-title">Olympiad NUST 24</h2>
            <h5 className="title mb-4">
            Igniting Innovation, Celebrating Excellence – A Journey Beyond Boundaries.
            </h5>
            <p className="Abouttext mb-0">
            Welcome to Olympiad NUST 24, a spectacle of talent, innovation, and sporting excellence, set to unfold in the prestigious corridors of the National University of Sciences and Technology in 2024. This four-day extravaganza is not just an event; it's a groundbreaking celebration of youthful energy, intellectual prowess, and athletic vigor.
            </p>
            <div className="row">
              <div className="col-lg-6 mt-4 pt-2">
                <div className="media align-items-center rounded shadow p-3">
                  <h5 className="ml-3 mb-0 sports">
                  <SportsEsportsIcon className='icon-color'/>
                  &nbsp;Indoor Sports
                  </h5>
                </div>
              </div>
              <div className="col-lg-6 mt-4 pt-2">
                <div className="media align-items-center rounded shadow p-3">
                  <h5 className="ml-3 mb-0 sports">
                  <SportsCricketIcon className='icon-color'/>
                  &nbsp;Outdoor Sports
                  </h5>
                </div>
              </div>
              <div className="col-lg-6 mt-4 pt-2">
                <div className="media align-items-center rounded shadow p-3">
                  <h5 className="ml-3 mb-0 sports">
                    <EmojiEventsIcon className='icon-color'/>
                  &nbsp;Excitement Competition
                  </h5>
                </div>
              </div>
              <div className="col-lg-6 mt-4 pt-2">
                <div className="media align-items-center rounded shadow p-3">
                  <h5 className="ml-3 mb-0 sports">
                   <CelebrationIcon className='icon-color'/>
                      &nbsp;Social Events
                  </h5>
                </div>
              </div>
            </div>
            <br></br>
              <a href="/signup" target='_blank'><button className="btn btn-primary fst-italic" id="submitButton">Register Now</button></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsSection;
