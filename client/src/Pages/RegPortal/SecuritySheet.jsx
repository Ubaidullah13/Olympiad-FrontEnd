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
import {getSingleImage,generatePresignedUrl} from "../../image";

// import { saveAs } from 'file-saver';
// import * as XLSX from 'xlsx';

function SecuritySheet() {
  const token = localStorage.getItem("accessToken");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Existing code...
  const exportToXLSX = () => {}
  // const exportToXLSX = () => {
  //   // Create a new workbook
  //   const wb = XLSX.utils.book_new();
    
  //   // Prepare data for export
  //   const data = users.map(user => ({
  //     "User ID": user.id,
  //     "Image URL": user.image,
  //     "UserName": user.name,
  //     "CNIC No.": user.basicInfo.cnic,
  //     "Phone No.": user.basicInfo.phoneno,
  //     "Email": user.email,
  //   }));

  //   // Convert data to worksheet
  //   const ws = XLSX.utils.json_to_sheet(data);

  //   // Add the worksheet to the workbook
  //   XLSX.utils.book_append_sheet(wb, ws, "SecuritySheet");

  //   // Generate XLSX file and save
  //   const wbout = XLSX.write(wb, {bookType: 'xlsx', type: 'binary'});
    
  //   function s2ab(s) {
  //     const buf = new ArrayBuffer(s.length);
  //     const view = new Uint8Array(buf);
  //     for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
  //     return buf;
  //   }

  //   saveAs(new Blob([s2ab(wbout)], {type: "application/octet-stream"}), 'security_sheet.xlsx');
  // };

  const getUsers = async () => {
    try {
      console.log("F");
      // const s = await generatePresignedUrl("1704531233281-inbound4828357031371811262.jpg");
      // console.log(s);
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

  // getUsers()


  useEffect(() => {
    getUsers();
  }, []);

  // useEffect(() => {
  //   const loadImagesSequentially = async () => {
  //     setLoading(true);
  //     for (const user of users) {
  //       const image = await generatePresignedUrl(user.basicInfo.profilePhoto);
  //       if (image) {
  //         setUsers((prevUsers) =>
  //           prevUsers.map((prevUser) =>
  //             prevUser.id === user.id ? { ...prevUser, image } : prevUser
  //           )
  //         );
  //       }
  //     }
  //     setImagesLoaded(true);
  //     setLoading(false);
  //   };

  //   if (users.length > 0) {
  //     loadImagesSequentially();
  //   }
  // }, [users, imagesLoaded]);

  useEffect(() => {
    const loadImages = async () => {
      if (users.length > 0) {
        setLoading(true);
        // Map each user to a promise to generate the presigned URL for their profile photo
        const imageLoadPromises = users.map(async (user) => {
          try {
            const image = await generatePresignedUrl(user.basicInfo.profilePhoto);
            return { id: user.id, image: image };
          } catch (error) {
            console.error("Error loading image for user", user.id, error);
            return { id: user.id, image: "olympiad-panel.nust.edu.pk/Images/images.PNG" }; // Handle error case, possibly by setting a default image or leaving it null
          }
        });
  
        // Use Promise.all to wait for all image loading promises to resolve
        const images = await Promise.all(imageLoadPromises);
  
        // Update users state with the loaded images
        setUsers((prevUsers) =>
          prevUsers.map((user) => ({
            ...user,
            image: images.find((img) => img.id === user.id)?.image || user.image, // Update image if loaded, else keep the existing one
          }))
        );
  
        setImagesLoaded(true);
        setLoading(false);
      }
    };
  
    loadImages();
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
      {loading ? <CircularProgress /> : 
      <>
      <Button
        style={{
          borderRadius: 35,
          backgroundColor: "#157347",
          fontSize: "18px",
        }}
        onClick={exportToXLSX} // Updated line
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
      }
    </RegLayout>
  );
}

export default SecuritySheet;
