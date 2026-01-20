/**
 * Daily I Do - Wedding Planning App
 * Main JavaScript File
 */

// ============================================
// Navigation Functionality
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initForms();
  initAdmin();
  initPhotoUpload();
});

function initNavigation() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  // Scroll effect for navigation
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Mobile menu toggle
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navToggle.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
      });
    });
  }
}

// ============================================
// Form Handling
// ============================================

function initForms() {
  const weddingForm = document.getElementById('weddingForm');
  const successMessage = document.getElementById('successMessage');

  if (weddingForm) {
    weddingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Gather form data
      const formData = new FormData(weddingForm);
      const data = Object.fromEntries(formData.entries());

      // In a real app, you would send this to a server
      console.log('Wedding submission:', data);

      // Store in localStorage for demo purposes
      const submissions = JSON.parse(localStorage.getItem('weddingSubmissions') || '[]');
      submissions.push({
        ...data,
        id: Date.now(),
        submittedAt: new Date().toISOString(),
        status: 'pending'
      });
      localStorage.setItem('weddingSubmissions', JSON.stringify(submissions));

      // Show success message
      weddingForm.classList.add('hidden');
      successMessage.classList.remove('hidden');

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// ============================================
// Photo Upload Preview
// ============================================

function initPhotoUpload() {
  const photoInput = document.getElementById('photos');
  const photoPreview = document.getElementById('photoPreview');
  const photoUpload = document.getElementById('photoUpload');

  if (photoInput && photoPreview) {
    photoInput.addEventListener('change', (e) => {
      photoPreview.innerHTML = '';
      const files = Array.from(e.target.files);

      files.forEach((file, index) => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const preview = document.createElement('div');
            preview.style.cssText = `
              position: relative;
              aspect-ratio: 1;
              border-radius: 4px;
              overflow: hidden;
              animation: fadeIn 0.3s ease forwards;
              animation-delay: ${index * 0.1}s;
              opacity: 0;
            `;
            preview.innerHTML = `
              <img src="${e.target.result}" alt="Preview" style="width: 100%; height: 100%; object-fit: cover;">
              <button type="button" class="remove-photo" data-index="${index}" style="
                position: absolute;
                top: 4px;
                right: 4px;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                background: rgba(0,0,0,0.7);
                color: white;
                border: none;
                cursor: pointer;
                font-size: 14px;
                display: flex;
                align-items: center;
                justify-content: center;
              ">&times;</button>
            `;
            photoPreview.appendChild(preview);
          };
          reader.readAsDataURL(file);
        }
      });

      // Update upload text
      if (files.length > 0) {
        const uploadText = photoUpload.querySelector('.file-upload-text');
        if (uploadText) {
          uploadText.innerHTML = `<strong>${files.length} photo${files.length > 1 ? 's' : ''} selected</strong><br><span style="font-size: var(--text-sm);">Click to change selection</span>`;
        }
      }
    });

    // Drag and drop styling
    if (photoUpload) {
      ['dragenter', 'dragover'].forEach(eventName => {
        photoUpload.addEventListener(eventName, (e) => {
          e.preventDefault();
          photoUpload.style.borderColor = 'var(--mauve-400)';
          photoUpload.style.background = 'var(--white-10)';
        });
      });

      ['dragleave', 'drop'].forEach(eventName => {
        photoUpload.addEventListener(eventName, (e) => {
          e.preventDefault();
          photoUpload.style.borderColor = '';
          photoUpload.style.background = '';
        });
      });
    }
  }
}

// ============================================
// Admin Functionality
// ============================================

// Simple password for demo - in production, use proper authentication
const ADMIN_PASSWORD = 'dailyido2025';

