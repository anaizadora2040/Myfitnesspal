// Carousel functionality
let currentSlide = 0;
const track = document.querySelector('.carousel-track');
const cards = document.querySelectorAll('.card');
const dots = document.querySelectorAll('.dot');
const totalSlides = cards.length;
const cardsPerView = getCardsPerView();

function getCardsPerView() {
  if (window.innerWidth >= 1200) return 3;
  if (window.innerWidth >= 768) return 2;
  return 1;
}

function updateCarousel() {
  const cardWidth = 330; // card width + gap
  const translateX = -currentSlide * cardWidth;
  track.style.transform = `translateX(${translateX}px)`;
  
  // Update dots
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });
}

function moveCarousel(direction) {
  currentSlide += direction;
  
  // Handle boundaries
  if (currentSlide < 0) {
    currentSlide = totalSlides - cardsPerView;
  } else if (currentSlide > totalSlides - cardsPerView) {
    currentSlide = 0;
  }
  
  updateCarousel();
}

function goToSlide(slideIndex) {
  currentSlide = slideIndex;
  updateCarousel();
}

// Auto-play carousel
let autoPlayInterval;

function startAutoPlay() {
  autoPlayInterval = setInterval(() => {
    moveCarousel(1);
  }, 5000); // Change slide every 5 seconds
}

function stopAutoPlay() {
  clearInterval(autoPlayInterval);
}

// Initialize carousel
document.addEventListener('DOMContentLoaded', function() {
  updateCarousel();
  startAutoPlay();
  
  // Pause auto-play on hover
  const carousel = document.querySelector('.carousel');
  carousel.addEventListener('mouseenter', stopAutoPlay);
  carousel.addEventListener('mouseleave', startAutoPlay);
  
  // Handle window resize
  window.addEventListener('resize', function() {
    const newCardsPerView = getCardsPerView();
    if (newCardsPerView !== cardsPerView) {
      currentSlide = 0;
      updateCarousel();
    }
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add scroll effect to navigation
window.addEventListener('scroll', function() {
  const nav = document.querySelector('nav');
  if (window.scrollY > 100) {
    nav.style.backgroundColor = 'rgba(51, 51, 51, 0.95)';
    nav.style.backdropFilter = 'blur(10px)';
  } else {
    nav.style.backgroundColor = '#333';
    nav.style.backdropFilter = 'none';
  }
});

// Add animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll('.section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(30px)';
  section.style.transition = 'all 0.6s ease';
  observer.observe(section);
});

// Card button interactions
document.querySelectorAll('.card-btn').forEach(button => {
  button.addEventListener('click', function() {
    const cardTitle = this.closest('.card').querySelector('h3').textContent;
    alert(`Detalhes do plano: ${cardTitle}\n\nEm breve você terá acesso completo aos detalhes deste plano de treino!`);
  });
});

// Social media link interactions
document.querySelectorAll('.social-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const platform = this.querySelector('i').className.split(' ')[1];
    alert(`Redirecionando para ${platform}...\n\nEm breve você será redirecionado para nossa página oficial!`);
  });
});

// Login functionality
function togglePassword() {
  const passwordInput = document.getElementById('password');
  const toggleBtn = document.querySelector('.toggle-password i');
  
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    toggleBtn.className = 'fas fa-eye-slash';
  } else {
    passwordInput.type = 'password';
    toggleBtn.className = 'fas fa-eye';
  }
}

// Login form submission
document.querySelector('.login-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const remember = document.querySelector('input[name="remember"]').checked;
  
  if (!email || !password) {
    alert('Por favor, preencha todos os campos obrigatórios.');
    return;
  }
  
  // Simulate login process
  const loginBtn = document.querySelector('.login-btn');
  const originalText = loginBtn.innerHTML;
  
  loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Entrando...';
  loginBtn.disabled = true;
  
  setTimeout(() => {
    alert(`Login realizado com sucesso!\n\nEmail: ${email}\nLembrar: ${remember ? 'Sim' : 'Não'}\n\nBem-vindo ao MyFitnessPal!`);
    loginBtn.innerHTML = originalText;
    loginBtn.disabled = false;
    
    // Clear form
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.querySelector('input[name="remember"]').checked = false;
  }, 2000);
});

// Social login buttons
document.querySelectorAll('.social-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    const platform = this.classList.contains('google') ? 'Google' : 'Facebook';
    alert(`Redirecionando para login com ${platform}...\n\nEm breve você será redirecionado para a autenticação!`);
  });
});

// Forgot password link
document.querySelector('.forgot-password').addEventListener('click', function(e) {
  e.preventDefault();
  alert('Funcionalidade de recuperação de senha será implementada em breve!\n\nEntre em contato conosco para mais informações.');
});

// Signup link
document.querySelector('.signup-link').addEventListener('click', function(e) {
  e.preventDefault();
  alert('Página de cadastro será implementada em breve!\n\nEntre em contato conosco para criar sua conta.');
});