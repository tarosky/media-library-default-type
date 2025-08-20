<?php
/**
 * Plugin Name: Media Library Default Type
 * Description: ブロックエディターでメディアライブラリを開いた際に、デフォルトで「この記事に添付された画像」表示にするプラグイン
 * Version: 1.0.0
 * Author: Fumiki Takahashi
 * License: GPL v2 or later
 * Text Domain: media-library-default-type
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class MediaLibraryDefaultType {

    public function __construct() {
        add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_block_editor_assets' ) );
    }

    public function enqueue_block_editor_assets() {
        wp_enqueue_script(
            'media-library-default-type',
            plugin_dir_url( __FILE__ ) . 'assets/media-library-default-type.js',
            array( 'wp-blocks', 'wp-element', 'wp-edit-post', 'wp-data', 'wp-hooks', 'wp-media-utils', 'media-editor', 'media-views' ),
            '1.0.4',
            true
        );
    }
}

new MediaLibraryDefaultType();