function initAdmin() {
  const loginForm = document.getElementById('loginForm');
  const loginSection = document.getElementById('loginSection');
  const dashboardSection = document.getElementById('dashboardSection');
  const adminFooter = document.getElementById('adminFooter');
  const logoutBtn = document.getElementById('logoutBtn');
  const loginError = document.getElementById('loginError');

  // Check if already logged in
  if (sessionStorage.getItem('adminLoggedIn') === 'true') {
    showDashboard();
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const password = document.getElementById('password').value;

      if (password === ADMIN_PASSWORD) {
        sessionStorage.setItem('adminLoggedIn', 'true');
        loginError.classList.add('hidden');
        showDashboard();
      } else {
        loginError.classList.remove('hidden');
        document.getElementById('password').value = '';
        document.getElementById('password').focus();
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      sessionStorage.removeItem('adminLoggedIn');
      hideDashboard();
    });
  }

  function showDashboard() {
    if (loginSection) loginSection.classList.add('hidden');
    if (dashboardSection) dashboardSection.classList.remove('hidden');
    if (adminFooter) adminFooter.classList.remove('hidden');
    updateDashboardStats();
  }

  function hideDashboard() {
    if (loginSection) loginSection.classList.remove('hidden');
    if (dashboardSection) dashboardSection.classList.add('hidden');
    if (adminFooter) adminFooter.classList.add('hidden');
  }
}

function updateDashboardStats() {
  const submissions = JSON.parse(localStorage.getItem('weddingSubmissions') || '[]');

  // Update stat cards
  const totalEl = document.getElementById('totalSubmissions');
  const pendingEl = document.getElementById('pendingCount');
  const approvedEl = document.getElementById('approvedCount');
  const thisMonthEl = document.getElementById('thisMonth');

  if (totalEl) totalEl.textContent = submissions.length;

  const pending = submissions.filter(s => s.status === 'pending').length;
  const approved = submissions.filter(s => s.status === 'approved').length;

  // Count this month's submissions
  const now = new Date();
  const thisMonth = submissions.filter(s => {
    const date = new Date(s.submittedAt);
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  }).length;

  if (pendingEl) pendingEl.textContent = pending;
  if (approvedEl) approvedEl.textContent = approved;
  if (thisMonthEl) thisMonthEl.textContent = thisMonth;

  // Update table with real submissions if any
  updateSubmissionsTable(submissions);
}

function updateSubmissionsTable(submissions) {
  const tableBody = document.getElementById('submissionsTable');
  const emptyState = document.getElementById('emptyState');

  if (!tableBody) return;

  // If there are localStorage submissions, add them to the table
  if (submissions.length > 0) {
    // Keep sample data and add real submissions at the top
    const existingRows = tableBody.innerHTML;

    const newRows = submissions.map(s => {
      const submittedDate = new Date(s.submittedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });

      const weddingDate = s.weddingDate ? new Date(s.weddingDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }) : 'N/A';

      const statusClass = `status-${s.status || 'pending'}`;

      return `
        <tr>
          <td>
            <strong>${s.partner1Name || ''} & ${s.partner2Name || ''}</strong><br>
            <span class="text-muted" style="font-size: var(--text-sm);">${s.email || ''}</span>
          </td>
          <td>${weddingDate}</td>
          <td>${s.location || 'N/A'}</td>
          <td>${s.weddingStyle || 'N/A'}</td>
          <td>${submittedDate}</td>
          <td><span class="status-badge ${statusClass}">${s.status || 'Pending'}</span></td>
          <td>
            <button class="btn btn-ghost" style="font-size: var(--text-sm);">View</button>
          </td>
        </tr>
      `;
    }).join('');

    tableBody.innerHTML = newRows + existingRows;
  }

  // Filter functionality
  const statusFilter = document.getElementById('statusFilter');
  if (statusFilter) {
    statusFilter.addEventListener('change', (e) => {
      const value = e.target.value;
      const rows = tableBody.querySelectorAll('tr');

      rows.forEach(row => {
        const statusBadge = row.querySelector('.status-badge');
        if (statusBadge) {
          const status = statusBadge.textContent.toLowerCase();
          if (value === 'all' || status === value) {
            row.style.display = '';
          } else {
            row.style.display = 'none';
          }
        }
      });
    });
  }
}

// ============================================
// Utility Functions
// ============================================

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
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

// Add fade-in animation to elements when they enter viewport
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

document.querySelectorAll('.card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(card);
});
