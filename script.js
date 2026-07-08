// --- Supabase Database Configuration ---
// Replace these with your actual credentials from your Supabase Dashboard -> Settings -> API
const SUPABASE_URL = "https://tkqrzfwubqvtxhyfaryi.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_DfPPMbAeXJrJ0jXSeKJVhg_nvV19O5n";

// Initialize Supabase Client
let supabaseClient = null;
try {
    if (typeof supabase !== 'undefined' &&
        SUPABASE_URL &&
        SUPABASE_URL.startsWith('https://') &&
        SUPABASE_ANON_KEY &&
        SUPABASE_ANON_KEY !== 'YOUR_SUPABASE_ANON_KEY') {
        supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
} catch (e) {
    console.error("Failed to initialize Supabase client. Check your URL format in script.js.", e);
}

document.addEventListener('DOMContentLoaded', () => {

    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');

    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileNav.classList.toggle('open');

            // Toggle icon menu / close
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                const currentIcon = icon.getAttribute('data-lucide');
                if (currentIcon === 'menu') {
                    icon.setAttribute('data-lucide', 'x');
                } else {
                    icon.setAttribute('data-lucide', 'menu');
                }
                lucide.createIcons();
            }
        });
    }

    // --- Header Scrolled Effect ---
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Active Link Highlighting (Multi-page) ---
    const navLinks = document.querySelectorAll('.nav-link, .mobile-link');
    const path = window.location.pathname;
    let page = path.split("/").pop();

    // Default to index.html if empty
    if (!page || page === '') {
        page = 'index.html';
    }

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === page) {
            link.classList.add('active');
        }
    });

    // --- Typewriter Effect (Only on index.html) ---
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        const words = [
            "Mobile App Developer",
            "Flutter & Dart Specialist",
            "Mobile & AI Integrator",
            "Full Stack Enthusiast"
        ];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function type() {
            const currentWord = words[wordIndex];

            if (isDeleting) {
                typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                typingSpeed = 2000; // Pause at end of word
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typingSpeed = 500; // Pause before typing next word
            }

            setTimeout(type, typingSpeed);
        }

        type();
    }

    // --- Page load Reveal Animations ---
    const revealElements = document.querySelectorAll('.scroll-reveal');
    setTimeout(() => {
        revealElements.forEach(el => {
            el.classList.add('active');
        });
        // If we are on skills page, animate them
        if (document.getElementById('skills-page-indicator')) {
            animateSkills();
        }
    }, 150);

    // Function to animate skill progress bars
    function animateSkills() {
        const progressBars = document.querySelectorAll('.progress');
        progressBars.forEach(bar => {
            const targetWidth = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = targetWidth;
            }, 100);
        });
    }

    // --- Contact Form Submission Handling (Only on contact.html) ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            formStatus.textContent = "Sending message to database...";
            formStatus.className = "form-status"; // Reset status style

            if (supabaseClient) {
                try {
                    const { error } = await supabaseClient
                        .from('contact_messages')
                        .insert([{ name: name.trim(), email: email.trim(), message: message.trim() }]);

                    if (error) throw error;

                    formStatus.textContent = "Thank you! Your message has been sent and stored in the database.";
                    formStatus.classList.add('success');
                    contactForm.reset();
                } catch (err) {
                    console.error("Database submission error:", err);
                    formStatus.textContent = "Error saving message to database: " + err.message;
                    formStatus.classList.add('error');
                }
            } else {
                // Simulation Mode fallback
                console.warn("Supabase is not configured yet. Simulating PostgreSQL insertion.");
                setTimeout(() => {
                    formStatus.textContent = "Simulation: Message sent successfully! (Setup your Supabase keys in script.js to connect to your PostgreSQL database).";
                    formStatus.classList.add('success');
                    contactForm.reset();
                }, 1200);
            }

            // Clear status after 6 seconds
            setTimeout(() => {
                formStatus.textContent = "";
                formStatus.className = "form-status";
            }, 6000);
        });
    }
});
