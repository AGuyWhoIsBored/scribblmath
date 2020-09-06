import React from 'react';
import createClass from 'create-react-class';
import {Link} from 'react-router-dom';
import './login.css';

// get our fontawesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilRuler, faTimes } from '@fortawesome/free-solid-svg-icons'

var login = createClass ({
  render: function () {
    return (
      <div className = "login-header">
        <form action="/login" method="POST">
          <div className="form-contents">
            <div class = "cancel-icon-positioning">
              <Link to="/">
                <FontAwesomeIcon icon={faTimes} className = "cancel-icon"></FontAwesomeIcon>
              </Link>
            </div>
            <div className="login-logo"><FontAwesomeIcon icon={faPencilRuler} /></div>
            <div class="black-font login-title">Log in to ScribblMath</div>
            <div>
              <input type="email" placeholder="Enter email" name="email" required></input>
            </div>
            
            <div>
              <input type="password" placeholder="Enter password" name="password" required></input>
            </div>
            <button type="submit" className="login-button">Submit</button>
            <div className = "not-member">Not a member?<Link to="/signup" style={{color:"blue"}}> Click here to sign-up</Link></div>
            </div>
        </form>
      </div>
    );
  }
});

export default login;
