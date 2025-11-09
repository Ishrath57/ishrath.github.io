// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(30, 64, 175, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.backgroundColor = '#1e40af';
        navbar.style.backdropFilter = 'none';
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.timeline-item, .project-card, .skill-category, .education-card, .cert-item');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 150);
    }
});

// Skill items hover effect enhancement
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
    });
});

// Contact cards click to copy functionality
const contactCards = document.querySelectorAll('.contact-card');
contactCards.forEach(card => {
    card.addEventListener('click', () => {
        const text = card.querySelector('p').textContent;
        
        // Create a temporary textarea to copy text
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        
        // Show feedback
        const originalContent = card.innerHTML;
        card.innerHTML = `
            <i class="fas fa-check"></i>
            <h4>Copied!</h4>
            <p>${text}</p>
        `;
        
        setTimeout(() => {
            card.innerHTML = originalContent;
        }, 2000);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add CSS for loading animation
const style = document.createElement('style');
style.textContent = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    body:not(.loaded)::after {
        content: 'Loading...';
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 1.5rem;
        font-weight: 600;
        z-index: 10000;
        animation: pulse 1.5s infinite;
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }
    
    .nav-link.active {
        color: #93c5fd !important;
        position: relative;
    }
    
    .nav-link.active::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: #93c5fd;
    }
`;
document.head.appendChild(style);

// Email validation and contact form enhancement (if needed in future)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Add smooth reveal animation for sections
const revealSections = document.querySelectorAll('section');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.15 });

revealSections.forEach(section => {
    revealObserver.observe(section);
});

// Add CSS for section reveal animation
const revealStyle = document.createElement('style');
revealStyle.textContent = `
    section {
        opacity: 0;
        transform: translateY(50px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    section.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .hero {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(revealStyle);
// Modal for Project Demo
document.addEventListener('DOMContentLoaded', () => {
    // Open Modal
    const projectCards = document.querySelectorAll('.project-card[data-modal]');
    projectCards.forEach(card => {
        const demoBtn = card.querySelector('.demo-btn');
        const modalId = card.getAttribute('data-modal');
        const modal = document.getElementById(`modal-${modalId}`);

        demoBtn.addEventListener('click', () => {
            modal.style.display = 'flex';
        });

        // Close Modal
        const closeBtn = modal.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Close on outside click
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });

    /// ========== E-Commerce Chatbot Modal ==========
const ecommerceModal = document.getElementById('modal-ecommerce-bot');
const openEcommerceBtn = document.querySelector('[data-modal="ecommerce-bot"] .demo-btn');
const closeEcommerceBtn = ecommerceModal.querySelector('.close-btn');
const botInput = document.getElementById('bot-query');
const botSubmit = document.getElementById('bot-submit');
const botResponse = document.getElementById('bot-response');

// Open modal
openEcommerceBtn.addEventListener('click', () => {
    ecommerceModal.style.display = 'block';
    botInput.focus();
});

// Close modal
closeEcommerceBtn.addEventListener('click', () => {
    ecommerceModal.style.display = 'none';
});
window.addEventListener('click', (e) => {
    if (e.target === ecommerceModal) {
        ecommerceModal.style.display = 'none';
    }
});

// Mock AI Response (replace with real API later)
botSubmit.addEventListener('click', sendBotQuery);
botInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendBotQuery();
});

function sendBotQuery() {
    const query = botInput.value.trim();
    if (!query) return;

    botResponse.innerHTML = '<em>Thinking...</em>';

    // Simulated AI responses
    setTimeout(() => {
        let reply = '';
        const lower = query.toLowerCase();

        if (lower.includes('ship') || lower.includes('delivery')) {
            reply = 'We ship to over 50 countries! Standard shipping: 5–7 days. Express: 2–3 days. Free shipping on orders over $50.';
        } else if (lower.includes('return') || lower.includes('refund')) {
            reply = '30-day return policy. Items must be unused with original tags. Return shipping is free for defective items.';
        } else if (lower.includes('size') || lower.includes('fit')) {
            reply = 'Check our size guide in the product page. Most customers find our sizes run true to standard US sizing.';
        } else if (lower.includes('payment') || lower.includes('pay')) {
            reply = 'We accept Credit Cards, PayPal, Apple Pay, and Google Pay. All transactions are secure and encrypted.';
        } else {
            reply = 'I’m here to help! Try asking about shipping, returns, sizing, or payments.';
        }

        botResponse.innerHTML = `<strong>You:</strong> ${query}<br><br><strong>Bot:</strong> ${reply}`;
        botInput.value = '';
    }, 800);
}
});
// ========== Music Valuation Demo Modal ==========
const musicModal = document.getElementById('modal-music-valuation');
const openMusicBtn = document.querySelector('[data-modal="music-valuation"] .demo-btn');
const closeMusicBtn = musicModal.querySelector('.close-btn');
const valSubmit = document.getElementById('val-submit');
const valResponse = document.getElementById('val-response');

// Open modal
openMusicBtn.addEventListener('click', () => {
    musicModal.style.display = 'block';
});

// Close modal
closeMusicBtn.addEventListener('click', () => {
    musicModal.style.display = 'none';
});
window.addEventListener('click', (e) => {
    if (e.target === musicModal) {
        musicModal.style.display = 'none';
    }
});

// Valuation Calculation (Simplified ARIMA/DCF Simulation)
valSubmit.addEventListener('click', calculateValuation);

function calculateValuation() {
    const artist = document.getElementById('artist-name').value || 'Unknown Catalog';
    const royalties = parseFloat(document.getElementById('current-royalties').value) || 0;
    const streams = parseFloat(document.getElementById('monthly-streams').value) || 0;
    const growth = parseFloat(document.getElementById('growth-rate').value) || 0;

    if (royalties <= 0 || streams <= 0) {
        valResponse.innerHTML = '<em style="color: red;">Please enter valid positive numbers.</em>';
        return;
    }

    // Mock ARIMA forecast: Project 5-year earnings (growth compounded, streams-to-royalty conversion ~$0.004/stream)
    const streamRoyalties = streams * 12 * 0.004; // Annual from streams
    const totalCurrent = royalties + streamRoyalties;
    const discountRate = 0.08; // Industry standard WACC for music catalogs
    let futureValue = 0;

    for (let year = 1; year <= 5; year++) {
        const projected = totalCurrent * Math.pow(1 + growth / 100, year);
        futureValue += projected / Math.pow(1 + discountRate, year);
    }

    const catalogValue = futureValue * 12; // Multiplier for perpetuity-like value (industry avg ~10-15x)
    const irr = ((catalogValue / totalCurrent) * 100).toFixed(1); // Simple IRR estimate

    valResponse.innerHTML = `
        <strong>Catalog:</strong> ${artist}<br>
        <strong>Current Annual Earnings:</strong> $${totalCurrent.toLocaleString()}<br><br>
        <strong>5-Year Projected Value (ARIMA Forecast):</strong> $${futureValue.toLocaleString()}<br>
        <strong>Estimated Catalog Value:</strong> $${catalogValue.toLocaleString()}<br>
        <strong>Est. IRR (Internal Rate of Return):</strong> ${irr}%<br><br>
        <em>This is a simplified demo using DCF/ARIMA principles. Real tool uses BigQuery & Statsmodels for precise modeling.</em>
    `;
}
// ========== Gas Leakage Lightbox ==========
const gasLeakCard = document.querySelector('[data-lightbox="gas-leak"]');
const gasLeakLightbox = document.getElementById('lightbox-gas-leak');
const closeGasLeak = gasLeakLightbox.querySelector('.close-lightbox');

gasLeakCard.querySelector('.demo-btn').addEventListener('click', () => {
    gasLeakLightbox.classList.add('active');
});

closeGasLeak.addEventListener('click', () => {
    gasLeakLightbox.classList.remove('active');
});

gasLeakLightbox.addEventListener('click', (e) => {
    if (e.target === gasLeakLightbox) {
        gasLeakLightbox.classList.remove('active');
    }
});