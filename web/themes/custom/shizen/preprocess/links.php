<?php

declare(strict_types=1);

use Drupal\Core\Form\FormStateInterface;

function shizen_preprocess_links__language_block(array &$variables): void
{
  $currentLanguage = Drupal::languageManager()->getCurrentLanguage()->getId();

  if (isset($variables['links'][$currentLanguage])) {
    unset($variables['links'][$currentLanguage]);
  }
}
