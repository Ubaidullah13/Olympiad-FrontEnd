import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/VerificationCode.css";
import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import olympiad from '../Images/logo/logo.png';
import axios from 'axios';
import API_URL from "../config";
import { useNavigate } from "react-router-dom";

const MailSent = () => {

    const navigate = useNavigate();

    // const home = () => {
    //     navigate('https://olympiad.nust.edu.pk');
    // }

    return(
        <>
    <div className="code">
        <div className="Mycard">
        <img src={olympiad} alt="olympiad logo" width={200} className="mx-auto"/>
      <h2>Email Sent</h2>
      <p>A link to reset your password has been sent to your email</p>
      <div className='mb-4'>
        <a href="https://olympiad.nust.edu.pk"><button className="btnColor btn">Go to Home Page</button></a>
      </div>
      </div>
      </div>
        </>
    );
}

export default MailSent;