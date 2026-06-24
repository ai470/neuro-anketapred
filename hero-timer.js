(function () {
  var STORAGE_KEY = 'hero_timer_end';
  var DURATION_MS = 5 * 60 * 1000; // 5 minutes

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function getEndTime() {
    var stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      var end = parseInt(stored, 10);
      if (!isNaN(end) && end > Date.now()) return end;
    }
    var newEnd = Date.now() + DURATION_MS;
    localStorage.setItem(STORAGE_KEY, String(newEnd));
    return newEnd;
  }

  function setTimerText(text) {
    var desktop = document.getElementById('hero-timer');
    var mobile = document.getElementById('hero-timer-mobile');
    if (desktop) desktop.textContent = text;
    if (mobile) mobile.textContent = text;
  }

  function tick() {
    var end = getEndTime();
    var remaining = Math.max(0, Math.round((end - Date.now()) / 1000));
    var mins = Math.floor(remaining / 60);
    var secs = remaining % 60;
    setTimerText(pad(mins) + ':' + pad(secs));
    if (remaining > 0) {
      setTimeout(tick, 1000);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tick);
  } else {
    tick();
  }
})();
