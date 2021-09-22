$(document).ready(function(){

    // HCP Popup start
    if ( sessionStorage.getItem('firstVisit') === "1"){
        $('#blmModal').modal('hide');
    } else {
        $('#blmModal').modal('show');
    }

    if ($('#blmModal').modal('hide')){
        sessionStorage.setItem('firstVisit', '1');
    }
    // HCP Popup end

    //
    $('header .hamburger-icon').click(function(){
        if( $(this).hasClass('active') ){
            $(this).removeClass('active');
            $('header .primary-nav nav').animate({'right': '-100%'});
        }else{
            $(this).addClass('active');
            $('header .primary-nav nav').animate({'right': 0});
        }
    });

    //
    $('.home-hero-section .down-arrow-link').click(function(){
        var headerHeight = $("header").outerHeight();
        $('html, body').animate({
            scrollTop: $('#our-recipe').offset().top - headerHeight
        }, 'slow');
    });

    //
    var menuOffset = $('.home-internal-menu').offset().top;
    $(window).scroll(function(){
        if ( $(window).scrollTop() > 20){
            $('header').addClass('shrink');
        }else {
            $('header').removeClass('shrink');
        }

        //
        var headerHeight = $("header").outerHeight();
        if ($(window).scrollTop() >= menuOffset - headerHeight - 2 ) {
            $('.home-internal-menu').addClass('menuFixed').css({'top':headerHeight});
        } else {
            $('.home-internal-menu').removeClass('menuFixed').css({'top':'auto'});
        }
    });

    //
    $(document).on("scroll", onScroll);
	$('.scrollToSection > li > a').bind("click", function(e) {
        e.preventDefault();
        var headerHeight = $("header").outerHeight();
        var homeInternalMenu = $('.home-internal-menu').outerHeight();
        $(document).off("scroll");
		$('.scrollToSection > li > a').removeClass('active');
        var target = $(this).attr("href");
        if($(window).width() >= 992){
            var scrollToPosition = $(target).offset().top - headerHeight - homeInternalMenu;
            $('html, body').animate({ 'scrollTop': scrollToPosition }, 1000, function(){
                window.location.hash = "" + target;
                $('html, body').animate({ 'scrollTop': scrollToPosition }, 0);
                $(document).on("scroll", onScroll);
            });
        }else{
            var scrollToPosition = $(target).offset().top - headerHeight - homeInternalMenu;
            $('html, body').animate({ 'scrollTop': scrollToPosition }, 1000, function(){
                window.location.hash = "" + target;
                $('html, body').animate({ 'scrollTop': scrollToPosition }, 0);
                $(document).on("scroll", onScroll);
            });
            $('header .hamburger-icon').removeClass('active');
            $('header .primary-nav nav').animate({'right': '-100%'});
        }
	});        

    //
    function onScroll(event){
        var scrollPos = $(document).scrollTop();
        var headerHeight = $("header").outerHeight();
        var menuHeight = $('.home-internal-menu').outerHeight();
        $('.scrollToSection > li > a').each(function () {
            var currLink = $(this);
            // Only apply to those tags that start with '#'.
            var href = currLink.attr("data-href");
            if (href.indexOf('#') === 0) {
                var refElement = $(href);
                if (refElement.position().top - headerHeight - menuHeight - 10 <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                //if (refElement.position().top - headerHeight - menuHeight - 15 <= scrollPos) {    
                    $('.scrollToSection > li > a').removeClass("active");
                    currLink.addClass("active");
                }else{
                    currLink.removeClass("active");
                }
            }
        });
    }

    //
    var hash1 = window.location.hash;
	var section1 = $(hash1);
	var headerOuterHt = $('header').outerHeight();
    var homeMenuOffset = $('.home-internal-menu').outerHeight();
	$('html,body').scrollTop(0);
	 
	if(hash1){
		setTimeout(function(){ 
			$('html, body').animate({
				scrollTop: section1.offset().top - headerOuterHt - homeMenuOffset
			}, 1000);
		}, 500);
	}

	$("header .primary-nav nav .contact-us-link").click(function(e) {
		// e.preventDefault();
		var hash = this.hash;
		var section = $(hash);
        $('header .hamburger-icon').removeClass('active');
        $('header .primary-nav nav').animate({'right': '-100%'});
		if (hash) { 
		  $('html, body').animate({
			scrollTop: section.offset().top - headerOuterHt - homeMenuOffset
		  }, 1000, 'swing', function(){
			var ulrElement = $(this).attr("data-href");
		  });
		}
	  });

    //
    $('.profile-bx .plus-minuse').click(function(){
        $(this).parents('.profile-bx').toggleClass('active');
        $(this).parents('.profile-bx').find('.profile-desp-bx').slideToggle();
    });    

    //
    $('.who-we-are-bx .our-leadership .expand-all').click(function(){
        if( ! $(this).hasClass('active') ){
            $(this).addClass('active').text('Close All');
            $(this).parents('.leadership-bx').find('.profile-bx').addClass('active');
            $(this).parents('.leadership-bx').find('.profile-desp-bx').slideDown();
        }else {
            $(this).removeClass('active').text('Expand All');;
            $(this).parents('.leadership-bx').find('.profile-bx').removeClass('active');
            $(this).parents('.leadership-bx').find('.profile-desp-bx').slideUp();
        }
    });

    //
    $("#scroller").simplyScroll({
        orientation:"horizontal",
        direction:"backwards",
        speed:1,
        pauseOnHover:false,
        auto: true,
        autoMode: "loop",
        initialOffset: 0
    });
    $("#scroller2").simplyScroll({
        orientation:"horizontal",
        direction:"forwards",
        speed:1,
        pauseOnHover:false,
        auto: true,
        autoMode: "loop",
        initialOffset: 0
    });


});

$(window).on("load", function() {

    //
    var counter = 0;
    var itemLength = $('.home-hero-section .animation-text-bx .animate-txt').length;
    setInterval(function(){
        if ( counter < itemLength ){
            var c = counter % $('.home-hero-section .animation-text-bx .animate-txt').length;
            $('.home-hero-section .animation-text-bx').find('.animate-txt').removeClass('active');
            $('.home-hero-section .animation-text-bx').find('.animate-txt').eq(c).addClass('active');
            ++counter
        }else {
            $('.home-hero-section .animate-para-txt').addClass('active');
            $('.home-internal-menu').addClass('active');
            $('.home-hero-section .down-arrow-link').hide();
        }
    },1000);

    //
    setTimeout(function(){
        var headerht = $('header').outerHeight();
        $('.content-body').css({paddingTop : headerht});
    },500);

});