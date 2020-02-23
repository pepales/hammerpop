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
  Button,
} from 'reactstrap';
import Router from 'next/router';
// import icons & css
// import '../css/style.css';
import { FaSearchPlus } from 'react-icons/fa';
//
import { signout, isAuth } from '../actions/authActions';
// import imgs
import logo from '../public/static/img/logo.png';
// import env variables
// import { APP_NAME } from '../config';
import Search from './advert/Search';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/" className="logo-responsive">
          <img src={logo} alt="hammerpop" className="w-100" />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav navbar>
            <NavItem>
              <Link href="/contact">
                <NavLink className="cursorpointer">Contact</NavLink>
              </Link>
            </NavItem>

            {!isAuth() && (
              <React.Fragment>
                <NavItem>
                  <Link href="/signup">
                    <NavLink className="cursorpointer">Sign up</NavLink>
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
          </Nav>
        </Collapse>

        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Link href="/adverts">
                <Button outline color="secondary" className="mr-02 mb-01">
                  Adverts List
                </Button>
              </Link>
            </NavItem>
            <NavItem>
              <Button
                outline
                color="secondary"
                id="toggler"
                className="mr-02 mb-01"
              >
                <FaSearchPlus className="mr-1" />
                Search
              </Button>
            </NavItem>
            <NavItem>
              <Link href="/user/crud/create">
                <Button outline color="secondary" className="mb-01">
                  Publish an advert
                </Button>
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
