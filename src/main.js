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
      // Prevent redirection for demo purposes
      e.preventDefault();

      // Log the clicked elemen
      console.log('Anchor clicked:', this.textContent.trim(), this);
    });
  });
}

/**
 * Initializes modal functionality for elements with data-trigger-modal attribute
 * Each element with data-trigger-modal opens a modal with title, description, and image
 */
function initModalFunctionality() {
  const modal = document.querySelector('.image-modal');
  const modalImg = document.querySelector('.image-modal__image');
  const closeBtn = document.querySelector('.image-modal__close');
  const modalTriggers = document.querySelectorAll('[data-trigger-modal]');

  // Add click event to each modal trigger
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', function() {
      // Get modal data from the clicked element
      const title = this.getAttribute('data-modal-title') || 'Image';
      const description = this.getAttribute('data-modal-description') || '';
      const image = this.querySelector('img');

      if (image) {
        // Set modal image source and alt
        modalImg.src = image.src;
        modalImg.alt = image.alt || title;

        // Set modal title and description
        const modalTitle = document.querySelector('.image-modal__title');
        const modalDescription = document.querySelector('.image-modal__description');

        if (modalTitle) modalTitle.textContent = title;
        if (modalDescription) modalDescription.textContent = description;

        // Show modal
        modal.classList.add('is-visible');
      }
    });
  });

  // Close modal when clicking the close button
  closeBtn.addEventListener('click', closeModal);

  // Close modal when clicking outside the image
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'block') {
      closeModal();
    }
  });

  function closeModal() {
    modal.classList.remove('is-visible');
  }
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
