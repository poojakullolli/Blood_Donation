// Enhanced BloodConnect Platform JavaScript with Animations and Health-Focused Features

// Global application state
const app = {
    currentUser: null,
    currentSection: 'home',
    users: [],
    bloodCamps: [],
    emergencyRequests: [],
    chatMessages: {},
    bloodCompatibility: {},
    animations: {
        counters: {},
        observers: {},
        timeouts: {}
    },
    currentStep: 1,
    maxSteps: 3
};

// Enhanced sample data with health-focused information
const sampleData = {
    users: [
        {
            id: "1",
            name: "Dr. Rajesh Kumar",
            email: "rajesh@email.com",
            phone: "+919876543210",
            bloodType: "O+",
            role: "donor",
            location: {city: "Bengaluru", state: "Karnataka", coordinates: {lat: 12.9716, lng: 77.5946}},
            age: 28,
            gender: "Male",
            verified: {email: true, phone: true, medical: true},
            badges: ["First Donor", "Life Saver", "Regular Donor"],
            availability: true,
            lastDonation: "2025-05-01",
            nextEligibleDate: "2025-08-26",
            donationCount: 8,
            profileCompletion: 100,
            healthScore: 95,
            profileImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200"
        },
        {
            id: "2",
            name: "Priya Sharma",
            email: "priya@email.com",
            phone: "+919876543211",
            bloodType: "A+",
            role: "donor",
            location: {city: "Bengaluru", state: "Karnataka", coordinates: {lat: 12.9716, lng: 77.5946}},
            age: 25,
            gender: "Female",
            verified: {email: true, phone: true, medical: true},
            badges: ["Regular Donor", "Community Hero"],
            availability: true,
            lastDonation: "2025-06-15",
            nextEligibleDate: "2025-08-10",
            donationCount: 5,
            profileCompletion: 95,
            healthScore: 92,
            profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200"
        },
        {
            id: "3",
            name: "Amit Patel",
            email: "amit@email.com",
            phone: "+919876543212",
            bloodType: "B+",
            role: "recipient",
            location: {city: "Bengaluru", state: "Karnataka", coordinates: {lat: 12.9716, lng: 77.5946}},
            age: 35,
            gender: "Male",
            verified: {email: true, phone: true, medical: false},
            profileCompletion: 80,
            currentRequest: {bloodType: "B+", urgency: "high", date: "2025-08-07"}
        },
        {
            id: "4",
            name: "Ananya Singh",
            email: "ananya@email.com",
            phone: "+919876543213",
            bloodType: "O-",
            role: "donor",
            location: {city: "Bengaluru", state: "Karnataka", coordinates: {lat: 12.9716, lng: 77.5946}},
            age: 30,
            gender: "Female",
            verified: {email: true, phone: true, medical: true},
            badges: ["Universal Donor", "Life Saver", "Hero"],
            availability: true,
            lastDonation: "2025-07-01",
            nextEligibleDate: "2025-08-25",
            donationCount: 12,
            profileCompletion: 100,
            healthScore: 98
        }
    ],
    bloodCamps: [
        {
            id: "1",
            name: "Bangalore Medical College Blood Drive",
            date: "2025-08-15",
            time: "09:00-17:00",
            location: {address: "Fort Road, Bengaluru", coordinates: {lat: 12.9716, lng: 77.5946}},
            organizer: "BMC Hospital",
            slotsAvailable: 45,
            totalSlots: 50,
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400"
        },
        {
            id: "2",
            name: "Corporate Wellness Blood Camp",
            date: "2025-08-20",
            time: "10:00-16:00",
            location: {address: "Electronic City, Bengaluru", coordinates: {lat: 12.8456, lng: 77.6643}},
            organizer: "Tech Corp India",
            slotsAvailable: 20,
            totalSlots: 30,
            image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=400"
        }
    ],
    bloodCompatibility: {
        "O-": ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"],
        "O+": ["O+", "A+", "B+", "AB+"],
        "A-": ["A-", "A+", "AB-", "AB+"],
        "A+": ["A+", "AB+"],
        "B-": ["B-", "B+", "AB-", "AB+"],
        "B+": ["B+", "AB+"],
        "AB-": ["AB-", "AB+"],
        "AB+": ["AB+"]
    },
    emergencyRequests: [
        {
            id: "1",
            patientName: "Emergency Case #001",
            bloodType: "O-",
            location: "Apollo Hospital, Bengaluru",
            urgency: "critical",
            requestedAt: "2025-08-07T18:30:00Z",
            unitsNeeded: 2,
            hospital: "Apollo Hospital",
            contactPerson: "Dr. Smith",
            contactNumber: "+919876543999"
        },
        {
            id: "2", 
            patientName: "Emergency Case #002",
            bloodType: "B+",
            location: "Fortis Hospital, Bengaluru",
            urgency: "high",
            requestedAt: "2025-08-07T19:15:00Z",
            unitsNeeded: 1,
            hospital: "Fortis Hospital",
            contactPerson: "Dr. Patel",
            contactNumber: "+919876543888"
        }
    ],
    healthTips: [
        {
            title: "Pre-Donation Guidelines",
            content: "Eat iron-rich foods, stay hydrated, and get adequate rest before donating blood.",
            icon: "🩸"
        },
        {
            title: "Post-Donation Care",
            content: "Rest for 15 minutes, avoid heavy lifting for 24 hours, and drink plenty of fluids.",
            icon: "💪"
        },
        {
            title: "Donation Frequency",
            content: "Whole blood can be donated every 56 days. Platelets can be donated every 7 days.",
            icon: "📅"
        }
    ]
};

// Initialize the application with loading screen
document.addEventListener('DOMContentLoaded', function() {
    initializeLoadingScreen();
    setTimeout(() => {
        hideLoadingScreen();
        initializeApp();
        setupEventListeners();
        setupAnimations();
        setupFormValidation();
    }, 2000);
});

// Loading Screen Functions
function initializeLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.classList.remove('hidden');
    }
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
}

