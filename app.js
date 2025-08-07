// BloodConnect Platform JavaScript

// Global application state
const app = {
    currentUser: null,
    currentSection: 'home',
    users: [],
    bloodCamps: [],
    emergencyRequests: [],
    chatMessages: {},
    bloodCompatibility: {}
};

// Sample data initialization
const sampleData = {
    users: [
        {
            id: "1",
            name: "Rajesh Kumar",
            email: "rajesh@email.com",
            phone: "+919876543210",
            bloodType: "O+",
            role: "donor",
            location: {city: "Bengaluru", state: "Karnataka", coordinates: {lat: 12.9716, lng: 77.5946}},
            age: 28,
            gender: "Male",
            verified: {email: true, phone: true, medical: true},
            badges: ["First Donor", "Life Saver"],
            availability: true,
            lastDonation: "2025-05-01",
            nextEligibleDate: "2025-08-26",
            donationCount: 5
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
            badges: ["Regular Donor"],
            availability: true,
            lastDonation: "2025-06-15",
            nextEligibleDate: "2025-08-10",
            donationCount: 3
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
            verified: {email: true, phone: false, medical: false},
            currentRequest: {bloodType: "B+", urgency: "high", date: "2025-08-07"}
        }
    ],
    bloodCamps: [
        {
            id: "1",
            name: "City Hospital Blood Drive",
            date: "2025-08-15",
            time: "09:00-17:00",
            location: {address: "MG Road, Bengaluru", coordinates: {lat: 12.9753, lng: 77.6047}},
            organizer: "City Hospital",
            slotsAvailable: 25
        },
        {
            id: "2",
            name: "Corporate Wellness Camp",
            date: "2025-08-20",
            time: "10:00-16:00",
            location: {address: "Electronic City, Bengaluru", coordinates: {lat: 12.8456, lng: 77.6643}},
            organizer: "Tech Corp",
            slotsAvailable: 15
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
            unitsNeeded: 2
        }
    ]
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
});

function initializeApp() {
    // Load sample data
    app.users = [...sampleData.users];
    app.bloodCamps = [...sampleData.bloodCamps];
    app.bloodCompatibility = {...sampleData.bloodCompatibility};
    app.emergencyRequests = [...sampleData.emergencyRequests];
    
    // Check if user is logged in (simulate with first user for demo)
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        app.currentUser = JSON.parse(savedUser);
        updateAuthButton();
        showSection('dashboard');
    } else {
        // Auto-login first user for demo purposes
        app.currentUser = app.users[0];
        localStorage.setItem('currentUser', JSON.stringify(app.currentUser));
        updateAuthButton();
        showSection('home');
    }
    
    updateDashboard();
}

function setupEventListeners() {
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
}

// Navigation functions
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.add('hidden'));
    
    // Show requested section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.remove('hidden');
        app.currentSection = sectionId;
    }
    
    // Update navigation active state
    updateNavigation(sectionId);
    
    // Load section-specific data
    switch(sectionId) {
        case 'dashboard':
            updateDashboard();
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
    }
}

function updateNavigation(activeSection) {
    const navLinks = document.querySelectorAll('.nav__list a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${activeSection}`) {
            link.classList.add('active');
        }
    });
}

// Authentication functions
function showAuth() {
    if (app.currentUser) {
        // Logout
        app.currentUser = null;
        localStorage.removeItem('currentUser');
        updateAuthButton();
        showSection('home');
        showMessage('Logged out successfully', 'success');
    } else {
        // For demo, auto-login as first user
        app.currentUser = app.users[0];
        localStorage.setItem('currentUser', JSON.stringify(app.currentUser));
        updateAuthButton();
        showSection('dashboard');
        showMessage(`Welcome back, ${app.currentUser.name}!`, 'success');
    }
}

function updateAuthButton() {
    const authBtn = document.getElementById('authBtn');
    if (app.currentUser) {
        authBtn.textContent = 'Logout';
        authBtn.classList.remove('btn--secondary');
        authBtn.classList.add('btn--outline');
    } else {
        authBtn.textContent = 'Login';
        authBtn.classList.remove('btn--outline');
        authBtn.classList.add('btn--secondary');
    }
}

