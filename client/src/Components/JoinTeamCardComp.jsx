import React, { useState } from "react";
import {
  Card,
  CardContent,
  Button,
  Typography,
  Box,
  TextField,
} from "@mui/material";
import AlertBox from "./AlertBox"; // Import the AlertBox component
import GppBadOutlinedIcon from "@mui/icons-material/GppBadOutlined";
import axios from "axios";
import API_URL from "../config";
import { useEffect } from "react";

const JoinTeamCard = () => {
  useEffect(() => {});
  const [isJoined, setIsJoined] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [joinTeamCode, setJoinTeamCode] = useState("");

  const customDialogContent = "Are you sure you want to join this team?";

  const handleJoinClick = (e) => {
    e.preventDefault();
    // Display the AlertBox when the 'Apply' button is clicked
    setAlertOpen(true);
  };

  const handleConfirmJoin = async (e) => {
    setIsJoined(true);
    e.target.style.backgroundColor = "grey";
    // Additional logic or API calls can be added here.
    const data = {
      code: joinTeamCode,
    };

    try {
      const response = await axios.post(`${API_URL}/competitions/joinTeam`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.accessToken}`,
        },
      });
      alert(response.data.data);
    } catch (error) {
      alert(error.response.data.data);
    }
    e.target.style.backgroundColor = "blue";
    setAlertOpen(false);
    setIsJoined(false);
    setJoinTeamCode("");
  };

  //   const handleCancelJoin = () => {
  //     // Handle cancel action if needed
  //     setAlertOpen(false);
  //   };

  return (
    <div>
      <Card
        sx={{
          textAlign: "center",
          borderRadius: "20px",
          maxWidth: 300,
          margin: "30px",
          alignItems: "center",
          backgroundColor: "#5D81A5",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h5" component="div">
            Join team with a code
          </Typography>

          <TextField
            label="Team Code"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            style={{ backgroundColor: "white" }}
            value={joinTeamCode}
            onChange={(e) => setJoinTeamCode(e.target.value)}
          ></TextField>
          <Button
            variant="contained"
            color={isJoined ? "success" : "primary"}
            sx={{
              width: "60%",
              mt: 2,
              color: "white",
              borderRadius: "20px",
              fontWeight: "bold",
            }}
            onClick={handleJoinClick}
            disabled={isJoined}
          >
            {isJoined ? "Joined" : "Join"}
          </Button>
        </CardContent>
      </Card>

      {/* AlertBox component */}
      <AlertBox
        open={alertOpen}
        onClose={() => setAlertOpen(false)}
        onConfirm={handleConfirmJoin}
        dialogContent={customDialogContent}
      />
    </div>
  );
};

export default JoinTeamCard;
