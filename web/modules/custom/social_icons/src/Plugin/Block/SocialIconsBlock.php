<?php

declare(strict_types=1);

namespace Drupal\social_icons\Plugin\Block;

use Drupal;
use Drupal\Core\Block\BlockBase;
use Drupal\taxonomy\Entity\Term;

/**
 * Provides a Social Icons Block.
 *
 * @Block(
 *   id = "social_icons_block",
 *   admin_label = @Translation("Social Icons"),
 *   category = @Translation("Shizen")
 * )
 */
class SocialIconsBlock extends BlockBase
{
  public function build(): array
  {
    $terms = Drupal::entityTypeManager()->getStorage('taxonomy_term')->loadTree('social_icons');
    $items = [];

    foreach ($terms as $term) {
      $full_term = Term::load($term->tid);

      $icon = $full_term->get('field_icon')->value;
      $link = $full_term->get('field_link')->uri;

      $items[] = [
        'icon' => $icon,
        'link' => $link,
        'title' => $full_term->getName(),
      ];
    }

    return [
      '#theme' => 'social_icons',
      '#items' => $items,
      '#cache' => ['tags' => ['taxonomy_term_list']],
    ];
  }
}
