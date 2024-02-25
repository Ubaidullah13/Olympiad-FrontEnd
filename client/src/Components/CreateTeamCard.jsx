import React, { useState } from "react";
import {
  Card,
  CardContent,
  Button,
  Typography,
  Box,
  unstable_ClassNameGenerator,
} from "@mui/material";
import CreateTeamAlertBox from "./CreateTeamAlertBox";
import axios from "axios";
import API_URL from "../config";

const CreateTeamCard = ({
  id,
  gender,
  name,
  description,
  minPlayer,
  maxPlayer,
  teamCap,
  details,
  price,
  hasApplied,
  code,
}) => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [isCreateTeamDialogOpen, setCreateTeamDialogOpen] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [newTeamname, setNewTeamName] = useState("");
  const [createTeamSportId, setCreateTeamSportId] = useState("");
  const [teamCode, setTeamCode] = useState(code);

  const handleOpenCreateTeamDialog = () => {
    setCreateTeamDialogOpen(true);
  };

  const handleCloseCreateTeamDialog = () => {
    setCreateTeamDialogOpen(false);
  };

  const handleConfirmCreateTeam = async (e) => {
    e.preventDefault();
    // Add logic for confirming and handling team creation
    // This might involve interacting with your backend or performing other actions

    // You can set the teamCode as needed in your logic

    e.target.style.backgroundColor = "grey";

    const data = {
      sportId: parseInt(createTeamSportId),
      teamName: newTeamname,
    };

    try {
      const response = await axios.post(`${API_URL}/sports/createTeam`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.accessToken}`,
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    e.target.style.backgroundColor = "blue";

    setIsCreated(true);
    handleCloseCreateTeamDialog(); 
  };

  const handleCreateClick = (e) => {
    // Display the AlertBox when the 'Create' button is clicked
    e.preventDefault();
    if (!isCreated) {
      handleOpenCreateTeamDialog();
      setCreateTeamSportId(e.target.getAttribute("data-sport-id"));
    }
  };

  // TeamCap
  const sportsIds = [5,17,18];

  return (
    <div>
      <Card
        sx={{
          borderRadius: "20px",
          maxWidth: 300,
          margin: "30px",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "1.1rem" }}
          >
            PKR {price}/-
          </Typography>
          {code ? (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: "1.1rem", margin: "10px 0" }}
            >
              Team Code: {code}
            </Typography>
          ) : (
            <>
            { sportsIds.includes(id) ? 
              <Button
              variant="contained"
              color="primary"
              disabled
              sx={{
                width: "60%",
                mt: 2,
                color: "white",
                borderRadius: "20px",
                fontWeight: "bold",
              }}
            >
              TeamCap Completed
            </Button>
              : 
            <Button
              variant="contained"
              color="primary"
              sx={{
                width: "60%",
                mt: 2,
                color: "white",
                borderRadius: "20px",
                fontWeight: "bold",
              }}
              onClick={handleCreateClick}
              disabled={hasApplied}
              data-sport-id={id}
            >
              {isCreated ? `Team Code: ${code}` : "Create"}
            </Button>
          }</>
          )}
          <Box
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "left", fontSize: "1.1rem" }}
            >
              {minPlayer} Min
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "right", fontSize: "1.1rem" }}
            >
              {maxPlayer} Max
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* AlertBox component */}
      <CreateTeamAlertBox
        open={isCreateTeamDialogOpen}
        onClose={handleCloseCreateTeamDialog}
        onConfirm={handleConfirmCreateTeam}
        genderVar={gender}
        sportsNameVar={name}
        setNewTeamName={setNewTeamName}
      />
    </div>
  );
};

export default CreateTeamCard;

// import React, { useState } from 'react';
// import { Card, CardContent, Button, Typography, Box } from '@mui/material';
// import CreateTeamAlertBox from './CreateTeamAlertBox';

// const CreateTeamCard = ({ gender, sports, doneCount, leftCount, teamCode }) => {
//   const [alertOpen, setAlertOpen] = useState(false);
//   const [isCreateTeamDialogOpen, setCreateTeamDialogOpen] = useState(false);

//   const handleOpenCreateTeamDialog = () => {
//     setCreateTeamDialogOpen(true);
//   };

//   const handleCloseCreateTeamDialog = () => {
//     setCreateTeamDialogOpen(false);
//   };

//   const handleConfirmCreateTeam = () => {
//     // Add logic for confirming and handling team creation
//     // This might involve interacting with your backend or performing other actions

//     // You can set the teamCode as needed in your logic

//     handleCloseCreateTeamDialog();
//   };

//   const handleCreateClick = () => {
//     // Display the AlertBox when the 'Apply' button is clicked
//     handleOpenCreateTeamDialog();
//   };

//   return (
//     <div>
//       <Card sx={{ borderRadius: '20px', maxWidth: 300, margin: '30px', alignItems: 'center', backgroundColor: '#f5f5f5', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
//         <CardContent sx={{ textAlign: 'center' }}>
//           <Typography variant="h5" component="div">
//             {sports}
//           </Typography>
//           <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
//             PKR 700/-
//           </Typography>
//           {teamCode ? (
//             <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1.1rem', margin: '10px 0' }}>
//               Team Code: {teamCode}
//             </Typography>
//           ) : (
//             <Button
//               variant="contained"
//               color={teamCode ? 'grey' : 'primary'}
//               sx={{ width: '60%', mt: 2, color: 'white', borderRadius: '20px', fontWeight: 'bold' }}
//               onClick={handleCreateClick}
//               disabled={teamCode}
//             >
//               {teamCode ? `Team Code: ${teamCode}` : 'Create'}
//             </Button>
//           )}
//           <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'left', fontSize: '1.1rem' }}>
//               {doneCount} done
//             </Typography>
//             <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'right', fontSize: '1.1rem' }}>
//               {leftCount} left
//             </Typography>
//           </Box>
//         </CardContent>
//       </Card>

//       {/* AlertBox component */}
//       <CreateTeamAlertBox
//         open={isCreateTeamDialogOpen}
//         onClose={handleCloseCreateTeamDialog}
//         onConfirm={handleConfirmCreateTeam}
//         genderVar={gender}
//         sportsNameVar={sports}
//       />
//     </div>
//   );
// };

// export default CreateTeamCard;
