import React, { useState } from 'react';

import CustomCard from '../Components/CustomCard';
import { Grid, Typography } from '@mui/material';
import JoinTeamCard from '../Components/JoinTeamCard';
import CreateTeamCard from '../Components/CreateTeamCard';
import UserLayout from "../Components/UserLayout";

const Competitions = () => {
  const [selectedHeader, setSelectedHeader] = useState('individual');

  const handleHeaderChange = (newHeader) => {
    setSelectedHeader(newHeader);
  };
  const individualParticipationData = [
    {
      title: 'Cricket',
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

  const CreateTeamData = [
    { gender: 'Male', sports: 'Football', title: 'Football Team', description: 'Create a football team', doneCount: 3, leftCount: 5, teamCode: 2230 },
    { gender: 'Female', sports: 'Basketball', title: 'Basketball Team', description: 'Create a basketball team', doneCount: 2, leftCount: 6, teamCode: 2230 },
  ];
  const cardData = selectedHeader === 'individual' ? individualParticipationData : CreateTeamData;

  return (
    <UserLayout>
            <Typography variant="h4" component="div"  sx={{ fontWeight: 'bold', fontFamily: 'LemonMilkBold' }}>
            Competitions
            </Typography>
        {/* Content Container */}
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
    </UserLayout>
  );
};

export default Competitions;