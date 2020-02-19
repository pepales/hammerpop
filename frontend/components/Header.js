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
import { signout, isAuth } from '../actions/authActions';
// import imgs
// import logo from '../public/static/img/logo.jpg';
// import env variables
import { APP_NAME } from '../config';
import Search from './advert/Search';

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
            <React.Fragment>
              <NavItem>
                <Link href="/adverts">
                  <NavLink className="cursorpointer">Adverts</NavLink>
                </Link>
              </NavItem>
            </React.Fragment>

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
            {isAuth() && isAuth().role === 0 && (
              <NavItem>
                <Link href="/user">
                  <NavLink className="cursorpointer">
                    {`${isAuth().name}'s Dashboard`}
                  </NavLink>
                </Link>
              </NavItem>
            )}
            {isAuth() && isAuth().role === 1 && (
              <NavItem>
                <Link href="/admin">
                  <NavLink className="cursorpointer">
                    {`${isAuth().name}'s Dashboard`}
                  </NavLink>
                </Link>
              </NavItem>
            )}

            <NavItem>
              <Link href="/user/crud/create">
                <NavLink className="btn btn-primary text-light">
                  Publish an advert
                </NavLink>
              </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <Search />
    </div>
  );
};

export default Header;
