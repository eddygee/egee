<!DOCTYPE HTML>
<html>
<head>
<meta charset="<?php bloginfo('charset'); ?>" />
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<title><?php wp_title('|',true); ?><?php bloginfo('name'); ?></title>
<link rel="Shortcut Icon" href="<?php echo bloginfo('template_url'); ?>/favicon.ico" type="image/x-icon" />
<link rel="stylesheet" href="<?php echo bloginfo('template_url'); ?>/css/reset.css">
<link rel="stylesheet" href="<?php echo bloginfo('template_url'); ?>/css/JosefinSlab.css">
<link rel="stylesheet" href="<?php echo bloginfo('template_url'); ?>/css/websymbols.css">
<link rel="stylesheet" href="<?php echo bloginfo('template_url'); ?>/css/contact.css">
<link rel="stylesheet" media="all" href="<?php bloginfo('stylesheet_url'); ?>"/>
<link rel="stylesheet" media="only screen and (max-device-width: 1024px) and (orientation:landscape)" href="<?php echo bloginfo('template_url'); ?>/css/tablet.css" />
<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />
<!--[if lt IE 9]>
	<link href="<?php echo bloginfo('template_url'); ?>/css/ie.css" rel="stylesheet">
	<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->
<?php wp_head(); ?>
</head>
<body>
	
	<div id="loaderWrap">
    	<div id="loader"></div>
    </div>
    <nav>
    	<ul>
        	<li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
        	<li> <a href="#folio">Folio</a></li>
        	<li> <a href="#contact">Contact</a></li>
        </ul>
        <!-- <img id="keyboard" src="images/keyboard.png" width="44" height="29" alt="Use your keyboard"/> -->
        <a id="dayNnite" href="#"><img src="<?php echo bloginfo('template_url'); ?>/images/day-n-nite.png" alt="Switch between day and nite scenes" title="Toggle Night/Day" width="29" height="29"/></a>
        <div id="speed" title="Mousewheel Bike Speed"></div>
    </nav>
    
    <div id="message"></div>
    <div id="bg" class="day"></div>
    <div id="planet"></div>
    <div id="bike"></div>
    <div id="dog"></div>
    <div id="pigs">
        <div id="p1" class="pig"></div>
        <div id="p2" class="pig duce"></div>
        <div id="p3" class="pig"></div>
    </div>