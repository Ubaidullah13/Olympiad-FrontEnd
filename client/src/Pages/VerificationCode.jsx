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
        try {
          const response = await axios.get(
            `${API_URL}/basic/basicDisplay`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.accessToken}`,
              },
            }
          );

          setLoading(false);

        if(response.data.data == null){
          navigate('/registration');
          }
          else if (
            response.data.data !== null &&
            response.data.data.status === "verified"
          ) {
            localStorage.setItem("basicInfo", true);
            localStorage.setItem("basicInfoDetails", true);
            navigate("/dashboard");
          } else if (response.data.data !== null &&
            response.data.data.status === "rejected"){
              localStorage.setItem("rejected", true);
              navigate("/regedit");
            }              
          else {
              navigate('/pleasewait');
          }
        } catch (error) {
          console.log(error);
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
      <p>Enter Code sent to you on your email</p>
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