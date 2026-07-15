<?php 

class Mine_Educn_Init {
    public function __construct() {
        $this->includes();

        add_action('init',                  [$this, 'init']);
        add_action('wp_enqueue_scripts',    [$this, 'enqueue_scripts']);
        add_action('after_setup_theme',     [$this, 'enqueue_editor_styles']);
        add_action('enqueue_block_editor_assets', [$this, 'enqueue_block_editor_assets']);
        add_action('tgmpa_register',       [$this, 'register_required_plugins']);

        add_filter('body_class',            [$this, 'body_class']);
        add_filter('render_block',          [$this, 'render_icon_paragraph'], 10, 2);
    }
    public function init() {
        // 注册区块样式分类
        if (function_exists('register_block_pattern_category')) {
            register_block_pattern_category(
                'mine-educn',
                array('label' => __('Mine EduCN', 'mine-educn'))
            );
        }

        // 注册图标区块样式
        wp_register_style(
            'medu-global',
            MINE_EDUCN_URI . 'assets/css/global.css',
            [],
            MINE_EDUCN_VERSION
        );

        // 注册段落图标样式（一个样式入口，配合 JS 扩展面板使用）
        register_block_style('core/paragraph', [
            'name'         => 'medu-icon',
            'label'        => '🎨 带图标',
            'style_handle' => 'medu-global',
        ]);
    }
    /**
    * 为body添加类
    */
    public function body_class($classes) {
        $classes[] = 'medu-body';
        return $classes;
    }
    /**
     * 添加前台脚本和样式
     */
    public function enqueue_scripts() {
        wp_enqueue_style('medu-global', MINE_EDUCN_URI . '/assets/css/global.css', [], null);
        wp_enqueue_script('jquery');
        wp_enqueue_script('medu-main', MINE_EDUCN_URI . '/assets/js/index.js', ['jquery'], null, true);
    }
    /**
     * 添加编辑器样式
     */
    public function enqueue_editor_styles() {
        add_editor_style('assets/css/global.css');
    }

    /**
     * 添加区块编辑器扩展脚本
     */
    public function enqueue_block_editor_assets() {
        $asset_file = include( MINE_EDUCN_DIR . 'assets/js/icon-extension/index.asset.php' );
        wp_enqueue_script(
            'medu-icon-extension',
            MINE_EDUCN_URI . 'assets/js/icon-extension/index.js',
            $asset_file['dependencies'],
            $asset_file['version'],
            true
        );
        wp_enqueue_style(
            'medu-icon-extension',
            MINE_EDUCN_URI . 'assets/js/icon-extension/index.css',
            [],
            $asset_file['version']
        );

        // 行内图标插入（RichTextToolbarButton）
        $inline_asset = include( MINE_EDUCN_DIR . 'assets/js/inline-icon/index.asset.php' );
        wp_enqueue_script(
            'medu-inline-icon',
            MINE_EDUCN_URI . 'assets/js/inline-icon/index.js',
            $inline_asset['dependencies'],
            $inline_asset['version'],
            true
        );
        wp_enqueue_style(
            'medu-inline-icon',
            MINE_EDUCN_URI . 'assets/js/inline-icon/index.css',
            [],
            $inline_asset['version']
        );
    }

    /**
     * 前端渲染：为带图标段落的 ::before 注入 CSS 变量
     */
    public function render_icon_paragraph( $block_content, $block ) {
        if (
            'core/paragraph' !== $block['blockName'] ||
            empty( $block['attrs']['className'] ) ||
            false === strpos( $block['attrs']['className'], 'is-style-medu-icon' )
        ) {
            return $block_content;
        }

        $attrs  = $block['attrs'];
        $color  = $attrs['meduIconColor'] ?? '#2080f7';
        $bg     = $attrs['meduIconBgColor'] ?? '';
        $size   = $attrs['meduIconSize'] ?? '1rem';
        $margin = $attrs['meduIconMargin'] ?? '0.5rem';

        $vars = sprintf(
            '--medu-icon-color:%s;--medu-icon-bg:%s;--medu-icon-size:%s;--medu-icon-margin:%s;',
            $color ?: 'inherit',
            $bg ?: 'transparent',
            $size,
            $margin
        );

        // 把 CSS 变量注入 <p> 标签的 style（如果已有 style 则追加）
        $block_content = preg_replace_callback(
            '/<\s*p\b([^>]*)>/i',
            function ( $m ) use ( $vars ) {
                $attrs = $m[1];
                if ( preg_match( '/style\s*=\s*"([^"]*)"/i', $attrs, $s ) ) {
                    $merged = 'style="' . esc_attr( $s[1] . ' ' . $vars ) . '"';
                    $attrs = str_replace( $s[0], $merged, $attrs );
                } else {
                    $attrs = rtrim( $attrs ) . ' style="' . esc_attr( $vars ) . '"';
                }
                return '<p' . $attrs . '>';
            },
            $block_content,
            1
        );

        return $block_content;
    }

    private function includes() {
        require MINE_EDUCN_DIR . '/inc/class-tgm-plugin-activation.php';
    }
    public function register_required_plugins() {
        $plugins = array(
            array(
                'name'     => __( 'Mine CloudVod', 'mine-educn' ),
                'slug'     => 'mine-cloudvod',
                'required' => false,
            ),
        );

        $config = array(
            'id'           => 'mine-educn',            // Unique ID for hashing notices for multiple instances of TGMPA.
            'default_path' => '',                      // Default absolute path to bundled plugins.
            'menu'         => 'tgmpa-install-plugins', // Menu slug.
            'has_notices'  => true,                    // Show admin notices or not.
            'dismissable'  => true,                    // If false, a user cannot dismiss the nag message.
            'dismiss_msg'  => '',                      // If 'dismissable' is false, this message will be output at top of nag.
            'is_automatic' => false,                   // Automatically activate plugins after installation or not.
            'message'      => '',                      // Message to output right before the plugins table.
        );

        tgmpa( $plugins, $config );
    }
}
new Mine_Educn_Init();