<?php
/**
 * Title: FAQ Toggle
 * Slug: mine-educn/faq-toggle
 * Categories: mine-educn,featured
 * Description: A section with FAQ Toggle.
 */
$faqs = [
    [
        'question' => __('How to start taking the course?', 'mine-educn'),
        'answer' => __('After registering an account, you can browse our course catalog and select courses that interest you. Some courses offer free preview access, while paid courses require a purchase to view all content. Once purchased, you can log in to the platform to study at any time, and your learning progress will be saved automatically.', 'mine-educn'),
    ],
    [
        'question' => __('What is the learning method for the course?', 'mine-educn'),
        'answer' => __('Our courses mainly focus on video teaching, supplemented by courseware, practice exercises and project-based practical training. You can learn flexibly according to your own schedule, and all courses support viewing on multiple devices.', 'mine-educn'),
    ],
    [
        'question' => __('What should I do if I encounter problems during the learning process?', 'mine-educn'),
        'answer' => __('If you encounter any problems during your learning process, you can communicate with other students through the discussion section on the course page, or contact the instructor directly for assistance. In addition, our customer service team is also ready to provide support for you at any time.', 'mine-educn'),
    ],
    [
        'question' => __('Does the platform provide certificates?', 'mine-educn'),
        'answer' => __('After completing the paid course, you will receive a completion certificate issued by our platform. The certificate can be downloaded and printed to prove your learning achievements.', 'mine-educn'),
    ],
    [
        'question' => __('What payment methods are supported?', 'mine-educn'),
        'answer' => __('We support multiple payment methods, including credit card, PayPal, and other mainstream online payment methods. You can choose the most convenient payment method for you during the checkout process.', 'mine-educn'),
    ],
];
?>
<!-- wp:group {"tagName":"section","metadata":{"name":"FAQ Toggle"},"style":{"spacing":{"margin":{"top":"0","bottom":"0"},"padding":{"top":"var:preset|spacing|60","bottom":"var:preset|spacing|60"}}},"layout":{"type":"default"}} -->
<section class="wp-block-group" style="margin-top:0;margin-bottom:0;padding-top:var(--wp--preset--spacing--60);padding-bottom:var(--wp--preset--spacing--60)">
<!-- wp:group {"align":"full","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull">
<!-- wp:group {"align":"wide","style":{"spacing":{"margin":{"bottom":"var:preset|spacing|40"}}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group alignwide" style="margin-bottom:var(--wp--preset--spacing--40)">
<!-- wp:heading {"textAlign":"center"} -->
<h2 class="wp-block-heading has-text-align-center"><?php esc_html_e('Frequently Asked Questions', 'mine-educn'); ?></h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center"><?php esc_html_e('It answers your common questions about courses, learning methods, and platform usage. If you have other questions, please feel free to contact our customer service team.', 'mine-educn'); ?></p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->

<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group">
<?php foreach ( $faqs as $faq ) : ?>
    <!-- wp:group {"metadata":{"name":"Q\u0026A"},"className":"medu-faq-toggle","style":{"border":{"bottom":{"color":"var:preset|color|gray-light","width":"1px"},"top":[],"right":[],"left":[]},"spacing":{"padding":{"bottom":"var:preset|spacing|40"},"margin":{"top":"var:preset|spacing|40"}}},"layout":{"type":"constrained"}} -->
    <div class="wp-block-group medu-faq-toggle" style="border-bottom-color:var(--wp--preset--color--gray-light);border-bottom-width:1px;padding-bottom:var(--wp--preset--spacing--40);margin-top:var(--wp--preset--spacing--40)">
<!-- wp:group {"metadata":{"name":"Question"},"className":"medu-faq-q","layout":{"type":"flex","flexWrap":"wrap","justifyContent":"space-between"}} -->
    <div class="wp-block-group medu-faq-q">
<!-- wp:heading {"level":3} -->
    <h3 class="wp-block-heading"><?php echo esc_html( $faq['question'] ); ?></h3>
    <!-- /wp:heading -->

    <!-- wp:paragraph {"metadata":{"name":"Icon"},"className":"medu-faq-icon"} -->
    <p class="medu-faq-icon"></p>
    <!-- /wp:paragraph -->
</div>
    <!-- /wp:group -->

    <!-- wp:paragraph {"metadata":{"name":"Answer"},"className":"medu-faq-a","style":{"spacing":{"margin":{"top":"var:preset|spacing|40","bottom":"var:preset|spacing|40"}}}} -->
    <p class="medu-faq-a" style="margin-top:var(--wp--preset--spacing--40);margin-bottom:var(--wp--preset--spacing--40)"><?php echo esc_html( $faq['answer'] ); ?></p>
    <!-- /wp:paragraph -->
</div>
    <!-- /wp:group -->
<?php endforeach; ?>

</div>
<!-- /wp:group -->
</div>
<!-- /wp:group -->
</section>
<!-- /wp:group -->