import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/VerificationCode.css";
import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import olympiad from '../Images/logo/logo.png';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const ForgetPass = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const email = e.target[0].value;
        console.log(email);
        setLoading(false);
        navigate('/mailsent');
    }

    return(
        <>
    <div className="code">
        <div className="Mycard">
        <img src={olympiad} alt="olympiad logo" width={200} className="mx-auto"/>
      <h2>Forget Password</h2>
      {/* Form so that user can enter email */}
        <form onSubmit={onSubmit}>
            <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required/>
            </div>
      <div className='mb-4'>
        {loading ? <CircularProgress /> : 
        <button className="btnColor btn">Send Email</button>
    }
      </div>
      </form>
      </div>
      </div>
        </>
    );
}

export default ForgetPass;