// Initialize the application
function initializeApp() {
    console.log('Initializing Enhanced BloodConnect app...');
    
    // Load sample data
    app.users = [...sampleData.users];
    app.bloodCamps = [...sampleData.bloodCamps];
    app.bloodCompatibility = {...sampleData.bloodCompatibility};
    app.emergencyRequests = [...sampleData.emergencyRequests];
    
    // Auto-login first user for demo purposes
    app.currentUser = app.users[0];
    updateAuthButton();
    updateDashboard();
    
    // Initialize scroll animations
    setupScrollAnimations();
    
    // Initialize counters
    initializeCounters();
    
    // Initialize health tips carousel
    initializeHealthTips();
    
    console.log('Enhanced app initialized successfully');
}

// Enhanced Event Listeners Setup
function setupEventListeners() {
    console.log('Setting up enhanced event listeners...');
    
    // Registration form
    const regForm = document.getElementById('registrationForm');
    if (regForm) {
        regForm.addEventListener('submit', handleRegistration);
    }
    
    // Emergency form
    const emergencyForm = document.getElementById('emergencyForm');
    if (emergencyForm) {
        emergencyForm.addEventListener('submit', handleEmergencySubmit);
    }
    
    // Chat message input
    const messageInput = document.getElementById('messageInput');
    if (messageInput) {
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Availability toggle
    const availabilityToggle = document.getElementById('availabilityToggle');
    if (availabilityToggle) {
        availabilityToggle.checked = app.currentUser?.availability || false;
    }
    
    // Navigation links with smooth transitions
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href) {
                const sectionId = href.replace('#', '');
                showSectionWithTransition(sectionId);
            }
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', handleScroll);
    
    // Search with debounce
    setupSearchDebouncing();
    
    console.log('Enhanced event listeners set up successfully');
}

// Scroll Effect for Header
function handleScroll() {
    const header = document.getElementById('header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
}

// Setup Animations
function setupAnimations() {
    // Setup intersection observer for scroll animations
    setupScrollAnimations();
    
    // Initialize progress bars
    initializeProgressBars();
    
    // Setup floating animations
    setupFloatingAnimations();
}

// Scroll Animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger counter animations
                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach(counter => {
                    animateCounter(counter);
                });
                
                // Trigger progress bar animations
                const progressBars = entry.target.querySelectorAll('.progress-bar, .progress-fill');
                progressBars.forEach(bar => {
                    bar.style.animationPlayState = 'running';
                });
            }
        });
    }, observerOptions);
    
    // Observe all animate-on-scroll elements
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
    
    // Observe stat cards for counter animation
    document.querySelectorAll('.stat-card').forEach(el => {
        observer.observe(el);
    });
    
    app.animations.observers.scroll = observer;
}

// Counter Animation
function animateCounter(element) {
    const target = parseInt(element.dataset.count) || parseInt(element.textContent) || 0;
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
    
    app.animations.counters[element.id] = timer;
}

// Initialize all counters
function initializeCounters() {
    // Set data attributes for counters
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        const counter = card.querySelector('.counter');
        if (counter) {
            const counts = [1500, 850, 25];
            counter.dataset.count = counts[index] || 0;
        }
    });
}

// Progress Bar Initialization
function initializeProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar, .progress-fill');
    progressBars.forEach(bar => {
        bar.style.animationPlayState = 'paused';
    });
}

// Enhanced Navigation with Smooth Transitions
function showSectionWithTransition(sectionId) {
    console.log(`Showing section with transition: ${sectionId}`);
    
    // Add loading overlay for smooth transition
    showLoadingOverlay('Switching sections...', 800);
    
    setTimeout(() => {
        showSection(sectionId);
        hideLoadingOverlay();
    }, 300);
}

function showSection(sectionId) {
    console.log(`Showing section: ${sectionId}`);
    
    // Hide all sections with fade out
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('hidden');
    });
    
    // Show requested section with fade in
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.remove('hidden');
        app.currentSection = sectionId;
        
        // Add entry animation
        targetSection.style.opacity = '0';
        setTimeout(() => {
            targetSection.style.opacity = '1';
            targetSection.style.transition = 'opacity 0.5s ease-in-out';
        }, 50);
        
        console.log(`Successfully showed section: ${sectionId}`);
    } else {
        console.error(`Section not found: ${sectionId}`);
        return;
    }
    
    // Update navigation active state
    updateNavigation(sectionId);
    
    // Load section-specific data with animations
    switch(sectionId) {
        case 'dashboard':
            updateDashboard();
            animateDashboardCards();
            break;
        case 'find-donors':
            loadDonors();
            break;
        case 'blood-camps':
            loadBloodCamps();
            break;
        case 'profile':
            loadProfile();
            break;
        case 'home':
            reinitializeHomeAnimations();
            break;
    }
}

