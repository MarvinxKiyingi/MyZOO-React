import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import { AnimalDetails } from './components/AnimalDetails';
import { Logo } from './components/Logo';
import { PageNotfound } from './components/PageNotFound';
import { StartPage } from './components/StartPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Logo></Logo>
          <StartPage></StartPage>
        </Route>
        <Route path='/animal/:id'>
          <Logo></Logo>
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
