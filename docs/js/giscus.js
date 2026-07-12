// Giscus 评论系统集成
document.addEventListener('DOMContentLoaded', function() {
    // Giscus 配置 - 替换下面的 ID
    const giscusConfig = {
        src: "https://giscus.app/client.js",
        'data-repo': "MiniBtMaster/minibt",
        'data-repo-id': "1043036250",        // 您获取的 Repository ID
        'data-category': "Announcements",                   // 分类名称
        'data-category-id': "DIC_kwDOPit4Ws4CxBDb",      // 您获取的 Category ID
        'data-mapping': "pathname",
        'data-strict': "0",
        'data-reactions-enabled': "1",
        'data-emit-metadata': "0",
        'data-input-position': "bottom",
        'data-theme': "preferred_color_scheme",
        'data-lang': "zh-CN",
        crossorigin: "anonymous",
        async: true
    };

    // 创建评论容器
    const commentsContainer = document.createElement('div');
    commentsContainer.id = 'giscus-comments';
    commentsContainer.className = 'giscus-container';
    
    // 创建评论标题
    const commentsTitle = document.createElement('h2');
    commentsTitle.textContent = '💬 问答专区';
    commentsTitle.className = 'comments-title';
    
    // 创建评论描述
    const commentsDesc = document.createElement('p');
    commentsDesc.textContent = '有任何关于 MiniBT 的问题？欢迎在此留言讨论！';
    commentsDesc.className = 'comments-desc';
    
    // 插入到文章内容之后
    const articleContent = document.querySelector('.md-content__inner');
    if (articleContent) {
        articleContent.appendChild(commentsTitle);
        articleContent.appendChild(commentsDesc);
        articleContent.appendChild(commentsContainer);
        
        // 创建并加载 Giscus 脚本
        const giscusScript = document.createElement('script');
        Object.keys(giscusConfig).forEach(key => {
            giscusScript.setAttribute(key, giscusConfig[key]);
        });
        commentsContainer.appendChild(giscusScript);
    }
});