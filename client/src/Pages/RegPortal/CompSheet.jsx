import React from "react";
import { useState } from "react";
import { Grid, Typography } from "@mui/material";
import RegLayout from "../../Components/RegLayout";
import TeamCompTable from "../../Components/TeamCompTable";
import IndividualCompTable from "../../Components/IndividualCompTable";
import SportsDropDown from "../../Components/SportsDropDown";
import API_URL from "../../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function CompSheet() {
  const token = localStorage.getItem("accessToken");
  const [loading, setLoading] = useState(true);
  const [sport, setSport] = useState(null);
  const [sportsList, setSportsList] = useState(null);
  const navigate = useNavigate();

  const getSports = async () => {
    try {
      const response = await axios.get(`${API_URL}/competitions/allSports`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSportsList(response.data.data);
      // console.log(response.data.data);
      const firstSport = response.data.data[0];
      if (firstSport.maxPlayer > 1) {
        getTeamSport(firstSport.id);
      } else {
        getIndividualSport(firstSport.id);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      if (error.response.data.message === "Unauthorized") {
        alert("Session Expired! Please Login Again");
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  const getTeamSport = async (id) => {
    try {
      const response = await axios.get(
        `${API_URL}/competitions/getCompetitionTeam/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSport(response.data.data);
      console.log(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      if (error.response.data.message === "Unauthorized") {
        alert("Session Expired! Please Login Again");
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  const getIndividualSport = async (id) => {
    try {
      const response = await axios.get(
        `${API_URL}/sports/getSportsIndividual/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSport(response.data.data);
      console.log("Data of comp");
      console.log(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      if (error.response.data.message === "Unauthorized") {
        alert("Session Expired! Please Login Again");
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  const handleSportChange = async (id, isIndividual) => {
    if (!isIndividual) {
      getTeamSport(id);
    } else {
      getIndividualSport(id);
    }
  };

  useEffect(() => {
    getSports();
  }, []);

  return (
    <div>
      <RegLayout>
        <div style={{ display: "flex" }}>
          <Typography
            variant="h4"
            component="div"
            sx={{ fontWeight: "bold", fontFamily: "LemonMilkBold" }}
          >
            Competitions
          </Typography>
          {sportsList && (
            <SportsDropDown
              onChange={handleSportChange}
              sportsList={sportsList}
            ></SportsDropDown>
          )}
        </div>
        {sport &&
          (sport.isIndividual ? (
            <IndividualCompTable sport={sport}></IndividualCompTable>
          ) : (
            <TeamCompTable sport={sport}></TeamCompTable>
          ))}
      </RegLayout>
    </div>
  );
}

export default CompSheet;
