import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/VerificationCode.css";
import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import olympiad from '../Images/logo/logo.png';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import API_URL from '../config';

// const initialState = {
//   email: "",
//   url: window.location.href,
// };

const ForgetPass = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    // const [data, setData] = useState(initialState);

    // current url of the page
    const url = window.location.href;

    const onSubmit = async (e) =>{
        e.preventDefault();
        setLoading(true);
        
        // console.log(data);
        try{
          const response = await axios.post(`${API_URL}/auth/forgotPassword`, {email: e.target[0].value, url: url});
          console.log(response);
          setLoading(false);
          navigate('/mailsent');
        }catch(error){
          alert("Invalid Email");
          setLoading(false);
          console.log(error);
        }

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
        // href of go back to login page
    }
      </div>
      </form>
      <a href="/login" className="text-muted">Go Back</a>
      </div>
      </div>
        </>
    );
}

export default ForgetPass;