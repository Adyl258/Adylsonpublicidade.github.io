
const services = [
    {
        title: "Cartões de Visita",
        description: "Impressão de alta qualidade que representa sua marca profissionalmente",
        image: "https://images.unsplash.com/photo-1626148750586-df6e1b0bebf2"
    },
    {
        title: "Panfletos", 
        description: "Material promocional impactante para divulgar seus produtos e serviços",
        image: "https://images.unsplash.com/photo-1581092335331-5e00ac65e934"
    },
    {
        title: "Banners",
        description: "Comunicação visual de grande formato para eventos e estabelecimentos", 
        image: "https://images.unsplash.com/photo-1617695744007-68ef55752789"
    },
    {
        title: "Convites",
        description: "Convites personalizados para tornar seus eventos inesquecíveis",
        image: "https://images.unsplash.com/photo-1548094990-c16ca90f1f0d"
    },
    {
        title: "Branding",
        description: "Identidade visual completa para fortalecer sua marca no mercado",
        image: "https://images.unsplash.com/photo-1567262439850-1d4dc1fefdd0"
    }
];

// Estado atual do serviço ativo
let activeServiceIndex = 0;

// Elementos DOM
const serviceItems = document.querySelectorAll('.service-item');
const serviceImage = document.getElementById('service-image');
const serviceShowcaseTitle = document.getElementById('service-showcase-title');
const serviceShowcaseDesc = document.getElementById('service-showcase-desc');

// Função para atualizar o serviço ativo
function updateActiveService(index) {
    // Remove classe active de todos os itens
    serviceItems.forEach(item => item.classList.remove('active'));
    
    // Adiciona classe active ao item selecionado
    serviceItems[index].classList.add('active');
    
    // Atualiza o showcase
    const service = services[index];
    serviceImage.src = service.image;
    serviceImage.alt = service.title;
    serviceShowcaseTitle.textContent = service.title;
    serviceShowcaseDesc.textContent = service.description;
    
    activeServiceIndex = index;
}

// Event listeners para clique nos serviços
serviceItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        updateActiveService(index);
    });
});

// Rotação automática dos serviços
function autoRotateServices() {
    const nextIndex = (activeServiceIndex + 1) % services.length;
    updateActiveService(nextIndex);
}

// Iniciar rotação automática a cada 4 segundos
setInterval(autoRotateServices, 4000);

// Intersection Observer para animações
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observar todos os elementos com data-animate
document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
});

// Smooth scroll para links do menu
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.8)';
        header.style.boxShadow = 'none';
    }
});

// Função para adicionar animação de hover nos botões
function addButtonHoverEffects() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .cta-button, .btn-phone');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Adicionar efeitos aos botões quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    addButtonHoverEffects();
    
    // Inicializar o primeiro serviço como ativo
    updateActiveService(0);
});

// Função para animar contadores (se necessário)
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = counter.textContent;
        const isPercentage = target.includes('%');
        const isTime = target.includes('h');
        const isPlus = target.includes('+');
        
        let endValue = parseInt(target);
        let current = 0;
        const increment = endValue / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= endValue) {
                current = endValue;
                clearInterval(timer);
            }
            
            let displayValue = Math.floor(current);
            if (isPercentage) displayValue += '%';
            if (isTime) displayValue += 'h';
            if (isPlus) displayValue += '+';
            
            counter.textContent = displayValue;
        }, 40);
    });
}

// Animar contadores quando a seção hero estiver visível
const heroSection = document.querySelector('.hero');
if (heroSection) {
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                heroObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    heroObserver.observe(heroSection);
}

// Adicionar efeito parallax suave ao hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.3;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${rate}px)`;
    }
});

// Função para mostrar/ocultar menu mobile (se implementado)
function toggleMobileMenu() {
    // Implementar se necessário um menu mobile
    console.log('Menu mobile toggle');
}

// Adicionar loading suave às imagens
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        
        // Se a imagem já estiver carregada
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
        }
    });
});

// Adicionar efeito de typing ao título principal (opcional)
function addTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        heroTitle.style.opacity = '1';
        
        let i = 0;
        const typing = setInterval(() => {
            if (i < text.length) {
                heroTitle.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(typing);
            }
        }, 50);
    }
}

// Função para adicionar partículas flutuantes (opcional)
function createFloatingParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.backgroundColor = 'rgba(14, 165, 233, 0.3)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${3 + Math.random() * 4}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        hero.appendChild(particle);
    }
}

// Adicionar animação CSS para as partículas
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.7;
        }
        33% {
            transform: translateY(-20px) translateX(10px);
            opacity: 1;
        }
        66% {
            transform: translateY(10px) translateX(-10px);
            opacity: 0.5;
        }
    }
`;
document.head.appendChild(style);

// Inicializar efeitos especiais
document.addEventListener('DOMContentLoaded', () => {
    // createFloatingParticles(); // Descomente se quiser partículas
    // addTypingEffect(); // Descomente se quiser efeito de digitação
});

// Função para otimizar scroll performance
let ticking = false;

function updateScrollEffects() {
    // Atualizar efeitos baseados no scroll aqui
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
});

// Adicionar suporte a touch para mobile
let startY = 0;
let endY = 0;

document.addEventListener('touchstart', e => {
    startY = e.touches[0].clientY;
});

document.addEventListener('touchend', e => {
    endY = e.changedTouches[0].clientY;
    handleSwipe();
});

function handleSwipe() {
    const diff = startY - endY;
    
    // Se o swipe foi significativo (mais de 50px)
    if (Math.abs(diff) > 50) {
        if (diff > 0) {
            // Swipe up
            console.log('Swipe up detected');
        } else {
            // Swipe down  
            console.log('Swipe down detected');
        }
    }
}

console.log('🎨 Adylson Publicidade - Site carregado com sucesso!');
