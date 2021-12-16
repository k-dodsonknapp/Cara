window.addEventListener('DOMContentLoaded', () => {
  const demoButton = document.querySelector('#demo-button');
  demoButton.addEventListener('click', async (e) => {
      e.preventDefault();
      const email = document.querySelector('#email');
      const password = document.querySelector('#password');
      email.setAttribute('value', 'demolition@demolition.com');
      password.setAttribute('value', 'Demolition123!');
      const login = document.getElementById('login-button');
      const event = new MouseEvent('click');
      login.dispatchEvent(event);
  });
});
