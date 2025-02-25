import React, { useState } from "react";
import { Card, CardContent, Button, Typography, Box } from "@mui/material";
import AlertBox from "./AlertBox"; // Import the AlertBox component
import axios from "axios";
import API_URL from "../config";
import { useEffect } from "react";

const CustomCard = ({
  id,
  name,
  gender,
  description,
  minPlayer,
  maxPlayer,
  teamCap,
  details,
  price,
  hasApplied,
}) => {
  useEffect(() => {
    setIsApplied(hasApplied);
  }, [hasApplied]);
  const [isApplied, setIsApplied] = useState(hasApplied);
  const [alertOpen, setAlertOpen] = useState(false);
  const customDialogContent = "Are you sure you want to apply in this sports?";
  const [appliedSportId, setAppliedSportId] = useState("");

  const handleApplyClick = (e) => {
    e.preventDefault();
    setAppliedSportId(e.target.getAttribute("data-sport-id"));
    // Display the AlertBox when the 'Apply' button is clicked
    setAlertOpen(true);
  };

  const handleConfirmApply = async (e) => {
    e.target.style.backgroundColor = "grey";
    const data = {
      sportId: parseInt(appliedSportId),
    };
    try {
      const response = await axios.post(
        `${API_URL}/competitions/applyIndividualSport`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.accessToken}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    e.target.style.backgroundColor = "blue";
    setIsApplied(true);
    setAlertOpen(false);
  };

  const handleCancelApply = () => {
    // Handle cancel action if needed
    setAlertOpen(false);
  };

  // TeamCap
  const competitionIds = [];

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
            sx={{ fontSize: "1.1rem", textAlign: "center" }}
          >
            Rs. {price}/-
          </Typography>
          {   isApplied ?  <Button
            variant="contained"
            color={isApplied ? "grey" : "primary"}
            sx={{
              width: "60%",
              mt: 2,
              color: "white",
              borderRadius: "20px",
              fontWeight: "bold",
            }}
            onClick={handleApplyClick}
            disabled={isApplied}
            data-sport-id={id}
          >
            {isApplied ? "Applied" : "Apply"}
          </Button>
        :
        <>
         { competitionIds.includes(id) ? 
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
            color={isApplied ? "grey" : "primary"}
            sx={{
              width: "60%",
              mt: 2,
              color: "white",
              borderRadius: "20px",
              fontWeight: "bold",
            }}
            onClick={handleApplyClick}
            disabled={isApplied}
            data-sport-id={id}
          >
            {isApplied ? "Applied" : "Apply"}
          </Button>
          }
        </>  
        }
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
      <AlertBox
        open={alertOpen}
        onClose={() => setAlertOpen(false)}
        onConfirm={handleConfirmApply}
        dialogContent={customDialogContent}
      />
    </div>
  );
};

export default CustomCard;

// import React, { useState } from 'react';
// import { Card, CardContent, Button, Typography, Box } from '@mui/material';

// const CustomCard = ({ title, description, doneCount, leftCount }) => {
//   const [isApplied, setIsApplied] = useState(false);

//   const handleApplyClick = () => {
//     setIsApplied(true);
//     // Additional logic or API calls can be added here.
//   };

//   return (
//     <Card sx={{ borderRadius: '20px', maxWidth: 300, margin: '30px', alignItems: 'center', backgroundColor: '#f5f5f5', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
//       <CardContent sx={{ textAlign: 'center' }}>
//         <Typography variant="h5" component="div">
//           {title}
//         </Typography>
//         <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
//           {description}
//         </Typography>
//         <Button
//           variant="contained"
//           color={isApplied ? 'grey' : 'primary'}
//           sx={{ width: '60%', mt: 2, color: 'white', borderRadius: '20px', fontWeight: 'bold' }}
//           onClick={handleApplyClick}
//           disabled={isApplied}
//         >
//           {isApplied ? 'Applied' : 'Apply'}
//         </Button>
//         <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'left', fontSize: '1.1rem' }}>
//             {doneCount} done
//           </Typography>
//           <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'right', fontSize: '1.1rem' }}>
//             {leftCount} left
//           </Typography>
//         </Box>
//       </CardContent>
//     </Card>
//   );
// };

// export default CustomCard;
