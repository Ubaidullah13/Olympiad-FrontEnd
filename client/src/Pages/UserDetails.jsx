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
const UserDetails = () => {

  const initialState = { 
    stdFront: null,
    stdBack: null,
    cnic: "",
    studentOf: "",
    student_id: "",
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

    const [stCardFront, setStCardFront] = useState("");
    const [stCardBack, setStCardBack] = useState("");
  
    const handleStCardFrontChange = (event) => {
      const file = event.target.files[0];

      if (file.size > 10 * 1024 * 1024) {
        alert("File size should not exceed 10 MB");
        return;
      }


      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setStCardFront(reader.result);
        };
        reader.readAsDataURL(file);
        setData((prevData) => ({ ...prevData, stdFront: file }));
      }
    };
  
    const handleStCardBackChange = (event) => {
      const file = event.target.files[0];

      if (file.size > 10 * 1024 * 1024) {
        alert("File size should not exceed 10 MB");
        return;
      }

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setStCardBack(reader.result);
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
      setData((prevData) => ({ ...prevData, studentOf: selected }));
    };

  const handleSocialsChange = (event) => {
      const selected = event.target.value;
      setData((prevData) => ({ ...prevData, socials: selected }));
    };
  
    const handleButtonClick = async (e) => {
      e.preventDefault();
      setLoading(true);
    
      const formData = new FormData();

      console.log(data);
    
      // Append text data to formData
      Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
      });
    
      // Append file data to formData
      if (stCardFront) {
        formData.append("stCardFront", stCardFront);
      }
      if (stCardBack) {
        formData.append("stCardBack", stCardBack);
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
        navigate("/PleaseWait");
      } catch (err) {
        setLoading(false);
        console.error(err);
        alert(err.response.data.data);
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
        <CustomSocialsField type="socials" name="socials" label="Are you attending?" handleChange={handleSocialsChange} required/>
        </div>
        <br/>
      <div className="row">
        <div className="col-md-4 mb-3 right-align-text">
        <CustomRadioField type="University" name="studentOf" label="You are a Student of?" handleChange={handleRadioChange} required/>
        </div>
        </div>
        {showComponent && (
        <div>
        {/* <StudentDetails/> */}
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
            Student Card front side
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
            Student Card back side
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