<?php

declare(strict_types=1);

use Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException;
use Drupal\Component\Plugin\Exception\PluginNotFoundException;

function shizene_preprocess_paragraph__carousel(array &$variables): void
{
    $layout = $variables['elements']['#paragraph']->field_layout_carousel->value;

    $settings = match ($layout) {
        'cards' => [
            'effect' => 'cards',
            'cardsEffect' => [
                'perSlideOffset' => 8,
                'perSlideRotate' => 2,
                'rotate' => true,
                'slideShadows' => true,
            ],
        ],
        'coverflow' => [
            'effect' => 'coverflow',
            'slidesPerView' => 2,
            'coverflowEffect' => [
                'depth' => 100,
                'modifier' => 1,
                'rotate' => 50,
                'scale' => 1,
                'slideShadows' => true,
                'stretch' => 0,
            ],
        ],
        'cube' => [ // Fix issue with height
            'effect' => 'cube',
            'cubeEffect' => [
                'shadow' => true,
                'shadowOffset' => 20,
                'shadowScale' => 0.94,
                'slideShadow' => true,
            ],
        ],
        'fade' => [
            'effect' => 'fade',
            'fadeEffect' => [
                'crossFade' => true,
            ],
        ],
        'flip' => [
            'effect' => 'flip',
            'flipEffect' => [
                'limitRotation' => true,
                'slideShadows' => true,
            ],
        ],
        default => [
            'effect' => 'slide',
        ],
    };

    $variables['#attached']['drupalSettings']['shizen']['swiper'] = $settings;
}

function shizen_preprocess_paragraph__related_articles(array &$variables): void
{
    $paragraph = $variables['paragraph'];
    $tags = $paragraph->field_related_article_tags->referencedEntities();

    $termIds = array_map(static function ($term) {
        return $term->id();
    }, $tags);

    $query = Drupal::entityQuery('node')
        ->condition('type', 'article')
        ->condition('status', 1)
        ->condition('field_article_tags', $termIds, 'IN')
        ->sort('created', 'DESC')
        ->range(0, 4)
        ->accessCheck();

    $articleIds = $query->execute();
    $articles = [];

    if ($articleIds) {
        $articles = Drupal::entityTypeManager()
            ->getStorage('node')
            ->loadMultiple($articleIds);
    }

    $variables['related_articles'] = $articles;
}

function shizen_preprocess_paragraph__team_members(array &$variables): void
{
    try {
        $terms = Drupal::entityTypeManager()
            ->getStorage('taxonomy_term')
            ->loadTree('team_members', 0, 1, true);
    } catch (InvalidPluginDefinitionException | PluginNotFoundException $exception) {
        Drupal::logger('shizen')->error('Failed to load team members taxonomy terms. Error: @error', [
            '@error' => $exception->getMessage(),
        ]);

        return;
    }

    $variables['team_members'] = $terms;
}
