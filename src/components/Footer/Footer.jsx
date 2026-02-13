import './Footer.css';
import footerImg from '../../assets/devspace logo 1.png';
import { Container, Row, Col, Stack } from 'react-bootstrap';
import { Link } from 'react-router';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className='footer border-top py-5'>
            <Container>
                <Row className='footer-content gy-4 align-items-center'>

                    <Col xs={12} md={6} className='footer-left text-center text-md-start'>
                        <img className='footer-logo mb-2' src={footerImg} alt="money-mentor-logo" />
                        <p className="text-muted mb-0">A place for devs.</p>
                    </Col>
            
                    <Col xs={12} md={6} className='footer-right'>
                        <Stack gap={3} className='align-items-center align-items-md-end'>
                            <div className='footer-links d-flex gap-3'>
                                <a href="https://github.com/sarahlibx/devspace-front-end" target="_blank">GitHub</a>
                                <a href="https://www.linkedin.com/in/sarahsmithdeveloper/" target="_blank">Connect</a>
                                <a href="mailto:sarahlib90@gmail.com?subject=Connecting from DevSpace" target="_blank">Contact</a>
                            </div>

                        <div className='footer-devs text-center text-md-end'>
                            <p className="mb-1 text-muted small">&copy; {currentYear} DevSpace. All rights reserved.</p>
                            <p className="mb-1 text-muted small">Made with 💙 by Sarah.</p>
                        </div>
                    </Stack>                
                </Col>

            </Row>
        </Container>
        </footer>
    );
};

export default Footer;