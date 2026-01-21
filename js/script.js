/**
 * Daily I Do - Wedding Planning App
 * Main JavaScript File
 */

// ============================================
// Supabase Configuration
// ============================================
// TODO: Replace with your Supabase credentials
const SUPABASE_URL = 'https://zhekxbzyflcqeisknxwu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpoZWt4Ynp5ZmxjcWVpc2tueHd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5MjcyNTIsImV4cCI6MjA4NDUwMzI1Mn0.69z6VPlKf5d1fWUzpNHoL-u0A09N-ZsOkuc7nCBdwRg';

// Initialize Supabase client (loaded from CDN in HTML)
let supabase = null;

function initSupabase() {
  if (typeof window.supabase !== 'undefined' && SUPABASE_URL !== 'YOUR_SUPABASE_URL') {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('Supabase initialized');
  }
}

// ============================================
// DOM Ready
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initSupabase();
  initNavigation();
  initTermsModal();
  initPhotoUpload();
  initWeddingForm();
  initAdmin();
});

// ============================================
// Navigation
// ============================================
function initNavigation() {
  const navToggle = document.getElementById('navToggle');
  const navCenter = document.querySelector('.nav-center');

  if (navToggle && navCenter) {
    navToggle.addEventListener('click', () => {
      navCenter.classList.toggle('open');
      navToggle.classList.toggle('active');
    });
  }
}

// ============================================
// Terms Modal
// ============================================
function initTermsModal() {
  const modal = document.getElementById('termsModal');
  const openBtn = document.getElementById('openTerms');
  const closeBtn = document.getElementById('closeTerms');

  if (!modal) return;

  // Open modal
  if (openBtn) {
    openBtn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  // Close modal
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Close on overlay click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

// ============================================
// Photo Upload & Preview
// ============================================
let selectedFiles = [];

function initPhotoUpload() {
  const photoInput = document.getElementById('photos');
  const photoPreview = document.getElementById('photoPreview');
  const photoUpload = document.getElementById('photoUpload');

  if (!photoInput || !photoPreview) return;

  photoInput.addEventListener('change', handlePhotoSelection);

  // Drag and drop
  if (photoUpload) {
    ['dragenter', 'dragover'].forEach(event => {
      photoUpload.addEventListener(event, (e) => {
        e.preventDefault();
        photoUpload.style.borderColor = 'var(--accent)';
        photoUpload.style.background = 'rgba(255, 255, 255, 0.05)';
      });
    });

    ['dragleave', 'drop'].forEach(event => {
      photoUpload.addEventListener(event, (e) => {
        e.preventDefault();
        photoUpload.style.borderColor = '';
        photoUpload.style.background = '';
      });
    });

    photoUpload.addEventListener('drop', (e) => {
      const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
      if (files.length > 0) {
        selectedFiles = [...selectedFiles, ...files];
        updatePhotoPreview();
      }
    });
  }
}

function handlePhotoSelection(e) {
  const files = Array.from(e.target.files).filter(f => f.type.startsWith('image/'));
  selectedFiles = [...selectedFiles, ...files];
  updatePhotoPreview();
}

function updatePhotoPreview() {
  const photoPreview = document.getElementById('photoPreview');
  const photoUpload = document.getElementById('photoUpload');

  if (!photoPreview) return;

  photoPreview.innerHTML = '';

  if (selectedFiles.length > 0) {
    // Create file list
    const fileList = document.createElement('div');
    fileList.style.cssText = 'text-align: left; width: 100%;';

    selectedFiles.forEach((file, index) => {
      const fileItem = document.createElement('div');
      fileItem.style.cssText = 'display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: rgba(0,0,0,0.03); border-radius: 6px; margin-bottom: 6px; font-size: 14px;';

      const fileName = file.name.length > 30 ? file.name.substring(0, 27) + '...' : file.name;
      const fileSize = (file.size / 1024 / 1024).toFixed(2);

      fileItem.innerHTML = `
        <span style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 18px;">📷</span>
          <span style="color: #333;">${fileName}</span>
          <span style="color: #999; font-size: 12px;">(${fileSize} MB)</span>
        </span>
        <button type="button" class="remove-file-btn" data-index="${index}" style="background: none; border: none; color: #999; cursor: pointer; font-size: 18px; padding: 0 4px; line-height: 1;">&times;</button>
      `;
      fileList.appendChild(fileItem);

      // Add remove handler
      fileItem.querySelector('.remove-file-btn').addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        selectedFiles.splice(index, 1);
        updatePhotoPreview();
      });
    });

    photoPreview.appendChild(fileList);
  }

  // Update upload area text
  if (photoUpload) {
    const uploadText = photoUpload.querySelector('.text') || photoUpload.querySelector('.file-upload-text');
    const uploadIcon = photoUpload.querySelector('.icon') || photoUpload.querySelector('.file-upload-icon');

    if (selectedFiles.length > 0) {
      if (uploadIcon) uploadIcon.textContent = '✓';
      if (uploadText) {
        uploadText.innerHTML = `
          <strong style="color: #22c55e;">${selectedFiles.length} photo${selectedFiles.length > 1 ? 's' : ''} added</strong><br>
          <span style="font-size: 12px; opacity: 0.7;">Click to add more</span>
        `;
      }
    } else {
      if (uploadIcon) uploadIcon.textContent = '📷';
      if (uploadText) {
        uploadText.innerHTML = `
          <strong>Click to upload</strong> or drag and drop<br>
          <span style="font-size: 12px; opacity: 0.7;">PNG, JPG, WEBP up to 10MB each</span>
        `;
      }
    }
  }
}

