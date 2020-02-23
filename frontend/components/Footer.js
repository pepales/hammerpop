import React from 'react';
import { ListGroup, ListGroupItem, Col, Row } from 'reactstrap';
import logo from '../public/static/img/logo.png';

const Footer = () => {
  return (
    <React.Fragment>
      <div className="fsize-12 p-5">
        <hr />
        <Row>
          <Col>
            <img src={logo} alt="hammerpop" className="w-45" />
            <p>Copyright © 2020 wallapop © all propietaries</p>
          </Col>
          <Col>
            <ListGroup flush>
              <ListGroupItem disabled tag="a" href="#">
                Hammerpop
              </ListGroupItem>
              <ListGroupItem tag="a" href="#">
                ¿Who we are?
              </ListGroupItem>
              <ListGroupItem tag="a" href="#">
                Press
              </ListGroupItem>
              <ListGroupItem tag="a" href="#">
                Jobs
              </ListGroupItem>
              <ListGroupItem tag="a" href="#">
                Our Team
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col>
            <ListGroup flush>
              <ListGroupItem disabled tag="a" href="#">
                Support
              </ListGroupItem>
              <ListGroupItem tag="a" href="#">
                FAQ
              </ListGroupItem>
              <ListGroupItem tag="a" href="#">
                Code of conduct
              </ListGroupItem>
              <ListGroupItem tag="a" href="#">
                Safety tips
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col>
            <ListGroup flush>
              <ListGroupItem disabled tag="a" href="#">
                Legal
              </ListGroupItem>
              <ListGroupItem tag="a" href="#">
                Privacy Policy
              </ListGroupItem>
              <ListGroupItem tag="a" href="#">
                Use Policy
              </ListGroupItem>
              <ListGroupItem tag="a" href="#">
                Cookies
              </ListGroupItem>
              <ListGroupItem tag="a" href="#">
                Our Team
              </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default Footer;
