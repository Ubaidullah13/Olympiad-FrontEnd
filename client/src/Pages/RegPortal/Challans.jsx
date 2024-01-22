import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import RegLayout from "../../Components/RegLayout";
import axios from "axios";
import API_URL from "../../config";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";

const Challans = () => {
  const [challans, setChallans] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(true);
  const token = localStorage.getItem("accessToken");
  const getChallans = async () => {
    try {
      const response = await axios.get(`${API_URL}/challan/getAllChallans`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);
      console.log(response.data.data);
      setChallans(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const postsPerPage = 50;
  const lastPostIndex = postsPerPage * currentPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  let pages = [];

  for (let i = 1; i <= Math.ceil(challans.length / postsPerPage); i++) {
    pages.push(i);
  }

  useEffect(() => {
    getChallans();
  }, []);

  // getChallans();

  return (
    <RegLayout>
      <Typography
        variant="h4"
        component="div"
        sx={{ fontWeight: "bold", fontFamily: "LemonMilkBold" }}
      >
        Challans 
      </Typography>
      <p>Total Challans: {challans.length}</p>
      {loading && <CircularProgress />}
      <Table striped bordered hover>
        <thead>
          <tr>
            {/* <th>#</th> */}
            <th>Challan ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Total</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {challans.length === 0 ? (
            <tr>
              <td className="text-center" colSpan={7}>
                No entries Found
              </td>
            </tr>
          ) : (
            challans
              .slice(firstPostIndex, lastPostIndex)
              .map((challan, index) => {
                return (
                  <tr>
                    {/* <td>{index + 1}</td> */}
                    <td>{challan.id}</td>
                    <td>{challan.user.name}</td>
                    <td>{challan.user.email}</td>
                    <td>{challan.netTotal}</td>
                    <td>{challan.isPaid}</td>
                    <td>
                      <button
                        onClick={() => navigate(`/challan/${challan.id}`)}
                      >
                        View
                      </button>
                    </td>
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
export default Challans;
