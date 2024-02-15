import React, { useEffect, useState } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { FormControl, Grid, Typography } from "@mui/material";
import RegLayout from "../../Components/RegLayout";
import axios from "axios";
import API_URL from "../../config";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const Accom = () => {
  const [search, setSearch] = useState("");

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

      setUsers(
        response.data.data
          .filter((user) => user.basicInfo !== null)
          .filter((user) => user.basicInfo.accomodation === true)
      );
      // setUsers(users.filter((user) => user.basicInfo !== null).filter((user) => user.basicInfo.accomodation === true));
      console.log(users);
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

  // getUsers();

  return (
    <RegLayout>
      <Typography
        variant="h4"
        component="div"
        sx={{ fontWeight: "bold", fontFamily: "LemonMilkBold" }}
      >
        Accommodation Candidates
      </Typography>
      <p>Total Candidates: {users.length}</p>
      {loading && <CircularProgress />}
      <ReactHTMLTableToExcel
        id="test-table-xls-button"
        className="download-table-xls-button btn btn-success mb-3"
        table="table-to-xls"
        filename="tablexls"
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
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Gender</th>
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
                return (
                  <>
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.basicInfo.phoneno}</td>
                      <td>{user.basicInfo.gender ? "male" : "female"}</td>
                    </tr>
                  </>
                );
              })
          )}
        </tbody>
      </Table>
    </RegLayout>
  );
};
export default Accom;
