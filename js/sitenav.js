$(function(){
	var $menu = $(this).find('#menu > h3');
	$('header').hover(function(){
		$menu.stop(true).animate({marginTop: 0});
	},function(){
		var	ul_h = parseInt($menu.css('height'));
		$menu.stop(true).animate({marginTop: ul_h});
	});
});