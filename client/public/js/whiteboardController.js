// code to control whiteboard stuff on frontend
// adapted from https://github.com/socketio/socket.io/blob/master/examples/whiteboard/public/main.js

(function() 
{
    var socket = io();
    canvas = document.getElementsByClassName('whiteboard')[0];
    var colors = document.getElementsByClassName('color');
    var context = canvas.getContext('2d');
    var current = { color: 'black' };
    var drawing = false;
    var offSetX = canvas.getBoundingClientRect().x;
    var offSetY = canvas.getBoundingClientRect().y;
  
    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mouseup', onMouseUp, false);
    canvas.addEventListener('mouseout', onMouseUp, false);
    canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false);
    
    //Touch support for mobile devices
    canvas.addEventListener('touchstart', onMouseDown, false);
    canvas.addEventListener('touchend', onMouseUp, false);
    canvas.addEventListener('touchcancel', onMouseUp, false);
    canvas.addEventListener('touchmove', throttle(onMouseMove, 10), false);

    document.querySelector('#eraseWhiteboardButton').onclick = () => { context.clearRect(0, 0, canvas.width, canvas.height); socket.emit('clear board'); }
  
    for (var i = 0; i < colors.length; i++) { colors[i].addEventListener('click', onColorUpdate, false); }
  
    //socket events
    socket.on('drawing', onDrawingEvent);
    socket.on('clear board', () => context.clearRect(0, 0, canvas.width, canvas.height)); 
  
    window.addEventListener('resize', onResize, false);
    onResize();

    var whiteboardContainer;
    var instructions;
    //Whiteboard enlarge
    document.querySelector('.expand-compress').onclick = () => {
        if (document.querySelector('.float-child-left')){
            //enlarge whiteboard
            whiteboardContainer = document.querySelector('.float-child-left');
            whiteboardContainer.classList.remove('float-child-left');
            whiteboardContainer.classList.add('animate');
            whiteboardContainer.classList.add('expanded-whiteboard');

            //remove chatbox math typsetting instructions from display
            instructions = document.getElementById('instruction');
            instructions.classList.add('toggle-inactive');

            //remove videogrid from display
            document.getElementById('video-grid').classList.add('toggle-inactive')
        }
        else {
            //minimize whiteboard
            whiteboardContainer = document.querySelector('.expanded-whiteboard');
            whiteboardContainer.classList.add('float-child-left');
            whiteboardContainer.classList.remove('animate');
            whiteboardContainer.classList.remove('expanded-whiteboard');

            //add chatbox math typsetting instructions back to display
            instructions = document.getElementById('instruction');
            instructions.classList.remove('toggle-inactive'); 

            //add videogrid back onto display
            document.getElementById('video-grid').classList.remove('toggle-inactive'); 
        }
    }

    function drawLine(x0, y0, x1, y1, color, emit)
    {
        context.beginPath();
        context.moveTo(x0, y0);
        context.lineTo(x1, y1);
        context.strokeStyle = color;
        context.lineWidth = 2;
        context.stroke();
        context.closePath();
  
        if (!emit) { return; }
        var w = canvas.width;
        var h = canvas.height;
  
        socket.emit('drawing', 
        {
            x0: x0 / w,
            y0: y0 / h,
            x1: x1 / w,
            y1: y1 / h,
            color: color
        });
    }
  
    function onMouseDown(e)
    {
        drawing = true;
        current.x = (e.clientX||e.touches[0].clientX) - (offSetX);
        current.y = (e.clientY||e.touches[0].clientY) - (offSetY);
    }
  
    function onMouseUp(e)
    {
        if (!drawing) { return; }
        drawing = false;
        drawLine(current.x, current.y, 
                (e.clientX||e.touches[0].clientX) - (offSetX), 
                (e.clientY||e.touches[0].clientY) - (offSetY), 
                current.color, true);
    }
  
    function onMouseMove(e)
    {
        if (!drawing) { return; }
        drawLine(current.x, current.y, 
                (e.clientX||e.touches[0].clientX) - (offSetX), 
                (e.clientY||e.touches[0].clientY) - (offSetY), 
                current.color, true);
        current.x = (e.clientX||e.touches[0].clientX) - (offSetX);
        current.y = (e.clientY||e.touches[0].clientY) - (offSetY);
    }
  
    function onColorUpdate(e) { current.color = e.target.className.split(' ')[1]; }
  
    // limit the number of events per second
    function throttle(callback, delay) 
    {
        var previousCall = new Date().getTime();
        return function() 
        {
            var time = new Date().getTime();
  
            if ((time - previousCall) >= delay) 
            {
                previousCall = time;
                callback.apply(null, arguments);
            }
        };
    }
  
    function onDrawingEvent(data)
    {
        var w = canvas.width;
        var h = canvas.height;
        drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
    }
  
    // make the canvas fill its parent
    function onResize() 
    {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
    }
})();