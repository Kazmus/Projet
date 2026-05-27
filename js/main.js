$(function () {
    let pos = 0, pxSpeed = 80, last = null;

    function step(ts) {
        const dt = (ts - last) / 1000;
        last = ts;
        pos -= pxSpeed * dt;

        const setW = $track.find('.track')
            .first().outerWidth(true);

        // ← KEY: reset once first clone scrolls out
        if (pos <= -setW) pos += setW;

        $track.css('transform', `translateX(${pos}px)`);
        requestAnimationFrame(step);
    }
})

