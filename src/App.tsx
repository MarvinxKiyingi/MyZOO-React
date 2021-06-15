import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { Animals } from './components/Animals';
import { PageNotfound } from './components/PageNotFound';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Animals></Animals>
        </Route>
        <Route path='*'>
          <PageNotfound></PageNotfound>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
