(function (window) {
    var ww = {};
    ww.sampleBufSize = 1024;
    ww.fftSize = 1024;
    ww.freqBinCount = undefined;
    ww.initialized = false;
    ww.init = function (callback) {
        if (ww.initialized) {
            ww.audctx = null;
            ww.melsrc = null;
            ww.analys = null;
        }
        // Connect to the microphone
        var errorCallback = function (err) {
            alert('Something went wrong while connecting to the microphone QAQ\n' + err.message);
            console.log(arguments);
            ww.initialized = false;
            ww.audctx = null;
            ww.melsrc = null;
            ww.analys = null;
        };
        ww.initialized = true;
        navigator.getUserMedia = navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia;
        if (navigator.getUserMedia) {
            navigator.getUserMedia({audio: true}, function (stream) {
                // Get ready for the data
                window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
                ww.audctx = new window.AudioContext();
                ww.melsrc = ww.audctx.createMediaStreamSource(stream);
                ww.analys = ww.audctx.createAnalyser();
                ww.melsrc.connect(ww.analys);
                //analys.connect(audctx.destination);
                ww.analys.fftSize = ww.fftSize;
                ww.freqBinCount = ww.analys.frequencyBinCount;
                ww.samples = new Uint8Array(ww.sampleBufSize);
                ww.freq = new Uint8Array(ww.analys.frequencyBinCount);
                callback();
            }, errorCallback);
        } else {
            errorCallback({message: 'Seems like your browser doesn\'t support that...'});
        }
    };
    ww.getFrequencies = function () {
        if (!ww.initialized) {
            console.log('ww.js not initialized; Call ww.init() first');
            return;
        }
        ww.analys.getByteFrequencyData(ww.freq);
    };
    ww.getSamples = function () {
        if (!ww.initialized) {
            console.log('ww.js not initialized; Call ww.init() first');
            return;
        }
        ww.analys.getByteTimeDomainData(ww.samples);
    };
    window.ww = ww;
}(window));
