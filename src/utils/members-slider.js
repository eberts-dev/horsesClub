$(document).ready(function() {
  const prevButton = document.querySelector('.members .slider-button--prev');
  const nextButton = document.querySelector('.members .slider-button--next');
  const pagination = document.querySelector('.members .slider-pagination');
  
  let owl;
  
  function updatePagination() {
    if (!owl) return;
    const current = owl.current();
    const total = owl.items().length;
    const isDesktop = window.innerWidth >= 981;
    let page;
    if (isDesktop) {
      // desktop
      page = (current % total < 3) ? 3 : 6;
    } else {
      // мобильный
      page = current + 1;
      if (page > total) page = 1;
    }
    pagination.innerHTML = `${page} <span class="disabled">/ ${total}</span>`;
  }
  

  function updateButtons() {
    if (!owl) return;
    prevButton.disabled = false;
    nextButton.disabled = false;
  }
  
  function navigateSlider(direction) {
    $('.members__slider').trigger(direction + '.owl.carousel', [100]);
    
    setTimeout(() => {
      updatePagination();
      updateButtons();
    }, 350);
  }
  
  function nextPage() {
    navigateSlider('next');
  }
  
  function prevPage() {
    navigateSlider('prev');
  }
  
  $('.members__slider').owlCarousel({
    loop: true,
    nav: false,
    dots: false,
    margin: 20,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: false,
    onInitialized: function() {
        setTimeout(() => {
          owl = $('.members__slider').data('owl.carousel');
          
          if (!owl) {
            owl = $('.members__slider').owlCarousel('instance');
          }
          
          updatePagination();
          updateButtons();
        }, 100);
      },

    responsive: {
      0: {
        items: 1,
        slideBy: 1,
        center: true,
      },
      981: {
        items: 3,
        slideBy: 3,
        center: false,
      },
    }
    });
    
    $('.members__slider').on('translated.owl.carousel', function() {
      updatePagination();
      updateButtons();
    });
    
    if (nextButton) {
    nextButton.addEventListener('click', nextPage);
    }

    if (prevButton) {
      prevButton.addEventListener('click', prevPage);
    }
  
  
  window.addEventListener('resize', function() {
    setTimeout(() => {
      
      if (owl) {
        owl.refresh();
      }
      updatePagination();
      updateButtons();
    }, 100);
  });

});