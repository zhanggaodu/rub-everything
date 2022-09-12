export default function (node) {
  node.addEventListener('touchstart', handleTouchStart, false);
  node.addEventListener('touchmove', handleTouchMove, false);
  node.addEventListener('touchend', handleTouchEnd, false);
  
  var xDown = null;
  var yDown = null;
  var xDiff = null;
  var yDiff = null;
  var timeDown = null;
  var startEl = null;
  
  /**
   * Fires swiped event if swipe detected on touchend
   * @param {object} e - browser event object
   * @returns {void}
   */
  function handleTouchEnd(e) {
  
    // if the user released on a different target, cancel!
    if (startEl !== e.target) return;
  
    var swipeThreshold = parseInt(getNearestAttribute(startEl, 'data-swipe-threshold', '20'), 10); // default 20px
    var swipeTimeout = parseInt(getNearestAttribute(startEl, 'data-swipe-timeout', '500'), 10);    // default 500ms
    var timeDiff = Date.now() - timeDown;
    var eventType = '';
    var changedTouches = e.changedTouches || e.touches || [];
  
    if (Math.abs(xDiff) > Math.abs(yDiff)) { // most significant
      if (Math.abs(xDiff) > swipeThreshold && timeDiff < swipeTimeout) {
        if (xDiff > 0) {
          eventType = 'swiped-left';
        }
        else {
          eventType = 'swiped-right';
        }
      }
    }
    else if (Math.abs(yDiff) > swipeThreshold && timeDiff < swipeTimeout) {
      if (yDiff > 0) {
        eventType = 'swiped-up';
      }
      else {
        eventType = 'swiped-down';
      }
    }
  
    if (eventType !== '') {
  
      var eventData = {
        dir: eventType.replace(/swiped-/, ''),
        touchType: (changedTouches[0] || {}).touchType || 'direct',
        xStart: parseInt(xDown, 10),
        xEnd: parseInt((changedTouches[0] || {}).clientX || -1, 10),
        yStart: parseInt(yDown, 10),
        yEnd: parseInt((changedTouches[0] || {}).clientY || -1, 10)
      };
  
      // fire `swiped` event event on the element that started the swipe
      startEl.dispatchEvent(new CustomEvent('swiped', { bubbles: true, cancelable: true, detail: eventData }));
  
      // fire `swiped-dir` event on the element that started the swipe
      startEl.dispatchEvent(new CustomEvent(eventType, { bubbles: true, cancelable: true, detail: eventData }));
    }
  
    // reset values
    xDown = null;
    yDown = null;
    timeDown = null;
  }
  
  /**
   * Records current location on touchstart event
   * @param {object} e - browser event object
   * @returns {void}
   */
  function handleTouchStart(e) {
  
    // if the element has data-swipe-ignore="true" we stop listening for swipe events
    if (e.target.getAttribute('data-swipe-ignore') === 'true') return;
  
    startEl = e.target;
  
    timeDown = Date.now();
    xDown = e.touches[0].clientX;
    yDown = e.touches[0].clientY;
    xDiff = 0;
    yDiff = 0;
  }
  
  /**
   * Records location diff in px on touchmove event
   * @param {object} e - browser event object
   * @returns {void}
   */
  function handleTouchMove(e) {
  
    if (!xDown || !yDown) return;
  
    var xUp = e.touches[0].clientX;
    var yUp = e.touches[0].clientY;
  
    xDiff = xDown - xUp;
    yDiff = yDown - yUp;
  }
  
  /**
   * Gets attribute off HTML element or nearest parent
   * @param {object} el - HTML element to retrieve attribute from
   * @param {string} attributeName - name of the attribute
   * @param {any} defaultValue - default value to return if no match found
   * @returns {any} attribute value or defaultValue
   */
  function getNearestAttribute(el, attributeName, defaultValue) {
  
    // walk up the dom tree looking for attributeName
    while (el && el !== document.documentElement) {
  
      var attributeValue = el.getAttribute(attributeName);
  
      if (attributeValue) {
        return attributeValue;
      }
  
      el = el.parentNode;
    }
  
    return defaultValue;
  }
}
