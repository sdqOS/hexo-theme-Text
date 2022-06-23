(function ($) {
  "use strict";
    deby_menuToggle();
    
})(window.jQuery);

function deby_menuToggle() {
    "use-strict";

  // Variables
  let toggleMenu = document.querySelector('.toggle');
  let section = document.querySelector('#toggleMenu');

  toggleMenu.addEventListener('click',function(){
    toggleMenu.classList.toggle('active');
    section.classList.toggle('active');
  })
      
  
}