function updateNavigation(activeSection) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${activeSection}`) {
            link.classList.add('active');
            
            // Add subtle animation to active nav
            link.style.transform = 'scale(1.05)';
            setTimeout(() => {
                link.style.transform = 'scale(1)';
            }, 200);
        }
    });
}

// Animate Dashboard Cards
function animateDashboardCards() {
    const cards = document.querySelectorAll('.dashboard-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            card.style.transition = 'all 0.6s ease-out';
        }, index * 150);
    });
}

// Reinitialize Home Animations
function reinitializeHomeAnimations() {
    // Reset and restart counter animations
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        counter.textContent = '0';
        setTimeout(() => {
            animateCounter(counter);
        }, 500);
    });
}

// Enhanced Authentication
function showAuth() {
    if (app.currentUser) {
        // Logout with animation
        showLoadingOverlay('Logging out...', 1000);
        setTimeout(() => {
            app.currentUser = null;
            updateAuthButton();
            showSectionWithTransition('home');
            hideLoadingOverlay();
            showToast('Logged out successfully', 'success');
        }, 1000);
    } else {
        // Auto-login with animation
        showLoadingOverlay('Logging in...', 1500);
        setTimeout(() => {
            app.currentUser = app.users[0];
            updateAuthButton();
            showSectionWithTransition('dashboard');
            hideLoadingOverlay();
            showToast(`Welcome back, ${app.currentUser.name}!`, 'success');
        }, 1500);
    }
}

function updateAuthButton() {
    const authBtn = document.getElementById('authBtn');
    if (authBtn) {
        const span = authBtn.querySelector('span');
        const icon = authBtn.querySelector('i');
        
        if (app.currentUser) {
            if (span) span.textContent = 'Logout';
            if (icon) icon.className = 'fas fa-sign-out-alt';
            authBtn.classList.remove('btn--secondary');
            authBtn.classList.add('btn--outline');
        } else {
            if (span) span.textContent = 'Login';
            if (icon) icon.className = 'fas fa-user-circle';
            authBtn.classList.remove('btn--outline');
            authBtn.classList.add('btn--secondary');
        }
        
        // Add subtle animation
        authBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            authBtn.style.transform = 'scale(1)';
        }, 150);
    }
}

// Enhanced Registration with Multi-step Form
function showRegistration(type) {
    console.log(`Showing registration modal for: ${type}`);
    
    const modal = document.getElementById('registrationModal');
    const title = document.getElementById('registrationTitle');
    
    if (modal && title) {
        const titleText = type === 'donor' ? 'Register as Donor' : 'Register as Recipient';
        title.innerHTML = `<i class="fas fa-user-plus"></i> ${titleText}`;
        modal.classList.remove('hidden');
        modal.dataset.type = type;
        
        // Reset form to step 1
        app.currentStep = 1;
        updateFormStep();
        
        console.log('Registration modal shown successfully');
    } else {
        console.error('Registration modal elements not found');
    }
}

function hideRegistration() {
    const modal = document.getElementById('registrationModal');
    if (modal) {
        modal.classList.add('hidden');
        
        // Reset form
        const form = document.getElementById('registrationForm');
        if (form) {
            form.reset();
            clearFormValidation();
        }
        
        // Reset to step 1
        app.currentStep = 1;
        updateFormStep();
    }
}

// Multi-step Form Navigation
function nextStep() {
    if (validateCurrentStep()) {
        if (app.currentStep < app.maxSteps) {
            app.currentStep++;
            updateFormStep();
            animateStepTransition();
        }
    }
}

function prevStep() {
    if (app.currentStep > 1) {
        app.currentStep--;
        updateFormStep();
        animateStepTransition();
    }
}

function updateFormStep() {
    // Update step indicators
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        if (index < app.currentStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
    
    // Show current form step
    const formSteps = document.querySelectorAll('.form-step');
    formSteps.forEach((step, index) => {
        if (index + 1 === app.currentStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
    
    // Update step lines
    const stepLines = document.querySelectorAll('.step-line');
    stepLines.forEach((line, index) => {
        if (index < app.currentStep - 1) {
            line.classList.add('active');
        } else {
            line.classList.remove('active');
        }
    });
}

function animateStepTransition() {
    const activeStep = document.querySelector('.form-step.active');
    if (activeStep) {
        activeStep.style.opacity = '0';
        activeStep.style.transform = 'translateX(20px)';
        
        setTimeout(() => {
            activeStep.style.opacity = '1';
            activeStep.style.transform = 'translateX(0)';
        }, 100);
    }
}

// Form Validation
function setupFormValidation() {
    const inputs = document.querySelectorAll('.form-control');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

function validateField(event) {
    const field = event.target;
    const feedback = field.parentNode.querySelector('.form-feedback');
    let isValid = true;
    let message = '';
    
    // Required validation
    if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false;
        message = 'This field is required';
    }
    
    // Email validation
    if (field.type === 'email' && field.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            isValid = false;
            message = 'Please enter a valid email address';
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && field.value) {
        const phoneRegex = /^[+]?[\d\s\-()]+$/;
        if (!phoneRegex.test(field.value)) {
            isValid = false;
            message = 'Please enter a valid phone number';
        }
    }
    
    // Age validation
    if (field.type === 'number' && field.id === 'regAge') {
        const age = parseInt(field.value);
        if (age < 18 || age > 65) {
            isValid = false;
            message = 'Age must be between 18 and 65 years';
        }
    }
    
    // Update field appearance
    if (feedback) {
        if (isValid) {
            feedback.textContent = '';
            feedback.className = 'form-feedback';
            field.classList.remove('error');
            field.classList.add('valid');
        } else {
            feedback.textContent = message;
            feedback.className = 'form-feedback error';
            field.classList.remove('valid');
            field.classList.add('error');
        }
    }
    
    return isValid;
}

function clearFieldError(event) {
    const field = event.target;
    const feedback = field.parentNode.querySelector('.form-feedback');
    
    if (field.classList.contains('error')) {
        field.classList.remove('error');
        if (feedback) {
            feedback.textContent = '';
            feedback.className = 'form-feedback';
        }
    }
}

function validateCurrentStep() {
    const currentStepElement = document.querySelector(`#step${app.currentStep}`);
    if (!currentStepElement) return false;
    
    const inputs = currentStepElement.querySelectorAll('.form-control[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField({target: input})) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        showToast('Please fill in all required fields correctly', 'error');
    }
    
    return isValid;
}

function clearFormValidation() {
    const inputs = document.querySelectorAll('.form-control');
    inputs.forEach(input => {
        input.classList.remove('error', 'valid');
    });
    
    const feedbacks = document.querySelectorAll('.form-feedback');
    feedbacks.forEach(feedback => {
        feedback.textContent = '';
        feedback.className = 'form-feedback';
    });
}

