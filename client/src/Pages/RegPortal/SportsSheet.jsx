import React from "react";
import { useState } from "react";
import { Grid, Typography } from "@mui/material";
import RegLayout from "../../Components/RegLayout";
import TeamSportTable from "../../Components/TeamSportTable";
import IndividualSportTable from "../../Components/IndividualSportTable";
import SportsDropDown from "../../Components/SportsDropDown";

function SportsSheet() {
  const [sport, setSport] = useState({
    sport: "Example Sport",
    sportid: "1242",
    IsIndividual: false,
    teams: [
      {
        team_name: "Team A",
        members: [
          {
            name: "Member 1",
            userid: "1242",
            cnic: "12345-6789012-3",
            phone_number: "0123456789",
            email: "abc@example.com",
            Fee: true,
            Challan: true,
          },
          {
            name: "Member 2",
            userid: "124642",
            cnic: "23456-7890123-4",
            phone_number: "0987654321",
            email: "abc@example.com",
            Fee: true,
            Challan: false,
          },
        ],
      },
      {
        team_name: "Team B",
        members: [
          {
            name: "Member 3",
            userid: "687",
            cnic: "34567-8901234-5",
            phone_number: "1234567890",
            email: "abc@example.com",
            Fee: true,
            Challan: true,
          },
          {
            name: "Member 4",
            userid: "796",
            cnic: "45678-9012345-6",
            phone_number: "9876543210",
            email: "abc@example.com",
            Fee: false,
            Challan: false,
          },
        ],
      },
    ],
  });
  return (
    <div>
      <RegLayout>
        <div style={{ display: "flex" }}>
          <Typography
            variant="h4"
            component="div"
            sx={{ fontWeight: "bold", fontFamily: "LemonMilkBold" }}
          >
            Sports
          </Typography>
          <SportsDropDown></SportsDropDown>
        </div>
        {sport.IsIndividual ? (
          <IndividualSportTable sport={sport}></IndividualSportTable>
        ) : (
          <TeamSportTable sport={sport}></TeamSportTable>
        )}
      </RegLayout>
    </div>
  );
}

export default SportsSheet;
