import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/Registration.css';
import { Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SideNav from '../Components/SideNav';
import TopNav from '../Components/TopNav';
import UserLayout from "../Components/UserLayout";
import { useParams } from 'react-router-dom';

import CircularProgress from '@mui/material/CircularProgress';
import API_URL from '../config';
import axios from 'axios';
import Table from "react-bootstrap/Table";

const DescriptionComp = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  // const { title, description, teamMembers } = data;

  const loggedInUser = {
    role: 'Captain',
  };
  const [showModal, setShowModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const getMembers = async () => {
        try {
          const response = await axios.get(`${API_URL}/competitions/getMembers/${id}`, 
          {headers: {
            Authorization: `Bearer ${localStorage.accessToken}`,
        }})
        console.log(response.data)
        setLoading(false);
        setTitle(response.data.data.name);
        if(response.data.data.teamMembers) {
          setTeamMembers(response.data.data.teamMembers);
        }else{
          setTeamMembers([]);
        }
      } catch (error) {
        alert('Error fetching team members');
        console.log(error);
      }
    }
    getMembers();
  }, []);

  const handleButtonClick = () => {
    navigate('/dashboard');
  };

  const handleDelete = (index) => {
    setShowModal(true);
    setDeleteIndex(index);
  };

  const handleConfirmDelete = () => {
    setShowModal(false);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  return (
    <UserLayout>
      {loading ? <CircularProgress /> :
      <>
          <div>
            <Typography variant="h2" align="left">
              {title}
            </Typography>
            {/* <Typography variant="subtitle1" align="left" gutterBottom>
              <b>Description</b>
            </Typography>*/}
            <Typography variant="subtitle1" align="left" gutterBottom>
              <b>Team Members</b>
            </Typography>
            <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {teamMembers.length === 0 ? (
            <tr>
              <td className="text-center" colSpan={8}>
                This is single player competition
              </td>
            </tr>
          ) : (
            teamMembers.map((member) => {
                return (
                  <tr>
                    <td>{member.name}</td>
                    <td>{member.email}</td>
                    <td>{member.isCap ? "Captain" : "Member"}</td>
                  </tr>
                );
              })
          )}
        </tbody>
      </Table>
          </div>
          <Button
            className="btn btnColor left-align"
            onClick={handleButtonClick}
          >
            Go Back
          </Button>
      

      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'white',
            padding: '20px',
            borderRadius: '5px',
            
          }}
        >
          <p>Are you sure you want to delete this member?</p>
          <div>
            <Button
              className="btn btn-secondary round-edge me-5"
              onClick={handleCancelDelete}
            >
              Cancel
            </Button>
            <Button
              className="btn btn-primary round-edge"
              onClick={handleConfirmDelete}
            >
              Confirm
            </Button>
          </div>
        </div>
      )}
    </>
}
    </UserLayout>
    
  );
};

export default DescriptionComp;



// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../Styles/Registration.css';
// import { Typography} from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import React, { useState } from 'react';
// import { Button } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import SideNav from '../Components/SideNav';
// import TopNav from '../Components/TopNav';
 

// //FOR TEAM SPORTS

// const CricketDescription = ({ data }) => {

//     const navigate = useNavigate();
//     const { title, description, teamMembers } = data;
  
//     // const removeMember = (index) => {
//     //   alert(`Are you sure you want to delete the member`);
//     // };
//     const loggedInUser={
//       role:'Captain'
//     }
//     const [showModal, setShowModal] = useState(false);
//     const [deleteIndex, setDeleteIndex] = useState(null);

//     const handleButtonClick = () => {
//       navigate('/dashboard');
//     }
  
//     const handleDelete = (index) => {
//       setShowModal(true);
//       setDeleteIndex(index);
//     };
  
//     const handleConfirmDelete = () => {
//       setShowModal(false);
//     };
  
//     const handleCancelDelete = () => {
//       setShowModal(false);
//     };
//     return (
//       <div className="container mt-5"> 
//       <div>
//         <Typography variant="h2" align="left">{title}</Typography>
//         <Typography ariant="subtitle1" align="left" gutterBottom>
//           <b>Description</b>
//         </Typography>
//         <Typography variant="body1" align="left">{description}</Typography>
//         <br/>
//         <br/>
//         <Typography ariant="subtitle1" align="left" gutterBottom>
//           <b>Team Members</b>
//         </Typography>
//         {teamMembers.map((member, index) => (
//   <div key={index} style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px', marginBottom:'10px' }}>
//     <div style={{ flex: 1, display: 'flex'}}>
//       <div style={{ marginRight: '10px' }}>
//         <img src={member.profilePicture} alt={member.name} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
//       </div>
//       <div>
//         <Typography variant="subtitle1" align="left">{member.name}</Typography>
//         <Typography variant="body2" align="left">{member.role}</Typography>
//       </div>
//     </div>
//     {loggedInUser.role === "Captain" && (
//       <div>
//         <Button className="btn btn-primary round-edge" onClick={() => handleDelete(index)}>
//           Remove
//         </Button>
//       </div>
//     )}
//     {showModal && (
//         <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }}>
//           <p>Are you sure you want to delete this member?</p>
//           <div>
//             <Button className="btn btn-secondary round-edge me-5" onClick={handleCancelDelete}>Cancel</Button>
//             <Button className="btn btn-primary round-edge" onClick={handleConfirmDelete}>Confirm</Button>
//           </div>
//         </div>
//       )}
      
//   </div>
// ))}

//       </div>
//       <button className="btn btn-primary round-edge left-align" 
//       onClick={handleButtonClick}>Go Back</button>
//       </div>
      
//     );
//   };
// export default CricketDescription;

// FOR SINGLE SPORTS
// const Description = ({ title, description }) => {
// return(
// <div className="container mt-5"> 
// <div>
//       <Typography variant="h2" align="left">{title}</Typography>
//       <Typography variant="subtitle1" align="left" gutterBottom>
//       <b>Description</b>
//       </Typography>
//       <Typography variant="body1" align="left">{description}</Typography>
//     </div>
//       <button 
//              className="btn btn-primary round-edge right-align">Leave</button> 
//       </div>       
// );
// }
// export default Description;
