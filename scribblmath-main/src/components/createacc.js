import React from 'react';
import createClass from 'create-react-class';
import {Link} from 'react-router-dom';
import './createacc.css';

// get our fontawesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

var createacc = createClass ({
  render: function () {
    return (
      <div className = "signup-header">
        <form action="/signup" method="POST">
          <div className="form-contents">
            <div class = "cancel-icon-positioning-2">
                    <Link to="/">
                      <FontAwesomeIcon icon={faTimes} className = "cancel-icon"></FontAwesomeIcon>
                    </Link>
            </div>
            <div className="spacing">
                <div className="signup-title black-font">Create your account</div>
                
                <div><input type="text" placeholder="Enter username" name="name" required></input></div>
                <div><input type="email" placeholder="Enter email" name="email" required></input></div>
                <div><input type="password" placeholder="Enter password" name="password" required></input></div>
<<<<<<< HEAD
                <div><input type="password" placeholder="Re-enter password" name="passwordConfirm" required></input></div>
              
=======
                <div><input type="password" placeholder="Re-enter password" name="password" required></input></div>
>>>>>>> d7869d9d23881bf452fd3c2dd65cbcd2a09c8fcb

                <div>
                <button type="submit" className="signup-button">Submit</button>
                </div>
                </div>
          </div>
        </form>
      </div>
    );
  }
});

export default createacc;
