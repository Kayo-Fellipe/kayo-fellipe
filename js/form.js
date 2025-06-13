// Contact Form Functionality

// DOM Elements do formulário
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');

// Elementos do modal de sucesso
const modal = document.getElementById('modalSuccess');
const modalCloseBtn = document.getElementById('modalCloseBtn');

// Evento de envio do formulário
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!validateForm()) {
    return; // não enviar se inválido
  }

  // Armazena nome no sessionStorage
  const name = nameInput.value.trim();
  sessionStorage.setItem('contactFormData', JSON.stringify({ name }));

  // Abre modal de sucesso
  modal.style.display = 'block';

  // Reseta formulário
  contactForm.reset();
});

// Fecha modal ao clicar no "X"
modalCloseBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Fecha modal ao clicar fora do conteúdo do modal
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// Validação do formulário
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

// Mostrar mensagem de erro
function showError(input, message) {
  const formGroup = input.parentElement;

  // Cria elemento de mensagem de erro
  const errorMessage = document.createElement('p');
  errorMessage.className = 'error-message';
  errorMessage.textContent = message;

  // Adiciona classe de erro no input
  input.classList.add('error-input');

  // Adiciona mensagem de erro ao grupo do input
  formGroup.appendChild(errorMessage);
}

// Remove todas mensagens de erro
function removeErrors() {
  const errorMessages = document.querySelectorAll('.error-message');
  errorMessages.forEach(error => error.remove());

  const inputs = [nameInput, emailInput, phoneInput, subjectInput, messageInput];
  inputs.forEach(input => {
    input.classList.remove('error-input');
  });
}

// Validação de email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Limpa erros conforme usuário digita
const inputs = [nameInput, emailInput, phoneInput, subjectInput, messageInput];
inputs.forEach(input => {
  input.addEventListener('input', () => {
    input.classList.remove('error-input');
    const errorMessage = input.parentElement.querySelector('.error-message');
    if (errorMessage) {
      errorMessage.remove();
    }
  });
});
