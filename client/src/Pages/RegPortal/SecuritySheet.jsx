import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import RegLayout from "../../Components/RegLayout";
import axios from "axios";
import API_URL from "../../config";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { generatePresignedUrl } from "../../image";

function SecuritySheet() {
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const exportToXLSX = () => {
    // Logic for exporting to XLSX
  };

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

      setUsers(filteredUsers);
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

  const loadImages = async () => {
    if (users.length > 0) {
      setLoading(true);
      const imageLoadPromises = users.map(async (user) => {
        try {
          const image = await generatePresignedUrl(user.basicInfo.profilePhoto);
          return { id: user.id, image: image };
        } catch (error) {
          console.error("Error loading image for user", user.id, error);
          return {
            id: user.id,
            image: "default_image_url_here", // Provide a default image URL
          };
        }
      });

      const images = await Promise.all(imageLoadPromises);

      setUsers((prevUsers) =>
        prevUsers.map((user) => ({
          ...user,
          image: images.find((img) => img.id === user.id)?.image || user.image,
        }))
      );

      setImagesLoaded(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []); // Run once on component mount

  useEffect(() => {
    if (users.length > 0 && !imagesLoaded) {
      loadImages();
    }
  }, [users, imagesLoaded]); // Run when users or imagesLoaded change

  return (
    <RegLayout>
      <Typography
        variant="h4"
        component="div"
        sx={{ fontWeight: "bold", fontFamily: "LemonMilkBold" }}
      >
        Security Sheet
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Button
            style={{
              borderRadius: 35,
              backgroundColor: "#157347",
              fontSize: "18px",
            }}
            onClick={exportToXLSX}
          >
            Export Data to Excel Sheet
          </Button>
          <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="download-table-xls-button btn btn-success mb-3"
            table="table-to-xls"
            filename="SecuritySheet"
            sheet="tablexls"
            buttonText="Export Data to Excel Sheet"
          />
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
        </>
      )}
    </RegLayout>
  );
}

export default SecuritySheet;
