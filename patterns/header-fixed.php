<?php
/**
 * Title: Fixed Header
 * Slug: mine-educn/header-fixed
 * Categories: mine-educn,header
 * Description: A header with navigation and usercenter.
 */
?>
<!-- wp:group {"align":"full","className":"medu-header","style":{"color":{"background":"#ffffffe0"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull medu-header has-background" style="background-color:#ffffffe0">
<!-- wp:group {"align":"full","className":"medu-header-inner","style":{"spacing":{"padding":{"top":"0","bottom":"0","left":"var:preset|spacing|20","right":"var:preset|spacing|20"}}},"layout":{"type":"flex","orientation":"horizontal","justifyContent":"space-between","flexWrap":"nowrap"}} -->
<div class="wp-block-group alignfull medu-header-inner" style="padding-top:0;padding-right:var(--wp--preset--spacing--20);padding-bottom:0;padding-left:var(--wp--preset--spacing--20)">
<!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|10","bottom":"var:preset|spacing|10"}}},"layout":{"type":"flex","allowOrientation":false,"justifyContent":"left","flexWrap":"nowrap"}} -->
<div class="wp-block-group" style="padding-top:var(--wp--preset--spacing--10);padding-bottom:var(--wp--preset--spacing--10)">
<!-- wp:site-logo {"width":50,"shouldSyncIcon":false,"style":{"color":[]}} /-->

<!-- wp:site-title {"className":"medu-title","style":{"typography":{"fontStyle":"normal","fontWeight":"600","textTransform":"capitalize"},"spacing":{"padding":{"top":"0","bottom":"0","left":"0","right":"0"},"margin":{"top":"0","bottom":"0","left":"0","right":"0"}}},"textColor":"foreground","gradient":"vivid-cyan-blue-to-vivid-purple","fontSize":"x-large"} /--></div>
<!-- /wp:group -->

<!-- wp:navigation {"showSubmenuIcon":false,"icon":"menu","style":{"spacing":{"blockGap":"var:preset|spacing|10"},"layout":{"selfStretch":"fit","flexSize":null}},"fontSize":"small","layout":{"type":"flex","justifyContent":"space-between","flexWrap":"nowrap"}} /-->

<?php if( defined('MINECLOUDVOD_SETTINGS') && function_exists( 'mcv_order_list_url' ) ): ?>
<!-- wp:group {"align":"wide","layout":{"type":"flex","flexWrap":"nowrap"}} -->
<div class="wp-block-group alignwide">
<!-- wp:mine-cloudvod/user {"submenus":[{"sortno":1,"title":"<?php esc_html_e('My Courses', 'mine-educn'); ?>","url":"<?php 
    if( isset(MINECLOUDVOD_SETTINGS['mcv_lms_general']['user_courses']) && MINECLOUDVOD_SETTINGS['mcv_lms_general']['user_courses'] ){
        echo esc_url(get_page_link( MINECLOUDVOD_SETTINGS['mcv_lms_general']['user_courses'] ));
    }else echo esc_url(get_page_link(get_page_by_path('mcv-my-courses')));  
?>"},{"sortno":2,"title":"<?php esc_html_e('Course Orders', 'mine-educn'); ?>","url":"<?php echo esc_url(mcv_order_list_url()); ?>"},{"sortno":3,"title":"<?php esc_html_e('Favorites', 'mine-educn'); ?>","url":"<?php 
    if( isset(MINECLOUDVOD_SETTINGS['mcv_lms_general']['fav_courses']) && MINECLOUDVOD_SETTINGS['mcv_lms_general']['fav_courses'] ){
        echo esc_url(get_page_link( MINECLOUDVOD_SETTINGS['mcv_lms_general']['fav_courses'] ));
    }else echo esc_url(get_page_link(get_page_by_path('mcv-favorites')));
?>"}]} /--></div>
<!-- /wp:group -->
<?php endif; ?>
</div>
<!-- /wp:group -->
</div>
<!-- /wp:group -->