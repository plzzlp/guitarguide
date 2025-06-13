document.addEventListener('DOMContentLoaded', function() {
    // Drawer toggle functionality
    const menuToggle = document.getElementById('menuToggle');
    const closeDrawer = document.getElementById('closeDrawer');
    const drawer = document.getElementById('drawer');
    const overlay = document.getElementById('overlay');
    
    // iOS-like drawer swipe functionality
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    
    drawer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        currentX = startX;
    }, { passive: true });
    
    drawer.addEventListener('touchmove', (e) => {
        if (!isDragging && startX > 20) return; // Only allow swipe from edge
        currentX = e.touches[0].clientX;
        const diff = currentX - startX;
        
        if (diff > 0) {
            e.preventDefault();
            isDragging = true;
            const translateX = Math.min(diff, 280);
            drawer.style.transform = `translateX(${translateX}px)`;
            overlay.style.opacity = `${Math.min(diff / 280, 1)}`;
        }
    }, { passive: false });
    
    drawer.addEventListener('touchend', () => {
        if (!isDragging) return;
        
        const diff = currentX - startX;
        if (diff > 100) {
            openDrawer();
        } else {
            closeDrawer();
        }
        
        isDragging = false;
    }, { passive: true });
    
    function openDrawer() {
        drawer.classList.add('open');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        drawer.style.transform = '';
    }
    
    function closeDrawer() {
        drawer.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        drawer.style.transform = '';
    }
    
    menuToggle.addEventListener('click', openDrawer);
    closeDrawer.addEventListener('click', closeDrawer);
    overlay.addEventListener('click', closeDrawer);
    
    // iOS-like button tap effect
    const buttons = document.querySelectorAll('button, a');
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.classList.add('active');
        }, { passive: true });
        
        button.addEventListener('touchend', function() {
            this.classList.remove('active');
        }, { passive: true });
    });
    
    // Video card click functionality
    const videoCards = document.querySelectorAll('.video-card');
    videoCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.tagName === 'BUTTON' || e.target.parentElement.tagName === 'BUTTON') {
                return;
            }
            
            // iOS-like modal presentation would go here
            alert(`Playing: ${this.querySelector('.video-title').textContent}`);
        });
    });
    
    // iOS-like horizontal scroll momentum
    const horizontalScroll = document.querySelector('.horizontal-scroll');
    if (horizontalScroll) {
        let isScrolling = false;
        let startXScroll = 0;
        let scrollLeft = 0;
        
        horizontalScroll.addEventListener('touchstart', (e) => {
            isScrolling = true;
            startXScroll = e.touches[0].pageX - horizontalScroll.offsetLeft;
            scrollLeft = horizontalScroll.scrollLeft;
        }, { passive: true });
        
        horizontalScroll.addEventListener('touchmove', (e) => {
            if (!isScrolling) return;
            e.preventDefault();
            const x = e.touches[0].pageX - horizontalScroll.offsetLeft;
            const walk = (x - startXScroll) * 2;
            horizontalScroll.scrollLeft = scrollLeft - walk;
        }, { passive: false });
        
        horizontalScroll.addEventListener('touchend', () => {
            isScrolling = false;
        }, { passive: true });
    }
    
    // Add iOS-like animations
    const animateElements = () => {
        const elements = document.querySelectorAll('.video-card, .ios-section-header');
        elements.forEach((el, i) => {
            el.style.animation = `iosFadeIn 0.5s ease forwards ${i * 0.1}s`;
            el.style.opacity = '0';
        });
    };
    
    // Wait for images to load before animating
    window.addEventListener('load', animateElements);
});
