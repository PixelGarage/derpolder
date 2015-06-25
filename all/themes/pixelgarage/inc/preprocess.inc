<?php
/**
 * Created by PhpStorm.
 * User: ralph
 * Date: 06.02.15
 * Time: 17:23
 */

/**
 * Preprocess variables for the html template.
 */
function pixelgarage_preprocess_html(&$vars) {
  // make sure jQuery UI and effects is loaded for anonymous users
  drupal_add_library('system', 'ui');
  drupal_add_library('system', 'effects');

}

/**
 * Override or insert variables for the page templates.
 */
function pixelgarage_preprocess_page(&$vars) {
  // hide titles on login forms
  pg_login_preprocess_page($vars);

  // background audio/video in different formats
  $bg_audio_play = null;
  $bg_sound_title = '';
  $bg_sound_artist = '';
  $bg_video_play = null;
  $bg_video_poster = null;

  $query = new EntityFieldQuery();
  $query->entityCondition('entity_type', 'node')
    ->entityCondition('bundle', 'polder_background')
    ->range(0, 1);
  $result = $query->execute();

  if (isset($result['node'])) {
    $node = node_load(key($result['node']));

    // get audio files and icon, if any
    if (!empty($node->field_beat_file)) {
      foreach ($node->field_beat_file[LANGUAGE_NONE] as $index => $file) {
        // file mime type
        $bg_sound_mime = $file['filemime'];
        if (!empty($bg_sound_mime)) {
          if ($bg_sound_mime == 'audio/mpeg') $bg_sound_mime = 'audio/mp4';
          $vars['bg_sound_mime_' . $index] = $bg_sound_mime;
          // file uri
          $bg_sound_uri = $file['uri'];
          $vars['bg_sound_src_' . $index] = !empty($bg_sound_uri) ? file_create_url($bg_sound_uri) : null;
        }
      }
      $bg_audio_play = (!empty($node->field_image)) ? $node->field_image[LANGUAGE_NONE][0]['uri'] : null;
      $bg_sound_title = $node->title;
      $bg_sound_artist = (!empty($node->field_artist)) ? $node->field_artist[LANGUAGE_NONE][0]['value'] : '';

    }

    // get video files and poster, if any
    if (!empty($node->field_video_file)) {
      foreach ($node->field_video_file[LANGUAGE_NONE] as $index => $file) {
        // file mime type
        $bg_video_mime = $file['filemime'];
        if (!empty($bg_video_mime)) {
          $vars['bg_video_mime_' . $index] = $bg_video_mime;
          // file uri
          $bg_video_uri = $file['uri'];
          $vars['bg_video_src_' . $index] = !empty($bg_video_uri) ? file_create_url($bg_video_uri) : null;
        }
      }
      $bg_video_play = (!empty($node->field_image_2)) ? $node->field_image_2[LANGUAGE_NONE][0]['uri'] : null;
      $bg_video_poster = (!empty($node->field_video_poster)) ? $node->field_video_poster[LANGUAGE_NONE][0]['uri'] : null;
    }

    // get the background images
    $bg_images = array();
    if (!empty($node->field_background_images)) {
      foreach ($node->field_background_images[LANGUAGE_NONE] as $index => $image) {
        // get image properties
        $image_mime = $image['filemime'];
        $image_uri = $image['uri'];
        $width = ($index > 0) ? $image['width']+1 : '';
        $media = (!empty($width)) ? 'only screen and (min-width: ' . $width . 'px)' : '';
        // set new media width
        if (!empty($image_mime) && !empty($image_uri)) {
          // file uri
          $bg_images[] = array(
            'type' => $image_mime,
            'src' => file_create_url($image_uri),
            'media' => '',
          );
          if ($index > 0)
            $bg_images[$index-1]['media'] = $media;
        }
      }
    }
    // background images
    $vars['bg_images'] = $bg_images;

  }
  $vars['bg_audio_play'] = !empty($bg_audio_play) ? file_create_url($bg_audio_play) : null;
  $vars['bg_sound_title'] = $bg_sound_title;
  $vars['bg_sound_artist'] = $bg_sound_artist;

  $vars['bg_video_play'] = !empty($bg_video_play) ? file_create_url($bg_video_play) : null;
  $vars['video_poster'] = $bg_video_poster;

}

/**
 * Add the proximity effects script
 * @param $vars
 */
function pixelgarage_preprocess_views_view_proximity(&$vars) {
  // Apply the proximity effects
  $path = drupal_get_path('theme', 'pixelgarage');
  drupal_add_js($path . '/js/proximity_effects.js');
}
