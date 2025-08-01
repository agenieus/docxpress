document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const answer = question.nextElementSibling;
    const icon = question.querySelector('.toggle-icon');
    
    // Toggle answer visibility
    answer.classList.toggle('active');
    
    // Update icon
    icon.textContent = answer.classList.contains('active') ? '−' : '+';
  });
});

// Contact Support Button
document.querySelector('.contact-support button').addEventListener('click', () => {
  window.location.href = 'mailto:support@example.com';
});