import './style.scss'

/**
 * This file handles page's interactive functionality
 * Version: 250820
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('Page loaded successfully!');

  // Initialize all functionality
  initAnchorClickLogging();
  initModalFunctionality();
    initScrollAnimations();
});

/**
 * Captures all anchor clicks and logs the clicked element
 */
function initAnchorClickLogging() {
  const anchors = document.querySelectorAll('a');

  anchors.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      // Log the clicked elemen
      console.log('Anchor clicked:', this.textContent.trim(), this);
    });
  });

  console.log(`Initialized click logging for ${anchors.length} anchor elements`);
}

/**
 * Initializes scroll-triggered animations using Intersection Observer
 * This triggers animations when elements come into view
 */
function initScrollAnimations() {
  // Observe section titles for scroll animations
  const sectionTitles = document.querySelectorAll('.animated-element');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 }); // 30% visible before triggering

  sectionTitles.forEach(el => observer.observe(el));
}
