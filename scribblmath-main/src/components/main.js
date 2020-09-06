import React, { useState } from 'react';
import createClass from 'create-react-class';
import './main.css'

// get our fontawesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilRuler, faMicrophone, faVolumeUp, faEraser, faMicrophoneSlash, faVolumeMute, faVideo, faVideoSlash} from '@fortawesome/free-solid-svg-icons'

function IconToggler(props)
{
    // required props: 
    // props.className
    // props.iconOn
    // props.iconOff
    // props.id
    // props.functionExecute

    const [status, toggleStatus] = useState(true);
    const onClick = () => toggleStatus(!status);

    // passing status to function
    //props.functionExecute(status);

    return (
        <span id={props.id} onClick={onClick} data-status={status}>
        { 
            status ? <FontAwesomeIcon className={props.className} icon = {props.iconOn}/> :
                     <FontAwesomeIcon className={props.className} icon = {props.iconOff}/>
        } </span>
    );
}


var main = createClass ({
    render: function() {

        return (
            <div class = "main-background">
                <div class="main-header">
                    <div style = {{padding: "10px 0px 0px 20px"}}>
                        <span><FontAwesomeIcon className="main-logo" icon={faPencilRuler} /> </span>
                        <span className="main-title">ScribblMath</span>
                        
                    </div>
                    <div class="main-buttons">
                        <IconToggler className="main-button" id="micToggle" iconOn={faMicrophone} iconOff={faMicrophoneSlash}/>
                        {/* <IconToggler className="main-button" id="volToggle" iconOn={faVolumeUp} iconOff={faVolumeMute}/> */}
                        <IconToggler className="main-button" id="vidToggle" iconOn={faVideo} iconOff={faVideoSlash}/>
                        <span><FontAwesomeIcon className="main-button" id="eraseWhiteboardButton" icon = {faEraser} style={{"margin-right":"50px"}}/> </span>
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
        const script4 = document.createElement('script');

        script1.src = '/js/chatController.js';
        script2.src = '/js/webcamStreamController.js';
        script3.src = '/js/whiteboardController.js';
        script4.src = '/js/generalController.js';
        script1.defer = true; script2.defer = true; script3.defer = true; script4.defer = true;

        document.body.appendChild(script0);
        document.body.appendChild(script1);
        document.body.appendChild(script2);
        document.body.appendChild(script3);
        document.body.appendChild(script4);
    }
})

export default main;