// Testimonial form/modal functionality (resilient: works both as modal and standalone page)

// DOM Elements (may be absent on some pages)
const addTestimonialBtn = document.getElementById('addTestimonialBtn');
const testimonialModal = document.getElementById('testimonial-modal');
const closeTestimonialModal = document.getElementById('closeTestimonialModal');
const cancelTestimonial = document.getElementById('cancelTestimonial');
const testimonialForm = document.getElementById('testimonialForm');
const photoInput = document.getElementById('testimonial-photo');
const photoPreview = document.getElementById('photo-preview');
const fileUploadPlaceholder = document.querySelector('.file-upload-placeholder');
// track created object URL so we can revoke it on reset
let currentObjectURL = null;

// Form inputs (may be null if form is not present)
const testimonialNameInput = document.getElementById('testimonial-name');
const testimonialMessageInput = document.getElementById('testimonial-message');
const testimonialImprovementInput = document.getElementById('testimonial-improvement');

// Helper: safely close modal if present
function closeModal() {
  if (testimonialModal) {
    testimonialModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
  if (typeof resetForm === 'function') {
    resetForm();
  }
}

// If there is an "open modal" trigger, attach it
if (addTestimonialBtn && testimonialModal) {
  addTestimonialBtn.addEventListener('click', () => {
    testimonialModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  });
}

// Attach modal close handlers only when elements exist
if (closeTestimonialModal) closeTestimonialModal.addEventListener('click', closeModal);
if (cancelTestimonial) cancelTestimonial.addEventListener('click', closeModal);
if (testimonialModal) {
  testimonialModal.addEventListener('click', (e) => {
    if (e.target === testimonialModal) closeModal();
  });
}

// Close modal with Escape key if modal exists
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && testimonialModal && !testimonialModal.classList.contains('hidden')) {
    closeModal();
  }
});

// Photo upload functionality (only attach if elements exist)
if (photoInput) {
  const placeholder = fileUploadPlaceholder;
  photoInput.addEventListener('change', function () {
    const file = this.files[0];
    if (!file) {
      if (photoPreview) {
        photoPreview.classList.add('hidden');
        photoPreview.src = '';
        photoPreview.style.display = 'none';
      }
      if (placeholder) placeholder.style.display = 'flex';
      const existingName = document.querySelector('.file-upload-container .file-name');
      if (existingName) existingName.remove();
      try { if (currentObjectURL) { URL.revokeObjectURL(currentObjectURL); currentObjectURL = null; } } catch (e) {}
      return;
    }

    // Garante que é uma imagem
    if (!file.type.startsWith('image/')) {
      showError(photoInput, 'Por favor, selecione apenas arquivos de imagem');
      photoInput.value = '';
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showError(photoInput, 'A imagem deve ter no máximo 5MB');
      photoInput.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      if (photoPreview) {
        photoPreview.src = e.target.result;
        photoPreview.classList.remove('hidden');
        photoPreview.style.display = 'inline-block';
        photoPreview.style.maxHeight = '56px';
      }
      if (placeholder) placeholder.style.display = 'none';

      const container = placeholder ? placeholder.parentElement : null;
      if (container) {
        let nameEl = container.querySelector('.file-name');
        if (!nameEl) {
          nameEl = document.createElement('span');
          nameEl.className = 'file-name';
          container.appendChild(nameEl);
        }
        nameEl.textContent = file.name;
      }
    };
    reader.readAsDataURL(file);
  });
}

// Make the placeholder / container clickable to open the file picker
const fileUploadContainer = document.querySelector('.file-upload-container');
if (fileUploadContainer && photoInput) {
  // clicking the placeholder or anywhere in the container (except the input itself) should open the picker
  fileUploadContainer.addEventListener('click', (e) => {
    if (e.target === photoInput) return; // let native input handle it
    try { photoInput.click(); } catch (err) { /* ignore */ }
  });
}

// Form submission and validation (only if form exists)
if (testimonialForm) {
  // Only validate here; allow the browser to submit the form natively
  testimonialForm.addEventListener('submit', function(e) {
    if (!validateTestimonialForm()) {
      e.preventDefault();
      return;
    }

    // let the browser do the multipart POST to FormSubmit (native form action in HTML)
    // show a disabled state briefly to indicate progress
    const submitBtn = testimonialForm.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      // optionally change text; restore when page navigates back via _next
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    }
  });
}

