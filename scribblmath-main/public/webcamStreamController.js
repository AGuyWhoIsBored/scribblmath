// code that will manage webcam streams and mics


const socket = io(); // MAY NEED TO CHANGE THIS??
const videoGrid = document.getElementById('video-grid');
const myPeer = new Peer(undefined, {}); // for now, define w/ empty options - use 0.peerjs.com for peer server
const myVideo = document.createElement(video);
myVideo.muted = true; // CHANGE THIS BASED ON MIC MUTED OR NOT!!

const peers = {}; // array of all peers connected to room!
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => 
    {
        addVideoStream(myVideo, stream);

        myPeer.on('call', call =>
        {
            call.answer(stream);

            const video = document.createElement('video');
            call.on('stream', userVideoStream => { addVideoStream(video, userVideoStream); });
        });

        socket.on('user-connected', userId => { if (peers[userId]) { peers[userId].close(); } });
    });

socket.on('user-disconnected', userId => { if (peers[userId]) { peers[userId].close(); }});
myPeer.on('open', id => { socket.emit('join-room', ROOM_ID, id); });

function connectToNewUser(userId, stream)
{
    const call = myPeer.call(userId, stream);
    const video = document.createElement('video');
    
    call.on('stream', userVideoStream => { addVideoStream(video, userVideoStream); });
    call.on('close', () => video.remove());

    peers[userId] = call;
}

function addVideoStream(video, stream)
{
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => { video.play(); });
    videoGrid.append(video);
}