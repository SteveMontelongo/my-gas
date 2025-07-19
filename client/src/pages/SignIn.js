import {useState} from 'react';
import {Form, Button, Container, Row, Col} from 'react-bootstrap';

import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import SignUp from './SignUp';
function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async e => {
        
        e.preventDefault();
        setError('');
        try{
            const res = await axios.post('/api/signin', {email, password});
            console.log(res.data);
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
          }catch(err){
            setError(err.response?.data?.message || 'SignIn failed');
          }
    };

    return (
        
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                <h2 className="mb-4 text-center">Sign In</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formEmail" className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                    </Form.Group>
                    <Form.Group controlId="formPassword" className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100">Login</Button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </Form>
                <p>Don't have an account? <Link to={'/SignUp'}>Sign Up</Link></p>
                </Col>
            </Row>
        </Container>
    );
}

export default SignIn;