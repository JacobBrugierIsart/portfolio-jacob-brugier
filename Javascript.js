document.addEventListener('DOMContentLoaded', function() {
    /* ❄️ Création de la neige (corrigé) */
    const snowContainer = document.getElementById('snow');
    const snowflakeCount = 80; // Augmenté pour un effet plus visible

    // Vider le conteneur au cas où
    if (snowContainer) snowContainer.innerHTML = '';

    for (let i = 0; i < snowflakeCount; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflake.style.left = `${Math.random() * 100}%`;
        snowflake.style.top = `-${Math.random() * 100}px`;
        snowflake.style.width = `${12 + Math.random() * 50}px`; // Taille plus petite pour un effet réaliste
        snowflake.style.height = snowflake.style.width;
        snowflake.style.opacity = 0.5 + Math.random() * 0.5;
        snowflake.style.animationDuration = `${10 + Math.random() * 15}s`; // Durée aléatoire pour un effet naturel
        snowflake.style.animationDelay = `${Math.random() * 5}s`;
        if (snowContainer) snowContainer.appendChild(snowflake);
    }

    /* 🔄 Hover vidéo sur cartouches */
    document.querySelectorAll('.cartouche').forEach(cartouche => {
        const video = cartouche.querySelector('.cartouche-preview-video');
        if (!video) return;
        cartouche.addEventListener('mouseenter', () => {
            video.style.opacity = '1';
            // s'assurer que la vidéo est muette pour autoplay
            video.muted = true;
            video.playsInline = true;
            video.play().catch(() => {});
        });
        cartouche.addEventListener('mouseleave', () => {
            video.style.opacity = '0';
            video.pause();
            video.currentTime = 0;
        });
    });

    /* 📺 Modale projet */
    const modal = document.getElementById('previewModal');
    if (!modal) return; // sécurité
    const modalVideo = modal.querySelector('.tv-screen video');
    const modalTitle = modal.querySelector('.modal-text h2');
    const modalDescription = modal.querySelector('.modal-text p');
    const modalCloseBtn = modal.querySelector('.modal-close');

    // Ouvrir la modale quand on clique sur une cartouche
    document.querySelectorAll('.cartouche').forEach(card => {
        card.addEventListener('click', () => {
            // Utiliser explicitement la vidéo de preview (évite de sélectionner d'autres <video>)
            const previewVideo = card.querySelector('.cartouche-preview-video');
            const videoSrc = previewVideo ? previewVideo.getAttribute('src') : (card.querySelector('video') ? card.querySelector('video').getAttribute('src') : '');
            const title = card.querySelector('.cartouche-title') ? card.querySelector('.cartouche-title').textContent : '';
            const description = card.getAttribute('data-description') || "Description indisponible";

            if (!modalVideo) return;

            // Nettoyage au cas où une vidéo était déjà chargée
            modalVideo.pause();
            modalVideo.removeAttribute('src');
            modalVideo.load();

            // Charger la même source que la miniature
            if (videoSrc) {
                modalVideo.src = videoSrc;
                // s'assurer des propriétés pour autoplay sur mobile/desktop
                modalVideo.muted = true;
                modalVideo.playsInline = true;
                modalVideo.loop = true;
                modalVideo.load();
                modalVideo.currentTime = 0;
                modalVideo.play().catch(() => {});
            }

            if (modalTitle) modalTitle.textContent = title;
            if (modalDescription) modalDescription.textContent = description;

            modal.classList.add('show');
            modal.setAttribute('aria-hidden', 'false');

            // focus pour accessibilité (optionnel)
            if (modalCloseBtn) modalCloseBtn.focus();
        });
    });

    /* Fermer modale au clic hors contenu */
    modal.addEventListener('click', e => {
        if (e.target.id === 'previewModal') {
            closeModal();
        }
    });

    /* Bouton fermeture */
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', () => {
            closeModal();
        });
    }

    /* Fermer avec Échap */
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    function closeModal() {
        if (!modal) return;
        // arrêter et décharger la vidéo pour libérer la ressource
        if (modalVideo) {
            try {
                modalVideo.pause();
                modalVideo.currentTime = 0;
                // retire la source pour éviter lecture en background
                modalVideo.removeAttribute('src');
                modalVideo.load();
            } catch (err) {
                // silent
            }
        }
        modal.classList.remove('show');
        modal.setAttribute('aria-hidden', 'true');
    }
});
