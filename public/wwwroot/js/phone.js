const video = document.getElementById('webcam');
const liveView = document.getElementById('liveView');
const demosSection = document.getElementById('demos');
const enableWebcamButton = document.getElementById('webcamButton');
const other = document.getElementById('other')
var canvas = document.querySelector("#canvas")
const display = document.getElementById('display')
let detail
let constraints = {
    video: true
}
var front = false
const resoluciones = [[1280, 720], [1024, 776], [1920, 1080]]
let resolucion = 0
var width = 320
var height = 0

// Check if webcam access is supported.
function getUserMediaSupported() {
    return !!(navigator.mediaDevices &&
        navigator.mediaDevices.getUserMedia);
}

// If webcam supported, add event listener to button for when user
// wants to activate it to call enableCam function which we will 
// define in the next step.
if (getUserMediaSupported()) {
    enableWebcamButton.addEventListener('click', enableCam);
    other.addEventListener('click', switchCamera)
} else {
    console.warn('getUserMedia() is not supported by your browser');
}

function switchCamera()
{
    front = !front
    let position = resolucion == (resoluciones.length - 1) ? 0 : resolucion+1
    resolucion= position

    constraints = {
        video: {
            width: { min: resoluciones[resolucion][0] },
            height: { min: resoluciones[resolucion][1] },
            facingMode: front ? "user" : "environment"
        }
    }

    if (detail)
    {
        display.removeChild(detail)
    }

    detail = document.createElement('p')
    detail.innerText = JSON.stringify(constraints)
    display.appendChild(detail)
}

// Enable the live webcam view and start classification.
function enableCam(event) {
    // Only continue if the COCO-SSD has finished loading.
    if (!model) {
        return;
    }

    // Hide the button once clicked.
    //event.target.classList.add('removed');

    

    // Activate the webcam stream.
    navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
        video.srcObject = stream;
        video.addEventListener('loadeddata', predictWebcam);
        
    });
}

// Placeholder function for next step.
var children = [];

function predictWebcam() {
    // Now let's start classifying a frame in the stream.
    model.detect(video).then(function (predictions) {
        // Remove any highlighting we did previous frame.
        for (let i = 0; i < children.length; i++) {
            liveView.removeChild(children[i]);
        }
        children.splice(0);

        // Now lets loop through predictions and draw them to the live view if
        // they have a high confidence score.
        for (let n = 0; n < predictions.length; n++) {
            // If we are over 66% sure we are sure we classified it right, draw it!
            if (predictions[n].score > 0.66) {

                if (predictions[n].class == 'bus' || predictions[n].class == 'laptop') {
                    const buss = document.createElement('p')
                    var capture = document.createElement('img')
                    buss.innerText = predictions[n].class + new Date().toLocaleTimeString()

                    height = video.videoHeight / (video.videoWidth / width)
                    canvas.setAttribute("width", width);
                    canvas.setAttribute("height", height)
                    canvas.width = width;
                    canvas.height = height;
                    canvas.getContext("2d").drawImage(video, 0, 0, width, height);
                    var data = canvas.toDataURL("image/png");
                    photo.setAttribute("src", data)
                    capture.setAttribute("src", data);

                    display.appendChild(capture)
                    display.appendChild(buss)                    
                }

                
                console.log(video.srcObject)
                
                const p = document.createElement('p');
                p.innerText = predictions[n].class + ' - with '
                    + Math.round(parseFloat(predictions[n].score) * 100)
                    + '% confidence.';
                p.style = 'margin-left: ' + predictions[n].bbox[0] + 'px; margin-top: '
                    + (predictions[n].bbox[1] - 10) + 'px; width: '
                    + (predictions[n].bbox[2] - 10) + 'px; top: 0; left: 0;';

                const highlighter = document.createElement('div');
                highlighter.setAttribute('class', 'highlighter');
                highlighter.style = 'left: ' + predictions[n].bbox[0] + 'px; top: '
                    + predictions[n].bbox[1] + 'px; width: '
                    + predictions[n].bbox[2] + 'px; height: '
                    + predictions[n].bbox[3] + 'px;';

                liveView.appendChild(highlighter);
                liveView.appendChild(p);
                children.push(highlighter);
                children.push(p);
            }
        }

        // Call this function again to keep predicting when the browser is ready.
        window.requestAnimationFrame(predictWebcam);
    });
}

// Pretend model has loaded so we can try out the webcam code.
var model = true;
demosSection.classList.remove('invisible');

// Store the resulting model in the global scope of our app.
var model = undefined;

// Before we can use COCO-SSD class we must wait for it to finish
// loading. Machine Learning models can be large and take a moment 
// to get everything needed to run.
// Note: cocoSsd is an external object loaded from our index.html
// script tag import so ignore any warning in Glitch.
cocoSsd.load().then(function (loadedModel) {
    model = loadedModel;
    // Show demo section now model is ready to use.
    demosSection.classList.remove('invisible');
});