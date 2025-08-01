// Billing Period Toggle
document.getElementById('billing-period').addEventListener('change', function(e) {
  const isAnnual = e.target.checked;
  const prices = document.querySelectorAll('.price .amount');
  
  prices.forEach(price => {
    const monthly = price.getAttribute('data-monthly');
    const annual = price.getAttribute('data-annual');
    
    if (isAnnual) {
      price.textContent = `₦${(annual / 12).toLocaleString()}`;
      document.querySelectorAll('.period').forEach(period => {
        period.textContent = '/month (billed annually)';
      });
    } else {
      price.textContent = `₦${monthly}`;
      document.querySelectorAll('.period').forEach(period => {
        period.textContent = '/month';
      });
    }
  });
});

// Plan Button Clicks
document.querySelectorAll('.pricing-card button').forEach(button => {
  button.addEventListener('click', function() {
    const plan = this.closest('.pricing-card').querySelector('h3').textContent;
    alert(`You selected the ${plan} plan!`);
  });
});