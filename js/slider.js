document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.slider');
    M.Slider.init(elems, {
        indicators: false,
        height: 400,
        transition: 600,
        interval:4000
    });
  });