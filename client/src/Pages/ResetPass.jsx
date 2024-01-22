import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/VerificationCode.css";
import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import olympiad from '../Images/logo/logo.png';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { TextField } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const ResetPass = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // clear local storage
    localStorage.clear();

    const onSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const pass = e.target[0].value;
        console.log(pass);
        setLoading(false);
        navigate('/login');
    }

    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return(
        <>
    <div className="code">
        <div className="Mycard">
        <img src={olympiad} alt="olympiad logo" width={200} className="mx-auto"/>
      <h2>Reset Password</h2>
      {/* Form so that user can enter email */}
        <form onSubmit={onSubmit}>
            <div className="form-group">
            <label htmlFor="exampleInputEmail1">Enter New Password</label>
            <TextField
                  label={
                    <span style={{color: 'var(--primary-dark)'}}>
                      <LockOutlinedIcon style={{ marginRight: "8px" }} />
                      Password
                    </span>
                  }
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  required
                  name="password"
                  InputProps={{
                    style: { borderRadius: "50px" },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleTogglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
            </div>
      <div className='mb-4'>
        {loading ? <CircularProgress /> : 
        <button className="btnColor btn">Reset Password</button>
    }
      </div>
      </form>
      </div>
      </div>
        </>
    );
}

export default ResetPass;