import { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // try {
    //   const res = await fetch('/api/auth/signup', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formData),
    //   });

    //   if (!res.ok) throw new Error('Sign up failed');
    //   navigate('/signin'); // Redirect to sign in
    // } catch (err) {
    //   setError(err.message);
    // }
    try{
      console.log(`AXIOS name: ${formData.name}  email: ${formData.email}  password: ${formData.password}`);
      await axios.post('/api/signup', {name: formData.name, email: formData.email, password: formData.password});
      navigate('/');
    }catch(err){
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h2 className="mb-4 text-center">Create an Account</h2>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" required value={formData.name} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" required value={formData.email} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" required value={formData.password} onChange={handleChange} />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">Sign Up</Button>
            <p>Already have an account? <Link to="/">Sign In</Link></p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default SignUp;