/* ============================================
   BSCT - NAV SCRIPT (Hamburger + Mobile Accordion)
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ============================================
  // HAMBURGER TOGGLE
  // ============================================
  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobileMenu');
  var closeMenu = document.getElementById('closeMenu');

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }
  if (closeMenu) {
    closeMenu.addEventListener('click', function () {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
  // Close on outside click
  document.addEventListener('click', function (e) {
    if (mobileMenu && mobileMenu.classList.contains('open') &&
        !mobileMenu.contains(e.target) && hamburger && !hamburger.contains(e.target)) {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  // ============================================
  // MOBILE MENU ACCORDION (Dropdown Toggle)
  // ============================================
  document.querySelectorAll('.mnav-item.has-sub > .mnav-link').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var parent = this.parentElement;
      var isOpen = parent.classList.contains('open');
      // Close all other open items
      document.querySelectorAll('.mnav-item.has-sub.open').forEach(function (item) {
        item.classList.remove('open');
      });
      if (!isOpen) {
        parent.classList.add('open');
      }
    });
  });

});
