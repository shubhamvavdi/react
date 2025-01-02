(function($) {
    "use strict";

    /*--
        Commons Variables
    -----------------------------------*/
    var $window = $(window),
        $body = $('body');

    /*--
        Custom script to call Background
        Image & Color from html data attribute
    -----------------------------------*/
    $('[data-bg-image]').each(function() {
        var $this = $(this),
            $image = $this.data('bg-image');
        $this.css('background-image', 'url(' + $image + ')');
    });
    $('[data-bg-color]').each(function() {
        var $this = $(this),
            $color = $this.data('bg-color');
        $this.css('background-color', $color);
    });

    /*--
        Header Sticky
    -----------------------------------*/
    $window.on('scroll', function() {
        if ($window.scrollTop() > 350) {
            $('.sticky-header').addClass('is-sticky');
        } else {
            $('.sticky-header').removeClass('is-sticky');
        }
    });

    /*--
        Sub Menu & Mega Menu Alignment
    -----------------------------------*/
    var subMenuMegaMenuAlignment = () => {
        var $this,
            $subMenu,
            $megaMenu,
            $siteMainMenu = $('.site-main-menu');

        $siteMainMenu.each(function() {
            $this = $(this);
            if ($this.is('.site-main-menu-left, .site-main-menu-right') && $this.closest('.section-fluid').length) {
                $megaMenu = $this.find('.mega-menu');
                $this.css("position", "relative");
                if ($this.hasClass('site-main-menu-left')) {
                    $megaMenu.css({
                        "left": "0px",
                        "right": "auto"
                    });
                } else if ($this.hasClass('site-main-menu-left')) {
                    $megaMenu.css({
                        "right": "0px",
                        "left": "auto"
                    });
                }
            }
        });
        $subMenu = $('.sub-menu');
        if ($subMenu.length) {
            $subMenu.each(function() {
                $this = $(this);
                var $elementOffsetLeft = $this.offset().left,
                    $elementWidth = $this.outerWidth(true),
                    $windowWidth = $window.outerWidth(true) - 10,
                    isElementVisible = ($elementOffsetLeft + $elementWidth < $windowWidth);
                if (!isElementVisible) {
                    if ($this.hasClass('mega-menu')) {
                        var $this = $(this),
                            $thisOffsetLeft = $this.parent().offset().left,
                            $widthDiff = $windowWidth - $elementWidth,
                            $left = $thisOffsetLeft - ($widthDiff / 2);
                        $this.attr("style", "left:" + -$left + "px !important").parent().css("position", "relative");
                    } else {
                        $this.parent().addClass('align-left');
                    }
                } else {
                    $this.removeAttr('style').parent().removeClass('align-left');
                }
            });
        }
    }

    /*--
        Off Canvas Function
    -----------------------------------*/
    (function() {
        var $offCanvasToggle = $('.offcanvas-toggle'),
            $offCanvas = $('.offcanvas'),
            $offCanvasOverlay = $('.offcanvas-overlay'),
            $mobileMenuToggle = $('.mobile-menu-toggle');
        $offCanvasToggle.on('click', function(e) {
            e.preventDefault();
            var $this = $(this),
                $target = $this.attr('href');
            $body.addClass('offcanvas-open');
            $($target).addClass('offcanvas-open');
            $offCanvasOverlay.fadeIn();
            if ($this.parent().hasClass('mobile-menu-toggle')) {
                $this.addClass('close');
            }
        });
        $('.offcanvas-close, .offcanvas-overlay').on('click', function(e) {
            e.preventDefault();
            $body.removeClass('offcanvas-open');
            $offCanvas.removeClass('offcanvas-open');
            $offCanvasOverlay.fadeOut();
            $mobileMenuToggle.find('a').removeClass('close');
        });
    })();

    /*--
        Off Canvas Menu
    -----------------------------------*/
    function mobileOffCanvasMenu() {
        var $offCanvasNav = $('.offcanvas-menu, .overlay-menu'),
            $offCanvasNavSubMenu = $offCanvasNav.find('.sub-menu');

        /*Add Toggle Button With Off Canvas Sub Menu*/
        $offCanvasNavSubMenu.parent().prepend('<span class="menu-expand"></span>');

        /*Category Sub Menu Toggle*/
        $offCanvasNav.on('click', 'li a, .menu-expand', function(e) {
            var $this = $(this);
            if ($this.attr('href') === '#' || $this.hasClass('menu-expand')) {
                e.preventDefault();
                if ($this.siblings('ul:visible').length) {
                    $this.parent('li').removeClass('active');
                    $this.siblings('ul').slideUp();
                    $this.parent('li').find('li').removeClass('active');
                    $this.parent('li').find('ul:visible').slideUp();
                } else {
                    $this.parent('li').addClass('active');
                    $this.closest('li').siblings('li').removeClass('active').find('li').removeClass('active');
                    $this.closest('li').siblings('li').find('ul:visible').slideUp();
                    $this.siblings('ul').slideDown();
                }
            }
        });
    }
    mobileOffCanvasMenu();

    /*-- Header Category -----------------------------------*/
    $('.header-categories').on('click', '.category-toggle', function(e) {
        e.preventDefault();
        var $this = $(this);
        if ($this.hasClass('active')) {
            $this.removeClass('active').siblings('.header-category-list').slideUp();
        } else {
            $this.addClass('active').siblings('.header-category-list').slideDown();
        }
    })


    // Filter Toggle
    $('.product-filter-toggle').on('click', function(e) {
        e.preventDefault();
        var $this = $(this),
            $target = $this.attr('href');
        $this.toggleClass('active');
        $($target).slideToggle();
        $('.customScroll').perfectScrollbar('update');
    });

    // Column Toggle
    $('.product-column-toggle').on('click', '.toggle', function(e) {
        e.preventDefault();
        var $this = $(this),
            $column = $this.data('column'),
            $prevColumn = $this.siblings('.active').data('column');
        $this.toggleClass('active').siblings().removeClass('active');
        $('.products').removeClass('row-cols-xl-' + $prevColumn).addClass('row-cols-xl-' + $column);
        $.fn.matchHeight._update();
        $('.isotope-grid').isotope('layout');
    });

    /*-- Custom Scrollbar (Perfect Scrollbar) -----------------------------------*/
    $('.customScroll').perfectScrollbar({
        suppressScrollX: !0
    });

    /*--Select2-----------------------------------*/

    // Basic
    $('.select2-basic').select2();
    // No Search Field
    $('.select2-noSearch').select2({
        minimumResultsForSearch: Infinity
    });

    // Custom Scrollbar For Select2 Result
    $('.select2-basic, .select2-noSearch').on('select2:open', function() {
        $('.select2-results__options').each(function() {
            var ps = new PerfectScrollbar($(this)[0], {
                suppressScrollX: true
            });
        });
    });

    /*--
        Nice Select
    -----------------------------------*/
    $('.nice-select').niceSelect();

    /*--
        Match Height
    -----------------------------------*/
    $('.isotope-grid .product').matchHeight();

    /*--
        Parallax
    -----------------------------------*/
    $.Scrollax();

    /*--
        Swipper Slider Activation
    -----------------------------------*/

    // Home 1 Slider
    var $home1Slider = new Swiper('.home1-slider', {
        loop: true,
        speed: 750,
        effect: 'fade',
        navigation: {
            nextEl: '.home1-slider-next',
            prevEl: '.home1-slider-prev',
        },
        autoplay: {},
    });

    /*--
        Slick Slider Activation
    -----------------------------------*/

    // Product Slider
    $('.product-carousel').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        focusOnSelect: true,
        prevArrow: '<button class="slick-prev"><i class="ti-angle-left"></i></button>',
        nextArrow: '<button class="slick-next"><i class="ti-angle-right"></i></button>',
        responsive: [{
                breakpoint: 991,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

    // Product List Slider
    $('.product-list-slider').slick({
        rows: 3,
        prevArrow: '<button class="slick-prev"><i class="ti-angle-left"></i></button>',
        nextArrow: '<button class="slick-next"><i class="ti-angle-right"></i></button>'
    });

    // Single Product Slider
    $('.product-gallery-slider').slick({
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.product-thumb-slider, .product-thumb-slider-vertical',
        prevArrow: '<button class="slick-prev"><i class="ti-angle-left"></i></button>',
        nextArrow: '<button class="slick-next"><i class="ti-angle-right"></i></button>'
    });
    $('.product-thumb-slider').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        focusOnSelect: true,
        asNavFor: '.product-gallery-slider',
        prevArrow: '<button class="slick-prev"><i class="ti-angle-left"></i></button>',
        nextArrow: '<button class="slick-next"><i class="ti-angle-right"></i></button>'
    });
    $('.product-thumb-slider-vertical').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        vertical: true,
        focusOnSelect: true,
        asNavFor: '.product-gallery-slider',
        prevArrow: '<button class="slick-prev"><i class="ti-angle-up"></i></button>',
        nextArrow: '<button class="slick-next"><i class="ti-angle-down"></i></button>'
    });

    // Blog Carousel
    $('.blog-carousel').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        focusOnSelect: true,
        prevArrow: '<button class="slick-prev"><i class="ti-angle-left"></i></button>',
        nextArrow: '<button class="slick-next"><i class="ti-angle-right"></i></button>',
        responsive: [{
                breakpoint: 991,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

    // Brand Carousel
    $('.brand-carousel').slick({
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        focusOnSelect: true,
        prevArrow: '<button class="slick-prev"><i class="ti-angle-left"></i></button>',
        nextArrow: '<button class="slick-next"><i class="ti-angle-right"></i></button>',
        responsive: [{
            breakpoint: 1199,
            settings: {
                slidesToShow: 4
            }
        }, {
            breakpoint: 991,
            settings: {
                slidesToShow: 3
            }
        }, {
            breakpoint: 767,
            settings: {
                slidesToShow: 2
            }
        }, {
            breakpoint: 575,
            settings: {
                slidesToShow: 1
            }
        }]
    });

    // Category Banner Slider/Carousel
    $('.category-banner1-carousel').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: '<button class="slick-prev"><i class="fal fa-long-arrow-left"></i></button>',
        nextArrow: '<button class="slick-next"><i class="fal fa-long-arrow-right"></i></button>',
        responsive: [{
                breakpoint: 991,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });



    /*--
        Isotpe
    -----------------------------------*/
    var $isotopeGrid = $('.isotope-grid');
    var $isotopeFilter = $('.isotope-filter');
    $isotopeGrid.imagesLoaded(function() {
        $isotopeGrid.isotope({
            itemSelector: '.grid-item',
            masonry: {
                columnWidth: '.grid-sizer'
            }
        });
    });
    $isotopeFilter.on('click', 'button', function() {
        var $this = $(this),
            $filterValue = $this.attr('data-filter'),
            $targetIsotop = $this.parent().data('target');
        $this.addClass('active').siblings().removeClass('active');
        $($targetIsotop).isotope({
            filter: $filterValue
        });
    });


    /*--
        Bootstrap
    -----------------------------------*/

    /* Accordion/Collapse */
    $('.collapse').on('show.bs.collapse', function(e) {
        $(this).closest('.card').addClass('active').siblings().removeClass('active');
    });
    $('.collapse').on('hide.bs.collapse', function(e) {
        $(this).closest('.card').removeClass('active');
    });

    /* Modal */
    $('#quickViewModal').on('shown.bs.modal', function(e) {
        $('.product-gallery-slider-quickview').slick({
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: '<button class="slick-prev"><i class="ti-angle-left"></i></button>',
            nextArrow: '<button class="slick-next"><i class="ti-angle-right"></i></button>'
        });
    })

    /*--
        Product Quantity
    -----------------------------------*/
    $('.qty-btn').on('click', function() {
        var $this = $(this);
        var oldValue = $this.siblings('input').val();
        if ($this.hasClass('plus')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            // Don't allow decrementing below zero
            if (oldValue > 1) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 1;
            }
        }
        $this.siblings('input').val(newVal);
    });


    /*--
        Magnific Popup
    -----------------------------------*/
    $('.video-popup').magnificPopup({
        type: 'iframe'
    });

    $('.image-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        fixedContentPos: false,
        gallery: {
            enabled: true,
        }
    });

    /*--
        Scroll Up
    -----------------------------------*/
    $.scrollUp({
        scrollText: '<i class="fal fa-long-arrow-up"></i>',
    });


    /*--
        Single Product Gallery Popup
    -----------------------------------*/
    var $productPopupGalleryBtn = $('.product-gallery-popup'),
        $productPopupGallery = $productPopupGalleryBtn.data('images'),
        $openPhotoSwipe = function() {
            var pswpElement = $('.pswp')[0],
                items = $productPopupGallery,
                options = {
                    history: false,
                    focus: false,
                    closeOnScroll: false,
                    showAnimationDuration: 0,
                    hideAnimationDuration: 0
                };
            new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options).init();
        };
    $productPopupGalleryBtn.on('click', $openPhotoSwipe);

    $('.product-zoom').each(function() {
        var $this = $(this),
            $image = $this.data('image');
        $this.zoom({
            url: $image
        });
    });

    /*--
        Sticky Sidebar
    -----------------------------------*/
    $('.sticky-sidebar').stickySidebar({
        topSpacing: 60,
        bottomSpacing: 60,
        containerSelector: '.sticky-sidebar-container',
        innerWrapperSelector: '.sticky-sidebar-inner',
        minWidth: 992
    });

    /*--
        On Load Function
    -----------------------------------*/
    $window.on('load', function() {
        subMenuMegaMenuAlignment();
    });

    /*--
        Resize Function
    -----------------------------------*/
    $window.resize(function() {
        subMenuMegaMenuAlignment();
    });

})(jQuery);