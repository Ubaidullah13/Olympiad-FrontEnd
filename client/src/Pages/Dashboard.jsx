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
       console.log(response.data)
      setStatus(response.data.data.status)
      setIsApplied(response.data.data.accomodation)
      setLoading(false);
    } catch (error) {
      console.log(error)
    }
    }

    const getIndiSports = async() => {
      try {
        const responseSingle = await axios.get(`${API_URL}/sports/genderSingleSports`, 
        {headers: {
        Authorization: `Bearer ${localStorage.accessToken}`,
      }})

      const individualSports = []
      responseSingle.data.data.forEach((sport) => {
        if(sport.hasApplied) {
          individualSports.push(sport)
        }
      })
      setIndieSports(individualSports)
      
    } catch (error) {
      console.log(error)
    }
    }

    const getIndiComp = async() => {
      try {
        const responseSingleComp = await axios.get(`${API_URL}/competitions/genderSingleSports`, 
        {headers: {
        Authorization: `Bearer ${localStorage.accessToken}`,
      }})

      const individualComp = []
      responseSingleComp.data.data.forEach((sport) => {
        if(sport.hasApplied) {
          individualComp.push(sport)
        }
      })
      console.log(individualComp)
      setIndieComp(individualComp)
      
    } catch (error) {
      console.log(error)
    }
    }

    const getTeamSports = async() => {
      try{
        const responseTeam = await axios.get(`${API_URL}/sports/genderTeamSports`, 
        {headers: {
        Authorization: `Bearer ${localStorage.accessToken}`,
      }})
      
      const teamSports = []
      responseTeam.data.data.forEach((sport) => {
        if(sport.hasApplied) {
          teamSports.push(sport)
        }
      })
      setTeamSports(teamSports)

      }catch (error) {
        console.log(error)
      }
    }

    const getTeamComp = async() => {
      try{
        const responseTeamComp = await axios.get(`${API_URL}/competitions/genderTeamSports`, 
        {headers: {
        Authorization: `Bearer ${localStorage.accessToken}`,
      }})
      
      const teamComp = []
      responseTeamComp.data.data.forEach((sport) => {
        if(sport.hasApplied) {
          teamComp.push(sport)
        }
      })
      setTeamComp(teamComp)

      }catch (error) {
        console.log(error)
      }
    }

    getBasicDisplay();
    getIndiSports();
    getTeamSports();
    getIndiComp();
    getTeamComp();
  }, [])

  const [status, setStatus] = useState("Pending");
  const [isApplied, setIsApplied] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const customDialogContent = "Are you sure you want to apply for accommodation?"
  const [indieSports, setIndieSports] = useState([]);
  const [indieComp, setIndieComp] = useState([]);
  const [teamSports, setTeamSports] = useState([]);
  const [teamComp, setTeamComp] = useState([]);
  
  const handleApplyClick = () => {
    // Display the AlertBox when the 'Apply' button is clicked
    setAlertOpen(true);
  };

  const handleConfirmApply = async () => {
    const token = localStorage.accessToken;

    try {
      const response = await axios.post(`${API_URL}/basic/basicApplyAccomodation`, {},
      {headers: {
      Authorization: `Bearer ${token}`,
    }})
    // console.log(response)
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
    // {
    //   title: 'pending',
    //   description: 'Challan Status',
    //   color : '#FFB1B1',
    // },
    {
      title: isApplied ? 'Applied' : 'Not applied',
      description: 'Accommodation Status',
      color: '#E7AEFF', // Specify the color for the third card
    },
  ];

    // combine indieSports and teamSPorts and assign data to CardData
    const cardDataSports = [...indieSports, ...teamSports];
    const cardDataComp = [...indieComp, ...teamComp];



    return (
     
      <UserLayout>
            <Typography variant="h4" component="div"  sx={{ fontWeight: 'bold', fontFamily: 'LemonMilkBold' }}>
              Dashboard
            </Typography>
            
            <p className='text-muted'>Note: We will try to minimize clashes but the organizers will not be responsible if any participant misses their competition or sport due to clashes</p>
            
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
            Accommodation is on first come first serve basis. By clicking the following button your request for accommodation will be saved which will be reviewed after the registration process ends. Our team will contact you through email with a separate challan for accommodation charges once your request is approved.
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
            {cardDataSports.length === 0 ? 
            <Typography variant="p" component="div" sx={{ mt: 2, fontFamily: 'LemonMilkBold' }}>
                You have not applied for any sports yet.
            </Typography> 
            :
            <Grid container spacing={2}>
              {cardDataSports.map((card, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <OpenCard {...card} />
                </Grid>
              ))}
            </Grid>
            }
  
            {/* My Competitions Cards Section */}
            <Typography variant="h5" component="div" sx={{ mt: 2, fontWeight: 'bold', fontFamily: 'LemonMilkBold' }}>
              My Competitions
            </Typography>
            {cardDataComp.length === 0 ? 
            <Typography variant="p" component="div" sx={{ mt: 2, fontFamily: 'LemonMilkBold' }}>
                You have not applied for any competitions yet.
            </Typography> 
            :
            <Grid container spacing={2}>
              {cardDataComp.map((card, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <OpenCard {...card} />
                </Grid>
              ))}
            </Grid>
            }
            
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


