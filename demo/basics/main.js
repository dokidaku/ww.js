// http://www.html5rocks.com/en/tutorials/getusermedia/intro/
// http://www.patrick-wied.at/blog/how-to-create-audio-visualizations-with-javascript-html

window.onload = function() {
    // Create the bars
    var freqBars = {};
    var smplBars = {};
    var i;

    refreshDisp = function () {
        window.requestAnimationFrame(refreshDisp);
        ww.getFrequencies();
        ww.getSamples();
        for (i = 0; i < ww.sampleBufSize; ++i) {
            smplBars[i].style.height = (100.0 / 255.0 * ww.samples[i]) + '%';
        }
        for (i = 0; i < ww.freqBinCount; ++i) {
            freqBars[i].style.height = (100.0 / 255.0 * ww.freq[i]) + '%';
        }
    };

    // Initialize ww.js
    ww.sampleBufSize = 256;
    ww.fftSize = 256;
    ww.init(function() {
        for (i = 0; i < ww.sampleBufSize; ++i) {
            smplBars[i] = document.createElement('div');
            smplBars[i].classList.add('time-bar');
            smplBars[i].style.left = (i / ww.sampleBufSize * 100.0).toString() + '%';
            smplBars[i].style.width = (100.0 / ww.sampleBufSize).toString() + '%';
            document.body.appendChild(smplBars[i]);
        }
        for (i = 0; i < ww.freqBinCount; ++i) {
            freqBars[i] = document.createElement('div');
            freqBars[i].classList.add('freq-bar');
            freqBars[i].style.left = (i / ww.freqBinCount * 100.0).toString() + '%';
            freqBars[i].style.width = (100.0 / ww.freqBinCount).toString() + '%';
            document.body.appendChild(freqBars[i]);
        }
        refreshDisp();
    });
};