// Enhanced Registration Handling
function handleRegistration(e) {
    e.preventDefault();
    console.log('Processing enhanced registration...');
    
    if (!validateCurrentStep()) return;
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    setButtonLoading(submitBtn, true);
    
    setTimeout(() => {
        const type = document.getElementById('registrationModal').dataset.type;
        
        const newUser = {
            id: Date.now().toString(),
            name: document.getElementById('regName').value,
            email: document.getElementById('regEmail').value,
            phone: document.getElementById('regPhone').value,
            bloodType: document.getElementById('regBloodType').value,
            role: type,
            location: {
                city: document.getElementById('regCity').value,
                state: document.getElementById('regState').value,
                coordinates: {lat: 12.9716, lng: 77.5946}
            },
            age: parseInt(document.getElementById('regAge').value),
            gender: document.getElementById('regGender').value,
            verified: {email: false, phone: false, medical: false},
            badges: [],
            availability: type === 'donor',
            donationCount: 0,
            profileCompletion: 60,
            healthScore: 85
        };
        
        // Add to users array
        app.users.push(newUser);
        
        // Auto-login the new user
        app.currentUser = newUser;
        
        setButtonLoading(submitBtn, false);
        hideRegistration();
        updateAuthButton();
        showSectionWithTransition('dashboard');
        showToast('Registration successful! Welcome to BloodConnect!', 'success');
        
        // Show onboarding tips
        setTimeout(() => {
            showOnboardingTips();
        }, 1500);
        
    }, 2000);
}

// Onboarding Tips
function showOnboardingTips() {
    showToast('Complete your profile to increase your health score and help others find you easily', 'info');
}

// Enhanced Dashboard Updates
function updateDashboard() {
    if (!app.currentUser) return;
    
    console.log('Updating enhanced dashboard for:', app.currentUser.name);
    
    const dashboardTitle = document.getElementById('dashboardTitle');
    if (dashboardTitle) {
        dashboardTitle.textContent = `Welcome back, ${app.currentUser.name}!`;
    }
    
    // Show appropriate dashboard
    const donorDashboard = document.getElementById('donorDashboard');
    const recipientDashboard = document.getElementById('recipientDashboard');
    
    if (app.currentUser.role === 'donor') {
        if (donorDashboard) donorDashboard.classList.remove('hidden');
        if (recipientDashboard) recipientDashboard.classList.add('hidden');
        updateDonorDashboard();
    } else {
        if (donorDashboard) donorDashboard.classList.add('hidden');
        if (recipientDashboard) recipientDashboard.classList.remove('hidden');
        updateRecipientDashboard();
    }
}

function updateDonorDashboard() {
    // Update statistics with animations
    updateDonorStats();
    
    // Update badges with floating animation
    updateUserBadges();
    
    // Update health score
    updateHealthScore();
    
    // Update availability toggle
    updateAvailabilityToggle();
    
    // Load recent activities
    updateRecentActivity();
}

function updateDonorStats() {
    const stats = {
        donationCount: app.currentUser.donationCount || 0,
        livesImpacted: (app.currentUser.donationCount || 0) * 3,
        nextEligible: calculateDaysToNextDonation()
    };
    
    Object.entries(stats).forEach(([key, value]) => {
        const element = document.getElementById(key);
        if (element) {
            // Animate counter
            animateCounter(element);
        }
    });
}

function calculateDaysToNextDonation() {
    if (!app.currentUser.lastDonation) return 0;
    
    const lastDate = new Date(app.currentUser.lastDonation);
    const nextDate = new Date(lastDate.getTime() + (56 * 24 * 60 * 60 * 1000));
    const today = new Date();
    const daysRemaining = Math.ceil((nextDate - today) / (24 * 60 * 60 * 1000));
    
    return Math.max(0, daysRemaining);
}

function updateUserBadges() {
    const badgesContainer = document.getElementById('userBadges');
    if (badgesContainer && app.currentUser.badges) {
        badgesContainer.innerHTML = '';
        
        app.currentUser.badges.forEach((badge, index) => {
            setTimeout(() => {
                const badgeElement = document.createElement('div');
                badgeElement.className = 'badge badge--gold floating';
                badgeElement.innerHTML = `
                    <i class="fas fa-trophy"></i>
                    <span>${badge}</span>
                `;
                badgeElement.style.animationDelay = `${index * 0.2}s`;
                badgesContainer.appendChild(badgeElement);
            }, index * 200);
        });
    }
}

function updateHealthScore() {
    const scoreElement = document.getElementById('healthScore');
    const scoreCircle = document.querySelector('.score-circle');
    
    if (scoreElement && app.currentUser.healthScore) {
        scoreElement.textContent = app.currentUser.healthScore;
        
        if (scoreCircle) {
            const percentage = app.currentUser.healthScore;
            scoreCircle.style.background = `conic-gradient(#4CAF50 ${percentage}%, var(--color-border) ${percentage}%)`;
        }
    }
}

function updateAvailabilityToggle() {
    const toggle = document.getElementById('availabilityToggle');
    if (toggle) {
        toggle.checked = app.currentUser.availability || false;
    }
}

function updateRecentActivity() {
    // This would typically fetch from an API
    // For demo, we'll show some sample activities
    const activities = [
        {
            type: 'donation',
            title: 'Blood Donation',
            description: 'Successfully donated at City Hospital',
            time: '2 days ago',
            icon: 'fas fa-tint'
        },
        {
            type: 'badge',
            title: 'Achievement Unlocked',
            description: 'Earned "Life Saver" badge',
            time: '5 days ago',
            icon: 'fas fa-trophy'
        }
    ];
    
    // Update timeline would go here
}

function updateRecipientDashboard() {
    // Update current request info
    const currentRequestEl = document.getElementById('currentRequest');
    if (currentRequestEl && app.currentUser.currentRequest) {
        const request = app.currentUser.currentRequest;
        currentRequestEl.innerHTML = `
            <div class="request-status">
                <div class="blood-type-display">
                    <div class="blood-icon">
                        <i class="fas fa-tint"></i>
                    </div>
                    <span class="blood-type">${request.bloodType}</span>
                </div>
                <div class="urgency-indicator">
                    <span class="status status--warning pulse">${request.urgency} Priority</span>
                </div>
            </div>
            <div class="request-info">
                <p><i class="fas fa-calendar"></i> Date Needed: ${new Date(request.date).toLocaleDateString()}</p>
                <p><i class="fas fa-vial"></i> Units Required: 2</p>
                <p><i class="fas fa-hospital"></i> Location: Apollo Hospital</p>
            </div>
            <div class="request-actions">
                <button class="btn btn--primary" onclick="updateRequest()">
                    <i class="fas fa-edit"></i>
                    Update Request
                </button>
                <button class="btn btn--emergency heartbeat-btn" onclick="triggerEmergency()">
                    <i class="fas fa-exclamation-triangle"></i>
                    Mark Urgent
                </button>
            </div>
        `;
    }
    
    // Load matched donors
    loadMatchedDonors();
}

