<?php get_header(); ?>
<div class="contentArea">
  <div class="container">
    <div class="contentleft"> 
      
      <!--Here's where the loop starts-->
<?php if (have_posts()) : ?>
      <?php /* If this is a category archive */ if (is_category()) { ?>
      <h3 class="archivetitle"><?php single_cat_title(); ?> Archives</h3>
      <?php /* If this is a monthly archive */ } elseif (is_month()) { ?>
      <h3 class="archivetitle">Archive for <?php the_time('F, Y'); ?></h3>
      <?php /* If this is a yearly archive */ } elseif (is_year()) { ?>
      <h3 class="archivetitle">Archive for <?php the_time('Y'); ?></h3>
      <?php /* If this is an author archive */ } elseif (is_author()) { ?>
      <h3 class="archivetitle">Author Archive</h3>
      <?php /* If this is a tag archive */ } elseif (is_tag()) { ?>
      <h3 class="archivetitle">Posts tagged with <?php single_tag_title(); ?></h3>
      <?php } ?>
<?php while (have_posts()) : the_post(); ?>
<div class="box"><!-- Styles container for each post -->
  <h2 class="posttitle"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
  <p class="metablock"><span class="meta">Posted on <?php the_time('F j, Y'); ?> by <?php the_author_posts_link(); ?></span><span class="postcomments"><?php comments_popup_link('Leave a comment', '1 Comment', '% Comments', '', 'Comments are off'); ?></span></p>
  <div class="entry">
    <?php the_content('<p>Continue reading…</p>');?>
    <?php the_tags('<p>Tags:&nbsp;', ', ', '</p>'); ?>
  </div>
  <!--<?php trackback_rdf(); ?>-->
  </div><!-- Close post box -->
  <?php endwhile; else: ?>
  <div class="box">
    <p><?php _e('Sorry, no posts matched your criteria.'); ?></p>
  </div>
  <?php endif; ?>
  <p><?php posts_nav_link(); ?></p>
</div><!-- Close content -->
<?php get_sidebar(); ?>
    <div style="clear:both;"></div>
</div><!-- Close contentWrapper -->
</div><!-- Close outerWrapper -->
<?php get_footer(); ?>
