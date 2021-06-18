import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { AnimalDetails } from './components/AnimalDetails';
import { PageNotfound } from './components/PageNotFound';
import { StartPage } from './components/StartPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <StartPage></StartPage>
        </Route>
        <Route path='/animal/:id'>
          <AnimalDetails></AnimalDetails>
        </Route>
        <Route path='*'>
          <PageNotfound></PageNotfound>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
