// Tab Switching
document.querySelectorAll('.tab-button').forEach(button => {
  button.addEventListener('click', function() {
    // Remove active class from all buttons and tabs
    document.querySelectorAll('.tab-button').forEach(btn => {
      btn.classList.remove('active');
    });
    document.querySelectorAll('.tab-content').forEach(tab => {
      tab.classList.remove('active');
    });
    
    // Add active class to clicked button and corresponding tab
    this.classList.add('active');
    const tabId = this.getAttribute('data-tab');
    document.getElementById(tabId).classList.add('active');
  });
});

// 2FA Toggle
document.getElementById('2fa-toggle').addEventListener('change', function() {
  if (this.checked) {
    alert('Two-factor authentication will be enabled. You will need to set it up.');
  }
});

// Logout from Session
document.querySelectorAll('.logout-btn').forEach(button => {
  button.addEventListener('click', function() {
    if (confirm('Log out from this device?')) {
      this.closest('.session').remove();
    }
  });
});

// Delete Account
document.querySelector('.delete-account').addEventListener('click', function() {
  if (confirm('Are you sure? This will permanently delete your account and all data.')) {
    alert('Account deletion initiated. You will receive a confirmation email.');
  }
});