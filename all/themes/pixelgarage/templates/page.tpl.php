<?php
/**
 * @file
 * Default theme implementation to display a single Drupal page.
 *
 * The doctype, html, head and body tags are not in this template. Instead they
 * can be found in the html.tpl.php template in this directory.
 *
 * Available variables:
 *
 * General utility variables:
 * - $base_path: The base URL path of the Drupal installation. At the very
 *   least, this will always default to /.
 * - $directory: The directory the template is located in, e.g. modules/system
 *   or themes/bartik.
 * - $is_front: TRUE if the current page is the front page.
 * - $logged_in: TRUE if the user is registered and signed in.
 * - $is_admin: TRUE if the user has permission to access administration pages.
 *
 * Site identity:
 * - $front_page: The URL of the front page. Use this instead of $base_path,
 *   when linking to the front page. This includes the language domain or
 *   prefix.
 * - $logo: The path to the logo image, as defined in theme configuration.
 * - $site_name: The name of the site, empty when display has been disabled
 *   in theme settings.
 * - $site_slogan: The slogan of the site, empty when display has been disabled
 *   in theme settings.
 *
 * Navigation:
 * - $main_menu (array): An array containing the Main menu links for the
 *   site, if they have been configured.
 * - $secondary_menu (array): An array containing the Secondary menu links for
 *   the site, if they have been configured.
 * - $breadcrumb: The breadcrumb trail for the current page.
 *
 * Page content (in order of occurrence in the default page.tpl.php):
 * - $title_prefix (array): An array containing additional output populated by
 *   modules, intended to be displayed in front of the main title tag that
 *   appears in the template.
 * - $title: The page title, for use in the actual HTML content.
 * - $title_suffix (array): An array containing additional output populated by
 *   modules, intended to be displayed after the main title tag that appears in
 *   the template.
 * - $messages: HTML for status and error messages. Should be displayed
 *   prominently.
 * - $tabs (array): Tabs linking to any sub-pages beneath the current page
 *   (e.g., the view and edit tabs when displaying a node).
 * - $action_links (array): Actions local to the page, such as 'Add menu' on the
 *   menu administration interface.
 * - $feed_icons: A string of all feed icons for the current page.
 * - $node: The node object, if there is an automatically-loaded node
 *   associated with the page, and the node ID is the second argument
 *   in the page's path (e.g. node/12345 and node/12345/revisions, but not
 *   comment/reply/12345).
 *
 * Regions:
 * - $page['help']: Dynamic help text, mostly for admin pages.
 * - $page['highlighted']: Items for the highlighted content region.
 * - $page['content']: The main content of the current page.
 * - $page['sidebar_first']: Items for the first sidebar.
 * - $page['sidebar_second']: Items for the second sidebar.
 * - $page['header']: Items for the header region.
 * - $page['footer']: Items for the footer region.
 *
 * @see bootstrap_preprocess_page()
 * @see template_preprocess()
 * @see template_preprocess_page()
 * @see bootstrap_process_page()
 * @see template_process()
 * @see html.tpl.php
 *
 * @ingroup themeable
 */
?>
<header id="navbar" role="banner" class="<?php print $navbar_classes; ?>">
  <div class="container">
    <div class="navbar-header">
      <?php if ($logo): ?>
        <a class="logo navbar-btn pull-left" href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>">
          <img src="<?php print $logo; ?>" alt="<?php print t('Home'); ?>" />
        </a>
      <?php endif; ?>

      <?php if (!empty($site_name)): ?>
        <a class="name navbar-brand" href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>"><?php print $site_name; ?></a>
      <?php endif; ?>

      <!-- .btn-navbar is used as the toggle for collapsed navbar content -->
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
        <span class="sr-only">Toggle navigation</span>
        <span class="glyphicon glyphicon-menu-hamburger" aria-hidden="true"></span>
      </button>
    </div>

    <?php if (!empty($primary_nav) || !empty($secondary_nav) || !empty($page['navigation'])): ?>
      <div class="navbar-collapse collapse">
        <nav role="navigation">
          <?php if (!empty($primary_nav)): ?>
            <?php print render($primary_nav); ?>
          <?php endif; ?>
          <?php if (!empty($secondary_nav)): ?>
            <?php print render($secondary_nav); ?>
          <?php endif; ?>
          <?php if (!empty($page['navigation'])): ?>
            <?php print render($page['navigation']); ?>
          <?php endif; ?>
        </nav>
      </div>
    <?php endif; ?>
  </div>
</header>

