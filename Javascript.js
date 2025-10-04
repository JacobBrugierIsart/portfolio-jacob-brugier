document.addEventListener("DOMContentLoaded", () => {
  // Forcer lecture vidéo (autoplay sécurité)
  const hv = document.querySelector(".hero-video video");
  if (hv) {
    hv.muted = true;
    hv.playsInline = true;
    hv.loop = true;
    const p = hv.play();
    if (p && p.catch) p.catch(() => {});
  }

  // Gestion des modales de projet
  const modal = document.getElementById("previewModal");
  const modalVideo = modal.querySelector(".tv-screen video");
  const modalTitle = modal.querySelector(".modal-text h2");
  const modalDescription = modal.querySelector(".modal-text p");

  document.querySelectorAll(".cartouche").forEach(card => {
    card.addEventListener("click", () => {
      const videoSrc = card.querySelector('video').src;
      const title = card.querySelector('h3').textContent;
      const description = card.getAttribute('data-description') || "Description indisponible";

      modalVideo.src = videoSrc;
      modalTitle.textContent = title;
      modalDescription.textContent = description;

      modalVideo.load();
      modalVideo.muted = true;
      modalVideo.playsInline = true;
      modalVideo.loop = true;
      modalVideo.play().catch(() => {});

      modal.classList.add("show");
      modal.setAttribute("aria-hidden", "false");
    });
  });

  modal.addEventListener("click", e => {
    if (e.target.id === "previewModal") {
      modalVideo.pause();
      modal.classList.remove("show");
      modal.setAttribute("aria-hidden", "true");
    }
  });
});
