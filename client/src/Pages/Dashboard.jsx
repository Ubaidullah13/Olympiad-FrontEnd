import React, { useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import CustomCard from '../Components/CustomCard';
import StatusCard from '../Components/StatusCards';

import { useState } from 'react';

import JoinTeamCard from '../Components/JoinTeamCard';
import OpenCard from '../Components/OpenCard';
import AlertBox from '../Components/AlertBox';
import Button from '@mui/material/Button';
// import SideNav from '../Components/SideNav';
import logo from '../Images/logo/logo.png';
import API_URL from '../config';
import axios from 'axios';
import UserLayout from "../Components/UserLayout";

import CircularProgress from '@mui/material/CircularProgress';


const Dashboard = () => {

  const [loading, setLoading] = useState(true);

  useEffect (() => {
    const getBasicDisplay = async() => {
      try {
        const response = await axios.get(`${API_URL}/basic/basicDisplay`, 
        {headers: {
        Authorization: `Bearer ${localStorage.accessToken}`,
      }})
      // console.log(response.data)
      setStatus(response.data.data.status)
      setIsApplied(response.data.data.accomodation)
      setLoading(false);
    } catch (error) {
      console.log(error)
    }
    }

    getBasicDisplay();
  })

  const [status, setStatus] = useState("Pending");
  const [isApplied, setIsApplied] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const customDialogContent = "Are you sure you want to apply for accommodation?"
  
  const handleApplyClick = () => {
    // Display the AlertBox when the 'Apply' button is clicked
    setAlertOpen(true);
  };

  const handleConfirmApply = async () => {
    try {
      const response = await axios.post(`${API_URL}/basic/basicApplyAccomodation`, 
      {headers: {
      Authorization: `Bearer ${localStorage.accessToken}`,
    }})
    console.log(response)
    //setIsApplied(response.data.data.accomodation)
  } catch (error) {
    alert("Network Error! Please try again later.")
    console.log(error)
  }
    setIsApplied(true);
    setAlertOpen(false);
  };

  const handleCancelApply = () => {
    // Handle cancel action if needed
    setAlertOpen(false);
  };

  
  const statusCardData = [
    {
      title: status,
      description: 'Account Verification',
      color: '#FFD2B1', 
    },
    {
      title: 'pending',
      description: 'Challan Status',
      color : '#FFB1B1',
    },
    {
      title: isApplied ? 'Applied' : 'Not applied',
      description: 'Accommodation Status',
      color: '#E7AEFF', // Specify the color for the third card
    },
  ];

    const cardData = [
      {
        title: 'Badminton',
        description: 'PKR 700/-',
        doneCount: 3,
        leftCount: 8,
      },
      {
        title: 'Badminton',
        description: 'PKR 700/-',
        doneCount: 3,
        leftCount: 8,
      },
      {
        title: 'Badminton',
        description: 'PKR 700/-',
        doneCount: 3,
        leftCount: 8,
      },
      {
        title: 'Badminton',
        description: 'PKR 700/-',
        doneCount: 3,
        leftCount: 8,
      },
    ];


    return (
     
      <UserLayout>
            <Typography variant="h4" component="div"  sx={{ fontWeight: 'bold', fontFamily: 'LemonMilkBold' }}>
              Dashboard
            </Typography>
            {loading ? <CircularProgress /> : (
            <>
            
            <Grid container spacing={2}>
              {statusCardData.map((card, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <StatusCard {...card} />
                </Grid>
              ))}
            </Grid>
            <Typography variant="h5" component="div" sx={{ mt: 2, fontWeight: 'bold', fontFamily: 'LemonMilkBold' }}>
              Accommodation
            </Typography>
            <Typography variant="p" component="div">
              Apply with just one click and our team will contact you through email.
            </Typography>
  
            
            <Button
            variant="contained"
            color={isApplied ? 'grey' : 'primary'}
            sx={{ mb: 2, mt: 2, color: 'white', borderRadius: '10px', fontFamily: 'LemonMilkBold' }}
            onClick={handleApplyClick}
            disabled={isApplied}
          >
            {isApplied ? 'Applied' : 'Apply for Accommodation'}
            </Button>
            <br></br>
            <br></br>
  
            {/* My Sports Cards Section */}
            <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', fontFamily: 'LemonMilkBold' }}>
              My Sports
            </Typography>
            <Grid container spacing={2}>
              {cardData.map((card, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <OpenCard {...card} />
                </Grid>
              ))}
            </Grid>
  
            {/* My Competitions Cards Section */}
            <Typography variant="h5" component="div" sx={{ mt: 2, fontWeight: 'bold', fontFamily: 'LemonMilkBold' }}>
              My Competitions
            </Typography>
            <Grid container spacing={2}>
              {cardData.map((card, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <OpenCard {...card} />
                </Grid>
              ))}
            </Grid>
            
            {/* AlertBox component */}
      <AlertBox
        open={alertOpen}
        onClose={() => setAlertOpen(false)}
        onConfirm={handleConfirmApply}
        dialogContent={customDialogContent}
      />
      </>
      )}
      </UserLayout>
    );
};
export default Dashboard;


