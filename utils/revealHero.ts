export function revealHeroContent() {
  const hero = document.getElementById('hero');
  if (!hero) return;
  
  hero.querySelectorAll('.section-content').forEach(el => {
    (el as HTMLElement).style.transition = 'none';
    el.classList.add('revealed');
    
    requestAnimationFrame(() => {
      (el as HTMLElement).style.transition = '';
    });
  });
}
