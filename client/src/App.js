import './App.css';
import React from 'react';
import { Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
//components
import Home from './components/Home/Home';
import Landing from './components/Landing/Landing';
import Nav from './components/Nav/Nav';
import Details from './components/Details/Details';
import CreateGame from './components/CreateGame/CreateGame';

function App() {
  return (
    <BrowserRouter>
      <Route path='/' component={Nav} />
      <Route exact path='/' component={Landing} />
      <Route exact path='/home' component={Home} />
      <Route exact path='/details/:idGame' component={Details} />
      <Route exact path='/createVideogame' component={CreateGame} />
    </BrowserRouter>
  );
}

export default App;
