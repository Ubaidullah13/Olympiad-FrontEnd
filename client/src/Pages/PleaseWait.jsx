import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/VerificationCode.css";
import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import olympiad from '../Images/logo/logo.png';
import axios from 'axios';
import API_URL from "../config";
import { useNavigate } from "react-router-dom";

const PleaseWait = () => {

    const navigate = useNavigate();

    // const home = () => {
    //     navigate('/');
    // }

    return(
        <>
    <div className="code">
        <div className="Mycard">
        <img src={olympiad} alt="olympiad logo" width={200} className="mx-auto"/>
      <h2>Thank You</h2>
      <p>Your form has been submitted for review. It will take 5-7 working days for verification.</p>
      <div className='mb-4'>
      <a href="https://olympiad.nust.edu.pk"> <button className="btnColor btn">Go to Home Page</button></a>
      </div>
      {/* <p className="text-muted">If you haven't submitted your basic info, <a href="/registration">Click Here</a></p> */}
      </div>
      </div>
        </>
    );
}

export default PleaseWait;