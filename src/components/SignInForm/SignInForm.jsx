import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { signIn } from '../../services/authService'
import { UserContext } from '../../contexts/UserContext'

const SignInForm = () => {
    const navigate = useNavigate()
    const { setUser } = useContext(UserContext)
    const [message, setMessage] = useState('')
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    })

    const handleChange = (evt) => {
        setMessage('')
        setFormData({ ...formData, [evt.target.name]: evt.target.value })
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault()
        try {
            const signedInUser = await signIn(formData)
            setUser(signedInUser)
            navigate('/')
        } catch (err) {
            setMessage(err.message)
        }
    }

    return (
        <>
        <Container className='mt-5'>
            <Row className="justify-content-center">
                <Col md={6} lg={5}>
                    <Card className="shadow-sm border-0 mt-5">
                        <Card.Body className='p-4'>
                            <h2 className='text-center fw-bold mb-4'>Sign In</h2>
                                <p>{message}</p>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className='mb-3'>
                                    <Form.Label className='small fw-bold'>Username:</Form.Label>
                                
                                    <Form.Control
                                        type='text'
                                        autoComplete='off'
                                        id='username'
                                        value={formData.username}
                                        name='username'
                                        onChange={handleChange}
                                        placeholder='Enter username'
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className='mb-4'>
                                    <Form.Label className='small fw-bold'>Password:</Form.Label>
                                        <Form.Control
                                            type='password'
                                            autoComplete='off'
                                            id='password'
                                            value={formData.password}
                                            name='password'
                                            onChange={handleChange}
                                            placeholder='Enter password'
                                            required
                                        />
                                </Form.Group>

                                <Button
                                    type='submit'
                                    className='w-100 rounded-pill fw-bold text-white mb-3'
                                    style={{ backgroundColor: '#00096b', border: 'none' }}
                                    >
                                        Sign In
                                    </Button>
                                <Button 
                                    onClick={() => navigate('/')}
                                    variant='outline-secondary'
                                >
                                    Cancel
                                </Button>
                                
                                <p className="text-center small text-muted">
                                    New to DevSpace? <Link to="/sign-up" className="text-primary text-decoration-none fw-bold">Join now</Link>
                                </p>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
        </>
    )
}
export default SignInForm
