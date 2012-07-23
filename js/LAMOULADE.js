/**
 * lamoulade.js
 *@package Lamoulade.com
 *@author La Moulade <hello@lamoulade.co.uk>
 *@author Abdoul Sy <abdoul@lamoulade.co.uk>
 @copyright Lamoulade all right reserved
 *Actions Handling in this script
 */
	(function($){
		
	$(document).ready(function($){
	var myImage = new Image();
	myImage.src = '/images/loader-cache.png';
	myImage.onload = function(){
		$('#lm-loader-container').css({backgroundColor:'#000'});		
	}
	var Lamoulade = {
	// -----------------------
	// @constants
	//------------------------
	URL:'http://lamoulade.com',
	CHAPTERS : {home:0,services:1,projects:2,contact:3},
	CHAPTER : 0,
	DIRECTION: {up:false,down:true},
	activateScrolling : true,
	SCROLL: {ratio:190},
	DEBUG: true,
	// ------------------------
	// @environment vars
	//-------------------------
	Screen : {width:0,height:0}, 
	SceneHeight: 0,
	X: 0,
	Multiplier: 10,
	Divisor : 0.5,
	// ------------------------
	// @action variables
	// ------------------------
	pos : 0,	
	rotation :0,
	anim:{left:0,top:0},
	x: 0,
	y: 0,
	mouseMoving:false,
	zSquared: 0,
	z: 0,
	pivotPoint :{x:0,y:0},
	move:null,
	movePos:null,	
	//chapter reached
	reached: {
		home:false,
		services:false,
		projects:false,
		contact:false,
		panel:false 
	},
	hasReached: {
		home:false,
		services:false,
		projects:false,
		contact:false,
		panel: false
	},
	//contact reached
	contact :false,
	//* -----------------------------
	// @Selectors
	//* -----------------------------
	
	$home: {
		bloc1 : {h2:$('#home-bloc1 h2'),h1:$('#home-bloc1 h1'),me:$('#home-bloc1')},
		bloc2 : $('#home-bloc2'),
		bloc3 : $('#home-bloc3'),
		team  : $('#home-bloc3 li[data-id=team]'),
		studio: $('#home-bloc3 li[data-id=studio]'),
		blog  : $('#home-bloc3 li[data-id=blog]')
	},
	$footer :$('footer'),
	$contactFooter :$('#contact-footer'),
	$contactFooterSupport :$('#contact-footer-support'),
	$studio :$('#studio'),
	$recording : $('#recording'),
	$header : $('header'),
	$cms : $('#cms'),
	$services: $('#services'),
	$servicesLid : $('#services div.services-lid'),
	$lid: {
		first  : null,
		second : null,
		third  : null,
		fourth : null,
		$in: {
			first	: null,
			second	: null,
			third	: null,
			fourth	: null
		}
	},
	$projects : {
		chapter: null,
		title: null,
		elevator: null,
		ci : null,
		p1l :null,
		p1r :null,
		p2l :null,
		p2r :null,
		p3l :null,
		p3r :null,
		p4l :null,
		p4r :null,
		p5l :null,
		p5r :null			
	},
	bikeHere: false,
	indicator :  {selector:$('#menu-slider'),multiplier:10/8,divisor:8/10},	
	//Timers
	timers: {up:0,down:0,services:0,home:0,contact:0,projects:0},
	tempVars:[0,0,0,0],
	// -------------------------------
	// @functions
	//-------------------------------
	moveHomeBlockDown: function(pos){
		Lamoulade.$home.bloc2.css({left:-pos * Lamoulade.Multiplier * 2.5+'px'});
			Lamoulade.$home.bloc3.css({left:-pos * Lamoulade.Multiplier * 2.5+290+'px'});
			if(pos >4.5){
				Lamoulade.$home.bloc1.h2.css({left:(4.5-pos)*Lamoulade.Multiplier*2.5+'px'});
			}
			if(pos >9){
				Lamoulade.$home.bloc1.h1.css({left:(9 - pos)*Lamoulade.Multiplier*2.5+'px'});
				Lamoulade.$footer.css({bottom:(9 - pos)*Lamoulade.Multiplier*5+'px'});
			}
			if(pos >10){
				$('#hfc-bubble1').css({display:'none'});
				$('#hfc-bubble2').css({display:'block'});
			}else{
				$('#hfc-bubble2').css({display:'none'});
				$('#hfc-bubble1').css({display:'block'});
			}
	},
	moveHomeBlocksUp :function(pos){
		Lamoulade.$home.bloc2.css({left:-pos*Lamoulade.Multiplier*2.5+'px'});
			Lamoulade.$home.bloc3.css({left:-pos*Lamoulade.Multiplier*2.5+290+'px'});
			
			//reset bloc positions is pos == 0
			if(pos == 0){
				Lamoulade.$home.bloc2.css({left:0+'px'});
				Lamoulade.$home.bloc3.css({left:0+290+'px'});
				Lamoulade.$home.bloc1.h2.css({left:0+'px'});
				Lamoulade.$home.bloc1.h1.css({left:0+'px'});
				Lamoulade.$footer.css({bottom:0+'px'});
				Lamoulade.$services.css({left:0+'px',top:0+'px'});
			}
			if(pos >4.5){
				Lamoulade.$home.bloc1.h2.css({left:(4.5-pos)*Lamoulade.Multiplier*2.5+'px'});
			}
			if(pos >9){
				Lamoulade.$home.bloc1.h1.css({left:(9-pos)*Lamoulade.Multiplier*2.5+'px'});
				Lamoulade.$footer.css({bottom:(9-pos)*Lamoulade.Multiplier*5+'px'});
			}
			if(pos >10){
				$('#hfc-bubble1').css({display:'none'});
				$('#hfc-bubble2').css({display:'block'});
			}else{
				$('#hfc-bubble2').css({display:'none'});
				$('#hfc-bubble1').css({display:'block'});
			}
	},
	moveRotateStudioDown :function(pos){
		Lamoulade.pivotPoint.x = parseInt( Lamoulade.Screen.width /2 , 10 );
		Lamoulade.pivotPoint.y = parseInt( Lamoulade.Screen.height /5*2 , 10 );
		var maxRotation = 21,maxLeft =-3000 + Lamoulade.pivotPoint.x,
		maxTop = -3000 + Lamoulade.pivotPoint.y * 3/2;
		Lamoulade.rotation = (12.5-pos)*2.3;
		if(Lamoulade.rotation < -21){
			Lamoulade.rotation = -21;
		}
		Lamoulade.anim.left = -((-12.5 + pos) * Lamoulade.Multiplier * 9 + 1000);
		if(Lamoulade.anim.left < maxLeft){
			Lamoulade.anim.left = maxLeft;
		}
		Lamoulade.anim.top = -((-12.5 + pos) * Lamoulade.Multiplier * 5 + 1800);
		if(Lamoulade.anim.top < maxTop){
			Lamoulade.anim.top = maxTop;
		}
		Lamoulade.$services.stop().animate({
											left:Lamoulade.anim.left+'px',
											top:Lamoulade.anim.top+'px',
											rotate:Lamoulade.rotation+'deg'
											},50);
	},
	moveRotateStudioUp :function(pos){
		Lamoulade.pivotPoint.x = parseInt( Lamoulade.Screen.width /2 , 10 ); 
		Lamoulade.pivotPoint.y = parseInt( Lamoulade.Screen.height /5*2 , 10 );
		var maxRotation = 21,maxLeft =-3000 + Lamoulade.pivotPoint.x,
		maxTop = -3000 + Lamoulade.pivotPoint.y * 3/2;
		Lamoulade.rotation = (12.5-pos)*2.3;
		if(Lamoulade.rotation < -21){
			Lamoulade.rotation = -21;
		}
		if(Lamoulade.rotation > 0){
			Lamoulade.rotation = 0;
		}
		Lamoulade.anim.left = -((-12.5 + pos) * Lamoulade.Multiplier * 9 + 1000);
		if(Lamoulade.anim.left < maxLeft){
			Lamoulade.anim.left = maxLeft;
		}
		if(Lamoulade.anim.left > 0){
			Lamoulade.anim.left = 0;
		}
		Lamoulade.anim.top = -((-12.5 + pos) * Lamoulade.Multiplier * 5 + 1800);
		if(Lamoulade.anim.top < maxTop){
			Lamoulade.anim.top = maxTop;
		}
		if(Lamoulade.anim.top > 0){
			Lamoulade.anim.top = 0;
		}
		Lamoulade.$services.stop().animate({
											left:Lamoulade.anim.left+'px',
											top:Lamoulade.anim.top+'px',
											rotate:Lamoulade.rotation+'deg'
											},50);
	},
	showStudioFirstLidDown : function(pos){
			Lamoulade.$lid.first.addClass('menu-elem');
			Lamoulade.$lid.third.css({height:(pos-42)*Lamoulade.Multiplier*10+'px'});
		
			if(pos >46){
				var fourthLidWidthMax =3000, fourthLidWidth = (pos-46)*Lamoulade.Multiplier*10;
				if(fourthLidWidth > fourthLidWidthMax){
					fourthLidWidth = fourthLidWidthMax;
				}
				Lamoulade.$lid.fourth.css({width:fourthLidWidth +'px'},500);
				Lamoulade.$lid.$in.first.show();
				Lamoulade.$lid.$in.first.css({opacity:(pos-46)/10});
								
			}
	},
	showStudioSecondLidDown :function(pos){
		Lamoulade.$studio.hide();
		Lamoulade.$lid.$in.second.show();
		var left = (pos-63)*Lamoulade.Multiplier*4-150;
		if(left >=0){
			left=0;
		}
		Lamoulade.$lid.$in.second.css({opacity:(pos-63)/10,left:left +'px'});
	},
		
	showStudioThirdLidDown :function(pos){
		Lamoulade.$lid.$in.third.show();
		Lamoulade.$lid.$in.third.css({opacity:(pos-54)/10});
	},
	
	showStudioThirdLidUp : function(pos)
	{
		if(pos<=42){
			Lamoulade.$lid.third.css({height:0+'px'});	
		}
		if(pos >42){			
			Lamoulade.$lid.third.css({height:(pos-42)*Lamoulade.Multiplier*11+'px'});					
		}
	},
	showStudioFourthLidDown :function(pos){
		Lamoulade.$lid.$in.fourth.show();
		Lamoulade.$lid.$in.fourth.css({opacity:(pos-59)/10});
		Lamoulade.$lid.$in.second.css({left:'-50px'});		
	},
	makeProjectChapterGoDown: function(pos){
		var pChapterHeight = (pos-77)*Lamoulade.Multiplier*7 ;
		
		if(pChapterHeight > Lamoulade.z +100){
			pChapterHeight = Lamoulade.z +100;
		}	
		
		Lamoulade.$projects.chapter.show();
		Lamoulade.$projects.chapter.animate({rotate:'-21deg',height:pChapterHeight+'px'},10);	
	},
	makeProjectChapterGoUp: function(pos)
	{	
			
			Lamoulade.$services.show();
			Lamoulade.$lid.$in.second.show();
			
			Lamoulade.$lid.$in.second.css({opacity:(pos-60)/10});
			var pChapterHeight = (pos-77)*Lamoulade.Multiplier*7;
			if(pChapterHeight < 0){
				pChapterHeight = 0;
			}
			Lamoulade.$projects.chapter.show();
			Lamoulade.$projects.chapter.stop().animate({rotate:'-21deg',height:pChapterHeight+'px'},10);
	},
	moveBikeDown: function(pos){
			if(!Lamoulade.bikeHere){
						Lamoulade.$projects.title.show();
						Lamoulade.$projects.title.css({opacity:0,left:"48%"});
						Lamoulade.$projects.title.animate({opacity:1,left:50+"%"},600);
						Lamoulade.bikeHere =true;
						var veloSound = document.getElementById('velo-sound');
						veloSound.play();
					}
				var counting = pos-92;
				var position = parseInt(counting%6,10);
				
				switch(position){
					case 0:
						Lamoulade.$projects.title.css({'background-position-x':0,'background-position-y':0});
						break;
					case 1:
						Lamoulade.$projects.title.css({'background-position-x':'-190px','background-position-y':0});
						break;
					case 2:
						Lamoulade.$projects.title.css({'background-position-x':'-380px','background-position-y':0});
						break;
					case 3:
						Lamoulade.$projects.title.css({'background-position-x':0,'background-position-y':'-100px'});
						break;
					case 4:
						Lamoulade.$projects.title.css({'background-position-x':'-190px','background-position-y':'-100px'});
						break;
					case 5:
						Lamoulade.$projects.title.css({'background-position-x':'-380px','background-position-y':'-100px'});
						break;
				}
				
	},
	
	liftProjectElevatorDown: function(pos){
		Lamoulade.$projects.elevator.show();
		Lamoulade.$projects.elevator.css({left:Lamoulade.Screen.width/2 -960/2 +'px'});
		var myTop = (110-pos)*Lamoulade.Multiplier*7.8 +1300 ;
		if(myTop<130){myTop = 130}
		Lamoulade.$projects.elevator.css({top:myTop+'px'});
		Lamoulade.$header.css({backgroundColor:'#FFF'});
		Lamoulade.$projects.ci.css({top:(110-pos)*Lamoulade.Multiplier*3.2+'px'});
	},
	moveProjectTilesDown: function(pos){
		if(pos > 118){
				var maxLeftP1 = (pos-118)*Lamoulade.Multiplier*10-1500;
				if(maxLeftP1 >=0){
					maxLeftP1 =0;
				}
				Lamoulade.$projects.p1l.css({left:maxLeftP1+'px'});
				var maxRightP1 = (pos-118)*Lamoulade.Multiplier*10-1500;
				if(maxRightP1 >=0){
					maxRightP1 =0;
				}
				Lamoulade.$projects.p1r.css({right:maxRightP1+'px'});
			}
			if(pos > 128){
				var maxLeftP2 = (pos-128)*Lamoulade.Multiplier*10-1500;
				if(maxLeftP2 >=0){
					maxLeftP2 =0;
				}
				Lamoulade.$projects.p2l.css({left:maxLeftP2+'px'});
				var maxRightP2 = (pos-128)*Lamoulade.Multiplier*10-1500;
				if(maxRightP2 >=0){
					maxRightP2 =0;
				}
				Lamoulade.$projects.p2r.css({right:maxRightP2+'px'});
				
			}
			if(pos > 138){
				var maxLeftP3 = (pos-138)*Lamoulade.Multiplier*10-1500;
				if(maxLeftP3 >=0){
					maxLeftP3 =0;
				}
				Lamoulade.$projects.p3l.css({left:maxLeftP3+'px'});
				var maxRightP3 = (pos-138)*Lamoulade.Multiplier*10-1500;
				if(maxRightP3 >=0){
					maxRightP3 =0;
				}
				Lamoulade.$projects.p3r.css({right:maxRightP3+'px'});
			}
			if(pos > 148){
				var maxLeftP4 = (pos-148)*Lamoulade.Multiplier*10-1500;
				if(maxLeftP4 >=0){
					maxLeftP4 =0;
				}
				Lamoulade.$projects.p4l.css({left:maxLeftP4+'px'});
				var maxRightP4 = (pos-148)*Lamoulade.Multiplier*10-1500;
				if(maxRightP4 >=0){
					maxRightP4 =0;
				}
				Lamoulade.$projects.p4r.css({right:maxRightP4+'px'});
			}
			if(pos >158){
				var maxLeftP5 = (pos-158)*Lamoulade.Multiplier*10-1500;
				if(maxLeftP5 >=0){
					maxLeftP5 =0;
				}
				Lamoulade.$projects.p5l.css({left:maxLeftP5+'px'});
				var maxRightP5 = (pos-158)*Lamoulade.Multiplier*10-1500;
				if(maxRightP5 >=0){
					maxRightP5 =0;
				}
				Lamoulade.$projects.p5r.css({right:maxRightP5+'px'});
			}
	},
	newControls: function(pos,delta)
	{	
		
		$(Lamoulade.indicator.selector).css({'background-position':-245 +pos*Lamoulade.indicator.multiplier});
		
		if(delta>0){
			//controls url
		  	if(pos<58 && Lamoulade.CHAPTER !== Lamoulade.CHAPTERS.home){
				  Lamoulade.CHAPTER = Lamoulade.CHAPTERS.home;
				    window.location.assign(Lamoulade.URL +'/#!/home');
				}
			if(pos>60 && pos<120 && Lamoulade.CHAPTER !== Lamoulade.CHAPTERS.services){
				
			  Lamoulade.CHAPTER = Lamoulade.CHAPTERS.services;
			    window.location.assign(Lamoulade.URL + '/#!/services');
			}
			if(pos>120 && pos <180 && Lamoulade.CHAPTER !== Lamoulade.CHAPTERS.projects){
			  Lamoulade.CHAPTER = Lamoulade.CHAPTERS.projects;
			  window.location.assign(Lamoulade.URL + '/#!/projects');
			}
			if(pos >187 && Lamoulade.CHAPTER !== Lamoulade.CHAPTERS.contact){
			  Lamoulade.CHAPTER = Lamoulade.CHAPTERS.contact;
			  
			  window.location.assign( Lamoulade.URL + '/#!/contact');
			}
			
			if(pos<60){
				Lamoulade.$studio.show();				
			}
			Lamoulade.moveHomeBlockDown(pos);
			if(pos >12.5)
			{	
				Lamoulade.moveRotateStudioDown(pos);
			}
			if(pos >42){
				Lamoulade.showStudioFirstLidDown(pos);
			}
			if(pos >54){
				Lamoulade.showStudioThirdLidDown(pos);
			}
			if(pos >59){			
				Lamoulade.showStudioFourthLidDown(pos);
			}
			if(pos >40 && pos <56){
				Lamoulade.$projects.chapter.css({top:'-100px'});
			}
			
			if(pos >63){
				Lamoulade.showStudioSecondLidDown(pos);
			}
	
			if(pos >77){
				Lamoulade.makeProjectChapterGoDown(pos);
			}
			
			if(pos <92){
				Lamoulade.bikeHere =false;
			}
			if(pos >92){
				Lamoulade.moveBikeDown(pos);
			}
			if(pos >110){
				Lamoulade.liftProjectElevatorDown(pos);
			}
			if(pos >113){
				Lamoulade.$services.hide();		
			}
			if(pos >118){
				
				Lamoulade.moveProjectTilesDown(pos);
			}
			if(pos >125 && pos<183){
				Lamoulade.$header.css({borderBottom:'12px solid #EDEDED'});
			}else{
				Lamoulade.$header.css({borderBottom:'none'});
			}
			if(pos < 183){
				Lamoulade.$contactFooter.css({zIndex:360});
				Lamoulade.$contactFooterSupport.css({zIndex:350});
				
			}else{
				Lamoulade.$contactFooter.css({zIndex:300});
				Lamoulade.$contactFooterSupport.css({zIndex:280});
				
			}
			if(pos>173){
				var maxTop = -180;
				lTop = (173-pos)*100+600;
				if(lTop<maxTop){
					lTop= maxTop;
				}
				$('#p6').css({'top':lTop});
			}
			
			if(pos<181){
				Lamoulade.$contactFooter.hide();
				Lamoulade.$contactFooterSupport.hide();
			}			
			if(pos>182 && pos <195){
				Lamoulade.$contactFooter.show();
				Lamoulade.$contactFooterSupport.show();
				Lamoulade.playFooter(pos);
				var bottomPos = (pos-182)*90-600;
				var bPsupport = (pos-182)*15;
				if(bPsupport >300)
				{
					bPsupport = 300;
				}
				
				if(bottomPos>0){
					bottomPos =0;
				}
				if(bottomPos<-600){
					bottomPos = -600;
				}
				Lamoulade.$contactFooter.show();
				Lamoulade.$contactFooter.css({bottom:bottomPos+'px'});
				Lamoulade.$contactFooterSupport.css({top:100-bPsupport+'%'});;
			}
		
			if(pos>190){
				Lamoulade.$contactFooter.css({bottom:0+'px'});
			} 
		}else if(delta < 0 ) 
		{	
			//-************************************************
			//-*
			//-*
			//-*	GOING UP
			//-*
			//-*
			//-************************************************
      	if(pos<15 && Lamoulade.CHAPTER !== Lamoulade.CHAPTERS.home){
				  Lamoulade.CHAPTER = Lamoulade.CHAPTERS.home;
				    window.location.assign(Lamoulade.URL +'/#!/home');
				}
			if(pos>20 && pos<80 && Lamoulade.CHAPTER !== Lamoulade.CHAPTERS.services){
			  Lamoulade.CHAPTER = Lamoulade.CHAPTERS.services;
			    window.location.assign( Lamoulade.URL + '/#!/services');
			}
			if(pos>120 && pos <180 && Lamoulade.CHAPTER !== Lamoulade.CHAPTERS.projects){
			  Lamoulade.CHAPTER = Lamoulade.CHAPTERS.projects;
			  window.location.assign( Lamoulade.URL + '/#!/projects');
			}
			if(pos >187 && Lamoulade.CHAPTER !== Lamoulade.CHAPTERS.contact){
			  Lamoulade.CHAPTER = Lamoulade.CHAPTERS.contact;
			  window.location.assign( Lamoulade.URL + '/#!/contact');
			}
			if(pos<15){
			  $('#chapter-title').css({display:'none'});
			}
			
			Lamoulade.moveHomeBlocksUp(pos);
			Lamoulade.moveRotateStudioUp(pos);
			Lamoulade.showStudioThirdLidUp(pos);
		
			if(pos <=35){
				Lamoulade.$lid.$in.first.hide();
				Lamoulade.$lid.first.removeClass('menu-elem');
				Lamoulade.$lid.fourth.css({width:0+'px'},500);
			}
			
			if(pos >46){
				var fourthLidMaxWidth = 3000,
				fourthLidWidth = (pos-46)*Lamoulade.Multiplier*10;
			
				if(fourthLidWidth > fourthLidMaxWidth){
					fourthLidWidth = fourthLidMaxWidth;
				}
				Lamoulade.$lid.fourth.css({width:fourthLidWidth+'px'},500);
				Lamoulade.$lid.$in.first.show();
								
			}
			
			if(pos >35){
				Lamoulade.$lid.$in.first.css({opacity:(pos-35)/10});				
			}
			if(pos <=54){
				Lamoulade.$lid.$in.third.hide();
				Lamoulade.$cms.stop().animate({bottom:'20%'},500);
			}
			if(pos >43){
				Lamoulade.$lid.$in.third.show();
				Lamoulade.$lid.$in.third.css({opacity:(pos-43)/10});
			}
			if(pos <=52){
				Lamoulade.$lid.$in.fourth.hide();
			}
			if(pos >59){
				
				Lamoulade.$lid.$in.fourth.show();
				Lamoulade.$lid.$in.fourth.css({opacity:(pos-59)/10});
				
			}
			if(pos<50){
				Lamoulade.$projects.title.hide();
			}
			
			if(pos <=60){
				Lamoulade.$lid.$in.second.hide();
				Lamoulade.$projects.chapter.hide();
			
				Lamoulade.$studio.show();
			}
			if(pos >63)
			{
				Lamoulade.$lid.$in.second.css({left: '0',opacity:(pos-63)/10});
			}
		
			if(pos >77){
				Lamoulade.makeProjectChapterGoUp(pos);
			}

			if(pos <92){
				Lamoulade.$services.show();
				Lamoulade.$projects.elevator.hide();
			}
			if(pos <=92){
				Lamoulade.$projects.title.hide();
				if(Lamoulade.bikeHere){
					
					Lamoulade.$projects.title.css({opacity:1,left:"50%"});
					Lamoulade.$projects.title.stop().animate({opacity:0,left:50+"%"},200);
					Lamoulade.bikeHere =false;
					//var veloSound = document.getElementById('velo-sound');
					//veloSound.play();
				}
			}
			if(pos >92){
				Lamoulade.$services.hide();
				Lamoulade.$projects.title.css({opacity:1});
				var counting = pos-92;
				var position = parseInt(counting%6,10);
				
				switch(position){
					case 0:
						Lamoulade.$projects.title.css({'background-position-x':0,'background-position-y':0});
						break;
					case 1:
						Lamoulade.$projects.title.css({'background-position-x':'-190px','background-position-y':0});
						break;
					case 2:
						Lamoulade.$projects.title.css({'background-position-x':'-380px','background-position-y':0});
						break;
					case 3:
						Lamoulade.$projects.title.css({'background-position-x':0,'background-position-y':'-100px'});
						break;
					case 4:
						Lamoulade.$projects.title.css({'background-position-x':'-190px','background-position-y':'-100px'});
						break;
					case 5:
						Lamoulade.$projects.title.css({'background-position-x':'-380px','background-position-y':'-100px'});
						break;
				}
				
			}
			if(pos <=90){
				Lamoulade.$header.css({backgroundColor:'transparent'});
			}
			if(pos >110){
				
				Lamoulade.$projects.elevator.css({left:$(window).width()/2 -960/2 +'px'});
				Lamoulade.$projects.elevator.show();
				Lamoulade.$header.css({backgroundColor:'#FFF'});
				var myTop = (110-pos)*Lamoulade.Multiplier*7.8 +1300 ;
				if(myTop<130){myTop = 130}
				Lamoulade.$projects.elevator.css({top:myTop+'px'});
				Lamoulade.$projects.ci.css({top:(110-pos)*Lamoulade.Multiplier*3.2+'px'});
			}
	
			if(pos > 118){
				var maxLeftP1 = (pos-118)*Lamoulade.Multiplier*10-1500;
				if(maxLeftP1 >=0){
					maxLeftP1 =0;
				}
				Lamoulade.$projects.p1l.css({left:maxLeftP1+'px'});
				var maxRightP1 = (pos-118)*Lamoulade.Multiplier*10-1500;
				if(maxRightP1 >=0){
					maxRightP1 =0;
				}
				Lamoulade.$projects.p1r.css({right:maxRightP1+'px'});
			}
			if(pos < 118 && pos >40){
				Lamoulade.$projects.title.show();
			}
			if(pos <125 || pos >183){
				Lamoulade.$header.css({borderBottom:'none'});
			}
			if(pos<183 && pos>125){
				Lamoulade.$header.css({borderBottom:'12px solid #EDEDED'});
			}
			if(pos > 128){
				var maxLeftP2 = (pos-128)*Lamoulade.Multiplier*10-1500;
				if(maxLeftP2 >=0){
					maxLeftP2 =0;
				}
				Lamoulade.$projects.p2l.css({left:maxLeftP2+'px'});
				var maxRightP2 = (pos-128)*Lamoulade.Multiplier*10-1500;
				if(maxRightP2 >=0){
					maxRightP2 =0;
				}
				Lamoulade.$projects.p2r.css({right:maxRightP2+'px'});
			}
			if(pos > 138){
				var maxLeftP3 = (pos-138)*Lamoulade.Multiplier*10-1500;
				if(maxLeftP3 >=0){
					maxLeftP3 =0;
				}
				Lamoulade.$projects.p3l.css({left:maxLeftP3+'px'});
				var maxRightP3 = (pos-138)*Lamoulade.Multiplier*10-1500;
				if(maxRightP3 >=0){
					maxRightP3 =0;
				}
				Lamoulade.$projects.p3r.css({right:maxRightP3+'px'});
			}
			if(pos > 148){
				var maxLeftP4 = (pos-148)*Lamoulade.Multiplier*10-1500;
				if(maxLeftP4 >=0){
					maxLeftP4 =0;
				}
				Lamoulade.$projects.p4l.css({left:maxLeftP4+'px'});
				var maxRightP4 = (pos-148)*Lamoulade.Multiplier*10-1500;
				if(maxRightP4 >=0){
					maxRightP4 =0;
				}
				Lamoulade.$projects.p4r.css({right:maxRightP4+'px'});
			}
			if(pos >158){
				var maxLeftP5 = (pos-158)*Lamoulade.Multiplier*10-1500;
				if(maxLeftP5 >=0){
					maxLeftP5 =0;
				}
				Lamoulade.$projects.p5l.css({left:maxLeftP5+'px'});
				var maxRightP5 = (pos-158)*Lamoulade.Multiplier*10-1500;
				if(maxRightP5 >=0){
					maxRightP5 =0;
				}
				Lamoulade.$projects.p5r.css({right:maxRightP5+'px'});
			}
			
			if(pos>173){
				var maxTop = -180;
				lTop = (173-pos)*100+600;
				if(lTop<maxTop){
					lTop= maxTop;
				}
				minTop = 600;
				if(lTop>600){
					lTop =minTop;
				}
				$('#p6').css({'top':lTop});
			}
			
			
			if(pos <170){
				Lamoulade.$contactFooter.hide();
				Lamoulade.$contactFooterSupport.hide();
				
			}
			if(pos < 188){
				Lamoulade.$contactFooter.css({zIndex:360});
				Lamoulade.$contactFooterSupport.css({zIndex:350});
				
			}else{
				Lamoulade.$contactFooter.css({zIndex:300});
				Lamoulade.$contactFooterSupport.css({zIndex:280});
				
			}
			if(pos<179){
				$('body').unbind('mousemove');
				Lamoulade.mouseMoving  = false;
			}
			if(pos>180 && pos <195 ){
				Lamoulade.$contactFooter.show();
				Lamoulade.$contactFooterSupport.show();
				var bottomPos = (pos-182)*90-600;
				var bPsupport = (pos-182)*15;
				if(bPsupport >300)
				{
					bPsupport = 300;
				}
				if(bottomPos>0){
					bottomPos =0;
				}
				if(bottomPos<-630){
					bottomPos = -630;
				}
				Lamoulade.playFooter();
				Lamoulade.$contactFooter.show();
				Lamoulade.$contactFooter.css({bottom:bottomPos+'px'});
				Lamoulade.$contactFooterSupport.css({top:100 - bPsupport+'%'});
			}
			
		}
	
	},
    log : function(something){
		if(Lamoulade.DEBUG){
			Lamoulade.$recording.html(something);
		}
    },
	log2 : function(something){
		if(Lamoulade.DEBUG){
			Lamoulade.$recording.append('#->'+something);
		}
	} ,
	resetWH :function(){
	 Lamoulade.Screen.width = $(window).width();
	 Lamoulade.Screen.height = $(window).height();
	 Lamoulade.x = Lamoulade.Screen.height;
	 Lamoulade.y = Lamoulade.Screen.width;
	 Lamoulade.zSquared = Math.pow(Lamoulade.x,2) + Math.pow(Lamoulade.y,2);
	 Lamoulade.z = Math.sqrt(Lamoulade.zSquared);
	$(document).scrollTop($(window).scrollTop()+1);	 
	},
	playFooter:function(pt)
	{
		
		if(Lamoulade.mouseMoving==false){
			$('body').bind('mousemove',function(e){
				
				var posi = 0;
				var boots = document.getElementById('footsteps1');
				var scrWidth = $(window).width();
				if(e.pageX < scrWidth/7  && posi!=1){
					$('#contact-shoes').css({backgroundPosition:0+'px'});
					
					posi=1;					
				}
				if((e.pageX < 2*scrWidth/7)&&(e.pageX > scrWidth/7)  && posi!=2){
					$('#contact-shoes').css({backgroundPosition:-190+'px'});
					
					posi=2;	
				}
				if((e.pageX < 3*scrWidth/7)&&(e.pageX > 2*scrWidth/7)  && posi!=3){
					$('#contact-shoes').css({backgroundPosition:-380+'px'});
					
					posi=3;	
				}
				if((e.pageX < 4*scrWidth/7)&&(e.pageX > 3*scrWidth/7)  && posi!=4){
					$('#contact-shoes').css({backgroundPosition:-570+'px'});
					
					posi=4;	
				}
				if((e.pageX < 5*scrWidth/7)&&(e.pageX > 4*scrWidth/7)  && posi!=5){
					$('#contact-shoes').css({backgroundPosition:-760+'px'});
					
					posi=5;	
				}
				if((e.pageX < 6*scrWidth/7)&&(e.pageX > 5*scrWidth/7)  && posi!=6){
					$('#contact-shoes').css({backgroundPosition:-950+'px'}); 
					
					posi=6;	
				}
				if((e.pageX < 7*scrWidth/7)&&(e.pageX > 6*scrWidth/7)  && posi!=7){
					$('#contact-shoes').css({backgroundPosition:-1140+'px'});
					
					posi=7;	
				}
				Lamoulade.mouseMoving =true;
			});
		}
	},
	_init : function(){		
		Lamoulade.resetWH();
	},
	_initHome: function(){
		$(document).scrollTop(0);
		var hashtag = window.location.hash.toString();
		var query = hashtag.substr(3);
		
		Lamoulade.$home.bloc1.me.show();
		Lamoulade.$home.bloc1.me.css({opacity : 1, left:0,display:'block'});	
		Lamoulade.$home.bloc2.css({opacity : 1, left:0,display:'block'});
		Lamoulade.$home.bloc3.css({opacity:1,left:"290px",display:'block'});
		var t = window.setTimeout(function(){
			Lamoulade.$header.animate({top:0},500);
			$('#cms').animate({bottom:'20%'},500);
			Lamoulade.$footer.animate({bottom:0},500, function(){
				switch(query)
				{
					case 'services':				
						 Lamoulade._move(0,80*Lamoulade.X+0.33);
						 break;				
					case 'projects':
						 Lamoulade._move(0,128*Lamoulade.X+0.66);
						 break;
					case 'contact':
						Lamoulade._move(0,200*Lamoulade.X);
						break;
					case 'team':
					case 'studio':
					case 'holistic':
					case 'systemic':
					case 'organic':
						$('#loader-moulade').show();
						$('#loading-panel').animate({opacity:1});
						$('#loading-panels-info').show();
						$('<div/>').attr('id','mask').appendTo('body');
						$('#menu').hide();
						$.ajax({
							url:'index/'+query,
							success:function(data){
							  $('#panels').append(data);			  
							}
						});
					break;
					case 'home':
					default:
					break
				}
				
			
				
			});
		},250);
	
     
	},

	_initServices: function(){
		Lamoulade.$servicesLid.css({width:'3000px',height:'3000px'});
		Lamoulade.$lid.third.css({width:'3000px',height:0});
		Lamoulade.$lid.fourth.css({width:0,height:'3000px'});
	},

	_move: function(c,o){
		
		$('html,body').animate({scrollTop:o+'px'},1500,'easeInOutExpo');
		
		
	},
	_play : function(){

	Lamoulade.$home.team.hover(function(){
		$('#home-triangle').stop().animate({left:15+'px'},320);	
	});
	Lamoulade.$home.studio.hover(function(){
		$('#home-triangle').stop().animate({left:70+'px'},320);	
	});
	Lamoulade.$home.blog.hover(function(){
		$('#home-triangle').stop().animate({left:130+'px'},320);	
	});

	$('.chapters').live('click',function(e){
		e.preventDefault();
		  var who = $(this).attr('data-who');
		  var currentPos = $(window).scrollTop();
		  			  
		  switch(who){
		  	case 'home':
		  	default:	  		
		  		var objective = 0;		  				
		  		break;		  		
		  	case 'services':
		  	    var objective = 70*Lamoulade.X+0.33;
		  		break;
		  	case 'projects':
		  		var objective = 128*Lamoulade.X+0.66;		  	
		  		break;
		  }
		//  cmPanels();
		  Lamoulade._move(currentPos,objective);	  
		 return false;
	});
	$('#mail-btn').live('click', function(e){
			e.preventDefault();
			var currentPos = $(window).scrollTop();
			Lamoulade._move(currentPos,200*Lamoulade.X);	  
	});
	$('#first-lid').live({mouseenter:function(){
		if(Lamoulade.CHAPTER == Lamoulade.CHAPTERS.services){
			$(this).stop().animate({left:'20px',top:'20px'},250,function(){
				$(this).animate({left:0,top:0},250);
			});
		}
		
	}});
	$('#third-lid').live({mouseenter:function(){
		if(Lamoulade.CHAPTER == Lamoulade.CHAPTERS.services){
			$(this).stop().animate({left:'20px',top:'-20px'},250,function(){
				$(this).animate({left:0,top:0},250);
			});
		}
		
	}});
	$('#fourth-lid').live({mouseenter:function(){
		if(Lamoulade.CHAPTER == Lamoulade.CHAPTERS.services){
			$(this).stop().animate({left:'-20px',top:'-20px'},250,function(){
				$(this).animate({left:0,top:0},250);
			});
		}
		
	}});



    $('.team-spot').live({'mouseenter':function()
      {
        var id = $(this).attr('id').substr(9);
        $('#team-bubble'+id).stop().animate({opacity:1},350);
      },'mouseleave': function()
      { 
       $('.team-bubble').stop().animate({opacity:0},350);
       }}
    );
   
	
	$('.menu-elem').live('click',function(e){
		e.preventDefault();
		e.stopPropagation();
		var id = $(this).attr('data-id');
		$('#loader-moulade').show();
		$('#loading-panel').animate({opacity:1});
		$('#loading-panels-info').show();
		$('<div/>').attr('id','mask').appendTo('body');
		$('#menu').hide();
		$.ajax({
			url:'index/'+id,
			success:function(data){
			  $('#panels').append(data);			  
			}
		});
	});
	$('.panel-navigation').live('click',function(e){
		e.preventDefault();
		var where = $(this).attr('data-element');
		Lamoulade.openPanel(where);
	} );
	
	$('.panel-lid').live('click',function(e){
		e.preventDefault();
		var where = $(this).attr('data-element');
		var index = $(this).attr('data-index');
		var currentIndex = $(this).parent().parent().attr('data-index');
		Lamoulade.changeLid(where,currentIndex,index);
	});
	
	


}

}// @ object Lamoulade


var lamoulade = Lamoulade._init();
			$('footer').live({mouseenter:function(){
					$('#hfc-r1 img').attr('src','/images/scroll.gif');
				},mouseleave: function(){
					$('#hfc-r1 img').attr('src','/images/scroll-fix.jpg');
				} });
	
			$('#scene').css({height:$(window).height()});
			$('#menu ul').hide(); 
			$('<div/>').attr('id','menu-loading').html('Loading').appendTo('#menu');
			
			Lamoulade.indicator.selector.css({backgroundPosition:-500+'px'});
			$.ajax({
				async:false,
				url:"/index/services",
				success:function(data){
					$('#services').append(data);
					Lamoulade.$services = $('#services');
					Lamoulade.$servicesLid  =  $('#services div.services-lid');
					Lamoulade.$lid =  {
						first  : $('#first-lid'),
						second : $('#second-lid'),
						third  : $('#third-lid'),
						fourth : $('#fourth-lid'),
						$in: {
							first	: $('#first-lid-in'),
							second	: $('#second-lid-in'),
							third	: $('#third-lid-in'),
							fourth	: $('#fourth-lid-in')
						}
					};
					
					
						
						$('#lm-loader-yellow').animate({left:'-106px'},2000);			
					
					
				}
			});
			$.ajax({
				async:false,
				url:"/index/projects",
				success:function(data){
					$('#projects').append(data);
					$('#scene').css({height:'20000px'});
					$(Lamoulade.indicator.selector).css({backgroundPosition:-245+'px'});
					$('#menu-loading').remove();
					$('#menu ul').show();
					Lamoulade.$projects = {
						chapter: $('#projects-chapter'),
						title: $('#chapter-title'),
						elevator: $('#projects-elevator'),
						ci : $('#ci'),
						p1l :$('#p1l'),
						p1r :$('#p1r'),
						p2l :$('#p2l'),
						p2r :$('#p2r'),
						p3l :$('#p3l'),
						p3r :$('#p3r'),
						p4l :$('#p4l'),
						p4r :$('#p4r'),
						p5l :$('#p5l'),
						p5r :$('#p5r')	
					
					};
					
					$('#chapter-title').hide();
			
						var test = 0;
						$('#lm-loader-yellow').animate({left:'-6px'},2000,function(){
							$(document).scrollTop(0);
							$('#lm-loader').fadeOut(500, function(){
								Lamoulade._initHome();
							});
						});	
					
					
					
					
					
				}
			});
			Lamoulade._initServices();
			play = Lamoulade._play();
			POS = $('window').scrollTop();			
			Lamoulade.SceneHeight = $('#scene').height() -$(window).height();
			Lamoulade.X = Lamoulade.SceneHeight / Lamoulade.SCROLL.ratio;			
	
			$(window).scroll(function() {
				if(Lamoulade.activateScrolling){
					var newX = $(window).scrollTop() / Lamoulade.X;
					var oldX = POS/Lamoulade.X ;
					var delta = newX - oldX;					
					var transition = {'newX':newX,'oldX':oldX};
					POS = $(window).scrollTop();
					PC = POS/Lamoulade.X;					
					Lamoulade.newControls(PC,delta);
				}			
			});				
			$(window).resize(function(){
				 Lamoulade.resetWH();
			});
		
		});		
		var hash = window.location.hash.toString();
		var cmPanels = function(){
	
		    $("html,body").css({
			position: "relative",
			overflow: "visible"
		    });
		   
		    var a = $(".section-panels.opened");
		    0 < a.length ? a.animate({
			left: "-20px"
		    }, 500, function () {
			a.css({
			    visibility: "hidden"
			});
			closePanels()
		    }) : closePanels();
		
		};
		

})(jQuery);