<!-- background images -->
<?php if (count($bg_images) > 0): ?>
<div id="bg-image-wrapper">
  <picture>
    <?php foreach ($bg_images as $index => $image): ?>
      <?php if (!empty($image['media'])): ?>
        <source srcset="<?php print $image['src']; ?>" type="<?php print $image['type']; ?>" media="<?php print $image['media']; ?>"/>
      <?php else: ?>
        <img class="bg-img bg-img1" src="<?php print $image['src']; ?>">
      <?php endif; ?>
    <?php endforeach; ?>
  </picture>
</div>
<?php endif; ?>

<!-- background video -->
<?php if (!empty($bg_video_src_0)): ?>
<div id="video-wrapper">
  <video id="bg-video" title="Polder video" autoplay="autoplay" loop="loop" muted="muted" preload="auto" poster="<?php print $video_poster; ?>" onended="var v=this;setTimeout(function(){v.play()},300)">
    <?php if (!empty($bg_video_mime_0) && !empty($bg_video_src_0)): ?><source src="<?php print $bg_video_src_0; ?>" type="<?php print $bg_video_mime_0; ?>" /><?php endif; ?>
    <?php if (!empty($bg_video_mime_1) && !empty($bg_video_src_1)): ?><source src="<?php print $bg_video_src_1; ?>" type="<?php print $bg_video_mime_1; ?>" /><?php endif; ?>
  </video>
  <div id="video-controls">
    <button id="toggle-video" title="play"><img class="video-play" src="<?php print $bg_video_play; ?>"></button>
  </div>
</div>
<?php endif; ?>

<!-- background audio -->
<?php if (!empty($bg_sound_src_0)): ?>
<div id="audio-wrapper">
  <audio id="bg-audio" title="Polder sound" preload="auto" autoplay="autoplay" loop="loop" >
    <?php if (!empty($bg_sound_mime_0) && !empty($bg_sound_src_0)): ?><source src="<?php print $bg_sound_src_0; ?>" type="<?php print $bg_sound_mime_0; ?>" /><?php endif; ?>
    <?php if (!empty($bg_sound_mime_1) && !empty($bg_sound_src_1)): ?><source src="<?php print $bg_sound_src_1; ?>" type="<?php print $bg_sound_mime_1; ?>" /><?php endif; ?>
  </audio>
  <div id="audio-controls">
    <div class="audio-title">
      <?php if (!empty($bg_sound_title)): ?><div class="beat-title"><?php print $bg_sound_title; ?></div><?php endif; ?>
      <?php if (!empty($bg_sound_artist)): ?><div class="beat-artist"><?php print $bg_sound_artist; ?></div><?php endif; ?>
    </div>
    <button id="toggle-audio" title="play"><img class="audio-play" src="<?php print $bg_audio_play; ?>"></button>
  </div>
</div>
<?php endif; ?>

<div class="main-container container">
  <header role="banner" id="page-header">
    <?php if (!empty($site_slogan)): ?>
      <p class="lead"><?php print $site_slogan; ?></p>
    <?php endif; ?>

    <?php print render($page['header']); ?>
  </header> <!-- /#page-header -->

  <div class="row">

    <?php if (!empty($page['sidebar_first'])): ?>
      <aside class="col-sm-3" role="complementary">
        <?php print render($page['sidebar_first']); ?>
      </aside>  <!-- /#sidebar-first -->
    <?php endif; ?>

    <section<?php print $content_column_class; ?>>
      <?php if (!empty($page['highlighted'])): ?>
        <div class="highlighted jumbotron"><?php print render($page['highlighted']); ?></div>
      <?php endif; ?>
      <!-- Breadcrumb -->
      <?php if (!empty($breadcrumb)): print $breadcrumb; endif;?>
      <!-- /#skip-link destination -->
      <a id="main-content"></a>

      <!-- Main title -->
      <?php print render($title_prefix); ?>
      <?php if (!empty($title)): ?>
        <h1 class="page-header"><?php print $title; ?></h1>
      <?php endif; ?>
      <?php print render($title_suffix); ?>
      <!-- Messages -->
      <div id="messages">
        <?php print $messages; ?>
      </div>
      <!-- Admin Tabs -->
      <?php if (!empty($tabs)): ?>
        <?php print render($tabs); ?>
      <?php endif; ?>
      <!-- Help region -->
      <?php if (!empty($page['help'])): ?>
        <?php print render($page['help']); ?>
      <?php endif; ?>
      <!-- Action links -->
      <?php if (!empty($action_links)): ?>
        <ul class="action-links"><?php print render($action_links); ?></ul>
      <?php endif; ?>
      <!-- Main content -->
      <?php print render($page['content']); ?>
    </section>

    <?php if (!empty($page['sidebar_second'])): ?>
      <aside class="col-sm-3" role="complementary">
        <?php print render($page['sidebar_second']); ?>
      </aside>  <!-- /#sidebar-second -->
    <?php endif; ?>

  </div>
</div>
<footer class="footer container">
  <?php print render($page['footer']); ?>
</footer>
