import './Landing.css';
import { Link } from 'react-router';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

const Landing = () => {
    return (
        <main>
            {/* HERO SECTION */}
            <section className='py-3 mb-5'>
                <Container className='text-center py-5'>
                    <Row className='justify-content-center'>
                        <Col lg={8}>
                            <img src="src/assets/devspace-landing.png" alt="DevSpace logo" className="landing-logo"/>
                            <h1 className="display-3 fw-bold mb-3">{"<h1>"}DevSpace{"</h1>"}</h1>
                                <h3 className="lead mb-4">{"<h3>"}A social network with zero merge conflicts.{"</h3>"}</h3>
                                <div className='justify-content-center mb-4'>
                                    <Button 
                                        as={Link} 
                                        to="/sign-in" 
                                        variant="outline-dark" 
                                        size="lg" 
                                        className="connect-btn rounded-pill px-5 fw-bold"
                                    >
                                        Connect
                                    </Button>

                                <div className='justify-content-center mt-4'>
                                    <p className="text-center small text-muted">
                                    Already a user? <Link to="/sign-in" className="text-primary text-decoration-none fw-bold landing-link">Sign in</Link>
                                    </p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    );
};
export default Landing;
