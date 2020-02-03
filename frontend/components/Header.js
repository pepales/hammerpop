import React, { useState } from 'react';
import Link from 'next/link';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import Router from 'next/router';
// import icons & css
import '../css/style.css';
import { FaUserAlt } from 'react-icons/fa';
//
import { signout, isAuth } from '../actions/authAction';
// import imgs
// import logo from '../public/static/img/logo.jpg';
// import env variables
import { APP_NAME } from '../config';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">
          {/* <img src={logo} alt="hammerpop" /> */}
          {APP_NAME}
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {!isAuth() && (
              <React.Fragment>
                <NavItem>
                  <Link href="/signup">
                    <NavLink className="cursorpointer">
                      <FaUserAlt className="mr-1" />
                      Sign up
                    </NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/signin">
                    <NavLink className="cursorpointer">Sign in</NavLink>
                  </Link>
                </NavItem>
              </React.Fragment>
            )}
            {isAuth() && (
              <NavItem>
                <NavLink
                  className="cursorpointer"
                  onClick={() => signout(() => Router.replace('/'))}
                >
                  Sign out
                </NavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
