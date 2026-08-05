// ================= LOADER =================
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1200); // smooth fade after 1.2s
});

// ================= MOBILE MENU =================
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('mainNav');

menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    nav.classList.toggle('show');
});

// Close menu when a link is clicked (better UX)
nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('show');
    });
});

// ================= CLIENT ID GENERATOR =================
const generateBtn = document.getElementById('generateID');
const clientIdSpan = document.getElementById('clientID');

generateBtn.addEventListener('click', () => {
    const random = Math.floor(1000 + Math.random() * 9000);
    clientIdSpan.textContent = `SHK-${random}`;
});

// ================= SCROLL REVEAL (Intersection Observer) =================
const revealElements = document.querySelectorAll(
    '.about-box, .food-card, .client-card, .chef, .review, .booking'
);

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
});

// ================= BOOKING FORM =================
const bookingForm = document.getElementById('bookingForm');

bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Simple validation
    const inputs = bookingForm.querySelectorAll('input, select');
    let valid = true;
    inputs.forEach(inp => {
        if (!inp.value.trim()) {
            inp.style.borderColor = '#ff4444';
            valid = false;
        } else {
            inp.style.borderColor = '#d4af37';
        }
    });

    if (!valid) {
        alert('⚠️ Please fill in all fields correctly.');
        return;
    }

    // Show loading state on the submit button
    const submitBtn = bookingForm.querySelector('.btn-primary');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Processing…';
    submitBtn.disabled = true;

    setTimeout(() => {
        submitBtn.textContent = 'Done ✓';
        setTimeout(() => {
            alert('🔥 SHARK Reservation Confirmed!\nThank you for choosing SHARK ELITE.');
            bookingForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            // Reset border colors
            inputs.forEach(inp => inp.style.borderColor = '#d4af37');
        }, 600);
    }, 1200);
});

// ================= ORDER BUTTONS (simple feedback) =================
document.querySelectorAll('.btn-order').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const original = this.textContent;
        this.textContent = 'Adding…';
        this.style.opacity = '0.7';
        setTimeout(() => {
            this.textContent = '✓ Added';
            setTimeout(() => {
                this.textContent = original;
                this.style.opacity = '1';
            }, 800);
        }, 700);
    });
});

// ================= FLOATING BUTTON smooth scroll (optional) =================
document.querySelector('.floating')?.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector('#booking');
    if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
    }
});