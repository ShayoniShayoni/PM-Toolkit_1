class PMToolkitHub {
    constructor() {
        this.availableTools = {
            'user-stories': 'user-story-gpt.html',
            'user-personas': 'user-persona-chat.html', // Now available
            'user-journey': 'user-journey-mapper.html', // Now available
            'design-wireframe': 'design-wireframe-generator.html', // Now available
            'prd': 'prd-generator.html', // Now available
            'gtm-plan': 'gtm-planner.html', // Now available
            'product-strategy': 'product-strategy-generator.html', // Now available
            'competitive-analysis': 'competitive-analysis.html', // Now available
            'okrs': 'okr-generator.html', // Now available
            'api-docs': 'api-docs-generator.html', // Now available
            'product-launch-checklist': 'product-launch-checklist.html', // Now available
            'product-security-assessment': 'product-security-assessment.html', // Now available
            'release-plan': 'release-plan.html', // Now available
            'technical-design-document': 'technical-design-document.html', // Now available
            'project-collaboration': 'project-collaboration.html', // Now available
            'prompt-gallery': 'prompt-gallery.html' // Now available
        };
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.animateOnScroll();
        this.updateToolAvailability();
    }
    
    updateToolAvailability() {
        // Update UI based on available tools
        Object.keys(this.availableTools).forEach(toolType => {
            const toolCard = document.querySelector(`[data-tool="${toolType}"]`);
            const button = toolCard?.querySelector('.tool-button');
            
            if (toolCard && button) {
                if (this.availableTools[toolType]) {
                    // Tool is available
                    button.classList.remove('coming-soon');
                    button.disabled = false;
                    
                    // Update button text based on tool type
                    const buttonTexts = {
                        'user-stories': 'Generate Work Items',
                        'user-personas': 'Start Persona Chat',
                        'user-journey': 'Map User Journey',
                        'design-wireframe': 'Generate Wireframes',
                        'prd': 'Generate PRD',
                        'gtm-plan': 'Create GTM Plan',
                        'product-strategy': 'Build Strategy',
                        'competitive-analysis': 'Analyze Competition',
                        'okrs': 'Set OKRs',
                        'api-docs': 'Generate API Docs',
                        'product-launch-checklist': 'Generate Checklist',
                        'product-security-assessment': 'Assess Security',
                        'release-plan': 'Plan Release',
                        'technical-design-document': 'Create Design Doc',
                        'project-collaboration': 'Start Collaborating',
                        'prompt-gallery': 'Browse Gallery'
                    };
                    
                    if (buttonTexts[toolType]) {
                        button.textContent = buttonTexts[toolType];
                    }
                    
                    // Rebind click event for this button
                    button.addEventListener('click', (e) => {
                        e.stopPropagation();
                        this.openTool(toolType);
                    });
                } else {
                    // Tool is not available yet
                    button.classList.add('coming-soon');
                    button.disabled = true;
                    button.textContent = 'Coming Soon';
                }
            }
        });
    }
    
    bindEvents() {
        // Tool card clicks
        document.querySelectorAll('.tool-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const toolType = card.dataset.tool;
                const button = card.querySelector('.tool-button');
                
                if (!button.disabled) {
                    this.openTool(toolType);
                }
            });
        });
        
        // Tool button clicks
        document.querySelectorAll('.tool-button:not(.coming-soon)').forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const toolCard = button.closest('.tool-card');
                const toolType = toolCard.dataset.tool;
                this.openTool(toolType);
            });
        });
        
        // Smooth scrolling for nav links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Coming soon button interactions
        document.querySelectorAll('.coming-soon').forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                this.showComingSoonMessage();
            });
        });
    }
    
    openTool(toolType) {
        const toolUrl = this.availableTools[toolType];
        
        if (toolUrl) {
            // Add loading state
            this.showLoadingState(toolType);
            
            // Simulate brief loading then redirect
            setTimeout(() => {
                window.location.href = toolUrl;
            }, 500);
        } else {
            this.showComingSoonMessage();
        }
    }
    
    showLoadingState(toolType) {
        const toolCard = document.querySelector(`[data-tool="${toolType}"]`);
        const button = toolCard.querySelector('.tool-button');
        const originalText = button.textContent;
        
        button.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
                <div class="loading-spinner"></div>
                Loading...
            </div>
        `;
        button.disabled = true;
        
        // Add loading spinner styles
        const style = document.createElement('style');
        style.textContent = `
            .loading-spinner {
                width: 16px;
                height: 16px;
                border: 2px solid rgba(255, 255, 255, 0.3);
                border-top: 2px solid white;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
    
    showComingSoonMessage() {
        // Create and show toast notification
        const toast = document.createElement('div');
        toast.className = 'coming-soon-toast';
        toast.innerHTML = `
            <div class="toast-icon">🚧</div>
            <div class="toast-content">
                <div class="toast-title">Coming Soon!</div>
                <div class="toast-message">This tool is currently under development. Stay tuned!</div>
            </div>
        `;
        
        // Add toast styles
        const toastStyles = `
            .coming-soon-toast {
                position: fixed;
                top: 20px;
                right: 20px;
                background: rgba(15, 23, 42, 0.95);
                border: 1px solid rgba(139, 92, 246, 0.3);
                border-radius: 12px;
                padding: 20px;
                display: flex;
                align-items: center;
                gap: 15px;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
                backdrop-filter: blur(10px);
                z-index: 1000;
                transform: translateX(100%);
                transition: transform 0.3s ease;
                max-width: 300px;
            }
            
            .coming-soon-toast.show {
                transform: translateX(0);
            }
            
            .toast-icon {
                font-size: 1.5rem;
                flex-shrink: 0;
            }
            
            .toast-title {
                font-weight: 600;
                color: #8b5cf6;
                margin-bottom: 4px;
            }
            
            .toast-message {
                color: #cbd5e1;
                font-size: 0.9rem;
                line-height: 1.4;
            }
        `;
        
        // Add styles if not already added
        if (!document.querySelector('#toast-styles')) {
            const style = document.createElement('style');
            style.id = 'toast-styles';
            style.textContent = toastStyles;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(toast);
        
        // Show toast
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        // Hide toast after 4 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 4000);
    }
    
    animateOnScroll() {
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
        
        // Observe tool cards and feature items
        document.querySelectorAll('.tool-card, .feature-item').forEach(el => {
            observer.observe(el);
        });
        
        // Add animation styles
        const animationStyles = `
            .tool-card, .feature-item {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s ease;
            }
            
            .tool-card.animate-in, .feature-item.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            .tool-card:nth-child(even).animate-in {
                animation-delay: 0.1s;
            }
            
            .tool-card:nth-child(3n).animate-in {
                animation-delay: 0.2s;
            }
        `;
        
        // Add animation styles if not already added
        if (!document.querySelector('#animation-styles')) {
            const style = document.createElement('style');
            style.id = 'animation-styles';
            style.textContent = animationStyles;
            document.head.appendChild(style);
        }
    }
    
    // Track user interactions for analytics (if needed)
    trackToolInteraction(toolType, action) {
        // This could integrate with analytics services
        console.log(`Tool interaction: ${toolType} - ${action}`);
    }
}

// Global function for CTA button
function openTool(toolType) {
    if (window.pmToolkit) {
        window.pmToolkit.openTool(toolType);
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.pmToolkit = new PMToolkitHub();
    
    // Add some interactive effects
    addInteractiveEffects();
});

function addInteractiveEffects() {
    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Mouse movement effect for tool cards
    document.querySelectorAll('.tool-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
    
    // Gradient animation for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        let hue = 0;
        setInterval(() => {
            hue = (hue + 1) % 360;
            heroTitle.style.background = `linear-gradient(135deg, hsl(${hue}, 70%, 60%), hsl(${(hue + 60) % 360}, 70%, 60%))`;
            heroTitle.style.webkitBackgroundClip = 'text';
            heroTitle.style.webkitTextFillColor = 'transparent';
            heroTitle.style.backgroundClip = 'text';
        }, 100);
    }
}
