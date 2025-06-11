<?php

declare(strict_types=1);

use Drupal\file\Entity\File;
use Drupal\media\MediaInterface;
use Drupal\paragraphs\Entity\Paragraph;

function shizen_preprocess_field(array &$variables): void
{
  $fieldName = $variables['field_name'];
  $entityType = $variables['entity_type'];

  if ($entityType === 'paragraph' && $fieldName === 'field_media') {
    shizen_preprocess_field__paragraph__field_media($variables);
  }
}

/**
 * Display responsive images for media items when 'field_responsive_image' is present on the paragraph
 */
function shizen_preprocess_field__paragraph__field_media(array &$variables): void
{
  /** @var Paragraph $paragraph */
  $paragraph = $variables['element']['#object'];

  $field = 'field_responsive_image';
  $defaultImageStyle = 'thumbnail';

  $style = $paragraph->hasField($field) && !$paragraph->get($field)->isEmpty()
    ? $paragraph->get($field)->value
    : $defaultImageStyle;
  $imgWidth = $paragraph->hasField('field_width') ? $paragraph->get('field_width')->value : null;
  $imgHeight = $paragraph->hasField('field_height') ? $paragraph->get('field_height')->value : null;

  foreach ($variables['items'] as $delta => &$item) {
    /** @var MediaInterface $media */
    $media = $variables['element']['#items'][$delta]->entity ?? null;

    if (!$media || $media->bundle() !== 'image') {
      continue;
    }

    $mediaImage = $media->get('field_media_image');

    if (!$mediaImage) {
      continue;
    }

    /** @var File $file */
    $file = $mediaImage->entity ?? null;

    if (!$file) {
      continue;
    }

    $item['content'] = [
      '#theme' => 'responsive_image',
      '#responsive_image_style_id' => $style,
      '#uri' => $file->getFileUri(),
      '#alt' => $mediaImage->alt ?? '',
      '#title' => $mediaImage->title ?? '',
      '#attributes' => [
        'width' => $imgWidth,
        'height' => $imgHeight,
      ],
    ];
  }
}