function loadMatchedDonors() {
    if (!app.currentUser.currentRequest) return;
    
    const recipientBloodType = app.currentUser.currentRequest.bloodType;
    const compatibleDonors = app.users.filter(user => {
        if (user.role !== 'donor' || !user.availability) return false;
        if (user.location.city !== app.currentUser.location.city) return false;
        
        // Check blood compatibility - donors can give to recipients
        const donorCanGiveTo = app.bloodCompatibility[user.bloodType] || [];
        return donorCanGiveTo.includes(recipientBloodType);
    });
    
    const container = document.getElementById('matchedDonors');
    if (container) {
        container.innerHTML = '';
        
        compatibleDonors.forEach((donor, index) => {
            setTimeout(() => {
                const donorElement = document.createElement('div');
                donorElement.className = 'donor-match';
                donorElement.style.opacity = '0';
                donorElement.style.transform = 'translateY(20px)';
                
                donorElement.innerHTML = `
                    <div class="donor-info">
                        <h4>${donor.name}</h4>
                        <p>Blood Type: ${donor.bloodType}, Distance: ${Math.floor(Math.random() * 5) + 1}km</p>
                        <p>Last Donation: ${new Date(donor.lastDonation).toLocaleDateString()}</p>
                    </div>
                    <button class="btn btn--primary btn--sm" onclick="contactDonor('${donor.id}')">
                        <i class="fas fa-comment"></i>
                        Contact
                    </button>
                `;
                
                container.appendChild(donorElement);
                
                // Animate in
                setTimeout(() => {
                    donorElement.style.opacity = '1';
                    donorElement.style.transform = 'translateY(0)';
                    donorElement.style.transition = 'all 0.5s ease-out';
                }, 50);
                
            }, index * 200);
        });
    }
}

// Enhanced Availability Toggle
function toggleAvailability() {
    if (app.currentUser && app.currentUser.role === 'donor') {
        const toggle = document.getElementById('availabilityToggle');
        app.currentUser.availability = toggle.checked;
        
        const message = app.currentUser.availability ? 
            'You are now available for donations' : 
            'You are now unavailable for donations';
        
        showToast(message, 'success');
        
        // Update any UI that depends on availability
        updateAvailabilityStatus();
    }
}

function updateAvailabilityStatus() {
    // This would update various UI elements that show availability status
    console.log('Availability status updated');
}

// Enhanced Search Functions
function setupSearchDebouncing() {
    const searchInputs = document.querySelectorAll('#searchCity, #searchBloodType');
    let searchTimeout;
    
    searchInputs.forEach(input => {
        input.addEventListener('input', () => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                if (app.currentSection === 'find-donors') {
                    searchDonors();
                }
            }, 500);
        });
    });
}

function searchDonors() {
    const searchBtn = document.querySelector('.search-btn');
    setButtonLoading(searchBtn, true);
    
    // Simulate API delay
    setTimeout(() => {
        const bloodType = document.getElementById('searchBloodType').value;
        const city = document.getElementById('searchCity').value.toLowerCase();
        const distance = parseInt(document.getElementById('searchDistance').value);
        
        let filteredDonors = app.users.filter(user => user.role === 'donor');
        
        if (bloodType) {
            // For search, we want donors whose blood can be given to the recipient
            filteredDonors = filteredDonors.filter(donor => {
                const donorCanGiveTo = app.bloodCompatibility[donor.bloodType] || [];
                return donorCanGiveTo.includes(bloodType);
            });
        }
        
        if (city) {
            filteredDonors = filteredDonors.filter(donor => 
                donor.location.city.toLowerCase().includes(city)
            );
        }
        
        displayDonorsWithAnimation(filteredDonors);
        setButtonLoading(searchBtn, false);
        
        // Update results count
        const resultsCount = document.getElementById('resultsCount');
        if (resultsCount) {
            resultsCount.textContent = `${filteredDonors.length} Compatible Donors Found`;
        }
        
        showToast(`Found ${filteredDonors.length} compatible donors`, 'success');
    }, 1000);
}

function loadDonors() {
    displayDonorsWithAnimation(app.users.filter(user => user.role === 'donor'));
}

function displayDonorsWithAnimation(donors) {
    const container = document.getElementById('donorsGrid');
    if (!container) return;
    
    // Clear existing donors with fade out
    const existingCards = container.querySelectorAll('.donor-card');
    existingCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.9)';
    });
    
    setTimeout(() => {
        container.innerHTML = '';
        
        donors.forEach((donor, index) => {
            setTimeout(() => {
                const donorElement = createDonorCard(donor);
                container.appendChild(donorElement);
                
                // Animate in
                requestAnimationFrame(() => {
                    donorElement.style.opacity = '1';
                    donorElement.style.transform = 'translateY(0) scale(1)';
                });
            }, index * 100);
        });
    }, 300);
}

