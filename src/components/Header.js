import React from "react";
import {Navbar,Nav,Container, NavDropdown} from 'react-bootstrap';
import { NavLink , useNavigate } from 'react-router-dom';
import '../App.css';

const Header = () => {

    const user = JSON.parse(localStorage.getItem('user-info'));
    const navigate = useNavigate();
    
    const logout = () => {
      localStorage.clear();
      navigate('/login');
    }

    return (
        <>
           <Navbar bg="dark" variant="dark">
                <Container>
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="me-auto nav_bar_wrapper">
                      {
                        localStorage.getItem('user-info') ?
                        <>
                          <NavLink activeClassName='active' to='/'>All Products</NavLink>
                          <NavLink activeClassName='active' to='/add'>Add Product</NavLink>
                        </>
                        : 
                        <>
                          <NavLink activeClassName='active' to="/login">Login</NavLink>
                          <NavLink activeClassName='active' to="/register">Register</NavLink>
                        </>
                      } 
                    </Nav>

                    {
                        user ? 
                        <>
                          <Nav>
                              <NavDropdown title={ user.data.name }>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                    <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                              </NavDropdown>
                          </Nav>
                        </>
                        :
                        <>

                        </>
                    }
                   
                </Container>
            </Navbar>
        </>
    );

}

export default Header;