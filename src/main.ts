import './style.css'

// WhatsApp Configuration
const WHATSAPP_NUMBER = '919540011444';
const DEFAULT_MESSAGE = ' Hi Silver Wheelz, I\'m interested I would like to book a ride. Please provide me with more details.';

// Function to open WhatsApp with pre-filled message
const openWhatsApp = (message: string = DEFAULT_MESSAGE) => {
  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  window.open(whatsappURL, '_blank');
};

// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', () => {
  // WhatsApp Booking Button Handler
  const whatsappBookingBtn = document.getElementById('whatsappBooking');
  if (whatsappBookingBtn) {
    whatsappBookingBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openWhatsApp(DEFAULT_MESSAGE);
    });
  }

  // WhatsApp Floating Button Handler
  const whatsappFloat = document.getElementById('whatsappFloat');
  if (whatsappFloat) {
    whatsappFloat.addEventListener('click', (e) => {
      e.preventDefault();
      openWhatsApp('Hi Silver Wheelz, I\'m interested I would like to book a ride. Please provide me with more details.');
    });
  }

  // Handle all Book Now buttons (WhatsApp redirect)
  const whatsappBookButtons = document.querySelectorAll('.whatsapp-book');
  whatsappBookButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      openWhatsApp(DEFAULT_MESSAGE);
    });
  });

  // Handle Fleet Card WhatsApp buttons
  const fleetWhatsappButtons = document.querySelectorAll('.fleet-deal-btn.whatsapp');
  fleetWhatsappButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const card = button.closest('.fleet-deal-card');
      if (card) {
        const carName = card.querySelector('h3')?.textContent || 'this car';
        const customMessage = `Hi, I'm interested in renting the ${carName}. Can you please provide more information?`;
        openWhatsApp(customMessage);
      }
    });
  });

  // Handle navigation link clicks
  const navLinks = document.querySelectorAll('.nav-menu a');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      if (targetId) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Handle hero button clicks
  const heroButtons = document.querySelectorAll('.hero-buttons a');
  heroButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const href = button.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetSection = document.querySelector(href);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      mobileMenuToggle.classList.toggle('active');
    });
  }

  // Add scroll effect to navbar
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  // Observe cards for staggered animation
  const cards = document.querySelectorAll('.service-card, .fleet-card, .feature-item, .safety-card');
  cards.forEach((card, index) => {
    (card as HTMLElement).style.animationDelay = `${index * 0.1}s`;
  });

  // Add parallax effect to hero section
  const hero = document.querySelector('.hero') as HTMLElement;
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallaxSpeed = 0.5;
      hero.style.transform = `translateY(${scrolled * -parallaxSpeed}px)`;
    });
  }

  // Add active state to navigation based on scroll position
  const sections = document.querySelectorAll('section');
  const updateActiveNav = () => {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = (section as HTMLElement).offsetTop;
      const sectionHeight = (section as HTMLElement).offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', updateActiveNav);

  // FAQ Toggle Functionality
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all other FAQ items
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
          }
        });
        
        // Toggle current item
        if (isActive) {
          item.classList.remove('active');
        } else {
          item.classList.add('active');
        }
      });
    }
  });

  // Console log for development
  console.log('Silver Wheelz website initialized');
  console.log('Premium chauffeur-driven mobility solutions across India');
  console.log('WhatsApp booking: Click the green WhatsApp button to book instantly!');
});

