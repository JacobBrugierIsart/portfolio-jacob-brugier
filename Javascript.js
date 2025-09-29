document.addEventListener("DOMContentLoaded", () => {
  // 🎥 Vidéo principale (hero)
  const globalVideo = document.querySelector(".hero-video video");
  if (globalVideo) {
    globalVideo.removeAttribute("controls");
    globalVideo.muted = true;
    globalVideo.loop = true;
    globalVideo.playsInline = true;
    globalVideo.autoplay = true;
    globalVideo.play().catch(err => console.error("Erreur vidéo hero :", err));
  }

  // 📜 Défilement fluide
  document.querySelectorAll('header nav a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 60,
          behavior: "smooth"
        });
      }
    });
  });

  // 📽️ Vidéos projets au survol
  document.querySelectorAll(".project-media").forEach(container => {
    const video = container.querySelector("video");
    const thumb = container.querySelector("img");
    if (!video || !thumb) return;
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

  // 🪟 Modale projet
  const modal = document.getElementById("projectModal");
  const modalVideo = document.getElementById("modalVideo");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const closeBtn = document.querySelector(".close");

  if (modal && modalVideo && modalTitle && modalDescription && closeBtn) {
    document.querySelectorAll(".project-card").forEach(card => {
      card.addEventListener("click", e => {
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

    const closeModal = () => {
      modal.setAttribute("aria-hidden", "true");
      modal.style.display = "none";
      modalVideo.pause();
      modalVideo.removeAttribute("src");
    };

    closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
  }
});
