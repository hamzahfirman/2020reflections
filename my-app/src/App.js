import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
//Components
import Home from './components/Home';
import Login from './components/Login';
import Quiz from './components/Quiz';

/* 
      Passes props source to the desired destination. Also
      '...' means concatination the passed in props with the 
      props in the Homepage 
      */
function App() {
  return (
   <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Switch>
      <Route exact path='/' render={ props => <Home {...props}/>}>
      </Route>
      <Route path='/login'>
        <Login />
      </Route>
      <Route path='/quiz' render={ props => <Quiz {...props}/>}>
    </Route>
    </Switch>
   </BrowserRouter>
  );
}

export default App;
