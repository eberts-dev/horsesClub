$(document).ready(function() {
  const $slider = $('.stages__mobile-slider');
  const $prevBtn = $('.stages-slider-prev');
  const $nextBtn = $('.stages-slider-next');
  
  function updateButtons() {
    const current = $slider.find('.owl-item.active').index();
    const total = $slider.find('.owl-item').length;
    
    $prevBtn.prop('disabled', current === 0);
    $nextBtn.prop('disabled', current === total - 1);
  }
  
  function updateDots() {
    const current = $slider.find('.owl-item.active').index();
    $('.stages__dots-wrapper .owl-dot').removeClass('active').eq(current).addClass('active');
  }
  
  // настройки OwlCarousel
  $slider.owlCarousel({
    loop: false,
    items: 1,
    nav: false,
    dots: true,
    margin: 20,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: false,
    center: false,
    responsive: {
      0: { center: true }
    },
    onInitialized: function() {
      $slider.find('.owl-dots').clone().appendTo('.stages__dots-wrapper').show();
      $slider.find('.owl-dots').hide();
      $slider.find('.owl-item').first().addClass('first-slide');
      
      updateButtons();
      updateDots();
    }
  });
  
  $slider.on('translated.owl.carousel', function() {
    updateButtons();
    updateDots();
  });
  
  $prevBtn.on('click', () => $slider.trigger('prev.owl.carousel'));
  $nextBtn.on('click', () => $slider.trigger('next.owl.carousel'));
  

  $(document).on('click', '.stages__dots-wrapper .owl-dot', function() {
    const index = $(this).index();
    $slider.trigger('to.owl.carousel', [index, 300]);
  });
});