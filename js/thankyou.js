document.addEventListener('DOMContentLoaded', () => {
  // Get contact form data from sessionStorage if available
  const formData = sessionStorage.getItem('contactFormData');
  
  if (formData) {
    try {
      const { name } = JSON.parse(formData);
      
      // If we have the user's name, personalize the message
      if (name) {
        const heading = document.querySelector('h1');
        heading.textContent = `Obrigado, ${name}!`;
      }
      
      // Clear the stored data
      sessionStorage.removeItem('contactFormData');
    } catch (error) {
      console.error('Error parsing form data:', error);
    }
  }
});