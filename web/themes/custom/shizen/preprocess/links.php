<?php

declare(strict_types=1);

function shizen_preprocess_links__language_block(array &$variables): void
{
    $variables['current_language'] = Drupal::languageManager()->getCurrentLanguage()->getId();
}
