/**
 * Custom cursor tracking
 */
function initCursor() {
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursorRing');
  
    if (!cursor || !ring) return;
  
    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;
  
    document.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top = my + 'px';
    });
  
    function animRing() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      requestAnimationFrame(animRing);
    }
  
    animRing();
  }
  
  /**
   * Initialize app on DOM ready
   */
  document.addEventListener('DOMContentLoaded', () => {
    initCursor();
  });