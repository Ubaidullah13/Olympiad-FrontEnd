import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import RegLayout from "../../Components/RegLayout";
import axios from "axios";
import API_URL from "../../config";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

function MasterSheet() {
  const token = localStorage.getItem("accessToken");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const getUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/basic/basicAllUsers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(response.data.data.filter((user) => user.basicInfo !== null));
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

  useEffect(() => {
    getUsers();
  }, []);

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

      <ReactHTMLTableToExcel
        id="test-table-xls-button"
        className="download-table-xls-button btn btn-success mb-3"
        table="table-to-xls"
        filename="MasterSheet"
        sheet="tablexls"
        buttonText="Export Data to Excel Sheet"
      />
      <Form>
        <InputGroup>
          <Form.Control
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search By Name or Email or Status"
          ></Form.Control>
        </InputGroup>
      </Form>
      <Table id="table-to-xls" striped bordered hover>
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
            users
              .filter((user) => {
                return search.toLowerCase() === ""
                  ? user
                  : user.name.toLowerCase().includes(search.toLowerCase()) ||
                      user.email.toLowerCase().includes(search.toLowerCase());
              })
              .map((user) => {
                return user.basicInfo === null ? (
                  <>
                    {/* You can use React.Fragment or an empty div to wrap the content */}
                  </>
                ) : (
                  <tr key={user.UserID}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.basicInfo.cnic}</td>
                    <td>{user.basicInfo.phoneno}</td>
                    <td>{user.email}</td>
                    <td>{user.basicInfo.guardianName}</td>
                    <td>{user.basicInfo.guardianNumber}</td>
                    <td>{user.basicInfo.address}</td>
                    <td>{user.basicInfo.student_id}</td>
                    <td>{user.basicInfo.schoolName}</td>
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

export default MasterSheet;
