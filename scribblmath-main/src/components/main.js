import React from 'react';
import createClass from 'create-react-class';
import './main.css'

var main = createClass ({
    render: function() {
        return (
            <div className="center">
                <div class="float-container">

                {/* whiteboard */}
                <div class="float-child">
                    <canvas class="whiteboard"></canvas>

                    <div class="colors">
                        <div class="color black"></div>
                        <div class="color red"></div>
                        <div class="color green"></div>
                        <div class="color blue"></div>
                        <div class="color yellow"></div>
                    </div>
                </div>
                
                {/* chat */}
                <div class="float-child" id="chatwindow">
                    <ul class="pages">
                        <li class="chat page">
                            <div class="chatArea">
                                <ul class="messages"></ul>
                            </div>
                            <input class="inputMessage" placeholder="Type here..."/>
                        </li>
                    </ul>
                </div>
                
                {/* webcam streams */}
                </div>
                <div id="video-grid">

                </div>
            </div>
        );
    },
    componentDidMount: function()
    {
        // defining room ID
        const script0 = document.createElement('script');
        script0.innerText = `const ROOM_ID = "GLOBAL"`;

        // load all controller scripts
        const script1 = document.createElement('script');
        const script2 = document.createElement('script');
        const script3 = document.createElement('script');

        script1.src = '/js/chatController.js';
        script2.src = '/js/webcamStreamController.js';
        script3.src = '/js/whiteboardController.js';
        script1.defer = true;
        script2.defer = true;
        script3.defer = true;

        document.body.appendChild(script0);
        document.body.appendChild(script1);
        document.body.appendChild(script2);
        document.body.appendChild(script3);

    }
})

export default main;