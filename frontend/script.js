const button = document.getElementById('toastButton');
const toastText = document.getElementById('toastText');

toastText.textContent = 'Click the button for some lightly toasted wisdom!';
toastText.classList.add('visible');

button.addEventListener('click', () => {
  toastText.classList.remove('visible');
  toastText.classList.add('hidden');

  setTimeout(() => {
    toastText.textContent = 'Get toasted, ya Loaf!';
    toastText.classList.remove('hidden');
    toastText.classList.add('visible');
  }, 500);
});
