'use client';

export default function AvailabilityBadge() {
  const handleClick = () => {
    const contact = document.getElementById('contact');
    if (contact) {
      const top = contact.getBoundingClientRect().top + window.scrollY - 68;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <button 
      id="availability-badge"
      aria-label="Available for new engagements — go to contact"
      onClick={handleClick}
    >
      <span className="avail-dot" aria-hidden="true"></span>
      <span>Available for new engagements</span>
    </button>
  );
}
