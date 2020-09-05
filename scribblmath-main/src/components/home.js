import React from 'react';
import createClass from 'create-react-class';
import {Link} from 'react-router-dom';
import './home.css';

// get our fontawesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilRuler, faSortDown } from '@fortawesome/free-solid-svg-icons'

var home = createClass ({
render: function () {
    return (
      <div className="App">
        <header className="App-header">  
          <FontAwesomeIcon className="App-logo" icon={faPencilRuler} />
          <h1 className = "App-title">
            Scribble Math
          </h1>
          <Link to ="/login"><button className = "login-button" type ="button">
            Click here to log in
          </button></Link>

          <div className = "create-account-option">Not a member? <Link to = "/signup">Create an account</Link> </div>
          <br></br>
          <FontAwesomeIcon className="arrow-scroll" icon={faSortDown}/>
        </header>


        <section className="Description-section">
          <h2>Our Goal</h2>
          <br></br>
          <br></br>
          <br></br>
        </section>
      </div>
    );
  }
});

export default home;
