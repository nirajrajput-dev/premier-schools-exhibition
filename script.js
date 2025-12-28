document.addEventListener('DOMContentLoaded', () => {
    
    // ===============================================
    // 1. Header Scroll Animation Logic (Throttled)
    // ===============================================
    const header = document.getElementById('main-header');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 50) {
                    header.classList.add('header--scrolled');
                } else {
                    header.classList.remove('header--scrolled');
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    // ===============================================
    // 2. Infinite Marquee Duplication
    // ===============================================
    const marqueeTracks = document.querySelectorAll('.marquee-col__track, .marquee-row__track');
    marqueeTracks.forEach(track => {
        const children = Array.from(track.children);
        // Duplicate twice to ensure seamless loop
        children.forEach(item => track.appendChild(item.cloneNode(true)));
        children.forEach(item => track.appendChild(item.cloneNode(true)));
    });

    // ===============================================
    // 3. Choose School (Mobile Dots)
    // ===============================================
    const cardSlider = document.getElementById('cards-slider');
    const dotsContainer = document.getElementById('slider-dots');
    
    if(cardSlider && dotsContainer) {
        const cards = cardSlider.querySelectorAll('.school-card');
        
        cards.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if(index === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => {
                const cardWidth = cards[0].offsetWidth + 16; 
                cardSlider.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
            });
            dotsContainer.appendChild(dot);
        });

        // Intersection Observer for Active Dot state
        const dots = dotsContainer.querySelectorAll('.dot');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    dots.forEach(d => d.classList.remove('active'));
                    const index = Array.from(cards).indexOf(entry.target);
                    if(dots[index]) dots[index].classList.add('active');
                }
            });
        }, { root: cardSlider, threshold: 0.6 });

        cards.forEach(card => observer.observe(card));
    }

    // ===============================================
    // 4. Must-Visit Slider Logic
    // ===============================================
    const mvSlider = document.getElementById('mv-slider');
    const mvPrevBtn = document.getElementById('mv-prev');
    const mvNextBtn = document.getElementById('mv-next');

    if (mvSlider && mvPrevBtn && mvNextBtn) {
        let currentIndex = 0;
        
        function getItemsPerScreen() {
            if (window.innerWidth >= 992) return 4;
            if (window.innerWidth >= 600) return 2;
            return 1;
        }

        function updateSlider() {
            const items = mvSlider.children;
            const cardWidth = items[0].offsetWidth;
            const gap = 20; 
            const moveAmount = cardWidth + gap;
            mvSlider.style.transform = `translateX(-${currentIndex * moveAmount}px)`;
        }

        mvNextBtn.addEventListener('click', () => {
            const totalItems = mvSlider.children.length;
            const itemsPerScreen = getItemsPerScreen();
            const maxIndex = totalItems - itemsPerScreen; 
            if (currentIndex < maxIndex) { currentIndex++; } else { currentIndex = 0; }
            updateSlider();
        });

        mvPrevBtn.addEventListener('click', () => {
            const totalItems = mvSlider.children.length;
            const itemsPerScreen = getItemsPerScreen();
            const maxIndex = totalItems - itemsPerScreen;
            if (currentIndex > 0) { currentIndex--; } else { currentIndex = maxIndex; }
            updateSlider();
        });

        window.addEventListener('resize', updateSlider);
    }

    // ===============================================
    // 5. Form Handling
    // ===============================================
    const form = document.getElementById('register-form');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Form submitted successfully!');
            form.reset();
        });
    }
});