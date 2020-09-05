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
          <form>
            <div className="login-logo"><FontAwesomeIcon icon={faPencilRuler} /></div>
            <h1>ScribbleMath</h1>
            <label for="email"><b>Email</b></label>
            <input type="text" placeholder="Enter email" name="email" required></input>
            <label for="pass"><b>Password</b></label>
            <input type="text" placeholder="Enter password" name="pass" required></input>
            <button type="submit">Submit</button>
          </form>
        </div>
      );
    }
  });

export default login;
