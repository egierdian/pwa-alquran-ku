document.getElementById('content-main').style.display = 'none';

setTimeout(function(){
  document.getElementById('preloader').style.display = 'none';
  document.getElementById('content-main').style.display = 'block';
}, 2000);