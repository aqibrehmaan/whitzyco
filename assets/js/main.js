(function($) {
  "use strict";

  /*--------------------------
  preloader
  ---------------------------- */
  $(window).on('load', function() {
    var pre_loader = $('#preloader');
    pre_loader.fadeOut('slow', function() {
      $(this).remove();
    });
  });

  /*---------------------
   TOP Menu Stick
  --------------------- */
  if ($("#sticker").length > 0) {
  var s = $("#sticker");
  var pos = s.position();
  $(window).on('scroll', function() {
    var windowpos = $(window).scrollTop() > 300;
    if (windowpos > pos.top) {
      s.addClass("stick");
    } else {
      s.removeClass("stick");
    }
  });
}
  /*----------------------------
   Navbar nav
  ------------------------------ */
  var main_menu = $(".main-menu ul.navbar-nav li ");
  main_menu.on('click', function() {
    main_menu.removeClass("active");
    $(this).addClass("active");
  });

  /*----------------------------
   wow js active
  ------------------------------ */
  // new WOW().init();

  $(".navbar-collapse a").on('click', function() {
    $(".navbar-collapse.collapse").removeClass('in');
  });

  //---------------------------------------------
  //Nivo slider
  //---------------------------------------------
  // $('#ensign-nivoslider').nivoSlider({
  //   effect: 'random',
  //   slices: 15,
  //   boxCols: 12,
  //   boxRows: 8,
  //   animSpeed: 500,
  //   pauseTime: 5000,
  //   startSlide: 0,
  //   directionNav: true,
  //   controlNavThumbs: false,
  //   pauseOnHover: true,
  //   manualAdvance: false,
  // });

  /*----------------------------
   Scrollspy js
  ------------------------------ */
  var Body = $('body');
  Body.scrollspy({
    target: '.navbar-collapse',
    offset: 80
  });

  /*---------------------
    Venobox
  --------------------- */
  if ($('.venobox').length > 0 ) {
  var veno_box = $('.venobox');
  veno_box.venobox();
}

  /*----------------------------
  Page Scroll
  ------------------------------ */
  var page_scroll = $('a.page-scroll');
  page_scroll.on('click', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: $($anchor.attr('href')).offset().top - 55
    }, 1500, 'easeInOutExpo');
    event.preventDefault();
  });

  /*--------------------------
    Back to top button
  ---------------------------- */
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function(){
    $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
    return false;
  });

  /*----------------------------
   Parallax
  // ------------------------------ */
  // var well_lax = $('.wellcome-area');
  // well_lax.parallax("50%", 0.4);
  // var well_text = $('.wellcome-text');
  // well_text.parallax("50%", 0.6);

  /*--------------------------
   collapse
  ---------------------------- */
  var panel_test = $('.panel-heading a');
  panel_test.on('click', function() {
    panel_test.removeClass('active');
    $(this).addClass('active');
  });

  /*---------------------
   Testimonial carousel
  ---------------------*/
  if ($('.testimonial-carousel').length > 0) {
  var test_carousel = $('.testimonial-carousel');
  test_carousel.owlCarousel({
    loop: true,
    nav: false,
    dots: true,
    autoplay: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 1
      },
      1000: {
        items: 1
      }
    }
  });
  }
  /*----------------------------
   isotope active
  ------------------------------ */
  // portfolio start
  $(window).on("load", function() {
    if ($('.awesome-project-content').length > 0) {
    var $container = $('.awesome-project-content');
    $container.isotope({
      filter: '*',
      animationOptions: {
        duration: 750,
        easing: 'linear',
        queue: false
      }
    });

}
if ($('.project-menu li a').length > 0)  {
    var pro_menu = $('.project-menu li a');
    pro_menu.on("click", function() {
      var pro_menu_active = $('.project-menu li a.active');
      pro_menu_active.removeClass('active');
      $(this).addClass('active');
      var selector = $(this).attr('data-filter');
      $container.isotope({
        filter: selector,
        animationOptions: {
          duration: 750,
          easing: 'linear',
          queue: false
        }
      });
      return false;
    });
    }

  });
  //portfolio end

  /*---------------------
   Circular Bars - Knob
--------------------- */
  if (typeof($.fn.knob) != 'undefined') {
    var knob_tex = $('.knob');
    knob_tex.each(function() {
      var $this = $(this),
        knobVal = $this.attr('data-rel');

      $this.knob({
        'draw': function() {
          $(this.i).val(this.cv + '%')
        }
      });

      $this.appear(function() {
        $({
          value: 0
        }).animate({
          value: knobVal
        }, {
          duration: 2000,
          easing: 'swing',
          step: function() {
            $this.val(Math.ceil(this.value)).trigger('change');
          }
        });
      }, {
        accX: 0,
        accY: -150
      });
    });
  }

})(jQuery);


