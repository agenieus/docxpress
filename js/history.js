// Mock Data (last 50 files for premium tier)
const historyData = [
  { id: 1, name: "document.pdf", date: "2023-10-20", size: "2.4MB", status: "success" },
  { id: 2, name: "presentation.pptx", date: "2023-10-19", size: "8.1MB", status: "success" },
  { id: 3, name: "image.png", date: "2023-10-18", size: "5.2MB", status: "failed" }
  // ...up to 50 items
];

// Render History Table
function renderHistory() {
  const tbody = document.querySelector('#history-table tbody');
  tbody.innerHTML = historyData.map(file => `
    <tr>
      <td>${file.name}</td>
      <td>${file.date}</td>
      <td>${file.size}</td>
      <td class="status-${file.status}">${file.status.toUpperCase()}</td>
      <td>
        ${file.status === 'success' ? 
          '<button class="download-btn">Download</button>' : 
          '<button class="retry-btn">Retry</button>'}
      </td>
    </tr>
  `).join('');
}

// Search Functionality
document.getElementById('search-files').addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const rows = document.querySelectorAll('#history-table tbody tr');
  
  rows.forEach(row => {
    const fileName = row.cells[0].textContent.toLowerCase();
    row.style.display = fileName.includes(searchTerm) ? '' : 'none';
  });
});

// Delete All
document.querySelector('.delete-all').addEventListener('click', () => {
  if (confirm('Delete all history? This cannot be undone.')) {
    // API call would go here
    alert('All history deleted');
    renderHistory(); // Refresh
  }
});

// Initialize
document.addEventListener('DOMContentLoaded', renderHistory);