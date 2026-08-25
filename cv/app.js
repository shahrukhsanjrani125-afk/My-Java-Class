// app.js – 3‑page navigation (screen only)
document.addEventListener('DOMContentLoaded', function () {
  const buttons = document.querySelectorAll('.nav-btn');
  const pages = {
    1: document.getElementById('page-1'),
    2: document.getElementById('page-2'),
    3: document.getElementById('page-3')
  };

  function showPage(num) {
    // Hide all pages
    Object.values(pages).forEach(el => {
      if (el) el.classList.remove('active');
    });
    // Show target page
    if (pages[num]) pages[num].classList.add('active');

    // Update button active states
    buttons.forEach(btn => {
      btn.classList.remove('active');
      if (parseInt(btn.dataset.page, 10) === num) {
        btn.classList.add('active');
      }
    });
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', function (e) {
      const pageNum = parseInt(this.dataset.page, 10);
      showPage(pageNum);
    });
  });

  // Ensure page 1 is visible on load
  showPage(1);
});