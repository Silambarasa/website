document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.course-card, .why-choose-card');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const card = entry.target;
        const index = Array.from(cards).indexOf(card);
        setTimeout(() => card.classList.add('show'), index * 80);
        observer.unobserve(card);
      }
    });
  }, { threshold: 0.15 });

  cards.forEach(card => observer.observe(card));
});