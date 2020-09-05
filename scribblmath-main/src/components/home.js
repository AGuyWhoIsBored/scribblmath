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
            <img src="http://loremflickr.com/420/400/abstract" id = "Description-image"></img>
            <div id = "Description-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the
              1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but
              also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets 
              containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the
              1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but
              also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets 
              containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the
              1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </div>
            
          </div>
        </section>
      </div>
    );
  }
});

export default home;