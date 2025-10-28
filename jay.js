// Ultra-modern, dynamic, responsive JS for portfolio

// Welcome toast (non-blocking, auto-hide)
document.addEventListener("DOMContentLoaded", function() {
    const toast = document.createElement('div');
    toast.textContent = "Welcome to Jay's Portfolio!";
    toast.style.position = "fixed";
    toast.style.bottom = "2rem";
    toast.style.right = "2rem";
    toast.style.background = "linear-gradient(90deg,#0077cc,#00c6ff)";
    toast.style.color = "#fff";
    toast.style.padding = "1rem 2rem";
    toast.style.borderRadius = "2rem";
    toast.style.boxShadow = "0 4px 24px rgba(0,198,255,0.15)";
    toast.style.fontWeight = "600";
    toast.style.zIndex = "9999";
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.5s";
    document.body.appendChild(toast);
    setTimeout(() => toast.style.opacity = "1", 300);
    setTimeout(() => toast.style.opacity = "0", 2500);
    setTimeout(() => toast.remove(), 3200);

    // Dynamic year in footer
    const yearSpan = document.getElementById("year");
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // Navbar active highlight on scroll
    const navLinks = document.querySelectorAll('.modern-navbar a');
    const sections = Array.from(document.querySelectorAll('section[id]'));
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) current = section.getAttribute('id');
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) link.classList.add('active');
        });
    });

    // Project filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            document.querySelectorAll('.project-card').forEach(card => {
                card.style.display = (filter === 'all' || card.dataset.category === filter) ? 'flex' : 'none';
            });
        });
    });

    // Animate paddles on scroll
    const paddles = document.querySelectorAll('.paddle');
    const revealPaddle = () => {
        paddles.forEach(paddle => {
            const rect = paddle.getBoundingClientRect();
            if (rect.top < window.innerHeight - 80) {
                paddle.style.opacity = 1;
                paddle.style.transform = 'none';
            }
        });
    };
    window.addEventListener('scroll', revealPaddle);
    revealPaddle();

    // Animate project cards (staggered)
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card, i) => {
        card.style.animationDelay = `${1.2 + i * 0.2}s`;
    });

    // Contact form validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e){
            const email = this.email.value;
            if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
                e.preventDefault();
                this.email.style.borderColor = "#ff3b3b";
                this.email.focus();
                setTimeout(() => { this.email.style.borderColor = ""; }, 1200);
            }
        });
    }
});