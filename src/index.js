// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
        window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
        });
        // 关闭移动菜单
        if (!mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        }
    }
    });
});

// 轮播图功能（支持多个实例）
function initCarousel(containerSelector) {
    const carouselContainer = document.querySelector(`${containerSelector} .medu-carousel-content`);
    const carouselItems = document.querySelectorAll(`${containerSelector} .medu-carousel-item`);
    const prevButton = document.querySelector(`${containerSelector} .medu-carousel-prev`);
    const nextButton = document.querySelector(`${containerSelector} .medu-carousel-next`);
    const indicators = document.querySelectorAll(`${containerSelector} .medu-carousel-indicators button`);

    if (!carouselContainer || carouselItems.length === 0) return;

    let currentIndex = 0;
    const totalItems = carouselItems.length;

    function updateCarousel() {
        carouselContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('bg-white');
                indicator.classList.remove('bg-white/50');
            } else {
                indicator.classList.add('bg-white/50');
                indicator.classList.remove('bg-white');
            }
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
    }

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });

    if (prevButton) prevButton.addEventListener('click', prevSlide);
    if (nextButton) nextButton.addEventListener('click', nextSlide);

    updateCarousel();
    setInterval(nextSlide, 5000);
}

// 自动查找所有 .medu-carousel 并初始化轮播图
document.querySelectorAll('.medu-carousel').forEach((carouselDiv, idx) => {
    // 给每个轮播图唯一的ID（如未设置）
    if (!carouselDiv.id) {
        carouselDiv.id = `medu-carousel-auto-${idx}`;
    }
    initCarousel(`#${carouselDiv.id}`);
});

// 自动查找所有 .medu-faq-toggle 并初始化Toggle
jQuery(function($){
    $('.medu-faq-a:not(.show)').hide();
    $('.medu-faq-q').click(function(){
        $(this).next('.medu-faq-a').slideToggle();
        $(this).find('.medu-faq-icon').toggleClass('rotate-180');
    });

    // 保存上次滚动位置
    let lastScrollTop = 0;
    const header = $('.medu-header');
    const scrollOffset = header.offset().top; // 滚动多少距离后开始变化
    
    $(window).scroll(function() {
        const scrollTop = $(this).scrollTop();
        // 向下滚动超过scrollOffset时添加scrolled类
        if (scrollTop > scrollOffset) {
            header.addClass('scrolled');
        } else {
            // 滚动到顶部时移除scrolled类
            header.removeClass('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });

    // 设置main的padding-top，避免被fixed header遮挡
    $('.medu-main').css({
        'padding-top': (jQuery(".medu-header").height()) + 'px',
        'min-height': 'calc(100vh - ' + jQuery("footer").height() + 'px)'
    });
});