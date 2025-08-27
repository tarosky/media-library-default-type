(function() {
    'use strict';


    function initPlugin() {
        
        if (typeof wp === 'undefined' || typeof wp.media === 'undefined') {
            setTimeout(initPlugin, 500);
            return;
        }

        // もしpost.idが設定されていない場合、強制的に設定
        if (!wp.media.view.settings.post.id) {
            let postId = null;
            
            if (wp.data && wp.data.select('core/editor')) {
                postId = wp.data.select('core/editor').getCurrentPostId();
            }
            
            if (postId) {
                wp.media.view.settings.post.id = postId;
            } else {
                // Could not determine post ID
            }
        }

        // 核心的な修正：AttachmentsBrowserで filters オプションを 'uploaded' に強制設定
        const originalAttachmentsBrowser = wp.media.view.AttachmentsBrowser;
        
        if (originalAttachmentsBrowser) {
            wp.media.view.AttachmentsBrowser = originalAttachmentsBrowser.extend({
                initialize: function() {
                    // 投稿IDが存在する場合、filtersオプションを'uploaded'に強制設定
                    let postId = null;
                    if (wp.data && wp.data.select('core/editor')) {
                        postId = wp.data.select('core/editor').getCurrentPostId();
                    } else if (wp.media.view.settings.post.id) {
                        postId = wp.media.view.settings.post.id;
                    }
                    
                    if (postId) {
                        this.options.filters = 'uploaded';
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
                    setTimeout(() => {
                        this.$el.val('uploaded');
                        // uploaded フィルターのプロパティをモデルに設定
                        if (this.filters && this.filters.uploaded) {
                            this.model.set(this.filters.uploaded.props);
                        }
                    }, 50);
                    
                    return result;
                }
            });
        }

    }

    // 初期化を実行
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPlugin);
    } else {
        initPlugin();
    }

})();