import "bootstrap/dist/css/bootstrap.min.css";
import "../../Styles/LandingPage/EC.css";
import "../../Styles/LandingPage/Sports.css";

const Comp = () => {
  // make a list of 13 sports
  const sports = [
    "Palette Fusion",
    "Cinematic Clash",
    "Bait Baazi",
    "Literary Mind Challenge",
    "Debates Open (English)",
    "Debates Open (urdu)",
    "Battle of the Bands",
    "Literature Labyrinth",
    "Brainwave",
    "Crimeline",
    "Escape Room",
    "Sumo Wars",
    "Robo Wars",
    "Flight Wars",
    "Einsteins Enigma",
    "Cultural competition"
  ];

  return (
    <>
      <section className="page-section" id="team">
        <div className="pr-5 pl-5 pt-0 pb-0">
          <div className="text-center">
            <h2 className="section-heading text-uppercase text-center pb-2">
              Competitions
            </h2>
          </div>

          {/* pick the sports from the sport list and render all by making a ul with ID="sports" and make sure make 3 columns dynamically */}
          <div className="row" style={{ justifyContent: "center" }}>
            <div className="col-lg-3">
              <ul id="sports" style={{ lineHeight: "2rem" }}>
                {sports.slice(0, 4).map((sport, index) => (
                  <li key={index}>{sport}</li>
                ))}
              </ul>
            </div>
            <div className="col-lg-3">
              <ul id="sports" style={{ lineHeight: "2rem" }}>
                {sports.slice(4, 8).map((sport, index) => (
                  <li key={index}>{sport}</li>
                ))}
              </ul>
            </div>
            <div className="col-lg-3">
              <ul id="sports" style={{ lineHeight: "2rem" }}>
                {sports.slice(8, 12).map((sport, index) => (
                  <li key={index}>{sport}</li>
                ))}
              </ul>
            </div>
            <div className="col-lg-3">
              <ul id="sports" style={{ lineHeight: "2rem" }}>
                {sports.slice(12, 16).map((sport, index) => (
                  <li key={index}>{sport}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Comp;
