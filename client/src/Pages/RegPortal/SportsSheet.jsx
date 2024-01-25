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
    IsIndividual: true,
    members: [
      {
        name: "Member 1",
        userid: "656",
        cnic: "1234567890123",
        phone_number: "0123456789",
        email: "abc@example.com",
        Fee: true,
        Challan: true,
      },
      {
        name: "Member 2",
        userid: "123",
        cnic: "2345678901234",
        phone_number: "0987654321",
        email: "abc@example.com",
        Fee: true,
        Challan: false,
      },
      {
        name: "Member 3",
        userid: "325",
        cnic: "2345678901234",
        phone_number: "0987654321",
        email: "abc@example.com",
        Fee: true,
        Challan: false,
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
