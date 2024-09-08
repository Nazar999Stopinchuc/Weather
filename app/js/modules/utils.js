export function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

export function showError(text) {
  const errorBox = document.querySelector('.error');
  const errorText = document.querySelector('.error__text');
  const errorBtnToClose = document.querySelector('.error__btn');

  errorBox.classList.remove('none');
  errorText.textContent = text;

  errorBtnToClose.addEventListener('click', () => {
    errorBox.classList.add('none');
    return;
  });

  errorBox.addEventListener('click', (e) => {
    const target = e.target;
    if (!target) return;
    if (target.classList.contains('error')) errorBox.classList.add('none');
    return;
  });

  setTimeout(() => {
    errorBox.classList.add('none');
    return;
  }, 5000);
};

export function isNonLatinInput(input) {
  const latinPattern = /^[A-Za-z0-9\s.,!?@#%&*()_+=-]+$/;
  return !latinPattern.test(input);
}