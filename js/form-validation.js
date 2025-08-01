// Password Strength Checker
function checkPasswordStrength(password) {
  const strength = {
    length: password.length >= 12,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
  };

  const validCount = Object.values(strength).filter(Boolean).length;
  let strengthLevel = 'weak';
  let width = 33;

  if (validCount === 4) {
    strengthLevel = 'strong';
    width = 100;
  } else if (validCount >= 2) {
    strengthLevel = 'medium';
    width = 66;
  }

  // Update UI
  document.getElementById('strengthIndicator').textContent = strengthLevel.charAt(0).toUpperCase() + strengthLevel.slice(1);
  document.getElementById('strengthIndicator').className = `strength-${strengthLevel}`;
  document.getElementById('strengthBar').style.width = `${width}%`;
  document.getElementById('strengthBar').style.backgroundColor = 
    strengthLevel === 'strong' ? '#10B981' : 
    strengthLevel === 'medium' ? '#FFA500' : '#ED0D10';

  // Update requirement indicators
  document.getElementById('req-length').classList.toggle('valid', strength.length);
  document.getElementById('req-upper').classList.toggle('valid', strength.upper);
  document.getElementById('req-lower').classList.toggle('valid', strength.lower);
  document.getElementById('req-special').classList.toggle('valid', strength.special);

  return validCount === 4;
}

// Name Formatting to Sentence Case
function formatName(name) {
  return name.toLowerCase().split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
    .join(' ');
}

// Terms Modal
document.getElementById('termsLink').addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('termsModal').style.display = 'block';
});

document.querySelector('.close-modal').addEventListener('click', () => {
  document.getElementById('termsModal').style.display = 'none';
});

document.getElementById('acceptTerms').addEventListener('click', () => {
  document.getElementById('agreeTerms').checked = true;
  document.getElementById('termsModal').style.display = 'none';
});