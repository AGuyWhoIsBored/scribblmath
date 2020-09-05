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
          <FontAwesomeIcon className="login-logo" icon={faPencilRuler} />
            <label for="email"><b>Email</b></label>
            <input type="email" placeholder="Enter email" name="email" required></input>
            <label for="password"><b>Password</b></label>
            <input type="password" placeholder="Enter password" name="password" required></input>
            <button type="submit">Submit</button>
          </form>
        </div>
      );
    }
  });

export default login;
