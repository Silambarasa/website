const cards = document.querySelectorAll('.course-card');

window.addEventListener('scroll', () => {
  cards.forEach((card, index) => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      setTimeout(() => {
        card.classList.add('show');
      }, index * 100); // 100ms delay per card
    }
  });
});


// course page

document.addEventListener('DOMContentLoaded', () => {
  const cards = Array.from(document.querySelectorAll('.course-card'));
  // add index for stagger
  cards.forEach((c, i) => c.dataset.index = i);

  // 1) IntersectionObserver: reveal cards when they enter viewport (staggered)
  const obs = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const card = entry.target;
        const delay = Number(card.dataset.index) * 80; // ms
        setTimeout(() => card.classList.add('show'), delay);
        observer.unobserve(card);
      }
    });
  }, { threshold: 0.15 });

  cards.forEach(card => obs.observe(card));

  // 2) Filter pills
  const pills = document.querySelectorAll('.filter-pill');
  pills.forEach(p => p.addEventListener('click', () => {
    // ui
    pills.forEach(x => x.classList.remove('active'));
    p.classList.add('active');

    const filter = p.dataset.filter; // e.g. 'programming' or 'all'
    // animate hide + show with small stagger
    cards.forEach((card, i) => {
      const categories = card.dataset.category.split(' ').map(s=>s.trim());
      if (filter === 'all' || categories.includes(filter)) {
        // show
        card.classList.remove('hidden');
        // ensure it animates in if not visible yet
        setTimeout(() => card.classList.add('show'), i * 60);
      } else {
        // hide smoothly
        card.classList.remove('show');
        setTimeout(() => card.classList.add('hidden'), 120 + i * 20);
      }
    });
  }));
});