// Form validation
function validateTestimonialForm() {
  let isValid = true;
  removeTestimonialErrors();

  if (testimonialNameInput) {
    if (testimonialNameInput.value.trim() === '') {
      showError(testimonialNameInput, 'Por favor, insira seu nome');
      isValid = false;
    } else if (testimonialNameInput.value.trim().length < 2) {
      showError(testimonialNameInput, 'O nome deve ter pelo menos 2 caracteres');
      isValid = false;
    }
  }

  if (testimonialMessageInput) {
    if (testimonialMessageInput.value.trim() === '') {
      showError(testimonialMessageInput, 'Por favor, escreva seu depoimento');
      isValid = false;
    } else if (testimonialMessageInput.value.trim().length < 20) {
      showError(testimonialMessageInput, 'O depoimento deve ter pelo menos 20 caracteres');
      isValid = false;
    }
  }

  if (photoInput && photoInput.files[0]) {
    const file = photoInput.files[0];
    if (!file.type.startsWith('image/')) {
      showError(photoInput, 'Por favor, selecione apenas arquivos de imagem');
      isValid = false;
    } else if (file.size > 5 * 1024 * 1024) {
      showError(photoInput, 'A imagem deve ter no máximo 5MB');
      isValid = false;
    }
  }

  return isValid;
}

// Show error message
function showError(input, message) {
  if (!input) return;
  const formGroup = input.parentElement;
  const existingError = formGroup.querySelector('.error-message');
  if (existingError) existingError.remove();
  const errorMessage = document.createElement('p');
  errorMessage.className = 'error-message';
  errorMessage.textContent = message;
  input.classList.add('error-input');
  formGroup.appendChild(errorMessage);
}

// Remove all error messages
function removeTestimonialErrors() {
  if (!testimonialForm) return;
  const errorMessages = testimonialForm.querySelectorAll('.error-message');
  errorMessages.forEach(error => error.remove());

  const inputs = [testimonialNameInput, testimonialMessageInput, photoInput];
  inputs.forEach(input => {
    if (input) input.classList.remove('error-input');
  });
}

// Reset form
function resetForm() {
  if (!testimonialForm) return;
  testimonialForm.reset();
  if (photoPreview) {
    photoPreview.classList.add('hidden');
    photoPreview.src = '';
  }
  if (fileUploadPlaceholder) fileUploadPlaceholder.style.display = 'flex';
  const existingName = document.querySelector('.file-upload-container .file-name');
  if (existingName) existingName.remove();
  // revoke any created object URL to free memory
  try {
    if (currentObjectURL) {
      URL.revokeObjectURL(currentObjectURL);
      currentObjectURL = null;
    }
  } catch (e) { /* ignore */ }
  removeTestimonialErrors();
}

// Show success notification
function showSuccessMessage() {
  const notification = document.createElement('div');
  notification.className = 'success-notification';
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-check-circle"></i>
      <span>Depoimento enviado com sucesso! Obrigado pelo seu feedback.</span>
    </div>
  `;
  const style = document.createElement('style');
  style.textContent = `
    .success-notification { position: fixed; top: 20px; right: 20px; background-color: var(--color-success); color: white; padding: 1rem 1.5rem; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.3); z-index:100000; animation: slideInRight 0.3s ease; max-width:350px; }
    .notification-content { display:flex; align-items:center; gap:0.5rem; }
    .notification-content i { font-size:1.2rem; flex-shrink:0; }
    @keyframes slideInRight { from { transform: translateX(100%); opacity:0;} to { transform: translateX(0); opacity:1;} }
  `;
  document.head.appendChild(style);
  document.body.appendChild(notification);
  setTimeout(() => { notification.remove(); style.remove(); }, 5000);
}

// Show error notification
function showErrorMessage() {
  const notification = document.createElement('div');
  notification.className = 'error-notification';
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-exclamation-circle"></i>
      <span>Erro ao enviar depoimento. Tente novamente.</span>
    </div>
  `;
  const style = document.createElement('style');
  style.textContent = `
    .error-notification { position: fixed; top: 20px; right: 20px; background-color: var(--color-error); color: white; padding: 1rem 1.5rem; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.3); z-index:100000; animation: slideInRight 0.3s ease; max-width:350px; }
    .notification-content { display:flex; align-items:center; gap:0.5rem; }
    .notification-content i { font-size:1.2rem; flex-shrink:0; }
  `;
  document.head.appendChild(style);
  document.body.appendChild(notification);
  setTimeout(() => { notification.remove(); style.remove(); }, 5000);
}

// Clear inline errors while typing
if (testimonialNameInput || testimonialMessageInput) {
  const inputs = [testimonialNameInput, testimonialMessageInput].filter(Boolean);
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('error-input');
      const errorMessage = input.parentElement.querySelector('.error-message');
      if (errorMessage) errorMessage.remove();
    });
  });
}

// Clear photo input errors on change
if (photoInput) {
  photoInput.addEventListener('change', () => {
    photoInput.classList.remove('error-input');
    const errorMessage = photoInput.parentElement.querySelector('.error-message');
    if (errorMessage) errorMessage.remove();
  });
}

// Check for success parameter in URL (both pages)
document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('testimonial') === 'success') {
    showSuccessMessage();
    window.history.replaceState({}, document.title, window.location.pathname);
  }
});