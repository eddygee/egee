/**
 * egee.js
 *@author Edgar Garcia <hello@egee.me>
 *@copyright EGee all right reserved
 *Actions Handling in this script
 */
var EGee = {};

$(function() {

	EGee	= {
		
		// scene elements
		$scene : $('.scene'),
		// folio section
		$folio : $('#folio'),
		//bike image
		$bike : $('#bike'),
		//dog image
		$kobe : $('#dog'),
		//Home Twitter Bird
		$bird : $('#twitBird'),
		//Folio Pigs
		$pigs : {	one: $('#p1'),
					two: $('#p2')
				},
		//Folio Pigs div group
		$oink : $('#pigs'),
		//Folio Pig class
		$pig : $('.pig'),
		//Extra fire
		$fire : $('#fire'),
		// we will cache the inView rows and the outside viewport rows
		//$sceneInView, $sceneOutView,
		// navigation menu links
		$links			: $('nav ul a'),
		// the window element
		$win			: $(window),
		// we will store the window sizes here
		winSize			: {'width' : 0, 'height' : 0},
		// used in the scroll setTimeout function
		anim			: false,
		//bike speed
		speed			: {current:2,1:75, 2:150, 3:310},
		// page scroll speed
		scollPageSpeed	: 2000 ,
		// page scroll easing
		scollPageEasing : 'easeInOutExpo',
		altEasing : 'easeInOutQuart',
		// document scrollLeft position
		POS : 0,
		//24 hour int of the our
		d : 0,
		// scroll timeout
		ST : {},
		rotation :0,
		// scolling direction, true: right , false: left
		DIR :  true,	
		//chapter reached
		reached : {
			home:false,
			about:false,
			folio:false,
			contact:false
		},
		// -----------------------
		// @constants
		//------------------------
		SCROLLRATIO : 190,
		// ------------------------
		// @environment vars
		//-------------------------
		IsScrolling : false,
		SceneWidth : 0,
		Multiplier : 10,
			
			// initialize function
			init			: function() {
				EGee.POS = $(document).scrollLeft();
						
				// get window sizes
				EGee.getWinSize();
				// initialize events
				EGee.initEvents();
			},			
			
			//play  events
			play : function(pos,delta){
				if(EGee.POS < $('#about').offset().left - EGee.winSize.width && !EGee.reached.home){
					$active = EGee.$links.eq(0);
					EGee.setActiveScene($active);
				}
				else if(EGee.POS >= $('#about').offset().left - EGee.winSize.width && EGee.POS < $('#folio').offset().left - EGee.winSize.width && !EGee.reached.about){
					$active = EGee.$links.eq(1);
					EGee.setActiveScene($active);
				}
				else if(EGee.POS >= $('#folio').offset().left - EGee.winSize.width && EGee.POS < $('#contact').offset().left - EGee.winSize.width && !EGee.reached.folio){
					$active = EGee.$links.eq(2);
					EGee.setActiveScene($active);
				}
				else if(EGee.POS >= $('#contact').offset().left - EGee.winSize.width && !EGee.reached.contact){
					$active = EGee.$links.eq(3);
					EGee.setActiveScene($active);
				}
				
				$('#planet').css({'left':pos * EGee.Multiplier * .095 + 'px'});
				if ( pos <= 38 ){
					var dist =  pos * EGee.Multiplier * 2.5;
					EGee.$kobe.css({left:pos * EGee.Multiplier * 2.2 + 'px'});
					EGee.$bike.css({left: pos * EGee.Multiplier * 2.5 + 'px'});
				}else if( pos > 38 && pos < 1089 ){
					EGee.$bike.css({left: 38 * EGee.Multiplier * 2.5 + 'px'});
					//console.log('bike ' + pos);
					
					if( pos >= 435  && pos < 703 ){
						//p = postion, after pos=415 it increases 1,2,3, etc
						p = (parseInt(pos) - 435);
						//console.log('bike ' + p);						
						if($('#pigs').css('display') == 'none'){
							lef = EGee.winSize.width + 200;
							EGee.$oink.css('left', lef);
							$('#pigs').show();
						}else{
							q = p*7.5;
							lef = EGee.winSize.width - q;
							EGee.$oink.css('left', lef);
						}
						
					}else if(pos < 415){
						lef = EGee.winSize.width + 200;
						EGee.$oink.css('left', lef);
					}else if(pos > 703){
						EGee.$oink.css('left', -796);
					}
				}else if( pos >= 1160){
					EGee.$bike.css({left: (pos - 1120) * EGee.Multiplier * 2.5 + 'px'});
					//console.log('moutain');
				}
			},
			// get window sizes
			getWinSize		: function() {
				EGee.winSize.width	= EGee.$win.width();
				EGee.winSize.height	= EGee.$win.height();
				
				//if ( EGee.winSize.height < 600 ) EGee.winSize.height = 600;
				EGee.$scene.css('height', EGee.winSize.height);
				$('#about').css('height',EGee.winSize.height);	
			},
			// initialize some events
			initEvents		: function() {
				
				EGee.POS = $(document).scrollLeft();
				EGee.d = new Date().getHours();
				
				EGee.SceneWidth = $('.scene').width();
				EGee.X = EGee.SceneWidth / EGee.SCROLLRATIO;
				
				EGee.setBG();
				EGee.setSpeed();
								
				// navigation menu links.
				// scroll to the respective section.
				EGee.$links.on( 'click.Scrolling', function( event ) {
					
					EGee.IsScrolling = true;
					if($(this).attr('href').toLowerCase().substring(1) == 'folio'){
						// scroll to the element that has id = menu's href
						$('html, body').animate({
							scrollLeft: $( $(this).attr('href') ).offset().left + 800
						}, EGee.scollPageSpeed, EGee.scollPageEasing, function(){ EGee.toggleScrolling(); });
					}else if($(this).attr('href').toLowerCase().substring(1) == 'about'){
						// scroll to the element that has id = menu's href
						$('html, body').animate({
							scrollLeft: $( $(this).attr('href') ).offset().left + 300
						}, EGee.scollPageSpeed, EGee.scollPageEasing, function(){ EGee.toggleScrolling(); });
						
					}else{
						// scroll to the element that has id = menu's href
						$('html, body').animate({
							scrollLeft: $( $(this).attr('href') ).offset().left
						}, EGee.scollPageSpeed, EGee.scollPageEasing, function(){ EGee.toggleScrolling(); });
					}
					
					return false;
				
				});
				
				$(".tweet").tweet({
					username: "meEDDYgee",
					join_text: "auto",
					avatar_size: 32,
					count: 1,
					loading_text: "loading tweets..."
				});
				
				// Play about shops scene
				$('#playAbout').on( 'click.Scrolling', function( event ) {
					
					// scroll to the folio section
					$('html, body').stop().animate({
						scrollLeft: $('#stores').offset().left
					}, EGee.scollPageSpeed );
						
					return false;
				});
				
				
				// Refresh Captcha
				$('#refresh').on('click.Scrolling', function(){
					var src = 'http://www.egee.me//wp-content/themes/egee/math/securimage_show.php?' + Math.random();
					$('#captcha').attr('src', src);
					return false;
				});
				
				
				
				// Change Bike Speed
				$('#speed').on('click.Scrolling', function(){
					EGee.speed.current = EGee.speed.current+1;
					if(EGee.speed.current > 3) EGee.speed.current = 1;
					EGee.setSpeed();
					if($('#message').css('display') == 'none')
						$('#message').html("<h2>Ride speed<br/>changed to<br/>" + EGee.speed.current + "</h2>").fadeIn().delay(messageDelay).fadeOut();
					else
						$('#message').html("<h2>Ride speed<br/>changed to<br/>" + EGee.speed.current + "</h2>");
					return false;
				});
				
				$('#formElem').submit( submitForm );
				
				//Switch between day and night scenes
				$('#dayNnite').on( 'click.Scrolling', function( event ) {
					var time = $('#bg').attr('class');
					if(time == 'day'){						
						$('#loaderWrap').slideDown(function(){EGee.setNite();});
						$('#loaderWrap').delay(1500).slideUp();
					}else{
						$('#loaderWrap').slideDown(function(){EGee.setDay();});						
						$('#loaderWrap').delay(1500).slideUp();
					}
					return false;
				});
				
				$(window).on({
					// on window resize we need to redefine which rows are initially visible (this ones we will not animate).
					'resize.Scrolling' : function( event ) {						
						
						// get the window sizes again
						EGee.getWinSize();
					
					},
					// on wheel scroll
					'mousewheel.Scrolling' : function( event, delta ) {
						var i = EGee.speed.current,
							newX = parseInt($(document).scrollLeft()) + EGee.speed[i];
						
						if (delta > 0)
							$(document).scrollLeft(newX-EGee.speed[i]*2);
						else
							$(document).scrollLeft(newX);
					
						return false;
					},
					// when scrolling the page change the position of each row	
					'scroll.Scrolling' : function( event ) {
						clearTimeout(EGee.ST);
						EGee.IsScrolling = true;
						$('#bike').stop().css('opacity', 1);
						EGee.$bike.add(EGee.$bird).add(EGee.$pig).add(EGee.$fire).toggleClass('duce');
						
						var newX = parseInt( $(document).scrollLeft() / EGee.X),
							oldX = parseInt( EGee.POS/EGee.X);	
							delta = newX - oldX,
							transition = {'newX':newX,'oldX':oldX},
						EGee.POS = $(document).scrollLeft(),
						PC = EGee.POS/EGee.X;
						
						if(delta < 0){
							//Face Sprites Forward
							EGee.$bike.add(EGee.$kobe).add(EGee.$pig).addClass('back');
						}else if ( delta > 0 && EGee.$bike.hasClass('back') ){
							//Face  Sprites Forward
							EGee.$bike.add(EGee.$kobe).add(EGee.$pig).removeClass('back');
						}						
						EGee.play(PC,delta);						
						
						// set a timeout to avoid that the 
						// placeRows function gets called on every scroll trigger
						if( EGee.anim ) return false;
						EGee.anim = true;
						setTimeout( function() {
							
							EGee.anim = false;
							EGee.setDirection();
							
						}, 10 );
						
						EGee.ST = setTimeout('EGee.toggleScrolling()',1500);
					}
				});
			
			},toggleScrolling : function(){
					clearTimeout(EGee.ST);
					EGee.IsScrolling = !EGee.IsScrolling;
					if(!EGee.IsScrolling){
						if(!EGee.IsScrolling)$('#bike').stop().animate({opacity:.25}, 2500);
					}
						
			},setSpeed : function(){
				var mph = EGee.speed.current;
				$('#speed').html("<a href='#'>" + mph + "</a>");				
			
			},setBG : function(){
				
				//@ hour 19 = 7pm switch to night
				if(EGee.d >= 19 || EGee.d <= 7)
					EGee.setNite();
				else
					EGee.setDay();
			
			},setDay : function(){
				
				$('#bg').removeClass('nite');
				$('#bg').addClass('day');
				
				//contrast text
				$('a').add('#hey h2').css('color','#201c42');
				$('#folio p').css('color','#000');
				$('#folio p span').add('#folio h4').css('color','#D32029');
				$('#planet').html('<div id="sun"></div>');
				
			},setNite : function(){
				
				$('#bg').removeClass('day');
				$('#bg').addClass('nite');
				
				//contrast text
				$('a').add('#hey h2').add('#folio p').css('color','#fff');
				$('#folio p span').add('#folio h4').add('nav ul li a').css('color','#F2CC15');
				$('#planet').html('<div id="moon"></div>');
				
			},setDirection : function(){
				
				//if old POS is < new POS
				if( EGee.POS < $(document).scrollLeft() )
					EGee.DIR = true;//moving forward
				else//old POS is > new POS
					EGee.DIR = false;//moving backward
				//update current position
				EGee.POS = $(document).scrollLeft();
				
			}
	};// @ object EGee
	
	window.onload = function(){
		/*$('body').css('overflow', 'hidden');*/
		$('#loaderWrap').delay(1500).slideUp();
		
		$('#twitBird').find('.welcome').delay(4200).slideUp().end().find('.tweet').delay(4500).slideDown();
	};
	
	var egee = EGee.init();
	
});