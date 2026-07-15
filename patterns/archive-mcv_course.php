<?php
/**
 * Title: List of Courses
 * Slug: mine-educn/list-of-courses
 * Categories: mine-educn,posts
 * Description: A carousel banner with text and image.
 */
?>
<!-- wp:template-part {"slug":"header","tagName":"header"} /-->

<!-- wp:group {"tagName":"main","metadata":{"name":"Main"},"align":"full","className":"medu-main","style":{"spacing":{"margin":{"top":"0","bottom":"0"},"padding":{"top":"0","bottom":"0","left":"0","right":"0"}}},"layout":{"type":"default"}} -->
<main class="wp-block-group alignfull medu-main" style="margin-top:0;margin-bottom:0;padding-top:0;padding-right:0;padding-bottom:0;padding-left:0">
	<!-- wp:mine-cloudvod/course-list {"title":"<?php esc_html_e('All Courses', 'mine-educn'); ?>","template":"archive-mcv_course"} /-->
</main>
<!-- /wp:group -->

<!-- wp:template-part {"slug":"footer","tagName":"footer"} /-->