// Registration functions
function showRegistration(type) {
    const modal = document.getElementById('registrationModal');
    const title = document.getElementById('registrationTitle');
    
    title.textContent = type === 'donor' ? 'Register as Donor' : 'Register as Recipient';
    modal.classList.remove('hidden');
    modal.dataset.type = type;
}

function hideRegistration() {
    const modal = document.getElementById('registrationModal');
    modal.classList.add('hidden');
    
    // Reset form
    const form = document.getElementById('registrationForm');
    form.reset();
}

function handleRegistration(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
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
            state: "Karnataka",
            coordinates: {lat: 12.9716, lng: 77.5946}
        },
        age: parseInt(document.getElementById('regAge').value),
        gender: document.getElementById('regGender').value,
        verified: {email: false, phone: false, medical: false},
        badges: [],
        availability: type === 'donor',
        donationCount: 0
    };
    
    // Add to users array
    app.users.push(newUser);
    
    // Auto-login the new user
    app.currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(app.currentUser));
    
    hideRegistration();
    updateAuthButton();
    showSection('dashboard');
    showMessage('Registration successful! Welcome to BloodConnect!', 'success');
}

// Dashboard functions
function updateDashboard() {
    if (!app.currentUser) return;
    
    const dashboardTitle = document.getElementById('dashboardTitle');
    dashboardTitle.textContent = `Welcome back, ${app.currentUser.name}!`;
    
    // Show appropriate dashboard
    const donorDashboard = document.getElementById('donorDashboard');
    const recipientDashboard = document.getElementById('recipientDashboard');
    
    if (app.currentUser.role === 'donor') {
        donorDashboard.classList.remove('hidden');
        recipientDashboard.classList.add('hidden');
        updateDonorDashboard();
    } else {
        donorDashboard.classList.add('hidden');
        recipientDashboard.classList.remove('hidden');
        updateRecipientDashboard();
    }
}

function updateDonorDashboard() {
    // Update statistics
    document.getElementById('donationCount').textContent = app.currentUser.donationCount || 0;
    document.getElementById('livesImpacted').textContent = (app.currentUser.donationCount || 0) * 3;
    
    // Calculate next eligible date
    if (app.currentUser.lastDonation) {
        const lastDate = new Date(app.currentUser.lastDonation);
        const nextDate = new Date(lastDate.getTime() + (56 * 24 * 60 * 60 * 1000)); // 56 days later
        const today = new Date();
        const daysRemaining = Math.ceil((nextDate - today) / (24 * 60 * 60 * 1000));
        document.getElementById('nextEligible').textContent = Math.max(0, daysRemaining);
    }
    
    // Update badges
    const badgesContainer = document.getElementById('userBadges');
    badgesContainer.innerHTML = '';
    if (app.currentUser.badges) {
        app.currentUser.badges.forEach(badge => {
            const badgeElement = document.createElement('span');
            badgeElement.className = 'badge badge--gold';
            badgeElement.textContent = `🏆 ${badge}`;
            badgesContainer.appendChild(badgeElement);
        });
    }
    
    // Update availability button
    updateAvailabilityButton();
}

function updateRecipientDashboard() {
    // Update current request info
    const currentRequest = document.getElementById('currentRequest');
    if (app.currentUser.currentRequest) {
        const request = app.currentUser.currentRequest;
        currentRequest.innerHTML = `
            <p>Blood Type Needed: <strong>${request.bloodType}</strong></p>
            <p>Urgency: <span class="status status--warning">${request.urgency}</span></p>
            <p>Date Needed: ${new Date(request.date).toLocaleDateString()}</p>
            <button class="btn btn--primary" onclick="updateRequest()">Update Request</button>
        `;
    }
    
    // Load matched donors
    loadMatchedDonors();
}

