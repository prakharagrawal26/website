document.addEventListener('DOMContentLoaded', function() {

    const header = document.getElementById('header');
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-links');

    // --- Mobile Navigation Toggle ---
    if (mobileNavToggle && navMenu) {
        mobileNavToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            // Toggle ARIA attribute for accessibility
            const isExpanded = navMenu.classList.contains('active');
            mobileNavToggle.setAttribute('aria-expanded', isExpanded);
            // Optional: Prevent body scroll when menu is open
            // document.body.style.overflow = isExpanded ? 'hidden' : '';
        });

        // Close mobile menu if clicking outside of it (optional)
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnToggle = mobileNavToggle.contains(event.target);

            if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileNavToggle.setAttribute('aria-expanded', 'false');
                 // document.body.style.overflow = ''; // Restore scroll
            }
        });

         // Close mobile menu when a nav link is clicked
         navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileNavToggle.setAttribute('aria-expanded', 'false');
                     // document.body.style.overflow = ''; // Restore scroll
                }
            });
        });
    }


    // --- Active Navigation Link ---
    const navLinks = document.querySelectorAll('.nav-links a');
    const currentPath = window.location.pathname.split("/").pop(); // Gets the current file name (e.g., "about.html")

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        // Handle index.html or root path for homepage
        if ((currentPath === "" || currentPath === "index.html") && (linkPath === "index.html" || linkPath === "./")) {
            link.classList.add('active');
        } else if (linkPath === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active'); // Ensure others are not active
        }
    });


    // --- Sticky Header Hide/Show on Scroll ---
    let lastScrollTop = 0;
    const headerHeight = header.offsetHeight;

    window.addEventListener("scroll", function() {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll > lastScrollTop && currentScroll > headerHeight) {
            // Scroll Down - Hide header only if not at the very top
             header.classList.add('hidden');
        } else {
            // Scroll Up - Show header
             header.classList.remove('hidden');
        }
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    }, false);


    // --- Update Footer Year ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Smooth Scrolling for internal links (if any added later) ---
     document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            // Check if it's just a hash (internal link) vs a link on another page
            if (targetId.startsWith('#') && targetId.length > 1) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault(); // Prevent default only for internal links
                    const headerOffset = header.offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }
        });
    });


});