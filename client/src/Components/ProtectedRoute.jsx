import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import API_URL from '../config';

const apiUrl = API_URL;


const ProtectedRoute = (props) => {
    const Component = props.Component;
    console.log(Component.name);
    const navigate = useNavigate();

    useEffect(() => {

        let token = localStorage.getItem('accessToken');

        if(!token){
            navigate('/login');
        }else{
            
            if(!localStorage.isParticipant)
            {
                navigate('/users');
            }
            if(localStorage.rejected === "true")
            {
                navigate('/regEdit');
            }
        }        
    }, []);

    return(
        <div>
            <Component />
        </div>
    );
}

export default ProtectedRoute;