function resizeProjects(){
		var p_h = parseInt($('#projects').css('height')) + 150;
		//alert( p_h );
		$('#folio').add('#folio .page').stop().animate({height: p_h});
		//alert( $('#folio').css('height') );	
}

$(function(){
	var w_w,
		w_h,
		isScrolling = false,
		$pane = $('.pane'),
		$section = $('.pane > section'),
		$article = $('.row > article'),
		$container = $('.pane container'),
		$mapRow = $('#map-wrap').parent('.row'),
		$mapWrap = $('#map-wrap'),
		$map = $('#map');
		
		$home = $('#home'),
		$about = $('#about'),
		$folio = $('#folio'),
		$contact = $('#contact');
		
	var easeDelay = 1200,
		easeFunct = 'easeInOutCubic';
		
	function init(){
		setWH();
		$('#formElem').submit( submitForm );
		/* IE Fix */
		$('#menu ul li:last-child').css('margin-right', 0);
	}
	
	function setWH(){
		w_w = $(window).width();
		w_h = $(window).height();
		
		$pane.css('min-height', w_h);
		$section.css('width', w_w);
		//$section.css('height', w_h);
		//$container.css('height', w_h);
		//$article.css('height', w_h);
		//$contact.css('height', w_h);
		$mapRow.css('height', .5*w_h);
		
		var marTop = Math.floor(.5*w_h*.05/2);
		$('#map').css('margin-top', marTop);
		
		resizeProjects();
	}
	
	function scrollToPage($page){
		if(!isScrolling){
			isScrolling = true;
			$('html, body').stop().animate({
					scrollTop: $($page.attr('href')).offset().top
				}, easeDelay, easeFunct , function(){
					isScrolling = false;
				}
			);	
		}
	}
	
	function setTab(field){
		var tab = field.replace(new RegExp('sender','i'),'' );
			//console.log('field ' + field + ' tab ' + tab );
			tab = 's' + tab;
			$tab = $('#' + tab);
			return $tab;
	}
	
	/* UTILITY */
	$(window).resize(function(){
		setWH();
		/*$aboutArticles.css('width', w_w + 'px');
		$folioArticles.css('width', w_w + 'px');
		$folioArticles.css('height', w_h + 'px');
		$('#folio section > ul > li').css('width', w_w + 'px');*/
	});
	
	$('nav#menu a').bind('click',function(){
		scrollToPage( $(this) );
	});
	
	$('nav.arrows').hover(function(){
		$(this).children('.arrow-left').stop().animate({left: 0}).end().children('.inner-left').stop().animate({left: 30},500,'easeOutBack');
		},function(){
		$(this).children('.arrow-left').stop().animate({left: -10}).end().children('.inner-left').stop().animate({left: 10},500,'easeOutBack');
	});
	
	$('nav.arrows').bind('click',function(){
		$(this).hide();	
		/* SCROLL BACK */
		var lft = parseInt( $('#about .pane').css('margin-left') );
		lft = lft + w_w;
		$('#about .pane').animate({
			marginLeft: lft
		},easeDelay, easeFunct);
	});
	
	/* ABOUT PAGE */
	$('#whoiam .more a').bind('click', function(){
		$('#about .pane').animate({
			marginLeft: -w_w
		},easeDelay, easeFunct, function(){
			$('nav.arrows').show();
		});
	});
	
	/* CONTACT PAGE */
	$('#formElem a.refresh').bind('click', function(){
		var src = '/math/securimage_show.php?' + Math.random();
		$('#captcha').attr('src', src);
		return false;
	});
	
	init();
});

window.onload = function(){
	/*$('body').css('overflow', 'hidden');*/
	$('#loading').delay(1500).slideUp(function(){
		$(".letter-container").css('display', 'inline');
		$(".letter-container h1 a").lettering();
	});
};