/* =================================================
                  SLICK SLIDER
   ================================================= */

$(function() {
    $('.slider-wrap').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      dots: false,
      loop: true,
      autoplay: true,
    });

    $('.header-slider-left-btn').click(function(e){
      e.preventDefault();
      $('.slider-wrap').slick('slickPrev');
    })
    
    $('.header-slider-right-btn').click(function(e){
      e.preventDefault();
      $('.slider-wrap').slick('slickNext');
    });

});

/* =================================================
                  MOBILE NAV
   ================================================= */

$(function() {
  $(".mobile-nav-icon").on('click', function() {
      $('.mobile-nav-links').slideToggle();
  });
});

$(function() {
  $('.mobile-nav-nested > a').on('click', function(e) {
      e.preventDefault();
      $(this).siblings('.mobile-nested').slideToggle();
  });

  $('.mob-has-nested a').on('click', function(e) {
    e.preventDefault();
    $(this).siblings('.mob-nested-inner').slideToggle();
  });
});
  

/* =================================================
                  FEATURED TABS
   ================================================= */

$(function () {

  $('.featured-tabs button').on('click', function (e) {

      e.preventDefault();

      $('.featured-tabs button').removeClass('active');

      $(this).addClass('active');

      let optionName = $(this).data("option");
    
      $(".featured-content-box .featured-content").removeClass('active');

      $('.featured-content-box .featured-content[data-option=' + optionName + ']').addClass('active');

  });

});


/* =================================================
                  DEPARTMENT TABS
   ================================================= */

   $(function () {

    $('.department-tabs button').on('click', function (e) {
  
        e.preventDefault();
  
        $('.department-tabs button').removeClass('active');
  
        $(this).addClass('active');
  
        let optionName = $(this).data("option");
      
        $(".department-content-box .department-content").hide();
  
        $('.department-content-box .department-content[data-option=' + optionName + ']').show();
  
    });
  
  });


  /* =========================================================
                      BANNER SLIDER
   ========================================================= */
  
  $(function() {
    $('.banner .banner-slider').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      dots: false,
      loop: true,
      autoplay: true,
  });

  $('.banner-slider-left-btn').click(function(e){
    e.preventDefault();
    $('.banner-slider').slick('slickPrev');
  });

  $('.banner-slider-right-btn').click(function(e){
    e.preventDefault();
    $('.banner-slider').slick('slickNext');
  });

  });

  /* =========================================================
                      DEPARTMENT SLIDER
   ========================================================= */

   $(function () {
    $('.department-slider').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      dots: true,
      loop: true,
      autoplay: true,
    });

      // SLICK DOTS
      $('.department-content .slick-dots li:nth-child(1)').html('<button>Children & Youth</button>');
      $('.department-content .slick-dots li:nth-child(2)').html('<button>Apparel & Accessories</button>');
      $('.department-content .slick-dots li:nth-child(3)').html('<button>Party & Holiday</button>');

   });

  /* =========================================================
                     CUSTOMER SLIDER
   ========================================================= */
  
   $(function() {
      $('.customer-slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        loop: true,
        autoplay: true,
      });

      $('.customer-slider-left-btn').click(function(e){
        e.preventDefault();
        $('.customer-slider').slick('slickPrev');
      });
    
      $('.customer-slider-right-btn').click(function(e){
        e.preventDefault();
        $('.customer-slider').slick('slickNext');
      });

      
   });
  