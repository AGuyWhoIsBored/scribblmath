import React from 'react';
import createClass from 'create-react-class';
import './main.css'

var main = createClass ({
    render: function() {
        return (
            <div className="center">
                <sript>const ROOM_ID = "GLOBAL"</sript>
                <div class="float-container">

                <div class="float-child">
                    <div class="green">Float Column 1</div>
                </div>
                
                <div class="float-child">
                    <div class="blue">Float Column 2</div>
                </div>
                
                </div>
                <div id="video=grid">

                </div>
            </div>
        );
    }
})

export default main;