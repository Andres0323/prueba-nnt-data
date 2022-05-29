import React from 'react';
import { Button, Container, Navbar } from 'react-bootstrap';

const CountryViewList = () => (
  <div className="App">
    <Container>
      <Navbar expand="lg" variant="light" bg="light">
        <Container>
          <Navbar.Brand href="#">Navbar</Navbar.Brand>
        </Container>
      </Navbar>
    </Container>


    <header className="App-header">
      <Button variant="primary">Primary</Button>
    </header>
  </div>
);

export default CountryViewList;
