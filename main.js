const videos = document.querySelectorAll('video');
videos.forEach(video => {
    video.addEventListener('play', () => {
        pauseOtherVideos(video);
    });
});
function pauseOtherVideos(currentVideo) {
    videos.forEach(video => {
        if (video !== currentVideo && !video.paused) {
            video.pause();
        }
    });
}


const backToTopButton = document.querySelector(".back-to-top"); 
let isBackToTopRendered = false; 
 
let alterStyles = (isBackToTopRendered) => { 
  backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden"; 
  backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0; 
  backToTopButton.style.transform = isBackToTopRendered 
    ? "scale(1)" 
    : "scale(0)"; 
}; 



document.addEventListener('DOMContentLoaded', () => {

  const profileImage = document.getElementById('image');

  profileImage.addEventListener('mouseenter', () => {
      profileImage.src = 'images/news.jpg';
  });

  profileImage.addEventListener('mouseleave', () => {
      profileImage.src = 'images/img-me.jpg';
  });
});

window.addEventListener('scroll', function() {
  const menu = document.querySelector('.menu');
  if (window.scrollY > 0) {
    menu.classList.add('scrolled');
  } else {
    menu.classList.remove('scrolled');
  }
}); 




$(function(){
  $('.carousel-item').eq(0).addClass('active');
  var total = $('.carousel-item').length;
  var current = 0;
  $('#moveRight').on('click', function(){
    var next=current;
    current= current+1;
    setSlide(next, current);
  });
  $('#moveLeft').on('click', function(){
    var prev=current;
    current = current- 1;
    setSlide(prev, current);
  });
  function setSlide(prev, next){
    var slide= current;
    if(next>total-1){
     slide=0;
      current=0;
    }
    if(next<0){
      slide=total - 1;
      current=total - 1;
    }
           $('.carousel-item').eq(prev).removeClass('active');
           $('.carousel-item').eq(slide).addClass('active');
      setTimeout(function(){

      },800);
    

    
    console.log('current '+current);
    console.log('prev '+prev);
  }
});






function toggleMenu() {
  var menu = document.getElementById("menuItems");
  menu.classList.toggle("active");
}

function myFunction() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("button-78");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Read more";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Read less";
    moreText.style.display = "inline";
  }
}

























