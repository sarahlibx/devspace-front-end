import { useContext } from 'react'
import { Link, useNavigate } from 'react-router'
import { UserContext } from '../../contexts/UserContext'
import { Button, Navbar, Nav, Container } from 'react-bootstrap';
import navBarImg from "../../assets/devspacenav.png";
import './NavBar.css';

const NavBar = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem('token')
        setUser(null);
        navigate('/'); // return to landing page
    };

    return (
        <NavBar expand="lg" className='navbar navbar-light mb-4 border-bottom'>
            <Container className='container'>

                {/* LOGO: Always on the left */}
                <Navbar.Brand as={Link} to='/' className="navbar-brand d-flex align-items-center">
                    <img 
                        src={navBarImg} 
                        alt="DevSpace Icon"
                        width='70'
                        height='50'
                        className='d-inline-block align-top'
                    />
                </Navbar.Brand>

                {/* hamburger menu button */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                {/* right aligned nav */}
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='ms-auto align-items-center gap-3'>

                    {user ? (
                        <>
            
                        <Nav.Link className='nav-link fw-bold text-dark' to='/'>HOME</Nav.Link>
                 
                        <Nav.Link className='nav-link fw-bold text-dark' to='/posts'>Dev Network</Nav.Link>
                   
                        <Nav.Link className='nav-link fw-bold text-dark' to="/search">Find Friends</Nav.Link>
                    
                        <Nav.Link className='nav-link fw-bold text-dark' to='/posts/new'>Add Post</Nav.Link>
                   
                        <Nav.Link className='nav-link fw-bold text-dark' to={`/users/${user.id}/profile`}>My DevSpace</Nav.Link>

                        <Button
                            className='btn btn-primary rounded-pill px-4 text-white fw-bold' 
                            onClick={handleSignOut}
                            style={{ backgroundColor: '#00096b', border: 'none' }}
                            >
                            SIGN OUT
                        </Button>
                        </>
            ) : (
                <>
                        <Nav.Link to='/'>Home</Nav.Link>
                        
                        <Nav.Link className="nav-link fw-bold text-dark" to='/sign-in'>Sign In</Nav.Link>

                        <Button
                            as={Link} 
                            className="sign-up-btn btn btn-primary rounded-pill px-4 text-white fw-bold"
                            to='/sign-up'
                            >
                            Sign Up
                        </Button>
                </>
            )}
                </Nav>
                </Navbar.Collapse>
            </Container>
        </NavBar>
    )
}

export default NavBar;
