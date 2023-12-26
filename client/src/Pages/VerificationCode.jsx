import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/VerificationCode.css";
import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import olympiad from '../Images/logo/logo.png';
import axios from 'axios';
import API_URL from "../config";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const VerificationCode = () => {

    const [otp, setOtp] = useState('');

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
 
    const handleVerify = async () => {
      setLoading(true);
      try {
        const response = await axios.post(`${API_URL}/auth/verifyEmail`, { code:otp },
        {
          headers: {
          Authorization: `Bearer ${localStorage.accessToken}`,
        }
      });
        // Handle successful verification
        console.log('Verification successful', response.data.data);
        const basicInfo = localStorage.getItem('basicInfo');
        const basicInfoDetails = localStorage.getItem('basicInfoDetails');
        setLoading(false);

        if(!basicInfo || basicInfo === "false"){
          navigate('/registration');
        }
        else if(!basicInfoDetails || basicInfoDetails === "false"){
          navigate('/details');
        }else{
          navigate('/pleasewait');
        }

        
      } catch (error) {
        // Handle errors
        setLoading(false);
        alert(error.response.data.data);
      }
    };

    return(
        <>
    <div className="code">
        <div className="Mycard">
        <img src={olympiad} alt="olympiad logo" width={200} className="mx-auto"/>
      <h2>Verification</h2>
      <p>Enter Code send to you on your email</p>
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={6}
        renderSeparator={<span> </span>}
        inputType="tel"
        containerStyle={{ display: 'unset' }}
        inputStyle={{ width: "3rem", height: "3.5rem" }}
        renderInput={(props) => <input {...props} className='otp-input' />}
      />
      <div className='btn-container mb-4'>
        <button onClick={handleVerify}>{loading ? "Verifying" : "Verify Code"}</button>
      </div>
      </div>
    </div>
        </>
    );
}

export default VerificationCode;