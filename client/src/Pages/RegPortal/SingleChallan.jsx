import React, { useEffect, useState } from "react";
import RegLayout from "../../Components/RegLayout";
import { Grid, Typography } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../Styles/Payments.css";
import "../../Styles/Registration.css";
import DownloadForOfflineOutlinedIcon from "@mui/icons-material/DownloadForOfflineOutlined";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import API_URL from "../../config";

const ChallanDetails = () => {
  const [details, setDetails] = useState([]);
  const { id } = useParams();
  const [regObj, setRegObj] = useState([]);
  const [teams, setTeams] = useState([]);
  const [individuals, setIndividuals] = useState([]);
  const navigate = useNavigate();

  if (parseInt(id) === 1) {
    navigate("/challans");
  }

  const getChallanDetails = async () => {
    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImVtYWlsIjoid2FxYXNhbGkwMDEyMysxMjMyQGdtYWlsLmNvbSIsImlhdCI6MTcwMzA3NzI4MCwiZXhwIjoxNzAzMjUwMDgwfQ.f5R3WitUx0Sqq6ucscyYPFQvqLvj_IJPI6DphzPEBd8";

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Assuming 'id' is defined elsewhere in your code
      const { data } = await axios.get(
        `${API_URL}challan/getChallan/${id}`,
        config
      );

      if (data.status != 200) {
        alert(data.message);
        return;
      }

      const teamsArray = data.data.detail.filter(
        (obj) => obj.isIndividual === false && obj.id !== 0
      );
      const individualsArray = data.data.detail.filter(
        (obj) => obj.isIndividual === true && obj.id !== 0
      );
      const regObject = data.data.detail.find((obj) => obj.id === 0);

      console.log(teamsArray);
      console.log(individualsArray);
      console.log(regObj);

      setTeams(teamsArray);
      setIndividuals(individualsArray);
      if (regObject) {
        setRegObj([regObject]);
      }

      setDetails(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [showPreview, setShowPreview] = useState(false);

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  useEffect(() => {
    getChallanDetails();
  }, []);

  return (
    <RegLayout>
      <Typography
        variant="h4"
        component="div"
        sx={{ fontWeight: "bold", fontFamily: "LemonMilkBold" }}
      >
        Challan Detail
      </Typography>
      <>
        <div className="container">
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: "normal", fontFamily: "LemonMilkBold" }}
          >
            UserName: 1
          </Typography>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-10">
              <div className="row">
                <div className="col">
                  <div className="col" onClick={togglePreview}>
                    <img
                      src="https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/video/H5BOVymHiplawzr0/videoblocks-silhouette-of-people-rejoicing-and-lifting-up-his-hands-a-group-of-successful-businessmen-happy-and-celebrate-the-victory-on-the-roof-of-the-business-center-slow-motion_bseot2mclw_thumbnail-1080_01.png"
                      alt="Preview"
                      style={{ width: "100%", cursor: "pointer" }}
                    />
                  </div>

                  {/* Modal/Preview */}
                  {showPreview && (
                    <div
                      className="modal"
                      style={{ display: "block", padding: "50px" }}
                    >
                      <span
                        onClick={togglePreview}
                        className="btn btn-danger"
                        style={{ cursor: "pointer" }}
                      >
                        Close
                      </span>
                      <img
                        onClick={togglePreview}
                        src="https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/video/H5BOVymHiplawzr0/videoblocks-silhouette-of-people-rejoicing-and-lifting-up-his-hands-a-group-of-successful-businessmen-happy-and-celebrate-the-victory-on-the-roof-of-the-business-center-slow-motion_bseot2mclw_thumbnail-1080_01.png"
                        alt="Full Size"
                        style={{ width: "100%" /* Style as needed */ }}
                      />
                    </div>
                  )}
                </div>
                <div className="col-md-6">
                  {/* Summary/Details section */}
                  <div className="ps-5">
                    <h2>Summary/Details</h2>
                    <hr />
                    <div className="row mb-3 regFee">
                      <div className="col">
                        <h6 className="regFee">Registration Fee</h6>
                      </div>
                      <div className="col endAlign">
                        <p>Rs {}</p>
                      </div>
                    </div>
                    <h6 className="text-muted head">Individual</h6>
                    <div className="row mb-3">
                      <div className="col">
                        <p className="ps-2">
                          <b>Tennis</b>
                        </p>
                      </div>
                      <div className="col endAlign">
                        <p>Rs {10}</p>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col">
                        <p className="ps-2">
                          <b>Futsal</b>
                        </p>
                      </div>
                      <div className="col endAlign">
                        <p>Rs {10}</p>
                      </div>
                    </div>
                    <h6 className="text-muted head">Team</h6>
                    <div className="row mb-3">
                      <div className="col">
                        <p className="ps-2">
                          <b>Football</b>
                          <span>
                            <p>(Rs {10} per person)</p>
                          </span>
                        </p>
                      </div>
                      <div className="col endAlign">
                        <p>Rs {10}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between mb-3">
                      <h3>Total</h3>
                      <h3>
                        Rs <b>{10}</b>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </RegLayout>
  );
};

export default ChallanDetails;