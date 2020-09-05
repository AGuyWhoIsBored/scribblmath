import React from 'react';
import createClass from 'create-react-class';
import {Link} from 'react-router-dom';
import './login.css';

// get our fontawesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilRuler, faSortDown } from '@fortawesome/free-solid-svg-icons'

var login = createClass ({
  render: function () {
    return (
      <div className = "login-header">
        <form action="/login" method="POST">
          <div className="form-contents">
            <div className="login-logo"><FontAwesomeIcon icon={faPencilRuler} /></div>
            <div class="black-font login-title">Log in to ScribbleMath</div>
            <div>
              <input type="email" placeholder="Enter email" name="email" required></input>
            </div>
            
            <div>
              <input type="password" placeholder="Enter password" name="password" required></input>
            </div>
            <button type="submit" className="login-button">Submit</button>
            </div>
        </form>
      </div>
    );
  }
});

export default login;
