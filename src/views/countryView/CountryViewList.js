import React  from 'react';
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
        <Col xs={12} md={3} lg={3}>
          <Card style={{ width: '18rem' }}>
            <Nav.Item>
              <Nav.Link href="/">
                <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_the_Taliban.svg" />
              </Nav.Link>
            </Nav.Item>
            <h1 style={{ marginLeft: 15 }}>Alemania</h1>
            <Card.Body>
              <span>Population: 1.4589.233</span>
              <br />
              <span>Región: Europa</span>
              <br />
              <span>Capital: Berlín</span>
              <br />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </div>
);

export default CountryViewList;
