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
        const response = await axios.get(`${API_URL}/basic/basicAllUsers`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        let fetchedUsers = response.data.data.filter(
          (user) => user.basicInfo !== null
        );
  
        // Optionally limit to first 5 users for testing
        // fetchedUsers = fetchedUsers.slice(0, 5);
  
        const imageLoadPromises = fetchedUsers.map(async (user) => {
          try {
            const image = await generatePresignedUrl(user.basicInfo.profilePhoto);
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
  

//   const getUsers = async () => {
//     try {
//       const response = await axios.get(`${API_URL}/basic/basicAllUsers`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const filteredUsers = response.data.data.filter(
//         (user) => user.basicInfo !== null
//       );

//       // setUsers(filteredUsers);
//       // filter to first 5 users for testing
//       setUsers(filteredUsers.slice(0, 5));
//       setLoading(false);
//     } catch (error) {
//       console.log(error);
//       if (error.response.data.message === "Unauthorized") {
//         alert("Session Expired! Please Login Again");
//         localStorage.clear();
//         navigate("/login");
//       }
//     }
//   };

//   const loadImages = async () => {
//     if (users.length > 0) {
//       setLoading(true);
//       const imageLoadPromises = users.map(async (user) => {
//         try {
//           const image = await generatePresignedUrl(user.basicInfo.profilePhoto);
//           console.log("Image loaded for user", user.id);
//           return { id: user.id, image: image };
//         } catch (error) {
//           console.log("Error loading image for user", user.id, error);
//           return {
//             id: user.id,
//             image: "default_image_url_here", // Provide a default image URL
//           };
//         }
//       });

//       const images = await Promise.all(imageLoadPromises);

//       console.log("Images loaded", images);

//       setUsers((prevUsers) =>
//   prevUsers.map((user) => {
//     const newUserImage = images.find((img) => img.id === user.id)?.image || user.image;
//     console.log(`Updating user ${user.id} image to ${newUserImage}`);
//     return {
//       ...user,
//       image: newUserImage,
//     };
//   })
// );

//       // setUsers((prevUsers) =>
//       //   prevUsers.map((user) => ({
//       //     ...user,
//       //     image: images.find((img) => img.id === user.id)?.image || user.image,
//       //   }))
//       // );

//       setImagesLoaded(true);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getUsers();
//   }, []); // Run once on component mount

//   useEffect(() => {
//     if (users.length > 0 && !imagesLoaded) {
//       console.log("Loading images...");
//       loadImages();
//     }
//   }, [users, imagesLoaded]); // Run when users or imagesLoaded change

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
