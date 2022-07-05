import './App.css';
import React from 'react';
import {Route} from "react-router-dom";
import {BrowserRouter} from "react-router-dom";
//components
import Home from './components/Home/Home';

function App() {
  return (
    <BrowserRouter>
    <Route path='/home' component={Home}/>
    </BrowserRouter>
  );
}

export default App;
