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

const RegEdit = () => {
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
    gender: null,
    stdBack: null,
    stdFront: null,
    ambassadorcode: "",
    student_id: "",
  };

  useEffect(() => {
    const getBasicDisplay = async () => {
      try {
        const response = await axios.get(`${API_URL}/basic/basicDisplay`, {
          headers: {
            Authorization: `Bearer ${localStorage.accessToken}`,
          },
        });
        console.log(response.data);
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
          gender: response.data.data.gender,
          stdBack: response.data.data.stdBack,
          stdFront: response.data.data.stdFront,
          ambassadorcode: response.data.data.ambassadorcode || "",
          student_id: response.data.data.student_id || "",
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

  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleCNICfChange = (event) => {
    const file = event.target.files[0];

    if (file.size > 10 * 1024 * 1024) {
      alert("File size should not exceed 10 MB");
      return;
    }

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setData((prevData) => ({ ...prevData, cnicFront: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCNICbChange = (event) => {
    const file = event.target.files[0];

    if (file.size > 10 * 1024 * 1024) {
      alert("File size should not exceed 10 MB");
      return;
    }

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setData((prevData) => ({ ...prevData, cnicBack: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSTfChange = (event) => {
    const file = event.target.files[0];

    if (file.size > 10 * 1024 * 1024) {
      alert("File size should not exceed 10 MB");
      return;
    }


    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setData((prevData) => ({ ...prevData, stdFront: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSTbfChange = (event) => {
    const file = event.target.files[0];

    if (file.size > 10 * 1024 * 1024) {
      alert("File size should not exceed 10 MB");
      return;
    }

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setData((prevData) => ({ ...prevData, stdBack: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const [data, setData] = useState(initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  
  };

  const handleGenderChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value === "male" ? true : false });
 
  };

  const handleButtonClick = async (e) => {
    e.preventDefault();
    setButtonLoading(true);

    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (key !== "cnicFront" && key !== "cnicBack" && key !== "stdFront" && key !== "stdBack") {
        formData.append(key, data[key]);
        console.log(data[key]);
      }
    });

    if (data.cnicFront) {
      formData.append("cnicFront", data.cnicFront);
    }
    if (data.cnicBack) {
      formData.append("cnicBack", data.cnicBack);
    }
    if (data.stdFront) {
      formData.append("stdFront", data.stdFront);
    }
    if (data.stdBack) {
      formData.append("stdBack", data.stdBack);
    }

    try {
      const response = await axios.put(
        `${apiUrl}/basic/basicInfoUpdate`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      // console.log(response.data);
      setButtonLoading(false);

      navigate("/dashboard");
    } catch (err) {
      setButtonLoading(false);
      console.error(err);
      alert("Error occurred while Updating data. Please try again.");
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
            />
          </div>
          <div className="col-md-4 mb-3">
            {/* <label className="bold-label" htmlFor="phone">Phone Number</label>
            <input type="tel" className="form-control form-input" id="phone" placeholder="(123) 456-7890" required /> */}
            <CustomTextField
              type="Phone"
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
              type="CNIC"
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
            <FormControl
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
            </FormControl>
          </div>
          <div className="col-md-8 mb-3">
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
              label="Guardian Name"
              name="guardianName"
              value={data.guardianName}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-4 mb-3">
            <CustomTextField
              type="Phone"
              iconType={<PhoneAndroidOutlinedIcon />}
              label="Guardian Contact No."
              name="guardianNumber"
              value={data.guardianNumber}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 mb-3">
            <CustomTextField
              type="stId"
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
              type="ambassadorCode"
              iconType={<AccountCircleOutlinedIcon />}
              label="Ambassador Code"
              name="ambassadorcode"
              value={data.ambassadorcode}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <div className="col-md-6 mb-3">
              <label className="bold-label" htmlFor="cnicFront">
                CNIC Front Copy
              </label>
            </div>
            <div
              class="upload-box px-4"
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
              class="upload-box px-4"
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
        <div className="row">
          <div className="col-md-6 mb-3">
            <div className="col-md-6 mb-3">
              <label className="bold-label" htmlFor="stcardFront">
                Student Card front side
              </label>
            </div>
            <div
              class="upload-box px-4"
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
              class="upload-box px-4"
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
        {buttonLoading ? <CircularProgress /> : (
        <button
          type="submit"
          className="btn btn-primary right-align "
        >
          Edit
        </button>
)}
      </div>
      </form>
      </>
}
    </UserLayout>
  );
};

export default RegEdit;
