// ==============================
// 🎮 Portfolio Interactions JS
// ==============================

// --- MODALE PROJETS ---
const modal = document.getElementById("projectModal");
const modalVideo = document.getElementById("modalVideo");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const closeBtn = document.querySelector(".close");

// Gérer l'ouverture du modal
document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("click", () => {
    const video = card.querySelector("video").getAttribute("src");
    const title = card.dataset.title;
    const description = card.dataset.description;

    modalVideo.src = video;
    modalTitle.textContent = title;
    modalDescription.textContent = description;

    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden"; // Empêche le scroll en arrière-plan
  });
});

// Gérer la fermeture du modal
const closeModal = () => {
  modal.setAttribute("aria-hidden", "true");
  modalVideo.pause();
  modalVideo.currentTime = 0;
  document.body.style.overflow = "auto";
};

// Bouton X
closeBtn.addEventListener("click", closeModal);

// Clic en dehors du contenu
modal.addEventListener("click", e => {
  if (e.target === modal) closeModal();
});

// Touche ESC pour fermer
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") {
    closeModal();
  }
});

// --- HOVER VIDÉO OPTIMISÉ ---
// Pause les vidéos hors focus pour éviter la consommation CPU
document.querySelectorAll(".project-card").forEach(card => {
  const previewVideo = card.querySelector("video");
  card.addEventListener("mouseenter", () => previewVideo.play());
  card.addEventListener("mouseleave", () => {
    previewVideo.pause();
    previewVideo.currentTime = 0;
  });
});
