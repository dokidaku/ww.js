// http://www.html5rocks.com/en/tutorials/getusermedia/intro/
// http://www.patrick-wied.at/blog/how-to-create-audio-visualizations-with-javascript-html

window.onload = function() {
    // Create the bars
    var freqBars = {};
    var timeBars = {};
    var i;

    refreshDisp = function () {
        window.requestAnimationFrame(refreshDisp);
        ww.getFrequencyData();
        ww.getTimeDomainData();
        for (i = 0; i < ww.bufSize; ++i) {
            timeBars[i].style.height = (100.0 / 255.0 * ww.timeData[i]) + '%';
        }
        for (i = 0; i < ww.freqBinCount; ++i) {
            freqBars[i].style.height = (100.0 / 255.0 * ww.freqData[i]) + '%';
        }
    };

    // Initialize ww.js
    ww.bufSize = 256;
    ww.fftSize = 256;
    ww.init(function() {
        for (i = 0; i < ww.bufSize; ++i) {
            timeBars[i] = document.createElement('div');
            timeBars[i].classList.add('time-bar');
            timeBars[i].style.left = (i / ww.bufSize * 100.0).toString() + '%';
            timeBars[i].style.width = (100.0 / ww.bufSize).toString() + '%';
            document.body.appendChild(timeBars[i]);
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