function loadMatchedDonors() {
    if (!app.currentUser.currentRequest) return;
    
    const compatibleTypes = app.bloodCompatibility[app.currentUser.currentRequest.bloodType] || [];
    const matchedDonors = app.users.filter(user => 
        user.role === 'donor' && 
        compatibleTypes.includes(user.bloodType) && 
        user.availability &&
        user.location.city === app.currentUser.location.city
    );
    
    const container = document.getElementById('matchedDonors');
    container.innerHTML = '';
    
    matchedDonors.forEach(donor => {
        const donorElement = document.createElement('div');
        donorElement.className = 'donor-match';
        donorElement.innerHTML = `
            <div class="donor-info">
                <h4>${donor.name}</h4>
                <p>Blood Type: ${donor.bloodType}, Distance: ${Math.floor(Math.random() * 5) + 1}km</p>
                <p>Last Donation: ${new Date(donor.lastDonation).toLocaleDateString()}</p>
            </div>
            <button class="btn btn--primary btn--sm" onclick="contactDonor('${donor.id}')">Contact</button>
        `;
        container.appendChild(donorElement);
    });
}

function toggleAvailability() {
    if (app.currentUser && app.currentUser.role === 'donor') {
        app.currentUser.availability = !app.currentUser.availability;
        localStorage.setItem('currentUser', JSON.stringify(app.currentUser));
        updateAvailabilityButton();
        
        const message = app.currentUser.availability ? 
            'You are now available for donations' : 
            'You are now unavailable for donations';
        showMessage(message, 'success');
    }
}

function updateAvailabilityButton() {
    const btn = document.getElementById('availabilityBtn');
    if (app.currentUser && app.currentUser.role === 'donor') {
        if (app.currentUser.availability) {
            btn.textContent = 'Available for Donation';
            btn.classList.remove('btn--secondary');
            btn.classList.add('btn--primary');
        } else {
            btn.textContent = 'Currently Unavailable';
            btn.classList.remove('btn--primary');
            btn.classList.add('btn--secondary');
        }
    }
}

// Donor search functions
function searchDonors() {
    const bloodType = document.getElementById('searchBloodType').value;
    const city = document.getElementById('searchCity').value.toLowerCase();
    const distance = parseInt(document.getElementById('searchDistance').value);
    
    let filteredDonors = app.users.filter(user => user.role === 'donor');
    
    if (bloodType) {
        const compatibleTypes = app.bloodCompatibility[bloodType] || [];
        filteredDonors = filteredDonors.filter(donor => 
            compatibleTypes.includes(donor.bloodType)
        );
    }
    
    if (city) {
        filteredDonors = filteredDonors.filter(donor => 
            donor.location.city.toLowerCase().includes(city)
        );
    }
    
    displayDonors(filteredDonors);
}

function loadDonors() {
    displayDonors(app.users.filter(user => user.role === 'donor'));
}

function displayDonors(donors) {
    const container = document.getElementById('donorsGrid');
    container.innerHTML = '';
    
    donors.forEach(donor => {
        const donorElement = document.createElement('div');
        donorElement.className = 'donor-card';
        
        const badges = donor.badges.map(badge => 
            `<span class="badge badge--small">🏆 ${badge}</span>`
        ).join('');
        
        const verifiedBadge = donor.verified.email && donor.verified.phone ? 
            '<span class="badge badge--small">✓ Verified</span>' : '';
        
        donorElement.innerHTML = `
            <div class="donor-info">
                <h3>${donor.name}</h3>
                <div class="donor-details">
                    <span class="blood-type-badge">${donor.bloodType}</span>
                    <span class="location">📍 ${donor.location.city}</span>
                    <span class="distance">${Math.floor(Math.random() * 10) + 1}km away</span>
                </div>
                <div class="donor-badges">
                    ${verifiedBadge}
                    ${badges}
                </div>
                <div class="availability">
                    <span class="status ${donor.availability ? 'status--success' : 'status--warning'}">
                        ${donor.availability ? 'Available' : 'Unavailable'}
                    </span>
                    <span class="last-donation">Last donation: ${new Date(donor.lastDonation).toLocaleDateString()}</span>
                </div>
            </div>
            <div class="donor-actions">
                <button class="btn btn--primary btn--sm" onclick="contactDonor('${donor.id}')">Contact</button>
                <button class="btn btn--secondary btn--sm" onclick="viewProfile('${donor.id}')">View Profile</button>
            </div>
        `;
        
        container.appendChild(donorElement);
    });
}

