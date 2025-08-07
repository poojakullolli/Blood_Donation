// main.js

let users = [];

document.getElementById('registerTab').onclick = () => {
  document.getElementById('registrationSection').style.display = 'block';
  document.getElementById('searchSection').style.display = 'none';
};
document.getElementById('searchTab').onclick = () => {
  document.getElementById('registrationSection').style.display = 'none';
  document.getElementById('searchSection').style.display = 'block';
};

// Registration logic
document.getElementById('registrationForm').onsubmit = function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const role = document.getElementById('role').value;
  const bloodType = document.getElementById('bloodType').value;
  const location = document.getElementById('location').value.trim().toLowerCase();
  const medical = document.getElementById('medicalHistory').value.trim();

  users.push({
    name, role, bloodType, location, medical,
    available: true, badge: 0
  });

  document.getElementById('registerSuccess').innerHTML = '<div class="urgency-alert">Registration Successful!</div>';
  this.reset();

  setTimeout(() => {
    document.getElementById('registerSuccess').innerHTML = '';
  }, 2000);
};

// Blood compatibility (simplified; for demo)
function isCompatible(requested, donor) {
  if (requested === donor) return true;
  const compatibility = {
    'A+': ['A+', 'A-', 'O+', 'O-'],
    'A-': ['A-', 'O-'],
    'B+': ['B+', 'B-', 'O+', 'O-'],
    'B-': ['B-', 'O-'],
    'O+': ['O+', 'O-'],
    'O-': ['O-'],
    'AB+': ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    'AB-': ['A-', 'B-', 'AB-', 'O-']
  };
  return compatibility[requested]?.includes(donor);
}

// Search logic
document.getElementById('searchForm').onsubmit = function(e) {
  e.preventDefault();
  const bloodType = document.getElementById('searchBloodType').value;
  const location = document.getElementById('searchLocation').value.trim().toLowerCase();

  // Find donors
  const results = users.filter(
    user => user.role === 'donor' && user.available &&
    isCompatible(bloodType, user.bloodType) && user.location === location
  );

  let html = '';
  if (results.length === 0) {
    html = `<div class="urgency-alert">No donors found! Tap SOS for wider outreach.</div>`;
  } else {
    html = results.map(r => `
      <div class="result-card">
        <b>${r.name}</b> &mdash; Type: <span style="color:#b71c1c">${r.bloodType}</span>
        <br/>Location: ${r.location.charAt(0).toUpperCase() + r.location.slice(1)}
        <br/><small>${r.medical ? 'Medical: ' + r.medical : ''}</small>
        <div style="margin-top:0.5em">
          <button class="msg-btn" onclick="alert('In-app messaging coming soon!')">Message</button>
          <span class="badge" style="margin-left:1em; background:#ffc107; color:#b71c1c; padding:2px 8px; border-radius:12px;">Donor Badge</span>
        </div>
      </div>
    `).join('');
  }

  document.getElementById('searchResults').innerHTML = html;

  // Minimalist demo "map"
  let mapHtml = `<div style="padding:1em;">Matched Donors</div>`;
  if (results.length) {
    let width = 200, height = 150;
    mapHtml = `<svg width="100%" height="${height}">
      <rect width="95%" height="${height-10}" fill="#e57373" x="2.5%" y="5"/>
      ${results.map((r, i) =>
        `<circle cx="${30+(i*40)}" cy="60" r="14" fill="#fff" stroke="#b71c1c" stroke-width="2"/><text x="${30+(i*40)}" y="65" alignment-baseline="middle" text-anchor="middle" fill="#b71c1c" font-size="12">${r.bloodType}</text>`).join('')}
    </svg>`;
  }
  document.getElementById('map').innerHTML = mapHtml;
};
