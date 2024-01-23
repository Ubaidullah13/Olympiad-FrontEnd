import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/Registration.css";
import React, { useState, useEffect } from "react";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import WcOutlinedIcon from "@mui/icons-material/WcOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CustomTextField from "../Components/CustomTextField";
import CustomSelectField from "../Components/CustomSelect";
// import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import "@fortawesome/fontawesome-free/css/all.css";
import { useNavigate } from "react-router-dom";
import UserLayout from "../Components/UserLayout";
import API_URL from "../config";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';

const apiUrl = API_URL;

const initialState = {
  name: "",
  cnicFront: null,
  cnicBack: null,
  cnic: "",
  phoneno: "",
  address: "",
  guardianName: "",
  guardianNumber: "",
  schoolName: "",
  stdBack: null,
  stdFront: null,
  ambassadorcode: "",
  student_id: "",
};

const RegEdit = () => {

  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [status, setStatus] = useState("rejected");
  const [data, setData] = useState(initialState);
  const [updatedForm, setUpdatedForm] = useState([]);
  const [cnicFront, setCnicFront] = useState(null);
  const [cnicBack, setCnicBack] = useState(null);
  const [stdFront, setStdFront] = useState(null);
  const [stdBack, setStdBack] = useState(null);

  useEffect(() => {
    const getBasicDisplay = async () => {
      try {
        const response = await axios.get(`${API_URL}/basic/basicDisplay`, {
          headers: {
            Authorization: `Bearer ${localStorage.accessToken}`,
          },
        });
        console.log(response.data);
        setStatus(response.data.data.status);
        const updatedInitialState = {
          ...initialState,
          name: localStorage.name,
          cnicFront: response.data.data.cnicFront,
          cnicBack: response.data.data.cnicBack,
          cnic: response.data.data.cnic || "",
          phoneno: response.data.data.phoneno || "",
          address: response.data.data.address || "",
          guardianName: response.data.data.guardianName || "",
          guardianNumber: response.data.data.guardianNumber || "",
          schoolName: response.data.data.schoolName || "",
          stdBack: response.data.data.stdBack,
          stdFront: response.data.data.stdFront,
          ambassadorcode: response.data.data.ambassadorcode || "",
          student_id: response.data.data.student_id || "",
          studentOf: response.data.data.studentOf || "",
        };

        setData(updatedInitialState);
        setLoading(false);
      } catch (error) {
        setLoading(true);
        console.log(error);
      }
    };

    getBasicDisplay();
  }, []);

  const navigate = useNavigate();
 

  const handleCNICfChange = (event) => {
    const file = event.target.files[0];

    if (file.size > 500 * 1024) {
      alert("File size should not exceed 500 KB");
      return;
    }

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setData((prevData) => ({ ...prevData, cnicFront: reader.result }));
        if (!updatedForm.includes("cnicFront")){
          setUpdatedForm([...updatedForm, "cnicFront"]);
        }
      };
      reader.readAsDataURL(file);
      setCnicFront(file);

    }
  };

  const handleCNICbChange = (event) => {
    const file = event.target.files[0];

    if (file.size > 500 * 1024) {
      alert("File size should not exceed 500 KB");
      return;
    }

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setData((prevData) => ({ ...prevData, cnicBack: reader.result }));
        // setUpdatedForm([...updatedForm, "cnicBack"]);
        if (!updatedForm.includes("cnicBack")){
          setUpdatedForm([...updatedForm, "cnicBack"]);
        }
      };
      reader.readAsDataURL(file);
      setCnicBack(file);
    }
  };

  const handleSTfChange = (event) => {
    const file = event.target.files[0];

    if (file.size > 500 * 1024) {
      alert("File size should not exceed 500 KB");
      return;
    }


    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setData((prevData) => ({ ...prevData, stdFront: reader.result }));
        if (!updatedForm.includes("stdFront")){
          setUpdatedForm([...updatedForm, "stdFront"]);
        }
      };
      reader.readAsDataURL(file);
      setStdFront(file);
    }
  };

  const handleSTbfChange = (event) => {
    const file = event.target.files[0];

    if (file.size > 500 * 1024) {
      alert("File size should not exceed 500 KB");
      return;
    }

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setData((prevData) => ({ ...prevData, stdBack: reader.result }));
        if (!updatedForm.includes("stdBack")){
          setUpdatedForm([...updatedForm, "stdBack"]);
        }
      };
      reader.readAsDataURL(file);
      setStdBack(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });

    // if updatedForm already has the name, then don't add it again
    if (updatedForm.includes(name)) return;

    setUpdatedForm([...updatedForm, name]);
    
    // formData.append(name, value);
  };


  const handleButtonClick = async (e) => {
    // e.preventDefault();
    setButtonLoading(true);

    const formData = new FormData();

    updatedForm.forEach((key) => {
      if (key !== "cnicFront" && key !== "cnicBack" && key !== "stdFront" && key !== "stdBack") {
        formData.append(key, data[key]);
      }
    });

    if (updatedForm.includes("cnicFront") && cnicFront) {
      formData.append("cnicFront", cnicFront);
    }
    if (updatedForm.includes("cnicBack") && cnicBack) {
      formData.append("cnicBack", cnicBack);
    }
    if (updatedForm.includes("stdFront") && stdFront) {
      formData.append("stdFront", stdFront);
    }
    if (updatedForm.includes("stdBack") && stdBack) {
      formData.append("stdBack", stdBack);
    }

    
    try {
      const response = await axios.post(`${apiUrl}/basic/basicInfoUpdate`,formData,
      {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
      }
      );

      // console.log(response.data);
      setButtonLoading(false);
      alert("Data Updated Successfully");
      
    } catch (err) {
      setButtonLoading(false);
      console.log(err);
      // alert("Error occurred while Updating data. Please try again.");
      // window.location.reload();
    }

  };

  return (
    <UserLayout>
      {loading ? <h1>Fetching Your Profile ...</h1>
    :
      <>
      <form onSubmit={handleButtonClick}>
      <div className="container mt-5">
        <h2 className="text-left">Profile</h2>
        <p>Status: {status}</p>
        {status==="pending" ? 
        <p className="text-muted">Verification requires 4-5 days. Registration team will email you once process of verification is completed</p>
        : <></>}
        {status==="rejected" ? 
        <p className="text-muted">Update your profile and submit it for review</p>
        : <></>}
        {status==="ban" ? 
        <p className="text-muted">Update your profile and submit it for review</p>
        : <></>}
        <div className="row">
          <div className="col-md-4 mb-3">
            {/* <label className="bold-label" htmlFor="name"> Name </label> */}
            {/* <input type="text" style={{ backgroundImage: 'url("/Images/user.png")' }} className="form-control form-input" id="name" placeholder='John Carter' required /> */}
            <CustomTextField
              type="Person"
              iconType={<AccountCircleOutlinedIcon />}
              label="Name"
              name="name"
              value={data.name}
              onChange={handleInputChange}
              disabled
            />
          </div>
          <div className="col-md-4 mb-3">
            {/* <label className="bold-label" htmlFor="phone">Phone Number</label>
            <input type="tel" className="form-control form-input" id="phone" placeholder="(123) 456-7890" required /> */}
            <CustomTextField
              type="number"
              iconType={<PhoneAndroidOutlinedIcon />}
              label="Phone"
              name="phoneno"
              value={data.phoneno}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-4 mb-3">
            {/* <label className="bold-label" htmlFor="cnic">CNIC</label>
            <input type="text" className="form-control form-input" id="cnic" placeholder="1234-567890-1" required /> */}
            <CustomTextField
              type="number"
              iconType={<CreditCardOutlinedIcon />}
              label="CNIC"
              name="cnic"
              value={data.cnic}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 mb-3">
            {/* <label className="bold-label" htmlFor="gender">Gender</label>
  <select id="gender" className="form-control form-input">
    <option value="male">Male</option>
    <option value="female">Female</option>
  </select>      */}
            {/* <FormControl
              fullWidth
              variant="outlined"
              margin="normal"
              required
              style={{ marginTop: "15px" }}
            >
              <InputLabel id="demo-simple-select-label">
                <WcOutlinedIcon style={{ marginRight: "8px" }} />
                Gender
              </InputLabel>
              <CustomSelectField
                value={data.gender ? "male" : "female"}
                name="gender"
                onChange={handleGenderChange}
              />
            </FormControl> */}
          </div>
          <div className="col-md-12 mb-3">
            <CustomTextField
              type="Address"
              iconType={<HomeOutlinedIcon />}
              label="Address"
              name="address"
              value={data.address}
              fullWidth
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 mb-3">
            <CustomTextField
              type="Person"
              iconType={<AccountCircleOutlinedIcon />}
              label="Father / Guardian Name"
              name="guardianName"
              value={data.guardianName}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-4 mb-3">
            <CustomTextField
              type="number"
              iconType={<PhoneAndroidOutlinedIcon />}
              label="Father / Guardian Contact No."
              name="guardianNumber"
              value={data.guardianNumber}
              onChange={handleInputChange}
            />
          </div>
        </div>
        {data.studentOf !== "other" ? 
        <div className="row">
          <div className="col-md-4 mb-3">
            <CustomTextField
              type="number"
              iconType={<AccountCircleOutlinedIcon />}
              label="Student ID"
              name="student_id"
              value={data.student_id}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-4 mb-3">
            <CustomTextField
              type="campName"
              iconType={<HomeOutlinedIcon />}
              label="Campus Name"
              name="schoolName"
              value={data.schoolName}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-4 mb-3">
            <CustomTextField
              type="number"
              iconType={<AccountCircleOutlinedIcon />}
              label="Ambassador Code"
              name="ambassadorcode"
              value={data.ambassadorcode}
              onChange={handleInputChange}
            />
          </div>
        </div>
        : <></>}
        <div className="row">
          <div className="col-md-6 mb-3">
            <div className="col-md-6 mb-3">
              <label className="bold-label" htmlFor="cnicFront">
                CNIC Front Copy
              </label>
            </div>
            <div
              className="upload-box px-4"
              style={{
                backgroundImage: `url(${data.cnicFront})`,
                backgroundSize: "cover",
              }}
            ></div>
            <label htmlFor="file-upload" className="upload-label pt-2 pb-2">
              <input
                id="file_upload_cnicf_Edit"
                type="file"
                accept="image/*"
                onChange={handleCNICfChange}
              />
            </label>
          </div>
          <div className="col-md-6 mb-3">
            <div className="col-md-6 mb-3">
              <label className="bold-label" htmlFor="cnicBack">
                CNIC Back Copy
              </label>
            </div>
            <div
              className="upload-box px-4"
              style={{
                backgroundImage: `url(${data.cnicBack})`,
                backgroundSize: "cover",
              }}
            ></div>
            <label htmlFor="file-upload" className="upload-label pt-2 pb-2">
              <input
                id="file_upload_cnicb_Edit"
                type="file"
                accept="image/*"
                onChange={handleCNICbChange}
              />
            </label>
          </div>
        </div>
        {data.studentOf !== "other" ? 
        <div className="row">
          <div className="col-md-6 mb-3">
            <div className="col-md-6 mb-3">
              <label className="bold-label" htmlFor="stcardFront">
                Student Card front side
              </label>
            </div>
            <div
              className="upload-box px-4"
              style={{
                backgroundImage: `url(${data.stdFront})`,
                backgroundSize: "cover",
              }}
            ></div>
            <label htmlFor="file-upload" className="upload-label pt-2 pb-2">
              <input
                id="file_upload_stCardf_Edit"
                type="file"
                accept="image/*"
                onChange={handleSTfChange}
              />
            </label>
          </div>
          <div className="col-md-6 mb-3">
            <div className="col-md-6 mb-3">
              <label className="bold-label" htmlFor="stcardBack">
                Student Card back side
              </label>
            </div>
            <div
              className="upload-box px-4"
              style={{
                backgroundImage: `url(${data.stdBack})`,
                backgroundSize: "cover",
              }}
            ></div>
            <label htmlFor="file-upload" className="upload-label pt-2 pb-2">
              <input
                id="file_upload_stCardb_Edit"
                type="file"
                accept="image/*"
                onChange={handleSTbfChange}
              />
            </label>
          </div>
        </div>
        : <></>}
        {status !== "verified" && (
          <>
        {buttonLoading ? <CircularProgress /> : (
        <button
          type="submit"
          className="btn btn-primary right-align "
        >
          Edit
        </button>
)}</>)}
      </div>
      </form>
      </>
}
    </UserLayout>
  );
};

export default RegEdit;
