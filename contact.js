const form = document.querySelector('#contact-form');

if (form) {
  const submitButton = form.querySelector('button[type="submit"]');
  const errorMessage = document.querySelector('#form-error');
  const successMessage = document.querySelector('#form-success');
  const defaultButtonText = submitButton.innerHTML;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    errorMessage.hidden = true;
    successMessage.hidden = true;
    submitButton.disabled = true;
    submitButton.setAttribute('aria-busy', 'true');
    submitButton.textContent = 'Sending...';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Your message could not be sent. Please try again.');
      }

      form.reset();
      successMessage.hidden = false;
    } catch (error) {
      errorMessage.textContent = error.message;
      errorMessage.hidden = false;
    } finally {
      submitButton.disabled = false;
      submitButton.removeAttribute('aria-busy');
      submitButton.innerHTML = defaultButtonText;
    }
  });
}
