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
      image: "www.example2.com",
      name: "Aisha",
      email: "aisha@gmail.com",
      cnic: "4210345678901",
      father_guardian_name: "Khalid Ahmed",
      father_guardian_contact: "03156898741",
      isVerified: true,
      basicInfo: {
        phoneno: "03211234567",
        gender: false,
        status: "verified",
        address: "Lahore",
        schoolID: "COMSATS",
        studentID: "2",
        campusName: "2",
        socials: "Qawali",
      },
    },
    {
      id: 2,
      image: "www.example.com",
      name: "Umar",
      email: "umar@gmail.com",
      cnic: "4240120129765",
      father_guardian_name: "Muhammad Ali",
      father_guardian_contact: "Muhammad Ali",
      isVerified: false,
      basicInfo: {
        phoneno: "03156844761",
        gender: true,
        status: "unverified",
        address: "Karachi",
        schoolID: "Nust",
        studentID: "1",
        campusName: "1",
        socials: "All",
      },
    },
    {
      id: 3,
      image: "www.example3.com",
      name: "Ali",
      email: "ali@gmail.com",
      cnic: "4210567890123",
      father_guardian_name: "Ahmed Khan",
      father_guardian_contact: "021459895568",
      isVerified: false,
      basicInfo: {
        phoneno: "03331234567",
        gender: true,
        status: "unverified",
        address: "Islamabad",
        schoolID: "FAST",
        studentID: "3",
        campusName: "3",
        socials: "Concert",
      },
    },
    {
      id: 5,
      image: "www.example4.com",
      name: "Fatima",
      email: "fatima@gmail.com",
      cnic: "4210789012345",
      father_guardian_name: "Imran Khan",
      father_guardian_contact: "03012290568",
      isVerified: true,
      basicInfo: {
        phoneno: "03451234567",
        gender: false,
        status: "verified",
        address: "Rawalpindi",
        schoolID: "PIEAS",
        studentID: "4",
        campusName: "4",
        socials: "None",
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
        Master Sheet
      </Typography>
      {loading && <CircularProgress />}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User ID</th>
            <th>UserName</th>
            <th>CNIC No.</th>
            <th>Phone No.</th>
            <th>Email</th>
            <th>Father/Guardian Name</th>
            <th>Father/Guardian Contact</th>
            <th>Address</th>
            <th>Student ID</th>
            <th>Student ID</th>
            <th>Campus Name</th>
            <th>Socials</th>
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
                  <td>{user.name}</td>
                  <td>{user.cnic}</td>
                  <td>{user.basicInfo.phoneno}</td>
                  <td>{user.email}</td>
                  <td>{user.father_guardian_name}</td>
                  <td>{user.father_guardian_contact}</td>
                  <td>{user.basicInfo.address}</td>
                  <td>{user.basicInfo.schoolID}</td>
                  <td>{user.basicInfo.studentID}</td>
                  <td>{user.basicInfo.campusName}</td>
                  <td>{user.basicInfo.socials}</td>
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
