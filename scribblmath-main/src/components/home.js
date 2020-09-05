import React from 'react';
import createClass from 'create-react-class';
import { Link } from 'react-router-dom';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
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
          <h1 className ="App-title">
            Scribbl Math
          </h1>

          <p>Easily convey complex mathematical ideas in a virtual setting!</p>

          <Link to="/login"><button className ="login-button" type ="button">
            Click here to log in
          </button></Link>

          <div className = "create-account-option">Not a member? <Link to = "/signup" style={{ color: "blue"}}>Create an account</Link> </div>
          <br></br>

          <ScrollLink activeClass="active" to="Description-section" spy={true} smooth={true} offset={-70} duration={500}><FontAwesomeIcon className="arrow-scroll" icon={faSortDown}/></ScrollLink>
        </header>


        <section className="Description-section">
          <h2>Our Goal</h2>
          <p></p>
        </section>
      </div>
    );
  }
});

export default home;