// TODO: Employ more advanced algorithms e.g. Autocorrelation

window.onload = function () {
    var textDisp = document.getElementById('text-disp');

    var refreshDisp = function () {
        window.requestAnimationFrame(refreshDisp);
        ww.getFrequencies();
        var i, j, k, t, maxVals = [0, 0, 0, 0, 0], maxIdcs = [-1, -1, -1, -1, -1];
        for (i = 0; i < ww.freqBinCount; ++i) {
            t = ww.freq[i];
            for (j = 0; j < 5; ++j) if (t > maxVals[j]) {
                for (k = 4; k > j; --k) {
                    maxVals[k] = maxVals[k - 1]; maxIdcs[k] = maxIdcs[k - 1];
                }
                maxVals[j] = t; maxIdcs[j] = i;
                break;
            }
        }
        textDisp.innerHTML = JSON.stringify(maxIdcs);
    };

    ww.sampleBufSize = 1;
    ww.fftSize = 16384;
    ww.init(refreshDisp);
};
