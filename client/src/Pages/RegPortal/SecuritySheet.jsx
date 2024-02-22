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

  useEffect(() => {
    const fetchAndLoadUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/basic/mastersheet`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        let fetchedUsers = response.data.data.filter(
          (user) => user.basicInfo !== null
        ).filter((user) => user.id !== 5).filter((user) => !user.name.toLowerCase().includes("test"));

        // challan should not empty
        fetchedUsers = fetchedUsers.filter((user) => user.challan.length > 0);
  
        // Optionally limit to first 5 users for testing
        // fetchedUsers = fetchedUsers.slice(0, 5);
  
        const imageLoadPromises = fetchedUsers.map(async (user) => {
          try {
            const fileName = user.id + "_" + user.name;
            // get the extension of profile photo
            const extension = user.basicInfo.profilePhoto.split('.').pop();
            const image = await generatePresignedUrl(user.basicInfo.profilePhoto, fileName + '.' + extension);
            //const image = await generatePresignedUrl(user.basicInfo.profilePhoto, fileName);
            return { id: user.id, image: image };
          } catch (error) {
            return { id: user.id, image: "/Images/user.png" };
          }
        });
  
        const images = await Promise.all(imageLoadPromises);
  
        const updatedUsers = fetchedUsers.map((user) => ({
          ...user,
          image: images.find((img) => img.id === user.id)?.image || user.image,
        }));
  
        setUsers(updatedUsers);
      } catch (error) {
        console.error("Failed to fetch or load users", error);
        // Handle error (e.g., unauthorized access)
      } finally {
        setLoading(false);
      }
    };
  
    fetchAndLoadUsers();
  }, [token, navigate]); // Only re-run the effect if `token` or `navigate` changes


  return (
    <RegLayout>
      <Typography
        variant="h4"
        component="div"
        sx={{ fontWeight: "bold", fontFamily: "LemonMilkBold" }}
      >
        Security Sheet
      </Typography>
      <Typography
        variant="h6"
        component="div"
        sx={{ fontWeight: "normal", fontFamily: "LemonMilkBold" }}
      >
        Total Users: {users.length}
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {/* <Button
            style={{
              borderRadius: 35,
              backgroundColor: "#157347",
              fontSize: "18px",
            }}
            onClick={exportToXLSX}
          >
            Export Data to Excel Sheet
          </Button> */}
          <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="download-table-xls-button btn btn-success mb-3"
            table="table-to-xls"
            filename="SecuritySheet"
            sheet="tablexls"
            buttonText="Export Data to Excel Sheet"
          />
          <Table id="table-to-xls" striped bordered hover>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Image</th>
                <th>UserName</th>
                <th>CNIC No.</th>
                <th>Phone No.</th>
                <th>Email</th>
                <th>Institute</th>
                <th>Father/Guardian Name</th>
                <th>Father/Guardian Contact</th>
                <th>isPaid</th>
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
                      <a href={user.image} target="_blank">Image of {user.name}</a>
                      {/* <img
                        className="photo"
                        style={{
                          width: "60px",
                          objectFit: "contain",
                          borderRadius: "10px",
                        }}
                        src={user.image}
                        alt={"Profile Picture"}
                      /> */}
                    </td>
                    <td>{user.name}</td>
                    <td>{user.basicInfo.cnic}</td>
                    <td>{user.basicInfo.phoneno}</td>
                    <td>{user.email}</td>
                    <td>{user.basicInfo.schoolName}</td>
                    <td>{user.basicInfo.guardianName}</td>
                    <td>{user.basicInfo.guardianNumber}</td>
                    <td>{user.challan[0] ? user.challan[0].isPaid : "No Challen" }</td>
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
