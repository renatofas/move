// src/components/Navbar.js
import { useEffect, useState, useRef } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import logo from '../assets/logo.png';
import '../styles/App.css';

function AppNavbar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY.current && window.scrollY > 60) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      className={`navbar shadow ${showNavbar ? 'navbar-show' : 'navbar-hide'}`}
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to={isLoggedIn ? '/viajes' : '/'}
          className="d-flex align-items-center"
        >
          <img
            src={logo}
            alt="Logo"
            style={{ width: '40px', height: '40px', marginRight: '10px' }}
          />
          <span style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>
            MoveApp
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link
              onClick={() => {
                const token = localStorage.getItem('token');
                const user = parseJwt(token);
                if (user?.rol === 'conductor') {
                  navigate('/conductor');
                } else if (user?.rol === 'pasajero') {
                  navigate('/pasajero');
                } else {
                  navigate('/login');
                }
              }}
            >
              Viajes
            </Nav.Link>

            {isLoggedIn ? (
                <>
                    <Nav.Link
                    title="Perfil"
                    onClick={() => {
                        if (isLoggedIn) {
                        navigate('/perfil');
                        } else {
                        navigate('/login');
                        }
                    }}
                    >
                    <FaUserCircle
                        size={26}
                        style={{ color: 'white', marginLeft: '20px' }}
                    />
                    </Nav.Link>

                    <Nav.Link onClick={handleLogout} style={{ color: 'white' }}>
                    Cerrar sesión
                    </Nav.Link>
                </>
                ) : (
                <Nav.Link
                    onClick={() => navigate('/login')}
                    title="Iniciar sesión"
                >
                    <FaUserCircle
                    size={26}
                    style={{ color: 'white', marginLeft: '20px' }}
                    />
                </Nav.Link>
                )}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

//  Agrega esta función para decodificar el token
function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}

export default AppNavbar;
