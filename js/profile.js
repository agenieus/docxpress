// Profile Picture Upload
document.getElementById('profile-upload').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      document.getElementById('profile-pic').src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
});

// Form Submission
document.getElementById('profile-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get form values
  const fullName = document.getElementById('full-name').value;
  const email = document.getElementById('email').value;
  
  // Simulate API call
  setTimeout(() => {
    alert('Profile updated successfully!');
  }, 500);
});