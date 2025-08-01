/*PRELOADER */
// Add this to your auth.js or create a new preloader.js
document.addEventListener('DOMContentLoaded', () => {
  const preloader = document.querySelector('.preloader');
  
  // Hide preloader after 1 second
  setTimeout(() => {
    preloader.classList.add('hide');
    
    // Remove from DOM after animation completes
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  }, 1000);
});

//google signin
// auth.js
function initGoogleAuth() {
  gapi.load('auth2', () => {
    gapi.auth2.init({
      client_id: 'YOUR_GOOGLE_CLIENT_ID'
    }).then(() => {
      document.getElementById('googleSignIn').addEventListener('click', () => {
        gapi.auth2.getAuthInstance().signIn().then(googleUser => {
          const profile = googleUser.getBasicProfile();
          // Handle Google sign-in
        });
      });
    });
  });
}

//RESET PASSWORD

// Password Reset
document.getElementById('resetForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  if (!validateEmail(email)) {
    showError('emailError', 'Please enter a valid email');
    return;
  }

  try {
    const response = await ApiService.post('/auth/reset', { email });
    if (response.success) {
      document.getElementById('successModal').style.display = 'block';
    }
  } catch (error) {
    showError('emailError', error.message || 'Failed to send reset link');
  }
});

document.getElementById('closeSuccess').addEventListener('click', () => {
  document.getElementById('successModal').style.display = 'none';
  window.location.href = 'login.html';
});

//CHANGE PASSWORD
// Extract token from URL
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');
if (token) {
  document.getElementById('resetToken').value = token;
}

// Change Password
document.getElementById('changePasswordForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const newPassword = document.getElementById('newPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const token = document.getElementById('resetToken').value;

  if (newPassword !== confirmPassword) {
    showError('confirmError', 'Passwords do not match');
    return;
  }

  if (!checkPasswordStrength(newPassword)) {
    showError('confirmError', 'Password does not meet requirements');
    return;
  }

  try {
    const response = await ApiService.put('/auth/password', { 
      token, 
      newPassword 
    });
    
    if (response.success) {
      document.getElementById('successModal').style.display = 'block';
    }
  } catch (error) {
    showError('confirmError', error.message || 'Failed to change password');
  }
});

document.getElementById('goToLogin').addEventListener('click', () => {
  window.location.href = 'login.html';
});

