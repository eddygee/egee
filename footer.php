    <section id="extra" class="scene">
        <img id="logo2" src="<?php echo bloginfo('template_url'); ?>/images/egCirc.png" alt="EG logo" width="296" height="268"/>
        <img id="mountains" src="<?php echo bloginfo('template_url'); ?>/images/moutains.png" alt="moutains"/>
        <img id="forest" src="<?php echo bloginfo('template_url'); ?>/images/forest.png" alt="forest" height="285"/>
        <div id="fire"></div>
        <div id="extraWrap">
            <?php query_posts('category_name=Extra&showposts=3'); ?>
			<?php while (have_posts()) : the_post(); ?>
            <?php the_content();?>
            <?php endwhile;?>
        </div>
	</section><!-- end #extra -->
    

<script src="<?php echo bloginfo('template_url'); ?>/js/jquery-1.7.js"></script>
<script src="<?php echo bloginfo('template_url'); ?>/js/jquery.easing.1.3.js"></script>
<script src="<?php echo bloginfo('template_url'); ?>/js/jquery.easing.compatibility.js"></script>
<script src="http://maps.googleapis.com/maps/api/js?sensor=false"></script>
<script src="<?php echo bloginfo('template_url'); ?>/js/jquery-animate-css-rotate-scale.js"></script>
<script src="<?php echo bloginfo('template_url'); ?>/js/curvycorners.js"></script>
<script src="<?php echo bloginfo('template_url'); ?>/js/jquery.mousewheel.min.js"></script>
<script src="<?php echo bloginfo('template_url'); ?>/js/jquery.tweet.js"></script>
<script src="<?php echo bloginfo('template_url'); ?>/js/sliding.form.js"></script>
<script src="<?php echo bloginfo('template_url'); ?>/js/mail.js"></script>
<script src="<?php echo bloginfo('template_url'); ?>/js/egee.js"></script>
<script src="<?php echo bloginfo('template_url'); ?>/js/initMap.js"></script>

<?php wp_footer(); ?>
</body>
</html>