import React, { useEffect, useState } from "react";

import CustomCard from "../Components/CustomCard";
import { Grid, Typography } from "@mui/material";
import JoinTeamCard from "../Components/JoinTeamCard";
import CreateTeamCard from "../Components/CreateTeamCard";
import UserLayout from "../Components/UserLayout";

import API_URL from "../config";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';

const apiUrl = API_URL;

const Dashboard2 = () => {
  useEffect(() => {
    const getTeamSports = async () => {
      try {
        const response = await axios.get(`${API_URL}/sports/genderTeamSports`, {
          headers: {
            Authorization: `Bearer ${localStorage.accessToken}`,
          },
        });
        // console.log(response.data.data);
        SetCreateTeamData(response.data.data);
        // console.log(CreateTeamData);
      } catch (error) {}
    };

    const getIndividualSports = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/sports/genderSingleSports`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.accessToken}`,
            },
          }
        );
        setIndividualParticipationData(response.data.data);
        setLoading(false);
      } catch (error) {}
    };
    getTeamSports();
    getIndividualSports();
    // console.log("Initial call to Dashboard2");

    // Set up the interval
    const intervalId = setInterval(() => {
        getTeamSports();
        getIndividualSports();
       // console.log("Dashboard2 - Interval call");
    }, 5000); // 5000 milliseconds = 5 seconds

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
 
  }, []);

  const [selectedHeader, setSelectedHeader] = useState("individual");
  const [loading, setLoading] = useState(true);

  const handleHeaderChange = (newHeader) => {
    setSelectedHeader(newHeader);
  };
  const [individualParticipationData, setIndividualParticipationData] = useState([]);

  const [CreateTeamData, SetCreateTeamData] = useState([]);
  const cardData =
    selectedHeader === "individual"
      ? individualParticipationData
      : CreateTeamData;

  return (
    <UserLayout>
      <Typography
        variant="h4"
        component="div"
        sx={{ fontWeight: "bold", fontFamily: "LemonMilkBold" }}
      >
        Sports
      </Typography>
      {loading ? 
      <>
        <h6>Fetching Sports</h6>
        <CircularProgress />
      </>
      : (

      <div style={{ flex: "1", padding: "20px", backgroundColor: "#f5f5f5" }}>
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <div
            onClick={() => handleHeaderChange("individual")}
            style={{
              cursor: "pointer",
              padding: "10px",
              backgroundColor:
                selectedHeader === "individual" ? "var(--primary-dark)" : "",
              color:
                selectedHeader === "individual"
                  ? "white"
                  : "var(--primary-dark)",
              borderRadius: "15px",
              marginBottom: "20px",
            }}
          >
            <h2 style={{ margin: "0" }}>Individual</h2>
          </div>
          <div
            onClick={() => handleHeaderChange("team")}
            style={{
              cursor: "pointer",
              padding: "10px",
              backgroundColor:
                selectedHeader === "team" ? "var(--primary-dark)" : "",
              color:
                selectedHeader === "team" ? "white" : "var(--primary-dark)",
              borderRadius: "15px",
              marginBottom: "20px",
            }}
          >
            <h2 style={{ margin: "0" }}>Team</h2>
          </div>
        </div>
        {selectedHeader === "individual" ? '' :
        <p className="text-muted">We are thrilled to announce that the charges for one game of volleyball, basketball, futsal and cricket only are completely free. If you create a team for other sport, charges will be applicable. For example, if you create three teams: one for cricket, one for volleyball and one for basketball, then one of these three games will be free and you will only be charged for other two games. (Only for first challan)</p>
        }
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <h2 style={{ margin: "0", color: "#2196F3" }}>
            {selectedHeader === "individual"
              ? "Individual Participation"
              : "Team Participation"}
          </h2>
          <div
            style={{
              borderBottom: "1px solid #ccc",
              marginLeft: "10px",
              flex: "1",
            }}
          ></div>
        </div>

        <div>
          {/* Conditionally Render JoinTeamCard */}
          {selectedHeader === "team" && <JoinTeamCard />}
          <Grid container spacing={2}>
            {cardData.map((card, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                {selectedHeader === "individual" ? (
                  <CustomCard {...card} />
                ) : (
                  <CreateTeamCard {...card} />
                )}
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
      )}
    </UserLayout>
  );
};

export default Dashboard2;
