document.addEventListener('DOMContentLoaded', function() {
    // Scroll Progress Bar Logic
    const scrollProgressBar = document.getElementById('scroll-progress-bar');
    if (scrollProgressBar) {
        const updateScrollProgress = () => {
            const totalScrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
            const currentScrollPosition = window.scrollY;
            if (totalScrollableHeight <= 0) {
                scrollProgressBar.style.width = '0%';
                return;
            }
            const scrollPercentage = (currentScrollPosition / totalScrollableHeight) * 100;
            scrollProgressBar.style.width = scrollPercentage + '%';
        };
        window.addEventListener('scroll', updateScrollProgress);
        updateScrollProgress(); // Initial call
    } else {
        console.warn('Scroll progress bar element not found.');
    }

    // Theme Switcher Logic has been removed.
});
