import React from 'react';
import createClass from 'create-react-class';
import { Link } from 'react-router-dom';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import './home.css';
import ourGoalPhoto from '.././assets/ourGoalPhoto.jpeg'

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
            ScribblMath
          </h1>

          <p>Easily convey complex mathematical ideas in a virtual setting!</p>

          <Link to="/login"><button className ="login-button" type ="button">
            Click here to log in
          </button></Link>

          <div className = "create-account-option">Not a member? <Link to = "/signup" style={{ color: "blue"}}>Create an account</Link> </div>
          <br></br>

          <ScrollLink to="Description-section" spy={true} smooth={true} offset={-70} duration={500}><FontAwesomeIcon className="arrow-scroll" icon={faSortDown}/></ScrollLink>
        </header>


        <section className="Description-section">
          <h1 style={{fontSize: "30px"}}><b>Our Goal</b></h1>
          <div>
            <img src={ourGoalPhoto} alt="ourGoalPhoto" id="Description-image"></img>
            <div id = "Description-text">
              Being in a worldwide pandemic, teaching has certainly become a struggle for both students and teachers.
              Inspired from the lack of math functionality on most voice call software, we created an app focused on 
              accomodating students and teachers for their math needs. ScribblMath is voice calling software that 
              implements a video log, virtual drawing board, and a chat box that supports math type setting (Latex).
               
            </div>
          </div>
        </section>
      </div>
    );
  }
});

export default home;