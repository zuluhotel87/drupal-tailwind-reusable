<?php

declare(strict_types=1);

function shizen_preprocess_page(array &$variables): void
{
  $variables['#attached']['library'][] = 'shizen/menu-toggle';
  $variables['#attached']['library'][] = 'shizen/sticky-header';

  $variables['site_name'] = Drupal::config('system.site')->get('name');
}