// ============================================
// Wedding Form Submission
// ============================================
function initWeddingForm() {
  const form = document.getElementById('weddingForm');
  const successMessage = document.getElementById('successMessage');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;

    try {
      // Gather form data
      const formData = {
        couple_names: document.getElementById('coupleNames').value,
        couple_instagram: document.getElementById('coupleInstagram').value || null,
        wedding_date: document.getElementById('weddingDate').value,
        wedding_location: document.getElementById('weddingLocation').value,
        vendor_instagrams: document.getElementById('vendorInstagrams').value || null,
        favorite_detail: document.getElementById('favoriteDetail').value || null,
        terms_accepted: document.getElementById('termsAccepted').checked,
        status: 'pending',
        created_at: new Date().toISOString()
      };

      // Upload photos and save to database
      if (supabase) {
        // Upload photos to Supabase Storage
        const photoUrls = [];
        for (const file of selectedFiles) {
          const fileName = `${Date.now()}-${file.name}`;
          const { data, error } = await supabase.storage
            .from('wedding-photos')
            .upload(fileName, file);

          if (error) throw error;

          const { data: urlData } = supabase.storage
            .from('wedding-photos')
            .getPublicUrl(fileName);

          photoUrls.push(urlData.publicUrl);
        }

        formData.photo_urls = photoUrls;

        // Insert into database
        const { error } = await supabase
          .from('submissions')
          .insert([formData]);

        if (error) throw error;

        console.log('Saved to Supabase:', formData);
      } else {
        // Fallback: save to localStorage for demo
        const submissions = JSON.parse(localStorage.getItem('weddingSubmissions') || '[]');
        formData.id = Date.now();
        formData.photo_urls = selectedFiles.map(f => URL.createObjectURL(f));
        submissions.push(formData);
        localStorage.setItem('weddingSubmissions', JSON.stringify(submissions));
        console.log('Saved to localStorage:', formData);
      }

      // Show success
      form.classList.add('hidden');
      successMessage.classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error submitting your wedding. Please try again.');
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}

// ============================================
// Admin Functionality
// ============================================
const ADMIN_PASSWORD = 'dailyido2025';

function initAdmin() {
  const loginForm = document.getElementById('loginForm');
  const loginSection = document.getElementById('loginSection');
  const dashboardSection = document.getElementById('dashboardSection');
  const adminFooter = document.getElementById('adminFooter');
  const logoutBtn = document.getElementById('logoutBtn');
  const loginError = document.getElementById('loginError');

  if (!loginForm) return;

  // Check if already logged in
  if (sessionStorage.getItem('adminLoggedIn') === 'true') {
    showDashboard();
  }

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const password = document.getElementById('password').value;

    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('adminLoggedIn', 'true');
      if (loginError) loginError.classList.add('hidden');
      showDashboard();
    } else {
      if (loginError) loginError.classList.remove('hidden');
      document.getElementById('password').value = '';
      document.getElementById('password').focus();
    }
  });

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
    loadSubmissions();
  }

  function hideDashboard() {
    if (loginSection) loginSection.classList.remove('hidden');
    if (dashboardSection) dashboardSection.classList.add('hidden');
    if (adminFooter) adminFooter.classList.add('hidden');
  }
}

async function loadSubmissions() {
  let submissions = [];

  if (supabase) {
    // Load from Supabase
    const { data, error } = await supabase
      .from('submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      submissions = data;
    }
  } else {
    // Load from localStorage
    submissions = JSON.parse(localStorage.getItem('weddingSubmissions') || '[]');
  }

  updateDashboardStats(submissions);
  renderSubmissionsTable(submissions);
}

function updateDashboardStats(submissions) {
  const totalEl = document.getElementById('totalSubmissions');
  const pendingEl = document.getElementById('pendingCount');
  const approvedEl = document.getElementById('approvedCount');
  const thisMonthEl = document.getElementById('thisMonth');

  if (totalEl) totalEl.textContent = submissions.length;

  const pending = submissions.filter(s => s.status === 'pending').length;
  const approved = submissions.filter(s => s.status === 'approved').length;

  const now = new Date();
  const thisMonth = submissions.filter(s => {
    const date = new Date(s.created_at);
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  }).length;

  if (pendingEl) pendingEl.textContent = pending;
  if (approvedEl) approvedEl.textContent = approved;
  if (thisMonthEl) thisMonthEl.textContent = thisMonth;
}

function renderSubmissionsTable(submissions) {
  const tableBody = document.getElementById('submissionsTable');
  if (!tableBody) return;

  if (submissions.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; padding: 3rem; opacity: 0.6;">
          No submissions yet
        </td>
      </tr>
    `;
    return;
  }

  tableBody.innerHTML = submissions.map(s => {
    const date = new Date(s.wedding_date).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });
    const submitted = new Date(s.created_at).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });
    const statusClass = `status-${s.status || 'pending'}`;
    const photoCount = s.photo_urls ? s.photo_urls.length : 0;

    return `
      <tr>
        <td>
          <strong>${s.couple_names}</strong><br>
          <span class="text-muted" style="font-size: var(--text-sm);">${s.couple_instagram || 'No Instagram'}</span>
        </td>
        <td>${date}</td>
        <td>${s.wedding_location}</td>
        <td>${photoCount} photos</td>
        <td>${submitted}</td>
        <td><span class="status-badge ${statusClass}">${s.status || 'Pending'}</span></td>
      </tr>
    `;
  }).join('');

  // Setup filter
  const statusFilter = document.getElementById('statusFilter');
  if (statusFilter) {
    statusFilter.addEventListener('change', (e) => {
      const value = e.target.value;
      const filtered = value === 'all'
        ? submissions
        : submissions.filter(s => (s.status || 'pending') === value);
      renderSubmissionsTable(filtered);
    });
  }
}
