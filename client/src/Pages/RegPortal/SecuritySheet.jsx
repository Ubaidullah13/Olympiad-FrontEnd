import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import RegLayout from "../../Components/RegLayout";
import axios from "axios";
import API_URL from "../../config";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";

function SecuritySheet() {
  const token = localStorage.getItem("accessToken");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [users, setUsers] = useState([
    {
      id: 1,
      image: "www.example.com",
      name: "saadashraf87",
      email: "saad.ashraf.9094@gmail.com",
      cnic: "4240120129765",
      isVerified: true,
      basicInfo: {
        phoneno: "03218953225",
        gender: true,
        status: "verified",
      },
    },
    {
      id: 2,
      image: "www.example.com",
      name: "hamza90",
      email: "hamza@gmail.com",
      cnic: "4240120129765",
      isVerified: false,
      basicInfo: {
        phoneno: "03156844761",
        gender: true,
        status: "unverified",
      },
    },
    {
      id: 3,
      image: "www.example.com",
      name: "saadashraf87",
      email: "saad.ashraf.9094@gmail.com",
      cnic: "4240120129765",
      isVerified: true,
      basicInfo: {
        phoneno: "03218953225",
        gender: true,
        status: "verified",
      },
    },
    {
      id: 4,
      image: "www.example.com",
      name: "hamza90",
      email: "hamza@gmail.com",
      cnic: "4240120129765",
      isVerified: false,
      basicInfo: {
        phoneno: "03156844761",
        gender: true,
        status: "unverified",
      },
    },
  ]);

  return (
    <RegLayout>
      <Typography
        variant="h4"
        component="div"
        sx={{ fontWeight: "bold", fontFamily: "LemonMilkBold" }}
      >
        Security Sheet
      </Typography>
      {loading && <CircularProgress />}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Image</th>
            <th>UserName</th>
            <th>CNIC No.</th>
            <th>Phone No.</th>
            <th>Email</th>
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
                <tr key={user.UserID}>
                  <td>{user.id}</td>
                  <td>
                    <img
                      className="photo"
                      style={{
                        width: "60px",
                        objectFit: "contain",
                        borderRadius: "10px",
                      }}
                      src="https://t4.ftcdn.net/jpg/00/97/58/97/360_F_97589769_t45CqXyzjz0KXwoBZT9PRaWGHRk5hQqQ.jpg"
                      alt={"Profile Picture"}
                    />
                  </td>
                  <td>{user.name}</td>
                  <td>{user.cnic}</td>
                  <td>{user.basicInfo.phoneno}</td>
                  <td>{user.email}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </Table>
    </RegLayout>
  );
}

export default SecuritySheet;