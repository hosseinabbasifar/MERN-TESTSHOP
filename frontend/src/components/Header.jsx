import {Badge, Navbar, Nav, Container } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { useSelector } from 'react-redux';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <NavLink to="/" className="navbar-brand">
            <img src={logo} alt="" />
            MERN-TESTSHOP
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <NavLink to="/cart" className="nav-link">
                <FaShoppingCart /> Cart
                {cartItems.length > 0 && (
                     <Badge pill bg='success' style={{ marginLeft: '5px' }}>
                       {cartItems.reduce((a, c) => a + c.qty, 0)}
                     </Badge>
                   )}
              </NavLink>
              <NavLink to="/login" className="nav-link">
                <FaUser /> Sign In
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
