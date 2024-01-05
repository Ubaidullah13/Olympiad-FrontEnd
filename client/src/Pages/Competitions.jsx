import React, { useState, useEffect } from 'react';

import CustomCard from '../Components/CustomCardComp';
import { Grid, Typography } from '@mui/material';
import JoinTeamCard from '../Components/JoinTeamCardComp';
import CreateTeamCard from '../Components/CreateTeamCardComp';
import UserLayout from "../Components/UserLayout";


import API_URL from "../config";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';


const Competitions = () => {

  useEffect(() => {
    const getTeamSports = async () => {
      try {
        const response = await axios.get(`${API_URL}/competitions/genderTeamSports`, {
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
          `${API_URL}/competitions/genderSingleSports`,
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
 
  });


  const [selectedHeader, setSelectedHeader] = useState('individual');
  const [loading, setLoading] = useState(true);

  const handleHeaderChange = (newHeader) => {
    setSelectedHeader(newHeader);
  };

  const [individualParticipationData, setIndividualParticipationData] = useState([]);

  const [CreateTeamData, SetCreateTeamData] = useState([]);


  // const individualParticipationData = [
  //   {
  //     title: 'Cricket',
  //     description: 'PKR 700/-',
  //     doneCount: 3,
  //     leftCount: 8,
  //   },
  //   {
  //     title: 'Badminton',
  //     description: 'PKR 700/-',
  //     doneCount: 3,
  //     leftCount: 8,
  //   },
  //   {
  //     title: 'Badminton',
  //     description: 'PKR 700/-',
  //     doneCount: 3,
  //     leftCount: 8,
  //   },
  // ];

  // const CreateTeamData = [
  //   { gender: 'Male', sports: 'Football', title: 'Football Team', description: 'Create a football team', doneCount: 3, leftCount: 5, teamCode: 2230 },
  //   { gender: 'Female', sports: 'Basketball', title: 'Basketball Team', description: 'Create a basketball team', doneCount: 2, leftCount: 6, teamCode: 2230 },
  // ];
  const cardData = selectedHeader === 'individual' ? individualParticipationData : CreateTeamData;

  return (
    <UserLayout>
      <Typography variant="h4" component="div"  sx={{ fontWeight: 'bold', fontFamily: 'LemonMilkBold' }}>
        Competitions
      </Typography>
      
        
      {loading ? 
      <>
        <h6>Fetching Competitions</h6>
        <CircularProgress />
      </>
      : (

      <div style={{ flex: '1', padding: '20px', backgroundColor: '#f5f5f5' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <div
            onClick={() => handleHeaderChange('individual')}
            style={{
              cursor: 'pointer',
              padding: '10px',
              backgroundColor: selectedHeader === 'individual' ? 'var(--primary-dark)' : '',
              color: selectedHeader === 'individual' ? 'white' : 'var(--primary-dark)',
              borderRadius: '15px',
              marginBottom:'20px'
            }}
          >
            <h2 style={{ margin: '0' }}>Individual</h2>
          </div>
          <div
            onClick={() => handleHeaderChange('team')}
            style={{
              cursor: 'pointer',
              padding: '10px',
              backgroundColor: selectedHeader === 'team' ? 'var(--primary-dark)' : '',
              color: selectedHeader === 'team' ? 'white' : 'var(--primary-dark)',
              borderRadius: '15px',
              marginBottom:'20px'
            }}
          >
            <h2 style={{ margin: '0' }}>Team</h2>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <h2 style={{ margin: '0', color: '#2196F3' }}>
            {selectedHeader === 'individual' ? 'Individual Participation' : 'Team Participation'}
          </h2>
          <div style={{ borderBottom: '1px solid #ccc', marginLeft: '10px', flex: '1' }}></div>
        </div>
        
        <div >
          {/* Conditionally Render JoinTeamCard */}
          {selectedHeader === 'team' && <JoinTeamCard />}
          <Grid container spacing={2}>
            {cardData.map((card, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                {selectedHeader === 'individual' ? (
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

export default Competitions;
