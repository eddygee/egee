<?php get_header(); ?>
<div id="outerWrapper"><!-- Sets page width to 960px and centers -->
<div id="contentWrapper"><!-- Wraps content and sidebars -->
<div id="Content">
<div class="box"><!-- Styles container for each post -->
<h2 class="posttitle">Oops! That page wasn't found!</h2>
<div class="entry">
<p>We’re sorry, but the page you were trying to find no longer exists. Perhaps you can find what you were looking for in our posts, categories or archives below.</p>
<h4>Recent Posts</h4>
<ul><?php wp_get_archives('type=postbypost&limit=30'); ?></ul>
<h4>Categories</h4>
<ul><?php wp_list_categories('sort_column=name&title_li=&hierarchical=0'); ?></ul>
<h4>Archives by Month</h4>
<ul><?php wp_get_archives('type=monthly'); ?></ul>
</div>
</div><!-- Close post box -->
</div><!-- Close Content -->
<?php get_sidebar(); ?>
</div><!-- Close contentWrapper -->
</div><!-- Close outerWrapper -->
<?php get_footer(); ?>

