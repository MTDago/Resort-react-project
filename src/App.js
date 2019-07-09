import React from 'react';
import './App.css';
import Home from './pages/Home'
import Error from './pages/Error'
import SingleRoom from './pages/SingleRoom'
import Rooms from './pages/Rooms'
import NavBar from './components/Navbar'
import { Route, Switch } from 'react-router-dom'

function App() {
  return (
    <>
      <NavBar/>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/rooms/" component={Rooms}/>
      <Route exact path="/rooms/:slug" component={SingleRoom}/>
      <Route component={Error}/>
    </Switch>
    </>
    )
  }
  
  export default App;
  