<?php get_header(); ?>
<div class="contentArea">
  <div class="container">
    <div class="contentleft"> 
      
<!--Here's where the loop starts-->
<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
<div class="box"><!-- Styles container for each post -->
  <h1 class="posttitle"><?php the_title(); ?></h1>
  <div class="entry">
    <?php the_content('<p>Continue reading…</p>');?>
  </div>
  </div><!-- Close post box -->
  <?php endwhile; else: ?>
  <div class="box">
    <p><?php _e('Sorry, no posts matched your criteria.'); ?></p>
  </div>
  <?php endif; ?>
  <?php if(comments_open()) : ?>
	<div class="box">
  	<?php comments_template(); ?>
  	</div>
   <?php endif; ?>
</div><!-- Close Content -->
<?php get_sidebar(); ?>
    <div style="clear:both;"></div>
</div><!-- Close contentWrapper -->
</div><!-- Close outerWrapper -->
<?php get_footer(); ?>
