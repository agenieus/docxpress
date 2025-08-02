// public/js/sidebar.js
class Sidebar {
  constructor() {
    this.sidebar = document.getElementById('sidebar');
    this.toggleBtn = document.getElementById('sidebarToggle');
    this.overlay = document.getElementById('sidebarOverlay');
    
    this.initEvents();
  }
  
  initEvents() {
    // Toggle sidebar on button click
    this.toggleBtn.addEventListener('click', () => this.toggle());
    
    // Close sidebar when clicking overlay
    this.overlay.addEventListener('click', () => this.hide());
    
    // Add hamburger menu in mobile header
    this.createMobileToggle();
  }
  
  createMobileToggle() {
    const header = document.querySelector('.main-header');
    if (!header) return;
    
    const hamburger = document.createElement('button');
    hamburger.className = 'mobile-menu-toggle';
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    hamburger.addEventListener('click', () => this.show());
    
    header.insertBefore(hamburger, header.firstChild);
  }
  
  toggle() {
    this.sidebar.classList.toggle('active');
    this.overlay.classList.toggle('active');
  }
  
  show() {
    this.sidebar.classList.add('active');
    this.overlay.classList.add('active');
  }
  
  hide() {
    this.sidebar.classList.remove('active');
    this.overlay.classList.remove('active');
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new Sidebar();
});

document.addEventListener('DOMContentLoaded', function() {
  // Get current page name (e.g., "profile" from "profile.html")
  const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
  
  // Highlight matching sidebar item
  document.querySelectorAll('.sidebar a').forEach(link => {
    if (link.getAttribute('data-page') === currentPage) {
      link.classList.add('active');
      link.style.pointerEvents = 'none'; // Disable clicking on active item
    }
  });
});