import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/Registration.css';
import React, { useState } from 'react';
import SideNav from '../Components/SideNav';
import TopNav from '../Components/TopNav';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CustomRadioField from '../Components/CustomRadio';
import CustomTextField from '../Components/CustomTextField';
import StudentDetails from '../Components/StudentDetails';
import { useNavigate } from 'react-router-dom';
import olympiad from "../Images/logo/logo.png";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import API_URL from '../config';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import CustomSocialsField from '../Components/CustomSocialsField';
import { Hidden } from '@mui/material';
const UserDetails = () => {

  const initialState = { 
    stdFront: null,
    stdBack: null,
    cnic: "",
    studentOf: "",
    student_id: "0",
    schoolName: "",
    socials: "",
    ambassadorcode: "0000",
  };

  const [data, setData]= useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    console.log(data);
  };
  

    const navigate = useNavigate();
    const [selectedValue, setSelectedValue] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [showComponent, setShowComponent] = useState(false);
    const [showOther, setShowOther] = useState(false);
    const [socials, setSocials] = useState("");

    const [stCardFront, setStCardFront] = useState("");
    const [stCardBack, setStCardBack] = useState("");
  
    const handleStCardFrontChange = (event) => {
      const file = event.target.files[0];

      if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
        alert("Invalid file type. Please select an image (PNG, JPEG, JPG).");
        document.getElementById("stcardFront").value = "";
        return;
      }
  
      if (file.size > 500 * 1024) {
        alert("File size should not exceed 500 KB");
        document.getElementById("stcardFront").value = "";
        return;
      }
  
  
      if (!file) {
        alert("No file selected.");
        document.getElementById("stcardFront").value = "";
        return;
      }


      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setStCardFront(reader.result);
        };
        reader.onerror = (error) => {
          console.error("Error reading file:", error);
          alert("An error occurred while reading the file.");
          document.getElementById("stcardFront").value = "";
          return;
        };
        reader.readAsDataURL(file);
        setData((prevData) => ({ ...prevData, stdFront: file }));
      }
    };
  
    const handleStCardBackChange = (event) => {
      const file = event.target.files[0];

      if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
        alert("Invalid file type. Please select an image (PNG, JPEG, JPG).");
        document.getElementById("stcardBack").value = "";
        return;
      }
  
      if (file.size > 500 * 1024) {
        alert("File size should not exceed 500 KB");
        document.getElementById("stcardBack").value = "";
        return;
      }
  
  
      if (!file) {
        alert("No file selected.");
        document.getElementById("stcardBack").value = "";
        return;
      }

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setStCardBack(reader.result);
        };
        reader.onerror = (error) => {
          console.error("Error reading file:", error);
          alert("An error occurred while reading the file.");
          document.getElementById("stcardBack").value = "";
          return;
        };
        reader.readAsDataURL(file);
        setData((prevData) => ({ ...prevData, stdBack: file }));
      }
    };
  
    const handleRadioChange = (event) => {
      const selected = event.target.value;
      setSelectedValue(selected);
      setIsButtonDisabled(selected !== 'other');
      setShowComponent(selected !== 'other');
      setShowOther(selected === 'other');
      setData((prevData) => ({ ...prevData, studentOf: selected }));
    };

  const handleSocialsChange = (event) => {
      const selected = event.target.value;
      setSocials(selected);
      setData((prevData) => ({ ...prevData, socials: selected }));
    };
  
    const handleButtonClick = async (e) => {
      // check if customRADIO FIELD "socials" is selected
      console.log(socials);
      if (!socials) {
        alert("Please select the socials you want to participate in.");
        return;
      }
      
      e.preventDefault();

      setLoading(true);
    
      const formData = new FormData();

      console.log(data);
    
      // Append text data to formData
      Object.keys(data).forEach(key => {

        if (key !== "stdFront" && key !== "stdBack") {
          let value = String(data[key]);
console.log(key);
          if (value.charAt(value.length - 1) === " ") {
            value = value.slice(0, -1);
          }

          formData.append(key, value);
      }
      });
    
      // Append file data to formData
      // console.log("data");
      // console.log(data);
      if (stCardFront) {
        console.log("stCardFront");
        formData.append("stdFront", data.stdFront);
      }
      if (stCardBack) {
        console.log("stCardFront");
        formData.append("stdBack", data.stdBack);
      }
    
      try {
        const response = await axios.post(`${API_URL}/basic/basicSecondPage`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
    
        console.log(response.data);
        const accessToken = response.data.data.accessToken;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('basicInfoDetails', true);
        setLoading(false);
        // navigate("/PleaseWait");
        navigate("/dashboard"); 
      } catch (err) {
        setLoading(false);
        console.error(err);
        alert(err.response.data.message);
      }
    };

  return (
    <div className="container content-center">
      <img src={olympiad} alt="olympiad logo" />
      <h2>Olympiad Registration</h2>
      <p>Please fill the form below to participate in Olympiad. Fill all the required fields</p>
      <form onSubmit={handleButtonClick}>
      <div className="row">
      <div className="col-md-4 mb-3 right-align-text">
            <h3>Details</h3>
            <p>Fill the form given below.</p>
          </div>
      </div>
      <div className="col-md-4 mb-3 right-align-text">
        <CustomSocialsField type="socials" name="socials" label="Which socials would you like to participate in? (Select One)" handleChange={handleSocialsChange} required/>
        </div>
        <br/>
      <div className="row">
        <div className="col-md-4 mb-3 right-align-text">
        <CustomRadioField type="University" name="studentOf" label="You are a Student of? (Select One)" handleChange={handleRadioChange} required/>
        </div>
        </div>
        {showComponent && (
        <div>
        <div className="row">
        <div className="col-md-4 mb-3">
          <CustomTextField
            type="Person"
            iconType={<AccountCircleOutlinedIcon />}
            label="Roll Number / CMS ID"
            name="student_id"
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-4 mb-3">
          <CustomTextField
            type="Campus"
            iconType={<SchoolOutlinedIcon />}
            label="Campus Name"
            name="schoolName"
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-4 mb-3">
          <CustomTextField
            type="Code"
            iconType={<AccountCircleOutlinedIcon />}
            label="Ambassador Code"
            req="0"
            name="ambassadorcode"
            onChange={handleInputChange}
            helperText={"Type 0000 if you don't have any code"}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mb-3">
          {/* <div className="col-md-6 mb-3"> */}
          <label className="bold-label" htmlFor="stcardFront">
            Student Card front side <span className="text-muted"> Max file size is 500KB</span>
          </label>
          {/* </div> */}
          <div
            class="upload-box"
            style={{
              backgroundImage: `url(${stCardFront})`,
              backgroundSize: "cover",
              borderColor: "var(--primary-dark)",
            }}
          >
          <label htmlFor="file-upload" className="upload-label">
            <input
              id="stcardFront"
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleStCardFrontChange}
              name="stdFront"
              required
              />
          </label>
              </div>
        </div>
        <div className="col-md-6 mb-3">
          {/* <div className="col-md-6 mb-3"> */}
          <label className="bold-label" htmlFor="stcardBack">
            Student Card back side <span className="text-muted"> Max file size is 500KB</span>
          </label>
          {/* </div> */}
          <div class="upload-box"
            style={{
              backgroundImage: `url(${stCardBack})`,
              backgroundSize: "cover",
              borderColor: "var(--primary-dark)",
            }}
            >
            <label htmlFor="file-upload" className="upload-label">
              <input
                id="stcardBack"
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleStCardBackChange}
                name="stdBack"
                required
              />
            </label>
          </div>
        </div>
      </div>
        </div>
        )}

        {showOther && ( 
        // Other Category
        <div>
        <div className="row">
        <div className="col-md-4 mb-3 d-none">
          <CustomTextField
            type="Person"
            iconType={<AccountCircleOutlinedIcon />}
            label="Number (Ignore)"
            name="student_id"
            value="00"
            Hidden
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-4 mb-3">
          <CustomTextField
            type="Campus"
            iconType={<SchoolOutlinedIcon />}
            label="Home Town / City"
            name="schoolName"
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-4 mb-3">
          <CustomTextField
            type="Code"
            iconType={<AccountCircleOutlinedIcon />}
            label="Ambassador Code"
            req="0"
            name="ambassadorcode"
            onChange={handleInputChange}
            helperText={"Type 0000 if you don't have any code"}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mb-3">
          {/* <div className="col-md-6 mb-3"> */}
          <label className="bold-label" htmlFor="stcardFront">
            Father/Guardian CNIC front side <span className="text-muted"> Max file size is 500KB</span>
          </label>
          {/* </div> */}
          <div
            class="upload-box"
            style={{
              backgroundImage: `url(${stCardFront})`,
              backgroundSize: "cover",
              borderColor: "var(--primary-dark)",
            }}
          >
          <label htmlFor="file-upload" className="upload-label">
            <input
              id="stcardFront"
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleStCardFrontChange}
              name="stdFront"
              required
              />
          </label>
              </div>
        </div>
        <div className="col-md-6 mb-3">
          {/* <div className="col-md-6 mb-3"> */}
          <label className="bold-label" htmlFor="stcardBack">
          Father/Guardian CNIC back side <span className="text-muted"> Max file size is 500KB</span>
          </label>
          {/* </div> */}
          <div class="upload-box"
            style={{
              backgroundImage: `url(${stCardBack})`,
              backgroundSize: "cover",
              borderColor: "var(--primary-dark)",
            }}
            >
            <label htmlFor="file-upload" className="upload-label">
              <input
                id="stcardBack"
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleStCardBackChange}
                name="stdBack"
                required
              />
            </label>
          </div>
        </div>
      </div>
        </div>
        )}
      {loading ? (
          <div className="loader-container">
            <CircularProgress />
          </div>
        ):(
       <button 
        variant="contained"
        color="primary"
        type="submit"
        className="btn right-align btnColor">Next step</button>
        )}
    </form>
    </div>

      
  );
};

export default UserDetails;