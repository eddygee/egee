<?php get_header(); ?>

<section id="home" class="scene">
    	<div id="logo"></div>
        <article class="block1">
        	<div class="tree"></div>
        	<div id="twitBird">
                <div class="welcome message">Welcome!<br/>Scroll right and enjoy the ride.</div>
            	<div class="tweet message"></div>
            </div>
        </article><!-- end .block1 -->
    </section><!-- end #home -->
    
    <section id="drivein" class="scene">
    	<div id="theater ">
        	<div id="movie">
				<?php query_posts('category_name=video&showposts=1'); ?>
                <?php while (have_posts()) : the_post(); ?>
                <?php the_content();?>
                <?php endwhile;?>
            </div><!-- end #movie -->
        </div><!-- end theather -->
    </section><!-- end #drivein -->
    
    <section id="about" class="scene">
    	<article id="hey">
        	<h1>HEY!</h1>
            <?php query_posts('category_name=about&showposts=1'); ?>
			<?php while (have_posts()) : the_post(); ?>
            <?php the_content();?>
            <?php endwhile;?>
            <a id="playAbout" href="#"><h1>What I Do <span class="webSymbols">)</span></h1></a>
        </article><!-- end article -->
        	<img id="tower" src="<?php echo bloginfo('template_url'); ?>/images/waterTower.png" alt="Water Tower" usemap="#Resume"/>
            <map name="Resume" id="Resume">
              <area shape="circle" coords="80,100,46" href="<?php echo bloginfo('template_url'); ?>/resume.pdf" alt="Resume" title="Download My Resume"/>
            </map>
        	<img id="sign" src="<?php echo bloginfo('template_url'); ?>/images/sign.png" width="367" height="172" alt="'In my case, the product was history and Edgar had an awareness of what the public expects to see and how to arouse their interest.'"/>
        <article id="stores">
        	<img id="desiger" src="<?php echo bloginfo('template_url'); ?>/images/designerStore.png" width="357" height="331" alt="Web Designer Store Front"/>
        	<img id="developer" src="<?php echo bloginfo('template_url'); ?>/images/developerFront.png" width="406" height="331" alt="Web Developer Store Front"/>
        	<img id="branding" src="<?php echo bloginfo('template_url'); ?>/images/brandingFront.png" width="348" height="331" alt="Digital Branding Store Front"/>
        	<img id="consulting" src="<?php echo bloginfo('template_url'); ?>/images/consultingFront.png" width="368" height="331" alt="Web Consulting Store Front"/>
        </article><!-- end #stores -->
    </section><!-- end #about -->
    
    <section id="folio" class="scene">
		<?php		
		$args = array(
			'category_name'      => 'projects',
			'showposts'     => 4
		);
		query_posts( $args ); ?>
        <?php while (have_posts()) : the_post(); ?>
        <?php the_content();?>
        <?php endwhile;?>
    </section><!-- end #folio -->
    
    <section id="contact" class="scene">
    	<article id="formWrap">
        
            <section id="contactForm">
                <div id="stepsWrap">
                    <h2>Send me a message.</h2>
                    <div id="sendingMessage" class="statusMessage"><h2>Sending your message. Please wait...</h2></div>
                    <div id="successMessage" class="statusMessage"><h2>Thanks for sending your message!<br/>I'll get back to you within 2-3 days.</h2></div>
                    <div id="failureMessage" class="statusMessage"><h2>There was a problem sending your message. Please try again.</h2></div>
                    <div id="incompleteMessage" class="statusMessage"><h2>Please complete all the fields in the form before sending.</h2></div>
                    <div id="invalidCAPTCHA" class="statusMessage"><h2>Wait.. That's not right. Please try again.</h2></div>
                    <div id="steps">
                        <form id="formElem" name="formElem" action="<?php echo bloginfo('template_url'); ?>/processForm.php" method="post">
                            <fieldset class="step">
                                <legend>Full Name</legend>
                                <p>
                                    <input id="senderName" name="senderName" />
                                </p>
                            </fieldset>
                            <fieldset class="step">
                                <legend>Your Email</legend>
                                <p>
                                    <input id="senderEmail" name="senderEmail" placeholder="example@domaim.com" type="email" AUTOCOMPLETE=OFF />
                                </p>
                            </fieldset>
                            <fieldset class="step">
                                <legend>Message</legend>                            	
                                    <p>
                                        <textarea name="senderMessage" id="senderMessage" class="left" placeholder="Enter your question or comment..." required tabindex="3" ></textarea>
                                    </p>
                                    
                            </fieldset>
                            <fieldset id="four" class="step">
                                <legend>Hey, whats.. </legend>
                                    <img id="captcha" src="<?php echo bloginfo('template_url'); ?>/math/securimage_show.php?sid=<?php echo md5(uniqid()) ?>" alt="CAPTCHA Image" />
                                    <a id="refresh" class="left" href="#" title="Refresh"><p>V</p></a>
                                    <span>=</span>
                                    <input id="captcha_code" name="captcha_code" size="2" maxlength="2"  /><!-- name = captcha_code -->
                                    <button id="registerButton" type="submit">Send It</button>
                            </fieldset>
                        </form>
                    </div><!-- end #steps -->
                    <div id="stepsNav" style="display:none;">
                        <ul>
                            <li class="selected">
                                <a href="#"><p>U</p></a>
                            </li>
                            <li>
                                <a href="#"><p>@</p></a>
                            </li>
                            <li>
                                <a href="#"><p>e</p></a>
                            </li>
                            <li>
                                <a href="#"><p>x</p></a>
                            </li>
                        </ul>
                    </div><!-- #stepsNav -->
                </div><!-- #stepsWrap -->
            </section>
                        
        
            <div id="socialLeafs">
            	<a href="http://twitter.com/#!/meEDDYgee"><img id="twitLeaf" src="<?php echo bloginfo('template_url'); ?>/images/twitterLeaf.png" alt="Twitter leaf" width="88" height="72"/></a>
            	<a href="http://www.facebook.com/profile.php?id=100000709961394"><img id="fbLeaf" src="<?php echo bloginfo('template_url'); ?>/images/facebookLeaf.png" alt="Twitter leaf" width="85" height="75"/></a>
            	<a href="mailto:mail@egee.me"><img id="emailLeaf" src="<?php echo bloginfo('template_url'); ?>/images/emailLeaf.png" alt="Twitter leaf" width="137" height="104"/></a>
            	<a href="skype:eddy.gee3"><img id="skypeLeaf" src="<?php echo bloginfo('template_url'); ?>/images/skypeLeaf.png" alt="Twitter leaf" width="116" height="102"/></a>
            </div><!-- end #socialLeafs -->
        </article><!-- end #formWrap -->
        <div id="mapWrap">
            <div id="map"></div>
        </div><!-- end #mapWrap -->
    </section><!-- end #contact -->
    
<?php get_footer(); ?>
