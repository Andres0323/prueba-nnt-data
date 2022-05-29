import React from 'react';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import routes, { renderRoutes } from 'routes';
import {
  Button, Container, Nav, Navbar,
} from 'react-bootstrap';
import { Moon as MoonIcon } from 'react-feather';
import { masterMessages } from 'constantes';
import AppStyles from './App.css';

const { title } = masterMessages.app; // Carga los mensajes a mostrar

// variables globales
const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <div className={AppStyles.App}>
        {/* Header */}
        <Navbar expand="lg" variant="light" bg="light">
          <Container>
            <Navbar.Brand href="/">{ title }</Navbar.Brand>
            <Nav>
              <MoonIcon size={22} style={{ marginTop: 4 }} />
              <Button size="sm" style={{ fontSize: 11, margin: 2 }}>
                Light / Dark
              </Button>
            </Nav>
          </Container>
        </Navbar>
        {renderRoutes(routes)}
      </div>
    </Router>
  );
}

export default App;
