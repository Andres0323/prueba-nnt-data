import React from 'react';
import {
  Button, Container, Navbar, Nav, Row, Col, Card,
} from 'react-bootstrap';
import { masterMessages } from 'constantes';
import {
  Moon as MoonIcon,
} from 'react-feather';

const { title } = masterMessages.app; // Carga los mensajes

const CountryViewList = () => (
  <div>
    <Container>
      <Navbar expand="lg" variant="light" bg="light">
        <Container>
          <Navbar.Brand href="/">{ title }</Navbar.Brand>
          <Nav>
            <MoonIcon size={25} />
            <Button size="sm" style={{ fontSize: 9, margin: 2 }}>
              Light / Dark
            </Button>
          </Nav>
        </Container>
      </Navbar>
    </Container>

    <Container>
      <Row>
        <h1>Detallle</h1>
      </Row>
    </Container>
  </div>
);

export default CountryViewList;
