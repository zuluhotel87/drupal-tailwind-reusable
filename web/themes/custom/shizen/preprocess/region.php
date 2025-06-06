<?php

declare(strict_types=1);

function shizen_preprocess_region__footer(array &$variables): void
{
    $variables['site_name'] = Drupal::config('system.site')->get('name');
}