function createDonorCard(donor) {
    const donorElement = document.createElement('div');
    donorElement.className = 'donor-card';
    donorElement.style.opacity = '0';
    donorElement.style.transform = 'translateY(30px) scale(0.9)';
    donorElement.style.transition = 'all 0.6s ease-out';
    
    const badges = (donor.badges || []).map(badge => 
        `<span class="badge badge--small"><i class="fas fa-trophy"></i> ${badge}</span>`
    ).join('');
    
    const verifiedBadge = donor.verified.email && donor.verified.phone ? 
        '<span class="badge badge--small"><i class="fas fa-check-circle"></i> Verified</span>' : '';
    
    const healthScore = donor.healthScore ? 
        `<div class="health-indicator">
            <i class="fas fa-heartbeat"></i>
            <span>Health Score: ${donor.healthScore}%</span>
        </div>` : '';
    
    donorElement.innerHTML = `
        <div class="donor-info">
            <h3><i class="fas fa-user-circle"></i> ${donor.name}</h3>
            <div class="donor-details">
                <span class="blood-type-badge">${donor.bloodType}</span>
                <span class="location"><i class="fas fa-map-marker-alt"></i> ${donor.location.city}</span>
                <span class="distance"><i class="fas fa-route"></i> ${Math.floor(Math.random() * 10) + 1}km away</span>
            </div>
            <div class="donor-badges">
                ${verifiedBadge}
                ${badges}
            </div>
            ${healthScore}
            <div class="availability">
                <span class="status ${donor.availability ? 'status--success' : 'status--warning'}">
                    <i class="fas fa-circle"></i>
                    ${donor.availability ? 'Available' : 'Unavailable'}
                </span>
                <span class="last-donation"><i class="fas fa-calendar"></i> Last donation: ${new Date(donor.lastDonation).toLocaleDateString()}</span>
            </div>
        </div>
        <div class="donor-actions">
            <button class="btn btn--primary btn--sm pulse-on-hover" onclick="contactDonor('${donor.id}')">
                <i class="fas fa-comment"></i>
                Contact
            </button>
            <button class="btn btn--secondary btn--sm" onclick="viewProfile('${donor.id}')">
                <i class="fas fa-eye"></i>
                View Profile
            </button>
        </div>
    `;
    
    return donorElement;
}

// Sort Donors
function sortDonors() {
    const sortBy = document.getElementById('sortBy').value;
    const container = document.getElementById('donorsGrid');
    const donorCards = Array.from(container.children);
    
    // Add loading state
    container.style.opacity = '0.6';
    container.style.pointerEvents = 'none';
    
    setTimeout(() => {
        // Sort logic would go here based on sortBy value
        // For demo, we'll just shuffle the cards
        
        donorCards.forEach(card => {
            card.style.transform = 'scale(0.95)';
        });
        
        setTimeout(() => {
            donorCards.forEach(card => {
                card.style.transform = 'scale(1)';
            });
            
            container.style.opacity = '1';
            container.style.pointerEvents = 'auto';
        }, 300);
        
    }, 500);
}

// Enhanced Emergency Functions
function triggerEmergency() {
    console.log('Triggering enhanced emergency modal...');
    const modal = document.getElementById('emergencyModal');
    if (modal) {
        modal.classList.remove('hidden');
        
        // Add dramatic entry animation
        const content = modal.querySelector('.modal__content');
        content.style.transform = 'scale(0.8) translateY(50px)';
        content.style.opacity = '0';
        
        setTimeout(() => {
            content.style.transform = 'scale(1) translateY(0)';
            content.style.opacity = '1';
        }, 100);
        
        console.log('Enhanced emergency modal shown');
    } else {
        console.error('Emergency modal not found');
    }
}

function hideEmergency() {
    const modal = document.getElementById('emergencyModal');
    if (modal) {
        const content = modal.querySelector('.modal__content');
        content.style.transform = 'scale(0.9)';
        content.style.opacity = '0';
        
        setTimeout(() => {
            modal.classList.add('hidden');
            
            // Reset form
            const form = document.getElementById('emergencyForm');
            if (form) {
                form.reset();
            }
        }, 300);
    }
}

function handleEmergencySubmit(e) {
    e.preventDefault();
    console.log('Processing enhanced emergency request...');
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    setButtonLoading(submitBtn, true);
    
    // Simulate emergency alert processing
    setTimeout(() => {
        const emergencyRequest = {
            id: Date.now().toString(),
            patientName: document.getElementById('emergencyPatient').value,
            bloodType: document.getElementById('emergencyBloodType').value,
            location: document.getElementById('emergencyLocation').value,
            unitsNeeded: parseInt(document.getElementById('emergencyUnits').value),
            contact: document.getElementById('emergencyContact').value,
            urgency: 'critical',
            requestedAt: new Date().toISOString(),
            requesterId: app.currentUser ? app.currentUser.id : null
        };
        
        app.emergencyRequests.push(emergencyRequest);
        
        setButtonLoading(submitBtn, false);
        hideEmergency();
        
        // Show success with dramatic animation
        showToast('🚨 Emergency alert sent to all compatible donors!', 'success');
        
        // Simulate donor notifications
        setTimeout(() => {
            showToast('3 donors have responded to your emergency request', 'info');
        }, 2000);
        
        setTimeout(() => {
            showToast('Dr. Priya Sharma is on the way to your location', 'success');
        }, 4000);
        
    }, 3000);
}

// Respond to Emergency
function respondToEmergency() {
    showLoadingOverlay('Connecting you with the patient...', 2000);
    
    setTimeout(() => {
        hideLoadingOverlay();
        showToast('You have successfully responded to the emergency request!', 'success');
        
        // Open chat or call functionality
        setTimeout(() => {
            const donor = app.users.find(u => u.id === '2'); // Priya Sharma
            if (donor) {
                showChat(donor);
            }
        }, 1000);
    }, 2000);
}

function viewEmergencyDetails() {
    alert('Emergency Details:\n\nPatient: Critical Case #001\nBlood Type: O- Negative\nLocation: Apollo Hospital\nContact: +919876543999\n\nImmediate assistance required!');
}

// Enhanced Communication Functions
function contactDonor(donorId) {
    console.log('Enhanced donor contact:', donorId);
    
    showLoadingOverlay('Establishing connection...', 1000);
    
    setTimeout(() => {
        const donor = app.users.find(u => u.id === donorId);
        if (donor) {
            hideLoadingOverlay();
            showChat(donor);
        } else {
            hideLoadingOverlay();
            showToast('Error: Donor not found', 'error');
        }
    }, 1000);
}

function showChat(donor) {
    console.log('Showing enhanced chat with:', donor.name);
    const modal = document.getElementById('chatModal');
    const title = document.getElementById('chatTitle');
    
    if (modal && title) {
        title.innerHTML = `<i class="fas fa-comments"></i> Chat with ${donor.name}`;
        modal.classList.remove('hidden');
        
        // Add entry animation
        const content = modal.querySelector('.modal__content');
        content.style.transform = 'translateY(50px)';
        content.style.opacity = '0';
        
        setTimeout(() => {
            content.style.transform = 'translateY(0)';
            content.style.opacity = '1';
        }, 100);
        
        // Load existing messages
        loadChatMessagesWithAnimation(donor.id);
    }
}

