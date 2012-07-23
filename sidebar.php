<!--sidebar start--> 
<div class="contentright">
  <?php if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar('Sidebar') ) : ?>
  <div id="search"> 
    <!-- Search form in sidebar. Alternatively you can save the search form code as search.php and use a PHP include. -->
    <form method="get" id="searchform" action="<?php bloginfo('url'); ?>/">
      <input type="text" value="Search our site..." name="s" id="searchbox" onFocus="if (this.value == 'Search our site...') {this.value = '';}" onBlur="if (this.value == '') {this.value = 'Search our site...';}" size="15" />
      <input type="submit" value="search" id="searchbutton" />
    </form>
    <!-- Close search form --> 
  </div>
  <h2>About My Blog</h2>
  <p>This is a sample region where you can tell your blog visitors a little about you.</p>
  <h2>Archives</h2>
  <?php wp_get_archives('type=monthly&limit=10'); ?>
  <h2>Categories</h2>
  <?php wp_list_categories('title_li=&orderby=name'); ?>
  <?php endif; ?>
  <div class="clearer"><!-- Clear floats--></div>
</div>
<!--sidebar end--> 
