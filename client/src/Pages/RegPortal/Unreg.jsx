import React, { useEffect, useState } from "react";
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

const Unreg = () => {
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("accessToken");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const getUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/basic/basicAllUsers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      setUsers(response.data.data.filter((user) => user.isValidated === true).filter((user) => user.isParticipant === true).filter((user) => user.basicInfo === null));
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

  const postsPerPage = 50;
  const lastPostIndex = postsPerPage * currentPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  let pages = [];

  for (let i = 1; i <= Math.ceil(users.length / postsPerPage); i++) {
    pages.push(i);
  }

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
        Unregistered Participants
      </Typography>
      <p>Total Participants without Infos: {users.length}</p>
      {loading && <CircularProgress />}
      <Form>
        <InputGroup>
          <Form.Control
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search By Name or Email or Status"
          ></Form.Control>
        </InputGroup>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
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
            users
              .slice(firstPostIndex, lastPostIndex)
              .filter((user) => {
                return search.toLowerCase() === ""
                  ? user
                  : user.name.toLowerCase().includes(search.toLowerCase()) ||
                      user.email.toLowerCase().includes(search.toLowerCase());
              })
              .map((user) => {
                return (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                  </tr>
                );
              })
          )}
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
export default Unreg;
