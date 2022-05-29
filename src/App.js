import React from 'react';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import routes, { renderRoutes } from 'routes';
import AppStyles from './App.css';

// variables globales
const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <div className={AppStyles.App}>
        {renderRoutes(routes)}
      </div>
    </Router>
  );
}

export default App;
