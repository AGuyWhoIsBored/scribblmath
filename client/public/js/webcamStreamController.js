// code that will manage webcam streams and mics

const socket = io('/')
const videoGrid = document.getElementById('video-grid')
const myPeer = new Peer(undefined, {                    // <-- IF STREAMS ARE NOT CONNECTING, DO NOT USE LOCAL PEERJS SERVER AND USE DEFAULT 0.PEERJS.COM SERVER!!
                                                        // IF WE ARE USING LOCAL SERVER, MAKE SURE TO RUN IT!!
    host: location.hostname,
    debug: '3',
    port: location.port|| (location.protocol === 'https' ? 443 : 80),
    path: '/peerjs'
});
const myVideo = document.createElement('video');
myVideo.muted = true;
const peers = {};


        
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => 
    {
        addVideoStream(myVideo, stream)

        myPeer.on('call', call => 
        {
            console.log("answered call");
            call.answer(stream)
            const video = document.createElement('video')
            call.on('stream', userVideoStream => 
            {
                console.log("video stream created");
                addVideoStream(video, userVideoStream)
            })
        });

        socket.on('user-connected', userId => { console.log("new user connected"); connectToNewUser(userId, stream); });

    setInterval(() => 
    {
        let vidStatus = document.querySelector('#vidToggle').getAttribute('data-status');
        let micStatus = document.querySelector('#micToggle').getAttribute('data-status');
        //let volStatus = document.querySelector('#volToggle').getAttribute('data-status');

        if (stream)
        {
            stream.getVideoTracks()[0].enabled = vidStatus === 'true' ? true : false;
            stream.getAudioTracks()[0].enabled = micStatus === 'true' ? true : false;
            //console.log(stream.getVideoTracks()[0].enabled, stream.getAudioTracks()[0].enabled);
        }
    }, 250);
}).catch((e) => { console.log("a fatal error occurred while trying to get user media"); });

socket.on('user-disconnected', userId => 
{
    console.log("user disconnected");
    if (peers[userId]) {
        peers[userId].close()
        cleanUp(); //remove webcam username tag when user disconnects
    }
});

myPeer.on('open', id => { console.log("peerjs received"); socket.emit('join-room', ROOM_ID, id); });

function connectToNewUser(userId, stream) 
{
    console.log("new user connected to room");
    const call = myPeer.call(userId, stream)
    console.log("call", call);
    const video = document.createElement('video')
    call.on('stream', userVideoStream => 
    {
        console.log("stream added");
        addVideoStream(video, userVideoStream)
    });
    call.on('close', () => { video.remove(); });
    
    peers[userId] = call;
}

function addVideoStream(video, stream) 
{
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => { video.play(); });
    
    var videoContainer = document.createElement('div');

    //create a textnode for user's username 
    //when testing the frontend, remove next 3 lines after 'var id;'
    var id;
    if (user.username)
        id = document.createTextNode(user.username);
    else
        id = document.createTextNode('MEOW');

    //create an HTML element to store username 
    var userName = document.createElement('div');
    userName.classList.add("userID");
    userName.appendChild(id) 

    var userNameContainer = document.createElement('div');
    userNameContainer.classList.add("userID-container");
    userNameContainer.appendChild(userName)
    
    //Add both video webcam and user name to videocontainer
    videoContainer.appendChild(video);
    videoContainer.appendChild(userNameContainer);

    videoGrid.append(videoContainer);
    cleanUp(); //Fixes webcam duplication issue when there are more than 1 participant 
} 

function cleanUp () {
    var videoContainers = videoGrid.childNodes;
    var videoContainersCount = videoGrid.childElementCount;

    for (var i = 0; i < videoContainersCount; i++)
    {
        if (videoContainers[i].childElementCount < 2)
        {
            console.log("Vid-container popppppppeddddd!!!")
            videoContainers[i].remove();
        }
    }
}