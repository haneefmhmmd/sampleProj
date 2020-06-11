import React from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Register from './Components/Register';
import FeedPage from './Components/Feedpage';



function App() {
  return (
    <Router>
      <Navbar />
      
      <Route exact path ='/login' component ={Login} />
      <Route exact path ='/feed' component ={FeedPage} />
      <Route exact path ='/register' component ={Register} />

    </Router>
  );
}

export default App;

