import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import RegLayout from "../../Components/RegLayout";
import axios from "axios";
import API_URL from "../../config";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
const Users = () => {
  const token = localStorage.getItem("accessToken");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const getUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/user/allUsers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  getUsers();

  return (
    <RegLayout>
      <Typography
        variant="h4"
        component="div"
        sx={{ fontWeight: "bold", fontFamily: "LemonMilkBold" }}
      >
        Participants
      </Typography>
      {loading && <CircularProgress />}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Email Status</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {users.length === 0 ? (
          <tr>
            <td className="text-center" colSpan={8}>
              No entries Found
            </td>
          </tr>
        ) : (
          users.map((user) => {
            return user.basicInfo === null ? (
              <>
                {/* You can use React.Fragment or an empty div to wrap the content */}
              </>
            ) : (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isVerified ? "Verified" : "Unverified"}</td>
                <td>{user.basicInfo.phoneno}</td>
                <td>{user.basicInfo.gender ? "male" : "female"}</td>
                <td>{user.basicInfo.status}</td>
                <td><button onClick={()=>navigate(`/user/${user.id}`)}>View</button></td>
              </tr>
            );
          })
        )}

        </tbody>
      </Table>
    </RegLayout>
  );
};
export default Users;
