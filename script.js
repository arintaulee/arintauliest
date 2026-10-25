
/* ---------- 1. AMBIL ELEMEN ---------- */

const navbar = document.getElementById('mainNav');
const progressBar = document.getElementById('scrollProgress');
const timeline = document.getElementById('timeline');
const timelineFill = document.getElementById('timelineFill');

const parallaxItems = document.querySelectorAll('[data-speed]');
const navLinks = document.querySelectorAll('.navbar .nav-link');
const navMenu = document.getElementById('navMenu');


/* ---------- 2. EFEK SCROLL ---------- */

let ticking = false;

function handleScroll() {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const maxScroll =
        document.documentElement.scrollHeight - windowHeight;

    // Navbar
    if (navbar) {
        navbar.classList.toggle('scrolled', scrollTop > 50);
    }

    // Progress bar
    if (progressBar) {
        const progress = maxScroll > 0
            ? Math.min(100, Math.max(0, scrollTop / maxScroll * 100))
            : 0;

        progressBar.style.width = progress + '%';
    }

    // Timeline
    if (timeline && timelineFill) {
        const rect = timeline.getBoundingClientRect();
        const filled = windowHeight * 0.6 - rect.top;

        const height = Math.min(
            Math.max(filled, 0),
            rect.height
        );

        timelineFill.style.height = height + 'px';
    }

    // Parallax
    parallaxItems.forEach(function (item) {
        const speed = Number(item.dataset.speed) || 0;
        const offset = scrollTop * speed;

        item.style.translate = `0 ${offset}px`;
    });

    ticking = false;
}

window.addEventListener('scroll', function () {
    if (!ticking) {
        ticking = true;
        requestAnimationFrame(handleScroll);
    }
}, { passive: true });

window.addEventListener('resize', function () {
    if (!ticking) {
        ticking = true;
        requestAnimationFrame(handleScroll);
    }
});

handleScroll();


/* ---------- 3. ANIMASI REVEAL ---------- */

// Delay animasi dalam kelompok
document.querySelectorAll('.stagger-group').forEach(function (group) {
    group.querySelectorAll('.reveal').forEach(function (item, index) {
        item.style.transitionDelay = (index * 0.12) + 's';
    });
});

// Observer animasi reveal
const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.reveal').forEach(function (element) {
    revealObserver.observe(element);
});


/* ---------- 4. ACTIVE MENU NAVBAR ---------- */

const sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            navLinks.forEach(function (link) {
                const isActive =
                    link.getAttribute('href') === '#' + entry.target.id;

                link.classList.toggle('active', isActive);
            });
        }
    });
}, {
    rootMargin: '-45% 0px -45% 0px'
});

document.querySelectorAll('section[id]').forEach(function (section) {
    sectionObserver.observe(section);
});


/* ---------- 5. MENU HAMBURGER ---------- */

navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
        if (
            navMenu &&
            navMenu.classList.contains('show') &&
            window.bootstrap &&
            window.bootstrap.Collapse
        ) {
            window.bootstrap.Collapse
                .getOrCreateInstance(navMenu)
                .hide();
        }
    });
});




const yearElement = document.getElementById('year');

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}
