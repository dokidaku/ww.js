// http://www.html5rocks.com/en/tutorials/getusermedia/intro/
// http://www.patrick-wied.at/blog/how-to-create-audio-visualizations-with-javascript-html

window.onload = function() {
    // Connect to the microphone
    var errorCallback = function (err) {
        alert('Something went wrong while connecting to the microphone QAQ\n' + err.message);
        console.log(arguments);
    };
    navigator.getUserMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia || navigator.msGetUserMedia;
    if (navigator.getUserMedia) {
        navigator.getUserMedia({audio: true}, function (stream) {
            // Get ready for the data
            window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
            var audctx = new window.AudioContext();
            var melsrc = audctx.createMediaStreamSource(stream);
            window.melsrc = melsrc; // Firefox bug workaround, see http://stackoverflow.com/q/22860468
            var analys = audctx.createAnalyser();
            melsrc.connect(analys);
            //analys.connect(audctx.destination);     // Uncomment for playback
            analys.fftSize = 1024;
            var auddata = new Uint8Array(analys.frequencyBinCount);

            // Create the bars
            var bars = {};
            var i;
            for (i = 0; i < analys.frequencyBinCount; ++i) {
                bars[i] = document.createElement('div');
                bars[i].classList.add('bar');
                bars[i].style.left = (i / analys.frequencyBinCount * 100.0).toString() + '%';
                bars[i].style.width = (100.0 / analys.frequencyBinCount).toString() + '%';
                document.body.appendChild(bars[i]);
            }

            refreshDisp = function () {
                window.requestAnimationFrame(refreshDisp);
                analys.getByteFrequencyData(auddata);
                for (i = 0; i < analys.frequencyBinCount; ++i) {
                    bars[i].style.height = (100.0 / 255.0 * auddata[i]) + '%';
                }
            };

            refreshDisp();
        }, errorCallback);
    } else {
        errorCallback({message: 'Seems like your browser doesn\'t support that...'});
    }
};
