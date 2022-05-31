import React, { useState } from 'react';
import { createBrowserHistory } from 'history';
import { ThemeProvider } from 'styled-components';
import { Router } from 'react-router-dom';
import routes, { renderRoutes } from 'routes';
import {
  Button, Container, Nav, Navbar,
} from 'react-bootstrap';
import { Moon as MoonIcon } from 'react-feather';
import { masterMessages } from 'constantes';
import { lightTheme, darkTheme } from './theme';
import AppStyles from './App.css';
import GlobalStyles from './global';

const { title } = masterMessages.app; // Carga los mensajes a mostrar

// variables globales
const history = createBrowserHistory();

function App() {
  const [theme, setTheme] = useState(lightTheme); // tema predeterminado

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <Router history={history}>
          <div className={AppStyles.App}>
            {/* Header */}
            <Navbar expand="lg" variant="light" bg="light">
              <Container>
                <Navbar.Brand href="/">{ title }</Navbar.Brand>
                <Nav>
                  <MoonIcon size={22} style={{ marginTop: 4 }} />
                  <Button
                    size="sm"
                    style={{ fontSize: 11, margin: 2 }}
                    onClick={() => setTheme((theme === lightTheme) ? darkTheme : lightTheme)}
                  >
                    Light / Dark
                  </Button>
                </Nav>
              </Container>
            </Navbar>
            {renderRoutes(routes)}
          </div>
        </Router>
      </>
    </ThemeProvider>
  );
}

export default App;
