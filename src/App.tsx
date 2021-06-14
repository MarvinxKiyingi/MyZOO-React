import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { PageNotfound } from './components/PageNotFound';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <div className='App'> Hello MyZOO</div>
        </Route>
        <Route path='*'>
          <PageNotfound></PageNotfound>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
