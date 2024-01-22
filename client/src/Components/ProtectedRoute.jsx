import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import API_URL from '../config';
import Users from '../Pages/RegPortal/Users';

const apiUrl = API_URL;


const ProtectedRoute = (props) => {
    const Component = props.Component;
    console.log(Component.name);
    const navigate = useNavigate();

    useEffect(() => {

        let token = localStorage.getItem('accessToken');

        if(!token){
            navigate('/login');
            return;
        }

        if(localStorage.rejected === "true")
        {
            navigate('/regEdit');
            return;
        }       
    }, []);

    if(localStorage.isParticipant)
    {
        return(
            <div>
                <Component />
            </div>
        );
    }
    else{
        return(
            <div>
                <Users />
            </div>
        );
    }
}

export default ProtectedRoute;