import { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router'
import { Form, Button, Card, Container, Row, Col, Alert } from 'react-bootstrap';
import { signUp } from '../../services/authService'
import { UserContext } from '../../contexts/UserContext'

const SignUpForm = () => {
    const navigate = useNavigate()
    const { setUser } = useContext(UserContext)
    const [message, setMessage] = useState('')
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        passwordConf: '',
    })

    const { username, password, passwordConf } = formData

    const handleChange = (evt) => {
        setMessage('')
        setFormData({ ...formData, [evt.target.name]: evt.target.value })
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault()
        try {
            const newUser = await signUp(formData)
            setUser(newUser)
            navigate('/')
        } catch (err) {
            setMessage(err.message)
        }
    }

    const isFormInvalid = () => {
        return !(username && password && password === passwordConf)
    }

    return (
        <>
        <Container>
            <Row className='justify-content-center'>
                <Col md={6} lg={5}>
                    <Card className='shadow-sm border-0 mt-5'>
                        <Card.Body className='p-4'>
                            <h2 className='text-center fw-bold mb-4'>Sign Up</h2>
                                {message && (
                                    <Alert variant="danger" className="py-2 text-center small">
                                        {message}
                                    </Alert>
                                )}
                        
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className='mb-3'>
                                        <Form.Label className='small fw-bold'>Username:</Form.Label>
                                            <Form.Control
                                                type='text'
                                                id='username'
                                                value={username}
                                                name='username'
                                                placeholder='Enter username'
                                                onChange={handleChange}
                                                required
                                            />
                                    </Form.Group>

                                    <Form.Group className='mb-4'>
                                        <Form.Label className='small fw-bold'>Password:</Form.Label>
                                            <Form.Control
                                                type='password'
                                                id='password'
                                                value={password}
                                                name='password'
                                                placeholder='Enter password'
                                                onChange={handleChange}
                                                required
                                            />
                                    </Form.Group>
                                    
                                    <Form.Group className='mb-4'>
                                        <Form.Label className='small fw-bold'>Confirm Password:</Form.Label>
                                            <Form.Control
                                                type='password'
                                                id='confirm'
                                                value={passwordConf}
                                                name='passwordConf'
                                                placeholder='Confirm password'
                                                onChange={handleChange}
                                                required
                                            />
                                    </Form.Group>

                                    <Button 
                                        type='submit' 
                                        className='w-100 rounded-pill fw-bold text-white mb-3' 
                                        style={{ backgroundColor: '#00096b', border: 'none' }}
                                        disabled={isFormInvalid()}
                                    >
                                        Sign Up
                                    </Button>
                                    <Button 
                                        onClick={() => navigate('/')} 
                                        variant='outline-secondary'>Cancel</Button>

                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default SignUpForm;
