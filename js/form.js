document.addEventListener('DOMContentLoaded', function() {
  // Elementos do DOM
  const contactForm = document.getElementById('contactForm');
  const thankyouContainer = document.getElementById('thankyou-container');
  const contactFormContainer = document.querySelector('.contact-form');
  
  // Validação do formulário
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Botão de envio
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    
    try {
      // Preparar dados do formulário
      const formData = new FormData(contactForm);
      
      // Enviar via FormSubmit.co (versão AJAX)
      const response = await fetch('https://formsubmit.co/ajax/kayofellipefer@gmail.com', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (response.ok && data.success === "true") {
        // Sucesso - mostrar mensagem
        contactFormContainer.style.display = 'none';
        thankyouContainer.style.display = 'block';
        thankyouContainer.scrollIntoView({ behavior: 'smooth' });
        
        // Resetar formulário
        contactForm.reset();
      } else {
        throw new Error(data.message || 'Erro no envio');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Ocorreu um erro ao enviar. Por favor, tente novamente mais tarde.');
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
  
  // Função de validação (mantenha sua implementação atual)
  function validateForm() {
    let isValid = true;
    // ... (sua implementação atual de validateForm)
    return isValid;
  }
  
  // Funções auxiliares (mantenha suas implementações)
  function showError(input, message) {
    // ... (sua implementação atual)
  }
  
  function removeErrors() {
    // ... (sua implementação atual)
  }
  
  function isValidEmail(email) {
    // ... (sua implementação atual)
  }
  
  function isValidPhone(phone) {
    // ... (sua implementação atual)
  }
});