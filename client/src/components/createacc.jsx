import React from 'react';
import {Link} from 'react-router-dom';
import '../css/createacc.css';

// get our fontawesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

export default class CreateAcc extends React.Component
{
  render() 
  {
    return (
      <div className = "signup-header">
        <form action="/signup" method="POST">
          <div className="form-contents-create">
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
                <div><input type="password" placeholder="Re-enter password" name="passwordConfirm" required></input></div>
              

                <div>
                <button type="submit" className="signup-button">Submit</button>
                </div>
                <div className = "already-member">Already a member?<Link to="/login" style={{color:"blue"}}> Click here to login</Link></div>
              </div>
          </div>
        </form>
      </div>
    );
  }
}