import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import RegLayout from "../../Components/RegLayout";
import axios from "axios";
import API_URL from "../../config";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";

const Users = () => {
  const token = localStorage.getItem("accessToken");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
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
      if(error.response.data.message === "Unauthorized")
      {
        alert("Session Expired! Please Login Again");
        localStorage.clear();
        navigate('/login');
      }
    }
  };

  const postsPerPage = 50;
  const lastPostIndex = postsPerPage * currentPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  let pages = [];

  for (let i = 1; i <= Math.ceil(users.length / postsPerPage); i++) {
    pages.push(i);
  }

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
      <p>Total Participants with Infos: {users.length}</p>
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
            users.slice(firstPostIndex, lastPostIndex).map((user) => {
              return user.basicInfo === null ? (
                <>
                  {/* You can use React.Fragment or an empty div to wrap the content */}
                </>
              ) : (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.isValidated ? "Verified" : "Unverified"}</td>
                  <td>{user.basicInfo.phoneno}</td>
                  <td>{user.basicInfo.gender ? "male" : "female"}</td>
                  <td>{user.basicInfo.status}</td>
                  <td>
                    <button onClick={() => navigate(`/user/${user.id}`)}>
                      View
                    </button>
                  </td>
                </tr>
              );
            })
          )}

       {/* {users.length === 0 ? (
          <tr>
            <td className="text-center" colSpan={8}>
              No entries Found
            </td>
          </tr>
        ) : (
          users.map((user) => {
            return user.basicInfo === null ? (
              <>
               
              </>
            ) : (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isValidated ? "Verified" : "Unverified"}</td>
                <td>{user.basicInfo.phoneno}</td>
                <td>{user.basicInfo.gender ? "male" : "female"}</td>
                <td>{user.basicInfo.status}</td>
                <td><button onClick={()=>navigate(`/user/${user.id}`)}>View</button></td>
              </tr>
            );
          })
        )} */}

        </tbody>
      </Table>
      <Typography>Page: {currentPage}</Typography>
      <Pagination
        count={pages.length}
        page={currentPage}
        onChange={(e, value) => setCurrentPage(value)}
      />
    </RegLayout>
  );
};
export default Users;
