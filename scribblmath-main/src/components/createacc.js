import React from 'react';
import createClass from 'create-react-class';
import './createacc.css';

var createacc = createClass ({
  render: function () {
    return (
      <div className = "signup-header">
        <form action="/signup" method="POST">
          <div className="form-contents">
            <div className="spacing">
              <div className="signup-title black-font">Create your account</div>

                <div><input type="text" placeholder="Enter username" name="name" required></input></div>
                <div><input type="email" placeholder="Enter email" name="email" required></input></div>
                <div><input type="password" placeholder="Enter password" name="password" required></input></div>
                <div><input type="password" placeholder="Re-enter password" name="password" required></input></div>
              

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
