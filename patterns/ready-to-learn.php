<?php
/**
 * Title: Ready to Learn
 * Slug: mine-educn/ready-to-learn
 * Categories: mine-educn,banner
 * Description: A section with text and buttons.
 */
?>
<!-- wp:group {"tagName":"section","metadata":{"name":"Ready to Learn"},"style":{"spacing":{"margin":{"top":"0","bottom":"0"},"padding":{"top":"var:preset|spacing|80","bottom":"var:preset|spacing|80"}},"elements":{"link":{"color":{"text":"var:preset|color|background"}}}},"backgroundColor":"main2","textColor":"background","layout":{"type":"default"}} -->
<section class="wp-block-group has-background-color has-main-2-background-color has-text-color has-background has-link-color" style="margin-top:0;margin-bottom:0;padding-top:var(--wp--preset--spacing--80);padding-bottom:var(--wp--preset--spacing--80)">
<!-- wp:group {"align":"full","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull">
<!-- wp:group {"align":"wide","style":{"spacing":{"margin":{"bottom":"var:preset|spacing|40"}}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group alignwide" style="margin-bottom:var(--wp--preset--spacing--40)">
<!-- wp:heading {"textAlign":"center","style":{"elements":{"link":{"color":{"text":"var:preset|color|background"}}}},"textColor":"background"} -->
<h2 class="wp-block-heading has-text-align-center has-background-color has-text-color has-link-color"><?php esc_html_e('Are you ready to start your learning journey?', 'mine-educn'); ?></h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"elements":{"link":{"color":{"text":"var:preset|color|background"}}}},"textColor":"background"} -->
<p class="has-text-align-center has-background-color has-text-color has-link-color"><?php esc_html_e('Join us to acquire professional knowledge, enhance your skill level, and embark on a new career chapter.', 'mine-educn'); ?></p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons">
<!-- wp:button {"backgroundColor":"background","textColor":"main-2","className":"medu-btn-hover-up","style":{"border":{"radius":"6px"},"elements":{"link":{"color":{"text":"var:preset|color|main-2"}}}}} -->
<div class="wp-block-button medu-btn-hover-up"><a class="wp-block-button__link has-main-2-color has-background-background-color has-text-color has-background has-link-color wp-element-button" href="/mcv_course/" style="border-radius:6px"><?php esc_html_e('Browse Courses', 'mine-educn'); ?></a></div>
<!-- /wp:button -->

<!-- wp:button {"textColor":"background","className":"mcv-login is-style-outline","style":{"border":{"radius":"6px","width":"1px"},"elements":{"link":{"color":{"text":"var:preset|color|background"}}}},"borderColor":"background"} -->
<div class="wp-block-button mcv-login is-style-outline"><a class="wp-block-button__link has-background-color has-text-color has-link-color has-border-color has-background-border-color wp-element-button" style="border-width:1px;border-radius:6px"><?php esc_html_e('Log in now', 'mine-educn'); ?></a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->
</section>
<!-- /wp:group -->