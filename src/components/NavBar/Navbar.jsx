import { useContext } from 'react'
import { Link, useNavigate } from 'react-router'
import { UserContext } from '../../contexts/UserContext'
import { Button, Navbar } from 'react-bootstrap';
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
        <nav className='navbar navbar-expand-lg navbar-light mb-4 border-bottom'>
            <div className='container'>

                {/* LOGO: Always on the left */}
                <Link className="navbar-brand d-flex align-items-center" to='/'>
                    <img 
                        src="../../src/assets/devspacenav.png" 
                        alt="DevSpace Icon"
                        width='70'
                        height='50'
                        className='d-inline-block align-top'
                    />
                </Link>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                {/* right aligned nav */}
                <div className='collapse navbar-collapse'>
                    <div className='navbar-nav ms-auto align-items-center gap-3'>

                    {user ? (
                        <>
            
                        <Link className='nav-link fw-bold text-dark' to='/'>HOME</Link>
                 
                        <Link className='nav-link fw-bold text-dark' to='/posts'>Dev Network</Link>
                   
                        <Link className='nav-link fw-bold text-dark' to="/search">Find Friends</Link>
                    
                        <Link className='nav-link fw-bold text-dark' to='/posts/new'>Add Post</Link>
                   
                        <Link className='nav-link fw-bold text-dark' to={`/users/${user.id}/profile`}>My DevSpace</Link>

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
                        <Link to='/'>Home</Link>
                        
                        <Link className="nav-link fw-bold text-dark" to='/sign-in'>Sign In</Link>

                        <Button
                            as={Link} 
                            className="sign-up-btn btn btn-primary rounded-pill px-4 text-white fw-bold"
                            to='/sign-up'
                            >
                            Sign Up
                        </Button>
                </>
            )}
               </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;
