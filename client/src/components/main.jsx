import React, { useState } from 'react';
import '../css/main.css'

// get our fontawesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilRuler, faMicrophone, faEraser, faMicrophoneSlash, faVideo, faVideoSlash} from '@fortawesome/free-solid-svg-icons'

function IconToggler(props)
{
    // required props: className, iconOn, iconOff, id

    const [status, toggleStatus] = useState(true);
    const onClick = () => toggleStatus(!status);

    return (
        <span id={props.id} onClick={onClick} data-status={status}>
        { 
            status ? <FontAwesomeIcon className={props.className} icon = {props.iconOn}/> :
                     <FontAwesomeIcon className={props.className} icon = {props.iconOff}/>
        } </span>
    );
}

export default class Main extends React.Component
{
    render()
    {
        return (
            <div className = "main-background">
                <div className="main-header">
                    <div style = {{padding: "10px 0px 0px 20px"}}>
                        <span><FontAwesomeIcon className="main-logo" icon={faPencilRuler} /> </span>
                        <span className="main-title">ScribblMath</span>   
                    </div>
                    <div className="main-buttons">
                        <IconToggler className="main-button" id="micToggle" iconOn={faMicrophone} iconOff={faMicrophoneSlash}/>
                        {/* <IconToggler className="main-button" id="volToggle" iconOn={faVolumeUp} iconOff={faVolumeMute}/> */}
                        <IconToggler className="main-button" id="vidToggle" iconOn={faVideo} iconOff={faVideoSlash}/>
                        <span><FontAwesomeIcon className="main-button" id="eraseWhiteboardButton" icon = {faEraser} style={{marginRight:"50px"}}/> </span>
                    </div>
                </div>
            
                <div className="center">

                    {/* whiteboard */}
                    <div className="float-child-left">
                        <canvas className="whiteboard"></canvas>

                        <div className="colors">
                            <div className="color black" ></div>
                            <div className="color red"></div>
                            <div className="color green"></div>
                            <div className="color blue"></div>
                            <div className="color yellow"></div>
                            <div className="color white"></div>
                        </div>
                    </div> 
                    
                    {/* chat */}
                    <div className="float-child-right" id="chatwindow">
                        <ul className="pages">
                            <li className="chat page">
                                <div className="chatArea">
                                    <ul className="messages"></ul>
                                </div>
                                <input className="inputMessage" placeholder="Type here..."/>
                            </li>
                        </ul>
                        <div style={{paddingTop: "4em", color: "white"}}>
                            <small>Wrap any (La)TeX math using "$" to have it auto-typeset in the chat and create nice math!</small>
                        </div>
                    </div>

                    <div style={{height: "100%", position: "relative"}}></div>    
                
                </div>

                {/* webcam streams */}
                <div id="video-grid">
                </div>  
            </div>
        )
    }

    
    
    componentDidMount()
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
        script1.defer = true; script2.defer = true; script3.defer = true;

        document.body.appendChild(script0);
        document.body.appendChild(script1);
        document.body.appendChild(script2);
        document.body.appendChild(script3);
    }
}