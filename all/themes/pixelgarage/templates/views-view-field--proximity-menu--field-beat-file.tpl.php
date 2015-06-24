<?php

/**
 * @file
 * This template is used to print a single field in a view.
 *
 * It is not actually used in default Views, as this is registered as a theme
 * function which has better performance. For single overrides, the template is
 * perfectly okay.
 *
 * Variables available:
 * - $view: The view object
 * - $field: The field handler object that can process the input
 * - $row: The raw SQL result that can be used
 * - $output: The processed output that will normally be used.
 *
 * When fetching output from the $row, this construct should be used:
 * $data = $row->{$field->field_alias}
 *
 * The above will guarantee that you'll always get the correct data,
 * regardless of any changes in the aliasing that might happen if
 * the view is modified.
 */

// get audio files, if any
$sounds = array();
if (!empty($row->field_field_beat_file)) {
  foreach ($row->field_field_beat_file as $index => $file) {
    // file mime type
    $bg_sound_mime = $file['raw']['filemime'];
    $bg_sound_uri = $file['raw']['uri'];
    if (!empty($bg_sound_mime) && !empty($bg_sound_uri)) {
      // file uri
      $sounds[] = array(
        'mime-type' => $bg_sound_mime,
        'uri' => file_create_url($bg_sound_uri),
      );
    }
  }
}

?>
<!-- pe-item sound -->
<?php if (count($sounds) >= 1): ?>
  <div class="audio-wrapper">
    <audio class="pe-item-sound" title="Polder jingle" preload="auto" muted="muted">
      <?php foreach ($sounds as $index => $sound): ?>
        <source src="<?php print $sound['uri']; ?>" type="<?php print $sound['mime-type']; ?>" />
      <?php endforeach; ?>
    </audio>
  </div>
<?php endif; ?>