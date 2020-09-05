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
          <div className="login-logo"><FontAwesomeIcon icon={faPencilRuler} /></div>
          <h1 className="login-title">Log in to ScribbleMath</h1>
          <div>
            <label for="email">
              <div>Email

              </div>
            </label>
            <input type="email" placeholder="Enter email" name="email" required></input>
          </div>
          
          <div>
            <label for="password"><b>Password</b></label>
            <input type="password" placeholder="Enter password" name="password" required></input>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
});

export default login;
