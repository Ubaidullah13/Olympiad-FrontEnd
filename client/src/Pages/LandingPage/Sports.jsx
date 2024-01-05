import "bootstrap/dist/css/bootstrap.min.css";
import "../../Styles/LandingPage/EC.css";
import "../../Styles/LandingPage/Sports.css";

const Sports = () => {

    // make a list of 13 sports
    const sports = [
        'Rapid Chess Duel',
        'Tug of War',
        'Wall Climbing',
        'Kyudo Taikai',
        'Fifa',
        'Valorant',
        'Tekken',
        'Paint Warriors',
        'Futsal',
        'Cricket',
        'Basketball',
        'Volleyball',
        'Table Tennis-Single',
        'Table Tennis-Double',
        'Badminton-Single',
        'Badminton-Double',
        'Tennis-Single',
        'Snooker',
        'Squash',
        'Handball',
        '200m Race',
        '4x100 m Relay Race',      
    ];

  return (
    <>
        <section className="page-section bg-light" id="team">
            <div className="pr-5 pl-5 pt-0 pb-0">
            <div className="text-center">
                <h2 className="section-heading text-uppercase text-center pb-2">
                Sports
                </h2>
            </div>

            {/* pick the sports from the sport list and render all by making a ul with ID="sports" and make sure make 3 columns dynamically */}
            <div className="row" style={{ justifyContent: "center" }}>
                <div className="col-lg-3">
                <ul id="sports" style={{lineHeight: "2rem"}}>
                    {sports.slice(0, 6).map((sport, index) => (
                    <li  key={index}>
                        {sport}
                    </li>
                    ))}
                </ul>
                </div>
                <div className="col-lg-3">
                <ul id="sports" style={{lineHeight: "2rem"}}>
                    {sports.slice(6, 12).map((sport, index) => (
                    <li key={index}>
                        {sport}
                    </li>
                    ))}
                </ul>
                </div>
                <div className="col-lg-3">
                <ul id="sports" style={{lineHeight: "2rem"}}>
                    {sports.slice(12, 17).map((sport, index) => (
                    <li key={index}>
                        {sport}
                    </li>
                    ))}
                </ul>
                </div>
                <div className="col-lg-3">
                <ul id="sports" style={{lineHeight: "2rem"}}>
                    {sports.slice(17, 22).map((sport, index) => (
                    <li key={index}>
                        {sport}
                    </li>
                    ))}
                </ul>
                </div>
            </div>
            </div>
        </section>
    </>
  )
}

export default Sports;