// Emergency functions
function triggerEmergency() {
    const modal = document.getElementById('emergencyModal');
    modal.classList.remove('hidden');
}

function hideEmergency() {
    const modal = document.getElementById('emergencyModal');
    modal.classList.add('hidden');
    
    // Reset form
    const form = document.getElementById('emergencyForm');
    form.reset();
}

function handleEmergencySubmit(e) {
    e.preventDefault();
    
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
    
    hideEmergency();
    
    // Show success message with animation
    showMessage('🚨 Emergency alert sent to all compatible donors in your area!', 'success');
    
    // Simulate donor notifications
    setTimeout(() => {
        showMessage('3 donors have been notified and are responding to your emergency request', 'success');
    }, 2000);
}

// Communication functions
function contactDonor(donorId) {
    const donor = app.users.find(u => u.id === donorId);
    if (donor) {
        showChat(donor);
    }
}

function showChat(donor) {
    const modal = document.getElementById('chatModal');
    const title = document.getElementById('chatTitle');
    
    title.textContent = `Chat with ${donor.name}`;
    modal.classList.remove('hidden');
    
    // Load existing messages or create new conversation
    loadChatMessages(donor.id);
}

function hideChat() {
    const modal = document.getElementById('chatModal');
    modal.classList.add('hidden');
}

function loadChatMessages(donorId) {
    const container = document.getElementById('chatMessages');
    
    // Sample messages for demo
    const sampleMessages = [
        {
            type: 'received',
            message: 'Hello! I saw your blood request. I\'m available to help.',
            time: '2:30 PM'
        },
        {
            type: 'sent',
            message: 'Thank you so much! When would be convenient for you?',
            time: '2:32 PM'
        },
        {
            type: 'received',
            message: 'I can come to the hospital tomorrow morning around 10 AM. Is that okay?',
            time: '2:35 PM'
        }
    ];
    
    container.innerHTML = '';
    sampleMessages.forEach(msg => {
        const messageElement = document.createElement('div');
        messageElement.className = `message message--${msg.type}`;
        messageElement.innerHTML = `
            <p>${msg.message}</p>
            <span class="message-time">${msg.time}</span>
        `;
        container.appendChild(messageElement);
    });
    
    // Scroll to bottom
    container.scrollTop = container.scrollHeight;
}

function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    
    if (message) {
        const container = document.getElementById('chatMessages');
        const messageElement = document.createElement('div');
        messageElement.className = 'message message--sent';
        messageElement.innerHTML = `
            <p>${message}</p>
            <span class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
        `;
        
        container.appendChild(messageElement);
        container.scrollTop = container.scrollHeight;
        
        input.value = '';
        
        // Simulate response after 2 seconds
        setTimeout(() => {
            const responseElement = document.createElement('div');
            responseElement.className = 'message message--received';
            responseElement.innerHTML = `
                <p>Thanks for your message! I'll get back to you shortly.</p>
                <span class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
            `;
            container.appendChild(responseElement);
            container.scrollTop = container.scrollHeight;
        }, 2000);
    }
}

// Profile functions
function loadProfile() {
    if (!app.currentUser) return;
    
    document.getElementById('profileName').value = app.currentUser.name;
    document.getElementById('profileEmail').value = app.currentUser.email;
    document.getElementById('profilePhone').value = app.currentUser.phone;
    document.getElementById('profileBloodType').value = app.currentUser.bloodType;
    document.getElementById('profileCity').value = app.currentUser.location.city;
}

function editProfile() {
    const formInputs = document.querySelectorAll('#profileForm input:not([readonly])');
    const isEditing = formInputs[0].hasAttribute('readonly');
    
    if (isEditing) {
        // Enable editing
        formInputs.forEach(input => input.removeAttribute('readonly'));
        document.querySelector('#profileForm button').textContent = 'Save Changes';
    } else {
        // Save changes
        app.currentUser.phone = document.getElementById('profilePhone').value;
        app.currentUser.location.city = document.getElementById('profileCity').value;
        
        localStorage.setItem('currentUser', JSON.stringify(app.currentUser));
        
        formInputs.forEach(input => input.setAttribute('readonly', true));
        document.querySelector('#profileForm button').textContent = 'Edit Profile';
        
        showMessage('Profile updated successfully!', 'success');
    }
}

