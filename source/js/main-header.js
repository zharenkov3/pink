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
	$('.main-nav__toggle').click(function() {
		$('.page-header__wrapper-nav').toggleClass('none');
		$('.page-header').toggleClass('page-header--active');
	});
});

