import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import API_URL from '../config';

const apiUrl = API_URL;


const RPR = (props) => {
    const Component = props.Component;
    console.log(Component.name);
    const navigate = useNavigate();

        let token = localStorage.getItem('accessToken');
        // let basicInfo = localStorage.getItem('basicInfo');
        // let basicInfoDetails = localStorage.getItem('basicInfoDetails');
        if(!token){
            navigate('/login');
        }else{
            if(localStorage.isParticipant === true)
            {
                navigate('/dashboard');
            }
        } 

    return(
        <div>
            <Component />
        </div>
    );
}

export default RPR;