function viewProfile(donorId) {
    const donor = app.users.find(u => u.id === donorId);
    if (donor) {
        alert(`Profile: ${donor.name}\nBlood Type: ${donor.bloodType}\nCity: ${donor.location.city}\nDonations: ${donor.donationCount}\nVerified: ${donor.verified.email ? 'Yes' : 'No'}`);
    }
}

// Blood camps functions
function loadBloodCamps() {
    // Blood camps are already loaded in the HTML for this demo
    // In a real app, this would fetch from an API
}

// Utility functions
function showMessage(message, type = 'info') {
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `${type}-message`;
    messageElement.textContent = message;
    
    // Add to page
    const container = document.querySelector('.container');
    if (container) {
        container.insertBefore(messageElement, container.firstChild);
        
        // Remove after 5 seconds
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.parentNode.removeChild(messageElement);
            }
        }, 5000);
    }
}

function calculateCompatibility(donorBloodType, recipientBloodType) {
    const compatibleTypes = app.bloodCompatibility[donorBloodType] || [];
    return compatibleTypes.includes(recipientBloodType);
}

function calculateDistance(coord1, coord2) {
    // Simple distance calculation (in a real app, use proper geolocation APIs)
    const R = 6371; // Earth's radius in km
    const dLat = (coord2.lat - coord1.lat) * Math.PI / 180;
    const dLon = (coord2.lng - coord1.lng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(coord1.lat * Math.PI / 180) * Math.cos(coord2.lat * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

// Notification simulation
function sendNotification(title, message, type = 'info') {
    // In a real app, this would use the Notification API or push notifications
    console.log(`${type.toUpperCase()}: ${title} - ${message}`);
    
    // Show as in-app message for demo
    showMessage(`${title}: ${message}`, type === 'urgent' ? 'error' : 'success');
}

// Auto-update functions for real-time features
setInterval(() => {
    // Simulate real-time updates
    if (app.currentUser && app.currentSection === 'dashboard') {
        // Update dashboard occasionally
        if (Math.random() < 0.1) { // 10% chance every 5 seconds
            if (app.currentUser.role === 'donor') {
                // Simulate new request notification
                sendNotification('New Blood Request', 'Emergency request for O+ blood type nearby', 'urgent');
            }
        }
    }
}, 5000);

// Emergency alert simulation
function simulateEmergencyAlert() {
    if (app.currentUser && app.currentUser.role === 'donor' && app.currentUser.availability) {
        const alert = document.createElement('div');
        alert.className = 'emergency-banner';
        alert.style.cssText = `
            position: fixed;
            top: 80px;
            left: 0;
            right: 0;
            background: #B71C1C;
            color: white;
            padding: 16px;
            text-align: center;
            z-index: 999;
            animation: slideDown 0.3s ease;
        `;
        alert.innerHTML = `
            <strong>🚨 EMERGENCY ALERT:</strong> Critical blood request for ${app.currentUser.bloodType} - 
            <button onclick="this.parentNode.remove(); contactDonor('emergency')" style="background: white; color: #B71C1C; border: none; padding: 4px 12px; border-radius: 4px; margin-left: 8px;">RESPOND NOW</button>
            <button onclick="this.parentNode.remove()" style="background: transparent; color: white; border: 1px solid white; padding: 4px 12px; border-radius: 4px; margin-left: 8px;">DISMISS</button>
        `;
        
        document.body.appendChild(alert);
        
        // Add slideDown animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideDown {
                from { transform: translateY(-100%); }
                to { transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
        
        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (alert.parentNode) {
                alert.parentNode.removeChild(alert);
            }
        }, 10000);
    }
}

// Trigger emergency simulation randomly for demo
setTimeout(() => {
    if (Math.random() < 0.7) { // 70% chance
        simulateEmergencyAlert();
    }
}, 8000);

// Initialize availability status on page load
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        if (app.currentUser && app.currentUser.role === 'donor') {
            updateAvailabilityButton();
        }
    }, 1000);
});
