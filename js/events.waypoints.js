$(function(){
	// Register each section as a waypoint.
	$('#home').waypoint({ offset: 0 });
	$('#about').waypoint({ offset: 150 });
	$('#folio').waypoint({ offset: 150 });
	$('#contact').waypoint({ offset: 150 });
	
	function setHeader($current){
		$('.active_page').removeClass('active_page');
		$current.addClass('active_page');
	}
	
	function setPageTitle($active){
		var title = $active.attr('id').toString(),
			$div = "<span>" + title + "</span>";
		$('#page').fadeOut(200).delay(200).find('span').replaceWith( $div ).end().fadeIn(300);
		//alert( $active.attr('id') );
	}
	
	function setActiveCard($add){
		$('.activecard').removeClass('activecard');
		$add.addClass('activecard');
	}
	
	function sitemapSelectPage($marginLeft){
		var paneWidth = $(".pane").css('width');
		paneWidth =  parseInt(paneWidth);
		
		var suit = $('.activecard').attr('id').substring(0,1),
		cardnum = Math.round($marginLeft / paneWidth + 1),
		card = suit + cardnum;
		$('.activecard').removeClass('activecard');
		$("#" + card).addClass('activecard');
	}
	
	var menuColor;
	
	// The same for all waypoints
	$('body').delegate('#home', 'waypoint.reached', function(event, direction) {
		var $active = $(this),
			menuColor = '#FFF';
			
		setHeader($active);
		setPageTitle($active);
		$('#menu h3').add($('#page h3')).css('color', menuColor);
		//setActiveCard($('#a1'));
	});
	
	
	$('body').delegate('#folio', 'waypoint.reached', function(event, direction) {
		var $active = $(this),
			$prev = $active.prev('section');
		
		if(direction === 'up'){
			menuColor = '#FFF';
			
			setHeader($prev);
			setPageTitle($prev);
			//setActiveCard($('#k1'));
			//sitemapSelectPage($active.prev('section').children('.pane').scrollLeft());
		}
		else if(direction === 'down'){
			menuColor = '#D31B28';
			
			setHeader($active);
			setPageTitle($active);
			//setActiveCard($('#q1'));
			//sitemapSelectPage($active.children('.pane').scrollLeft());
		}
		$('#menu h3').add($('#page h3')).css('color', menuColor);
	});
	
	$('body').delegate('#about', 'waypoint.reached', function(event, direction) {
		var $active = $(this),
			$prev = $active.prev('section');
			
		if (direction === "up") {
			menuColor = '#D31B28';
			
			setHeader($prev);
			setPageTitle($prev);
			//setActiveCard($('#a1'));
		}
		else if (direction === 'down'){
			menuColor = '#FFF';
			
			setHeader($active);
			setPageTitle($active);
			//setActiveCard($('#k1'));
			//sitemapSelectPage($active.children('.pane').scrollLeft());
		}
		$('#menu h3').add($('#page h3')).css('color', menuColor);
	});
	
	$('body').delegate('#contact', 'waypoint.reached', function(event, direction) {
		var $active = $(this),
			$prev = $active.prev('section');
		
		if(direction === 'up'){
			menuColor = '#FFF';
			
			setHeader($prev);
			setPageTitle($prev);
			//setActiveCard($('#q1'));
			//sitemapSelectPage($active.prev('section').children('.pane').scrollLeft());
		}
		else if(direction === 'down'){
			menuColor = '#000';
			
			setHeader($active);
			setPageTitle($active);
			//setActiveCard($('#j1'));
		}
		$('#menu h3').add($('#page h3')).css('color', menuColor);
	});
});