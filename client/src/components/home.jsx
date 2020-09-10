import React from 'react';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import '../css/home.css';
import ourGoalPhoto from '../assets/ourGoalPhoto.jpeg'

// get our fontawesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilRuler, faSortDown } from '@fortawesome/free-solid-svg-icons'

export default class Home extends React.Component
{
  render()
  {
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

          <div>
            <small className="scroll">
            <ScrollLink to="Description-section" spy={true} smooth={true} offset={-70} duration={500}>About ScribblMath <FontAwesomeIcon className="arrow-scroll scroll" icon={faSortDown}/></ScrollLink>
            </small>
          </div>
        </header>


        <section className="Description-section">
          <h1 style={{fontSize: "30px"}}><b>Our Goal</b></h1>
          <div>
            <img src={ourGoalPhoto} alt="ourGoalPhoto" id="Description-image"></img>
            <div id = "Description-text">
              <p>
              Being in a worldwide pandemic, teaching mathematics has certainly become a struggle for both students and teachers.
              We have all been in that one Zoom call where your math teacher is trying to explain some sort of concept, and due to
              the lack of tools available, it simply isn't a good time for anyone.
              </p>

              <p>
              Inspired from the lack of math functionality on most video chat platforms, our team created a web application 
              focused on accomodating students and teachers alike for their math needs. ScribblMath is a video chatting platform that 
              implements the staples of video chat like webcams and a chat, but also adds elements that are crucial to conveying 
              complex mathematics in an easy way. 
              </p>

              <p>
              These primarily include a virtual drawing board as well as LaTeX math typesetting support in the chat box! 
              This means that your teacher will no longer have to spend hours trying to type out the correct 
              math equation or attempt to draw the ten symbols that each of the equations has that you learned that day. It will look 
              just like the way it does in your textbook!!
              </p>

              <p>
              So, what are you waiting for? Get on ScribblMath NOW!!!! Your math exams will thank you :)
              </p>
              <br></br>
            </div>
          </div>
        </section>
      </div>
    );
  }
} 