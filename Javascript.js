document.addEventListener("DOMContentLoaded", () => {
  // Gestion vidéo hero
  const globalVideo = document.getElementById("globalVideo");
  if (globalVideo) {
    globalVideo.muted = true;
    globalVideo.play().catch(err => console.error("Erreur vidéo hero :", err));
  }

  // Gestion des vidéos au survol des projets
  document.querySelectorAll(".project-media").forEach(container => {
    const video = container.querySelector("video");
    const thumb = container.querySelector("img");
    if (!video || !thumb) return;

    // Pré-chargement de la vidéo
    video.load();

    container.addEventListener("mouseenter", () => {
      video.currentTime = 0;
      video.muted = true;
      video.play().catch(err => console.error("Erreur lecture vidéo :", err));
      thumb.style.opacity = "0";
      video.style.opacity = "1";
    });
    container.addEventListener("mouseleave", () => {
      video.pause();
      video.currentTime = 0;
      thumb.style.opacity = "1";
      video.style.opacity = "0";
    });
  });

  // Gestion de la modale
  const modal = document.getElementById("projectModal");
  const modalVideo = document.getElementById("modalVideo");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const closeBtn = document.querySelector(".close");

  if (!modal || !modalVideo || !modalTitle || !modalDescription || !closeBtn) {
    console.error("Éléments de la modale manquants.");
    return;
  }

  document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", (e) => {
      if (e.target.tagName.toLowerCase() === "a") return;
      const vid = card.querySelector("video");
      if (!vid) return;

      modalVideo.src = vid.src;
      modalTitle.textContent = card.dataset.title || "Projet";
      modalDescription.textContent = card.dataset.description || "";
      modal.setAttribute("aria-hidden", "false");
      modal.style.display = "flex";
      modalVideo.muted = true;
      modalVideo.play().catch(err => console.error("Erreur vidéo modale :", err));
    });
  });

  // Fermeture de la modale
  closeBtn.addEventListener("click", () => {
    modal.setAttribute("aria-hidden", "true");
    modal.style.display = "none";
    modalVideo.pause();
    modalVideo.removeAttribute("src");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.setAttribute("aria-hidden", "true");
      modal.style.display = "none";
      modalVideo.pause();
      modalVideo.removeAttribute("src");
    }
  });
});
