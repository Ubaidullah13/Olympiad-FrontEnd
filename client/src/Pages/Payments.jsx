import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/Payments.css";
import "../Styles/Registration.css";
import DownloadForOfflineOutlinedIcon from "@mui/icons-material/DownloadForOfflineOutlined";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import UserLayout from "../Components/UserLayout";
import axios from "axios";
import API_URL from "../config";
import CircularProgress from "@mui/material/CircularProgress";

import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import Table from "react-bootstrap/Table";

const Payments = ({}) => {
  const navigate = useNavigate();
  const [registrationFee, setRegistrationFee] = useState(0);
  const [paymentPic, setPaymentPic] = useState("");
  const [challans, setChallans] = useState([]);

  const [totalPrice, setTotalPrice] = useState(0);

  const [Loading, setLoading] = useState(true);

  const token = localStorage.getItem("accessToken");

  const [teams, setTeams] = useState([]);
  const [individuals, setIndividuals] = useState([]);

  const [regObj, setRegObj] = useState(null);


  const downloadPDF = () => {
    const input = document.getElementById('Details');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save("download.pdf"); 
      });
  }
  
  const getChallanDetails = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Assuming 'id' is defined elsewhere in your code
      const { data } = await axios.get(`${API_URL}/challan/getBill`, config);

      console.log(data);

      if (data.status != 200) {
        alert(data.message);
        return;
      }

      const teamsArray = data.data.details.filter(
        (obj) => obj.isIndividual === false && obj.id !== 0
      );
      const individualsArray = data.data.details.filter(
        (obj) => obj.isIndividual === true && obj.id !== 0
      );

      const regObject = data.data.details.find((obj) => obj.id === 0);

      console.log(teamsArray);
      console.log(individualsArray);
      console.log(regObject);

      setTeams(teamsArray);
      setIndividuals(individualsArray);
      if (regObject) {
        setRegObj(regObject);
      }

      setTotalPrice(data.data.totalPrice);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getChallanDetails();
  }, []);

  const handlePaymentPic = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPaymentPic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    navigate("/dashboard");
  };

  return (
    <UserLayout>
      {Loading ? (
        <>
          <CircularProgress />
        </>
      ) : (
        <>
        <div className="row">
          <div className="col-md-6">
            {/* Payment section */}
            <h2>Payment</h2>
            <hr />
            <div className="mb-3">
              <h6>Pay Online</h6>
              <p>
                Transfer total{" "}
                <b style={{ color: "var(--primary-dark)" }}>Rs {totalPrice}</b>{" "}
                to
              </p>
              <hr />
              <h6>HBL Bank</h6>
              <p>IBAN: PK34 HABB 02297901278603</p>
              <p>Title of Acct: Nust Olympiad</p>
              <p>HBL Nust Branch H-12, Islamabad</p>
            </div>
            <hr />
            <div className="mb-3">
              <h6>Attach the Proof of Payment</h6>
            </div>
            <div
              class="upload-box px-4"
              style={{
                backgroundImage: `url(${paymentPic})`,
                backgroundSize: "cover",
              }}
            >
              <label htmlFor="file-upload" className="upload-label">
                <input
                  id="file-upload-payment"
                  type="file"
                  accept="image/*"
                  onChange={handlePaymentPic}
                />
              </label>
            </div>
            <button
              className="btn btnColor mt-3 left-align"
              onClick={handleButtonClick}
            >
              Submit Challan
            </button>
            <p className="mt-3">* Registration fees is not refundable</p>
          </div>
          <div className="col-md-6">
            {/* Summary/Details section */}
            <div className="ps-5" id="Details">
              <h2>Summary/Details</h2>
              <hr />
              {regObj !== null ? (
                <div className="row mb-3 regFee">
                  <div className="col">
                    <h6 className="regFee">Registration Fee</h6>
                  </div>
                  <div className="col endAlign">
                    <p>Rs {regObj.price}</p>
                  </div>
                </div>
              ) : (
                <></>
              )}
              {individuals.length > 0 ? (
                <>
                  <h6 className="text-muted head">Individual</h6>
                  {individuals.map((individual, index) => (
                    <div key={index} className="row mb-3">
                      <div className="col">
                        <p className="ps-2">
                          <b>{individual.name}</b>
                        </p>
                      </div>
                      <div className="col endAlign">
                        <p>Rs {individual.price}</p>
                      </div>
                    </div>
                  ))}
                  <hr />
                </>
              ) : (
                <></>
              )}
              {teams.length > 0 ? (
                <>
                  <h6 className="text-muted head">Team</h6>
                  {teams.map((individual, index) => (
                    <div key={index} className="row mb-3">
                      <div className="col">
                        <p className="ps-2">
                          <b>{individual.name}</b>
                        </p>
                      </div>
                      <div className="col endAlign">
                        <p>Rs {individual.price}</p>
                      </div>
                    </div>
                  ))}
                  <hr />
                </>
              ) : (
                <>
                <hr />
                </>
              )}

              <div className="d-flex justify-content-between mb-3">
                <h3>Total</h3>
                <h3>
                  Rs <b>{totalPrice}</b>
                </h3>
              </div>
            </div>
              <button className="btn btn-link left-align" onClick={downloadPDF}>
                <DownloadForOfflineOutlinedIcon /> Download receipt
              </button>
          </div>
        </div>

        <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Total</th>
            <th>Status</th>
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
            challans.map((challan, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{challan.user.name}</td>
                  <td>{challan.user.email}</td>
                  <td>{challan.netTotal}</td>
                  <td>{challan.isPaid}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </Table>
        </>

        
      )}
    </UserLayout>

    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Payments;
