import React from 'react';
import createClass from 'create-react-class';
import './main.css'

// get our fontawesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilRuler, faMicrophone, faVolumeUp, faEraser, faMicrophoneSlash} from '@fortawesome/free-solid-svg-icons'

var main = createClass ({
    turnOffMic: function () { 
        document.getElementById("micOn").classList.add("toogle-inactive");
        document.getElementById("micOff").classList.remove("toogle-inactive");
    },

    render: function() {
        return (
            <div class = "main-background">
                <div class="main-header">
                    <div style = {{padding: "10px 0px 0px 20px"}}>
                        <span><FontAwesomeIcon className="main-logo" icon={faPencilRuler} /> </span>
                        <span class="main-title">ScribblMath</span>
                        
                    </div>
                    <div class="main-buttons">
                        <span><FontAwesomeIcon className="main-button" icon = {faMicrophone} id="micOn" onClick='document.getElementById("micOn").classList.add("toogle-inactive"); document.getElementById("micOff").classList.remove("toogle-inactive");'/> </span>
                        <span><FontAwesomeIcon className="main-button toogle-inactive" icon = {faMicrophoneSlash}  id="micOff"/> </span>
                        <span><FontAwesomeIcon className="main-button vol-toggle" icon = {faVolumeUp} /> </span>
                        <span><FontAwesomeIcon className="main-button" icon = {faEraser} style={{"margin-right":"50px"}}/> </span>
                    </div>
                </div>
                <div className="center">

                    {/* whiteboard */}
                    <div class="float-child-left">
                        <canvas class="whiteboard"></canvas>

                        <div class="colors" style={{position: "static", height:"20%"}}>
                            <div class="color black" ></div>
                            <div class="color red"></div>
                            <div class="color green"></div>
                            <div class="color blue"></div>
                            <div class="color yellow"></div>
                        </div>
                    </div> 
                    
                    {/* chat */}
                    <div class="float-child-right" id="chatwindow">
                        <ul class="pages">
                            <li class="chat page">
                                <div class="chatArea">
                                    <ul class="messages"></ul>
                                </div>
                                <input class="inputMessage" placeholder="Type here..."/>
                            </li>
                        </ul>
                    </div>

                    <div style={{height: "100%", position: "relative"}}></div>    
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

        //toogling mic
        const toogleMicOff = document.createElement ('script');
        toogleMicOff.innerText = `function turnOffMic () { 
            document.getElementById("micOn").classList.add("toogle-inactive");
            document.getElementById("micOff").classList.remove("toogle-inactive");
        }`
        document.body.appendChild(toogleMicOff);
    }
})

export default main;