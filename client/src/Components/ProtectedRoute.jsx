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

        async function fetchData() {
            
            try{
                const response = await axios.get(`${API_URL}/auth/auth`,
                {
                headers: {
                Authorization: `Bearer ${localStorage.accessToken}`,
                }
            })

            if(response.data.data.isParticipant === false)
            {
                navigate('/users');
            }
            }catch(error){
                console.log(error);
                alert("Sorry! There is Network Error, Try Again Later");
            }
            
          }

        let token = localStorage.getItem('accessToken');

        if(!token){
            navigate('/login');
        }else{
            fetchData();
        }        
    });

    return(
        <div>
            <Component />
        </div>
    );
}

export default ProtectedRoute;