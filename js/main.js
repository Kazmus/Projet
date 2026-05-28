$(function () {
  const $track = $('.track');

  // Measure the EXACT (fractional) width of the original strip BEFORE cloning.
  const firstOriginal = $track.children().first()[0];

  // Clone the items so a seamless second copy follows the first.
  $track.append($track.children().clone());

  const pxPerSec = 80;
  let repeatWidth = measureRepeat();

  // True distance from the first original item to its clone — sub-pixel accurate.
  function measureRepeat() {
    const children = $track.children();
    const firstCloneIndex = children.length / 2;          // clone starts at the midpoint
    const a = children.eq(0)[0].getBoundingClientRect().left;
    const b = children.eq(firstCloneIndex)[0].getBoundingClientRect().left;
    return b - a;                                         // fractional, not rounded
  }

  let offset = 0;
  let lastTime = null;

  function step(now) {
    if (lastTime !== null) {
      const delta = (now - lastTime) / 1000;
      offset += pxPerSec * delta;

      // Subtract the EXACT repeat width. The overshoot carries over,
      // so there's no rounding snap.
      if (offset >= repeatWidth) offset -= repeatWidth;

      $track.css('transform', 'translate3d(' + (-offset) + 'px, 0, 0)');
    }
    lastTime = now;
    requestAnimationFrame(step);
  }
  requestAnimationFrame(step);

  // Remeasure on resize, and after fonts load (Font Awesome changes widths late).
  $(window).on('resize', () => { repeatWidth = measureRepeat(); });
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => { repeatWidth = measureRepeat(); });
  }
});