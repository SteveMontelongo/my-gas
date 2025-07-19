import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard(){
    const [name, setName] = useState('');
    const navigate = useNavigate();

    useEffect(() =>{
        const token = localStorage.getItem('token');
        // if(!token){
        //     return navigate('/');
        // }
        console.log('Dashboard sees token:', token);

        axios.get('/api/me', {
            headers: {Authorization: `Bearer ${token}`}
        })
        .then(res => setName(res.data.name))
        .catch(()=>{
            localStorage.removeItem('token');
            navigate('/');
        });
    }, [navigate]);
    return(
        <Container className="mt-5">
            <h2>Welcome, {name}</h2>
        </Container>
    )
}
export default Dashboard;