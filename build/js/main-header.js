// $('.main-nav__toggle').slick({
//      mobileFirst: true,
//      responsive: [
//         {
//            breakpoint: 769,
//            settings: "unslick"
//         }
//      ]
//   });

$(document).ready(function() {
	$('.burger').click(function() {
		$('.burger').toggleClass('burger--open');
		$('.page-header__wrapper-nav').toggleClass('open');
		$('.page-header').toggleClass('page-header--active');
		$('.page-header__wrapper-logo').toggleClass('underline');
	});
});

