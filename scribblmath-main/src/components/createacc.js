import React from 'react';
import createClass from 'create-react-class';
import logo from '../logo.svg';
import './createacc.css';


// get our fontawesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilRuler, faSortDown } from '@fortawesome/free-solid-svg-icons'

var createacc = createClass ({
  render: function () {
    return (
      <div className = "login-header">
        <form action="/register" method="POST">
          <div className="login-logo"><FontAwesomeIcon icon={faPencilRuler} /></div>
          <h1 className="login-title">Create your account</h1>
          <div>
            <label for="name"><b>Username</b></label>
            <input type="text" placeholder="Enter username" name="name" required></input>
          </div>

          <div>
            <label for="email">Email</label>
            <input type="email" placeholder="Enter email" name="email" required></input>
          </div>
          
          <div>
            <label for="password"><b>Password</b></label>
            <input type="password" placeholder="Enter password" name="password" required></input>
          </div>
          <div>
            <label for="passwordConfirm"><b>Comfirm Password</b></label>
            <input type="password" placeholder="Re-enter password" name="passwordConfirm" required></input>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
});

export default createacc;
