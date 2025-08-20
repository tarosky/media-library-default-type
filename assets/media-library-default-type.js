(function() {
    'use strict';

    console.log('Media Library Default Type Plugin loaded');

    function initPlugin() {
        console.log('Initializing Media Library Default Type Plugin');
        
        if (typeof wp === 'undefined' || typeof wp.media === 'undefined') {
            console.log('WordPress media not available, retrying...');
            setTimeout(initPlugin, 500);
            return;
        }

        // 重要: WordPress設定の詳細確認
        console.log('wp.media.view.settings:', wp.media.view.settings);
        console.log('wp.media.view.settings.post:', wp.media.view.settings.post);
        console.log('wp.media.view.settings.post.id:', wp.media.view.settings.post.id);
        
        // もしpost.idが設定されていない場合、強制的に設定
        if (!wp.media.view.settings.post.id) {
            let postId = null;
            
            if (wp.data && wp.data.select('core/editor')) {
                postId = wp.data.select('core/editor').getCurrentPostId();
            }
            
            if (postId) {
                console.log('Setting wp.media.view.settings.post.id to:', postId);
                wp.media.view.settings.post.id = postId;
                console.log('After setting, wp.media.view.settings.post.id:', wp.media.view.settings.post.id);
            } else {
                console.log('Could not determine post ID');
            }
        }

        // 核心的な修正：AttachmentsBrowserで filters オプションを 'uploaded' に強制設定
        const originalAttachmentsBrowser = wp.media.view.AttachmentsBrowser;
        
        if (originalAttachmentsBrowser) {
            wp.media.view.AttachmentsBrowser = originalAttachmentsBrowser.extend({
                initialize: function() {
                    console.log('AttachmentsBrowser initialize called');
                    console.log('Original filters option:', this.options.filters);
                    
                    // 投稿IDが存在する場合、filtersオプションを'uploaded'に強制設定
                    let postId = null;
                    if (wp.data && wp.data.select('core/editor')) {
                        postId = wp.data.select('core/editor').getCurrentPostId();
                    } else if (wp.media.view.settings.post.id) {
                        postId = wp.media.view.settings.post.id;
                    }
                    
                    if (postId) {
                        console.log('Forcing filters option to uploaded for post ID:', postId);
                        this.options.filters = 'uploaded';
                        console.log('New filters option:', this.options.filters);
                    }
                    
                    return originalAttachmentsBrowser.prototype.initialize.apply(this, arguments);
                }
            });
        }

        // さらに、AttachmentFilters.Uploadedでデフォルト選択を設定
        const originalUploaded = wp.media.view.AttachmentFilters.Uploaded;
        
        if (originalUploaded) {
            wp.media.view.AttachmentFilters.Uploaded = originalUploaded.extend({
                render: function() {
                    const result = originalUploaded.prototype.render.apply(this, arguments);
                    
                    // デフォルトで"uploaded"を選択
                    console.log('AttachmentFilters.Uploaded render - setting default to uploaded');
                    setTimeout(() => {
                        this.$el.val('uploaded');
                        // uploaded フィルターのプロパティをモデルに設定
                        if (this.filters && this.filters.uploaded) {
                            this.model.set(this.filters.uploaded.props);
                            console.log('Uploaded filter applied, model props:', this.model.toJSON());
                        }
                    }, 50);
                    
                    return result;
                }
            });
        }

        console.log('Plugin initialization complete');
    }

    // 初期化を実行
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPlugin);
    } else {
        initPlugin();
    }

})();