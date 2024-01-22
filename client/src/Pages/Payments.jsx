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
  const initialState = {
    challanId: null,
    paymentProof: null,
  };
  const navigate = useNavigate();
  const [registrationFee, setRegistrationFee] = useState(0);
  const [paymentPic, setPaymentPic] = useState("");
  const [challans, setChallans] = useState([]);

  const [pending, setPending] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [verified, setVerified] = useState(false);

  const [challanData, setChallanData]= useState(initialState);

  const [totalPrice, setTotalPrice] = useState(0);

  const [Loading, setLoading] = useState(true);
  // const [ignoreError, setIgnoreError] = useState(true);

  const [buttonLoading, setButtonLoading] = useState(false);

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
        pdf.save("Olympiad Receipt.pdf"); 
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

      if (data.status != 200) {
        alert(data.message);
        return;
      }

      setPaymentPic("");
      setVerified(false);
      setPending(false);
      setRejected(false);

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
      // console.log(ignoreError);
      // if(ignoreError){
      //   return;
      // }else{
        alert("No Challan Found! Join sport or competition first");
        navigate("/dashboard");
        console.log(error);
      // }

    }
  };

  const getChallans = async () => {
    
    try {
      const response = await axios.get(`${API_URL}/challan/getBills`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data.data);

      setChallans(response.data.data);

      // if the largest id challen status is Pending then getChallanDetails
      if(response.data.data.length > 0 && (response.data.data[response.data.data.length - 1].isPaid === "pending" || response.data.data[response.data.data.length - 1].isPaid === "rejected")){
        
        if(response.data.data[response.data.data.length - 1].isPaid === "pending"){
          setPending(true);
        }
        else if(response.data.data[response.data.data.length - 1].isPaid === "rejected"){
          setRejected(true);
        }
        else if(response.data.data[response.data.data.length - 1].isPaid === "verified"){
          setVerified(true);
        }

        setChallanData({...challanData, challanId: response.data.data[response.data.data.length - 1].id});

        const teamsArray = response.data.data[response.data.data.length - 1].detail.filter(
          (obj) => obj.isIndividual === false && obj.id !== 0
        );
        const individualsArray = response.data.data[response.data.data.length - 1].detail.filter(
          (obj) => obj.isIndividual === true && obj.id !== 0
        );
  
        const regObject = response.data.data[response.data.data.length - 1].detail.find((obj) => obj.id === 0);
  
        setTeams(teamsArray);
        setIndividuals(individualsArray);
        if (regObject) {
          setRegObj(regObject);
        }
  
        setTotalPrice(response.data.data[response.data.data.length - 1].netTotal);
        setPaymentPic(response.data.data[response.data.data.length - 1].paymentProof);

        // await getChallanDetails();

        setLoading(false);

      }else{
        // setIgnoreError(false);
        getChallanDetails();
      }
    
    } catch (error) {
      getChallanDetails();
      console.log(error);
    }
  };

  useEffect(() => {
    getChallans();
  }, []);

  const handlePaymentPic = (event) => {
    const file = event.target.files[0];

    if (file.size > 1024 * 1024) {
      alert('File size should not exceed 1 MB');
      return;
    }

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPaymentPic(reader.result);
      };
      reader.readAsDataURL(file);
      setChallanData(prevData => ({ ...prevData, paymentProof: file }));
    }
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    if (paymentPic === "") {
      alert("Please attach the proof of payment");
      return;
    }

    setButtonLoading(true);

    if(pending || rejected){

      const formData = new FormData();
      formData.append("challanId", challanData.challanId);
  
      if (challanData.paymentProof) {
        formData.append("paymentProof", challanData.paymentProof);
      }

      axios.post(`${API_URL}/challan/updateChallan`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setButtonLoading(false);
        alert("Challan Updated Successfully");
        window.location.reload();
      })
      .catch((error) => {
        setButtonLoading(false);
        console.log(error);
        // refresh page
        window.location.reload();
        //alert("Error Updating Challan");
      });
    }else{
      const formData2 = new FormData();
  
      if (challanData.paymentProof) {
        formData2.append("paymentProof", challanData.paymentProof);
      }
      axios.post(`${API_URL}/challan/generateChallan`, formData2, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setButtonLoading(false);
        alert("Challan Uploaded Successfully");
        window.location.reload();
      })
      .catch((error) => {
        setButtonLoading(false);
        console.error(error);
        alert("Network Error Uploading Challan");
        window.location.reload();
      });
    }


  };

  return (
    <UserLayout>
      {Loading ? (
        <>
        <h1>Generating Challan</h1>
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
            <form onSubmit={handleButtonClick}>
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
            {buttonLoading ? <CircularProgress /> : (
            <button
              className="btn btnColor mt-3 left-align"
              {...(pending ? { disabled: true } : {}) }
              {...(rejected ? { disabled: false } : {}) }
              {...(verified ? { disabled: true } : {})}
            >
              {pending ? "Already Submitted" : rejected ? "Update Challen" : "Submit Challen"}
            </button>
            )}
            </form>
            <p className="mt-3">* Registration fees is not refundable</p>
          </div>
          <div className="col-md-6">
            {/* Summary/Details section */}
            <div className="ps-5" id="Details">
              <h2>Summary/Details</h2>
              <hr />
              {regObj !== null ? (
                <>
                 <h6 className="text-muted head regFee">Registration</h6>
                <div className="row">
                  <div className="col">
                    <b>Base Fee</b>
                  </div>
                  <div className="col endAlign">
                    <p>Rs {regObj.price.base}</p>
                  </div>
                </div>
                { regObj.price.social ?
                <div className="row mb-3">
                  <div className="col">
                    <b>Socials Fee</b>
                  </div>
                  <div className="col endAlign">
                    <p>Rs {regObj.price.social}</p>
                  </div>
                </div>
                : <></>
              }
                </>
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
              <button className="btn btn-link left-align download-button" onClick={downloadPDF}>
                <DownloadForOfflineOutlinedIcon /> Download receipt
              </button>
          </div>
        </div>

        <Table striped bordered hover>
        <thead>
          <tr>
            <th>Challan ID</th>
            <th>Status</th>
            <th>Total (Rs)</th>
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
                  <td>{challan.id}</td>
                  <td>{challan.isPaid}</td>
                  <td>{challan.netTotal}</td>
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
