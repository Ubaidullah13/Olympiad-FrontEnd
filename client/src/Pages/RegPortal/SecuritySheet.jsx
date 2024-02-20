import React, { useEffect, useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import RegLayout from "../../Components/RegLayout";
import axios from "axios";
import API_URL from "../../config";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";
import getSingleImage from "../../image";

function SecuritySheet() {
  const token = localStorage.getItem("accessToken");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const getUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/basic/basicAllUsers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const filteredUsers = response.data.data.filter(
        (user) => user.basicInfo !== null
      );
      const usersWithDefaultImages = filteredUsers.map((user) => ({
        ...user,
        image: "/Images/images.PNG", // Set default image URL
      }));
      setUsers(usersWithDefaultImages);
      setLoading(false);
    } catch (error) {
      console.log(error);
      if (error.response.data.message === "Unauthorized") {
        alert("Session Expired! Please Login Again");
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  const loadImageForUser = async (user) => {
    try {
      const image = await getSingleImage(user.basicInfo.profilePhoto);
      return image;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    const loadImagesSequentially = async () => {
      setLoading(true);
      for (const user of users) {
        const image = await loadImageForUser(user);
        if (image) {
          setUsers((prevUsers) =>
            prevUsers.map((prevUser) =>
              prevUser.id === user.id ? { ...prevUser, image } : prevUser
            )
          );
        }
      }
      setImagesLoaded(true);
      setLoading(false);
    };

    if (users.length > 0 && !imagesLoaded) {
      loadImagesSequentially();
    }
  }, [users, imagesLoaded]);

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
      {!imagesLoaded ? (
        <Button
          style={{
            borderRadius: 35,
            backgroundColor: "#157347",
            // padding: "18px 36px",
            fontSize: "18px",
          }}
          disabled
        >
          Export Data to Excel Sheet
        </Button>
      ) : (
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="download-table-xls-button btn btn-success mb-3"
          table="table-to-xls"
          filename="AccomodationCandidates"
          sheet="tablexls"
          buttonText="Export Data to Excel Sheet"
        />
      )}
      <Table id="test-table-xls-button" striped bordered hover>
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
              <td className="text-center" colSpan={6}>
                No entries Found
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  <img
                    className="photo"
                    style={{
                      width: "60px",
                      objectFit: "contain",
                      borderRadius: "10px",
                    }}
                    src={user.image}
                    alt={"Profile Picture"}
                  />
                </td>
                <td>{user.name}</td>
                <td>{user.basicInfo.cnic}</td>
                <td>{user.basicInfo.phoneno}</td>
                <td>{user.email}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </RegLayout>
  );
}

export default SecuritySheet;
