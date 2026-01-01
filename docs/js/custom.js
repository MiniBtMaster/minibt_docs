// MiniBT 自定义 JavaScript 功能

document.addEventListener('DOMContentLoaded', function () {

    // 1. 阅读进度条
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    document.body.appendChild(progressBar);

    function updateProgressBar() {
        const winHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset;
        const progress = (scrollTop / (docHeight - winHeight)) * 100;
        progressBar.style.width = progress + '%';
    }

    window.addEventListener('scroll', updateProgressBar);

    // 2. 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 3. 表格行悬停效果增强
    document.querySelectorAll('table:not([class]) tr').forEach(row => {
        row.addEventListener('mouseenter', function () {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // 4. 代码块复制按钮增强
    document.querySelectorAll('.highlight .copybtn').forEach(btn => {
        btn.addEventListener('click', function () {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i>';
            this.style.background = '#34a853';

            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.background = '';
            }, 2000);
        });
    });

    // 5. 图片懒加载
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.opacity = '1';
                    img.style.transform = 'translateY(0)';
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('.md-typeset img').forEach(img => {
            img.style.opacity = '0';
            img.style.transform = 'translateY(20px)';
            img.style.transition = 'all 0.6s ease';
            imageObserver.observe(img);
        });
    }

    // 6. 导航活跃状态增强
    function setActiveNav() {
        const currentPath = window.location.pathname;
        document.querySelectorAll('.md-nav__link').forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('md-nav__link--active');
            }
        });
    }

    setActiveNav();

    // 7. 搜索框聚焦效果
    const searchInput = document.querySelector('.md-search__input');
    if (searchInput) {
        searchInput.addEventListener('focus', function () {
            this.parentElement.style.boxShadow = '0 6px 25px rgba(66, 133, 244, 0.3)';
        });

        searchInput.addEventListener('blur', function () {
            this.parentElement.style.boxShadow = '';
        });
    }

    // 8. 控制台欢迎信息
    console.log(`
    🚀 欢迎使用 MiniBT 量化交易知识库！
    📚 专注于量化交易框架的使用教程、策略开发和指标解析
    🌐 官网: https://minibt.com/
    💻 GitHub: https://github.com/MiniBtMaster
    `);
});