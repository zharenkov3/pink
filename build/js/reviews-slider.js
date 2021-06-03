$(function() {
	$('.slider-list').slick({
		arrows: true,
		dots: true,
		autoplay: 2000,
		dotsClass: 'reviews-toggles',
		responsive: [{
			breakpoint: 960,
			settings: {
				arrows : false
			}
		}, ]
	});
});