function hideChat() {
    const modal = document.getElementById('chatModal');
    if (modal) {
        const content = modal.querySelector('.modal__content');
        content.style.transform = 'translateY(30px)';
        content.style.opacity = '0';
        
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);
    }
}

function loadChatMessagesWithAnimation(donorId) {
    const container = document.getElementById('chatMessages');
    if (!container) return;
    
    // Clear existing messages
    container.innerHTML = '';
    
    // Sample messages for demo
    const sampleMessages = [
        {
            type: 'received',
            message: 'Hello! I saw your blood request. I\'m available to help.',
            time: '2:30 PM',
            avatar: 'fas fa-user-circle'
        },
        {
            type: 'sent',
            message: 'Thank you so much! When would be convenient for you?',
            time: '2:32 PM'
        },
        {
            type: 'received',
            message: 'I can come to the hospital tomorrow morning around 10 AM. Is that okay?',
            time: '2:35 PM',
            avatar: 'fas fa-user-circle'
        },
        {
            type: 'received',
            message: 'I have all my medical certificates ready and I\'m a regular donor.',
            time: '2:36 PM',
            avatar: 'fas fa-user-circle'
        }
    ];
    
    sampleMessages.forEach((msg, index) => {
        setTimeout(() => {
            const messageElement = document.createElement('div');
            messageElement.className = `message message--${msg.type}`;
            messageElement.style.opacity = '0';
            messageElement.style.transform = 'translateY(20px)';
            
            messageElement.innerHTML = `
                ${msg.avatar ? `<div class="message-avatar"><i class="${msg.avatar}"></i></div>` : ''}
                <div class="message-content">
                    <p>${msg.message}</p>
                    <span class="message-time">${msg.time}</span>
                </div>
            `;
            
            container.appendChild(messageElement);
            
            // Animate in
            setTimeout(() => {
                messageElement.style.opacity = '1';
                messageElement.style.transform = 'translateY(0)';
                messageElement.style.transition = 'all 0.3s ease-out';
            }, 50);
            
            // Scroll to bottom
            container.scrollTop = container.scrollHeight;
        }, index * 300);
    });
}

function sendMessage() {
    const input = document.getElementById('messageInput');
    if (!input) return;
    
    const message = input.value.trim();
    
    if (message) {
        const container = document.getElementById('chatMessages');
        if (container) {
            const messageElement = document.createElement('div');
            messageElement.className = 'message message--sent';
            messageElement.style.opacity = '0';
            messageElement.style.transform = 'translateY(20px)';
            
            messageElement.innerHTML = `
                <div class="message-content">
                    <p>${message}</p>
                    <span class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                </div>
            `;
            
            container.appendChild(messageElement);
            
            // Animate in
            setTimeout(() => {
                messageElement.style.opacity = '1';
                messageElement.style.transform = 'translateY(0)';
                messageElement.style.transition = 'all 0.3s ease-out';
            }, 50);
            
            container.scrollTop = container.scrollHeight;
            input.value = '';
            
            // Add typing indicator
            showTypingIndicator();
            
            // Simulate response after 2 seconds
            setTimeout(() => {
                hideTypingIndicator();
                const responseElement = document.createElement('div');
                responseElement.className = 'message message--received';
                responseElement.innerHTML = `
                    <div class="message-avatar"><i class="fas fa-user-circle"></i></div>
                    <div class="message-content">
                        <p>Thanks for your message! I'll be there on time. See you tomorrow!</p>
                        <span class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                `;
                container.appendChild(responseElement);
                container.scrollTop = container.scrollHeight;
            }, 2000);
        }
    }
}

function showTypingIndicator() {
    const container = document.getElementById('chatMessages');
    const indicator = document.createElement('div');
    indicator.className = 'typing-indicator';
    indicator.innerHTML = `
        <div class="message message--received">
            <div class="message-avatar"><i class="fas fa-user-circle"></i></div>
            <div class="message-content">
                <div class="typing-dots">
                    <span></span><span></span><span></span>
                </div>
            </div>
        </div>
    `;
    container.appendChild(indicator);
    container.scrollTop = container.scrollHeight;
}

function hideTypingIndicator() {
    const indicator = document.querySelector('.typing-indicator');
    if (indicator) {
        indicator.remove();
    }
}

// Enhanced Profile Functions
function loadProfile() {
    if (!app.currentUser) return;
    
    const fields = {
        'profileName': app.currentUser.name,
        'profileEmail': app.currentUser.email,
        'profilePhone': app.currentUser.phone,
        'profileBloodType': app.currentUser.bloodType,
        'profileCity': app.currentUser.location.city
    };
    
    Object.entries(fields).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) element.value = value;
    });
    
    // Update profile completion
    updateProfileCompletion();
    
    // Update verification status with animations
    updateVerificationStatus();
}

function updateProfileCompletion() {
    if (!app.currentUser) return;
    
    const completion = app.currentUser.profileCompletion || 60;
    const circle = document.querySelector('.completion-circle');
    const text = document.querySelector('.completion-text');
    
    if (circle && text) {
        circle.style.background = `conic-gradient(#4CAF50 ${completion}%, var(--color-border) ${completion}%)`;
        text.textContent = `${completion}%`;
    }
}

function updateVerificationStatus() {
    const verificationItems = document.querySelectorAll('.verification-item');
    
    verificationItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
                item.style.transition = 'all 0.5s ease-out';
            }, 50);
        }, index * 200);
    });
}

