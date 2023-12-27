import React, { useState } from 'react';
import { Card, CardContent, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import AlertBox from './AlertBox'; // Import the AlertBox component

const OpenCard = ({ name, price, minPlayer, maxPlayer, description }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const customDialogContent = "Are you sure you want to apply in this sports?";
  const navigate = useNavigate(); // Get the navigate function

  const handleOpenClick = () => {
    // Direct to '/description' route when the 'Open' button is clicked
    // navigate('/description');
  };

  const handleConfirmApply = () => {
    // Additional logic or API calls can be added here.
    setIsOpened(true);
    setAlertOpen(false);
  };

  const handleCancelApply = () => {
    // Handle cancel action if needed
    setAlertOpen(false);
  };

  return (
    <div>
      <Card sx={{ borderRadius: '20px', maxWidth: 300, margin: '30px', alignItems: 'center', backgroundColor: '#f5f5f5', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
            Rs. {price}
          </Typography>
          <Typography variant="p" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
            {description}
          </Typography>
          {/* <Button
            variant="contained"
            color={isOpened ? 'grey' : 'primary'}
            sx={{ width: '60%', mt: 2, color: 'white', borderRadius: '20px', fontWeight: 'bold' }}
            onClick={handleOpenClick}
            disabled={isOpened}
          >
            {isOpened ? 'Open' : 'Open'}
          </Button> */}
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'left', fontSize: '1.1rem' }}>
              {minPlayer} Minimum
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'right', fontSize: '1.1rem' }}>
              {maxPlayer} Maximum
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

export default OpenCard;
