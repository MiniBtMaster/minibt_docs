// docs/js/back-to-top.js
document.addEventListener('DOMContentLoaded', function() {
    // 检查是否已存在回到顶部按钮
    if (document.getElementById('back-to-top')) {
        return;
    }
    
    // 创建回到顶部按钮
    var backToTopButton = document.createElement('div');
    backToTopButton.id = 'back-to-top';
    backToTopButton.title = '回到顶部';
    backToTopButton.setAttribute('aria-label', '回到顶部');
    
    // 在 docs/js/back-to-top.js 中更新 SVG 代码
    backToTopButton.innerHTML = `
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    `;
    
    // 添加到页面
    document.body.appendChild(backToTopButton);
    
    // 监听滚动事件
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    // 点击回到顶部
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    console.log('回到顶部按钮已初始化'); // 用于调试
});