function editProfile() {
    const formInputs = document.querySelectorAll('#profileForm input:not([readonly])');
    const button = document.querySelector('#profileForm button');
    
    if (!button) return;
    
    const isEditing = button.innerHTML.includes('Save');
    
    if (isEditing) {
        setButtonLoading(button, true);
        
        // Simulate save delay
        setTimeout(() => {
            // Save changes
            if (app.currentUser) {
                const phoneEl = document.getElementById('profilePhone');
                const cityEl = document.getElementById('profileCity');
                
                if (phoneEl) app.currentUser.phone = phoneEl.value;
                if (cityEl) app.currentUser.location.city = cityEl.value;
            }
            
            formInputs.forEach(input => input.setAttribute('readonly', true));
            button.innerHTML = '<i class="fas fa-edit"></i> Edit Profile';
            
            setButtonLoading(button, false);
            showToast('Profile updated successfully!', 'success');
            
            // Update profile completion
            if (app.currentUser) {
                app.currentUser.profileCompletion = Math.min(100, app.currentUser.profileCompletion + 5);
                updateProfileCompletion();
            }
        }, 1500);
    } else {
        // Enable editing
        formInputs.forEach(input => {
            input.removeAttribute('readonly');
            input.style.borderColor = '#DC143C';
            setTimeout(() => {
                input.style.borderColor = '';
            }, 300);
        });
        button.innerHTML = '<i class="fas fa-save"></i> Save Changes';
    }
}

function viewProfile(donorId) {
    const donor = app.users.find(u => u.id === donorId);
    if (donor) {
        const profileInfo = `
Profile: ${donor.name}
Blood Type: ${donor.bloodType}
City: ${donor.location.city}
Total Donations: ${donor.donationCount || 0}
Health Score: ${donor.healthScore || 'N/A'}%
Verified: ${donor.verified.email ? 'Yes' : 'No'}
Badges: ${donor.badges ? donor.badges.join(', ') : 'None'}
        `;
        alert(profileInfo);
    }
}

// Enhanced Blood Camps
function loadBloodCamps() {
    console.log('Enhanced blood camps loaded');
    animateCampCards();
}

function animateCampCards() {
    const campCards = document.querySelectorAll('.camp-card');
    campCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) scale(0.9)';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
            card.style.transition = 'all 0.8s ease-out';
        }, index * 200);
    });
}

// Health Tips Carousel
function initializeHealthTips() {
    let currentTip = 0;
    const tips = document.querySelectorAll('.tip-card');
    const indicators = document.querySelectorAll('.indicator');
    
    // Auto-rotate tips
    setInterval(() => {
        showTip((currentTip + 1) % tips.length);
    }, 5000);
}

function showTip(index) {
    const tips = document.querySelectorAll('.tip-card');
    const indicators = document.querySelectorAll('.indicator');
    
    tips.forEach((tip, i) => {
        if (i === index) {
            tip.classList.add('active');
            tip.style.transform = 'scale(1) translateX(0)';
        } else {
            tip.classList.remove('active');
            tip.style.transform = 'scale(0.9) translateX(' + (i < index ? '-20px' : '20px') + ')';
        }
    });
    
    indicators.forEach((indicator, i) => {
        if (i === index) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// Floating Action Buttons
function openQuickChat() {
    showToast('Quick chat feature coming soon!', 'info');
}

function openHelp() {
    showToast('Help & Support: Contact us at support@bloodconnect.com', 'info');
}

// Enhanced Toast Notifications
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    const messageEl = toast.querySelector('.toast-message');
    const icon = toast.querySelector('.toast-icon i');
    
    if (toast && messageEl && icon) {
        messageEl.textContent = message;
        
        // Update icon based on type
        switch(type) {
            case 'success':
                icon.className = 'fas fa-check-circle';
                icon.style.color = '#4CAF50';
                break;
            case 'error':
                icon.className = 'fas fa-exclamation-circle';
                icon.style.color = '#FF4444';
                break;
            case 'info':
                icon.className = 'fas fa-info-circle';
                icon.style.color = '#2196F3';
                break;
            default:
                icon.className = 'fas fa-bell';
                icon.style.color = '#FF9800';
        }
        
        toast.classList.remove('hidden');
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            hideToast();
        }, 5000);
    }
}

function hideToast() {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.classList.add('hidden');
    }
}

// Loading States and Overlays
function showLoadingOverlay(message = 'Processing...', duration = 2000) {
    const overlay = document.getElementById('loadingOverlay');
    const messageEl = overlay.querySelector('p');
    
    if (overlay && messageEl) {
        messageEl.textContent = message;
        overlay.classList.remove('hidden');
        
        if (duration > 0) {
            setTimeout(() => {
                hideLoadingOverlay();
            }, duration);
        }
    }
}

function hideLoadingOverlay() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.classList.add('hidden');
    }
}

function setButtonLoading(button, isLoading) {
    if (!button) return;
    
    const loader = button.querySelector('.btn-loader');
    const text = button.querySelector('.btn-text, span');
    
    if (isLoading) {
        button.classList.add('loading');
        button.disabled = true;
        if (loader) loader.classList.remove('hidden');
        if (text) text.style.opacity = '0';
    } else {
        button.classList.remove('loading');
        button.disabled = false;
        if (loader) loader.classList.add('hidden');
        if (text) text.style.opacity = '1';
    }
}

// Floating Animations Setup
function setupFloatingAnimations() {
    const floatingElements = document.querySelectorAll('.floating');
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.5}s`;
    });
}

// Utility Functions
function updateRequest() {
    showToast('Request update feature coming soon!', 'info');
}

// Global functions for inline event handlers
window.showSection = showSection;
window.showSectionWithTransition = showSectionWithTransition;
window.showAuth = showAuth;
window.showRegistration = showRegistration;
window.hideRegistration = hideRegistration;
window.nextStep = nextStep;
window.prevStep = prevStep;
window.triggerEmergency = triggerEmergency;
window.hideEmergency = hideEmergency;
window.respondToEmergency = respondToEmergency;
window.viewEmergencyDetails = viewEmergencyDetails;
window.toggleAvailability = toggleAvailability;
window.searchDonors = searchDonors;
window.sortDonors = sortDonors;
window.contactDonor = contactDonor;
window.hideChat = hideChat;
window.sendMessage = sendMessage;
window.viewProfile = viewProfile;
window.editProfile = editProfile;
window.updateRequest = updateRequest;
window.showTip = showTip;
window.openQuickChat = openQuickChat;
window.openHelp = openHelp;
window.hideToast = hideToast;

console.log('Enhanced BloodConnect JavaScript loaded successfully with animations and health features');
