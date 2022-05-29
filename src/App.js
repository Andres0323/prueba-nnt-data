import React from 'react';
import { createBrowserHistory } from 'history';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import routes, { renderRoutes } from 'routes';

// variables globales
const history = createBrowserHistory();

function App() {
  return (
    <BrowserRouter history={history}>
      {renderRoutes(routes)}
    </BrowserRouter>
  );
}

export default App;
