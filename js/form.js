// Contact Form Functionality

// DOM Elements
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');

// Form validation
contactForm.addEventListener('submit', (e) => {
  if (!validateForm()) {
    e.preventDefault(); // impede o envio apenas se for inválido
    return;
  }

  // Se o formulário for válido, armazena o nome no sessionStorage
  const name = nameInput.value.trim();
  sessionStorage.setItem('contactFormData', JSON.stringify({ name }));
});

// Validate form inputs
function validateForm() {
  let isValid = true;
  removeErrors();

  if (nameInput.value.trim() === '') {
    showError(nameInput, 'Por favor, insira seu nome');
    isValid = false;
  }

  if (emailInput.value.trim() === '') {
    showError(emailInput, 'Por favor, insira seu e-mail');
    isValid = false;
  } else if (!isValidEmail(emailInput.value)) {
    showError(emailInput, 'Por favor, insira um e-mail válido');
    isValid = false;
  }

 if (phoneInput.value.trim() === '') {
  showError(phoneInput, 'Por favor, insira seu telefone');
  isValid = false;
  } else if (!isValidPhone(phoneInput.value)) {
    showError(phoneInput, 'Por favor, insira um telefone válido');
    isValid = false;
  }

  if (subjectInput.value.trim() === '') {
    showError(subjectInput, 'Por favor, insira um assunto');
    isValid = false;
  }

  if (messageInput.value.trim() === '') {
    showError(messageInput, 'Por favor, insira sua mensagem');
    isValid = false;
  }

  return isValid;
}

function isValidPhone(phone) {
  const phoneRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
  return phoneRegex.test(phone);
}

// Show error message
function showError(input, message) {
  const formGroup = input.parentElement;
  
  // Create error message element
  const errorMessage = document.createElement('p');
  errorMessage.className = 'error-message';
  errorMessage.textContent = message;
  
  // Add error class to input
  input.classList.add('error-input');
  
  // Add error message to form group
  formGroup.appendChild(errorMessage);
}

// Remove all error messages
function removeErrors() {
  // Remove error messages
  const errorMessages = document.querySelectorAll('.error-message');
  errorMessages.forEach(error => error.remove());
  
  // Remove error class from inputs
  const inputs = [nameInput, emailInput, phoneInput, subjectInput, messageInput];
  inputs.forEach(input => {
    input.classList.remove('error-input');
  });
}

// Validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Submit form
function submitForm() {
  // Show loading state
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;
  
  // In a real application, you would send the form data to a server
  // Here we'll simulate a successful submission after a short delay
  
  setTimeout(() => {
    // Reset form
    contactForm.reset();
    
    // Show success message
    showFormMessage('success', 'Your message has been sent successfully!');
    
    // Reset button
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }, 1500);
}

// Show form success/error message
function showFormMessage(type, message) {
  // Create message element
  const messageElement = document.createElement('div');
  messageElement.className = `form-message ${type}`;
  messageElement.textContent = message;
  
  // Add styles for the message
  const messageStyle = document.createElement('style');
  messageStyle.textContent = `
    .form-message {
      padding: 12px;
      margin-bottom: 16px;
      border-radius: 4px;
      text-align: center;
    }
    
    .form-message.success {
      background-color: rgba(16, 185, 129, 0.2);
      color: #10b981;
      border: 1px solid #10b981;
    }
    
    .form-message.error {
      background-color: rgba(239, 68, 68, 0.2);
      color: #ef4444;
      border: 1px solid #ef4444;
    }
    
    .error-message {
      color: #ef4444;
      font-size: 0.85rem;
      margin-top: 4px;
      margin-bottom: 0;
    }
    
    .error-input {
      border-color: #ef4444 !important;
    }
  `;
  document.head.appendChild(messageStyle);
  
  // Add message to form
  contactForm.prepend(messageElement);
  
  // Remove message after 5 seconds
  setTimeout(() => {
    messageElement.remove();
  }, 5000);
}

// Add input event listeners to clear errors on typing
const inputs = [nameInput, emailInput, phoneInput, subjectInput, messageInput];
inputs.forEach(input => {
  input.addEventListener('input', () => {
    // Remove error class
    input.classList.remove('error-input');
    
    // Remove error message if exists
    const errorMessage = input.parentElement.querySelector('.error-message');
    if (errorMessage) {
      errorMessage.remove();
    }
  });
});