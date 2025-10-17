document.addEventListener('DOMContentLoaded', function() {
    /* ❄️ Création de la neige */
    const snowContainer = document.getElementById('snow');
    const snowflakeCount = 80;
    if (snowContainer) snowContainer.innerHTML = '';
    for (let i = 0; i < snowflakeCount; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflake.style.left = `${Math.random() * 100}%`;
        snowflake.style.top = `-${Math.random() * 100}px`;
        snowflake.style.width = `${12 + Math.random() * 50}px`;
        snowflake.style.height = snowflake.style.width;
        snowflake.style.opacity = 0.5 + Math.random() * 0.5;
        snowflake.style.animationDuration = `${10 + Math.random() * 15}s`;
        snowflake.style.animationDelay = `${Math.random() * 5}s`;
        if (snowContainer) snowContainer.appendChild(snowflake);
    }

    /* 🔄 Hover vidéo sur cartouches */
    document.querySelectorAll('.cartouche').forEach(cartouche => {
        const video = cartouche.querySelector('.cartouche-preview-video');
        if (!video) return;
        cartouche.addEventListener('mouseenter', () => {
            video.style.opacity = '1';
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
    if (!modal) return;
    const modalVideo = modal.querySelector('.tv-screen video');
    const modalTitle = modal.querySelector('.modal-text h2');
    const modalDescription = modal.querySelector('.modal-text p');
    const modalSkillsContainer = modal.querySelector('.modal-skills .skills-container');
    const modalCloseBtn = modal.querySelector('.modal-close');

document.querySelectorAll('.cartouche').forEach(card => {
    card.addEventListener('click', () => {
        const previewVideo = card.querySelector('.cartouche-preview-video');
        const videoSrc = previewVideo ? previewVideo.getAttribute('src') : '';
        const title = card.getAttribute('data-title') || "Titre inconnu";
        const description = card.getAttribute('data-description') || "Description indisponible";
        const skills = JSON.parse(card.getAttribute('data-skills') || '[]');
        const tasks = card.hasAttribute('data-tasks') ? JSON.parse(card.getAttribute('data-tasks')) : null;

        const modalVideo = modal.querySelector('.tv-screen video');
        const modalTitle = modal.querySelector('.modal-text h2');
        const modalDescription = modal.querySelector('.modal-text p');
        const modalTasksTitle = modal.querySelector('.modal-text h3');
        const modalTasksList = modal.querySelector('.modal-text .tasks-list');
        const modalSkillsContainer = modal.querySelector('.modal-skills .skills-container');

        if (!modalVideo) return;
        modalVideo.pause();
        modalVideo.removeAttribute('src');
        modalVideo.load();

        if (videoSrc) {
            modalVideo.src = videoSrc;
            modalVideo.muted = true;
            modalVideo.playsInline = true;
            modalVideo.loop = true;
            modalVideo.load();
            modalVideo.currentTime = 0;
            modalVideo.play().catch(() => {});
        }

        if (modalTitle) modalTitle.textContent = title;
        if (modalDescription) modalDescription.textContent = description;

        // Afficher les tâches uniquement si elles existent
        if (modalTasksTitle && modalTasksList) {
            if (tasks && tasks.length > 0) {
                modalTasksTitle.style.display = 'block';
                modalTasksList.innerHTML = '';
                tasks.forEach(task => {
                    const taskItem = document.createElement('li');
                    taskItem.textContent = task;
                    modalTasksList.appendChild(taskItem);
                });
            } else {
                modalTasksTitle.style.display = 'none';
                modalTasksList.innerHTML = '';
            }
        }

        // Afficher les compétences
        if (modalSkillsContainer) {
            modalSkillsContainer.innerHTML = '';
            skills.forEach(skill => {
                let iconName = skill.toLowerCase().replace(' ', '-');
                if (skill === "C#") {
                    iconName = "csharp";
                }
                const skillBox = document.createElement('div');
                skillBox.className = 'skill-box';
                skillBox.innerHTML = `
                    <img src="assets/icons/${iconName}-icon.png" alt="${skill}" class="skill-icon">
                    <span>${skill}</span>
                `;
                modalSkillsContainer.appendChild(skillBox);
            });
        }

        modal.classList.add('show');
        modal.setAttribute('aria-hidden', 'false');
        if (modalCloseBtn) modalCloseBtn.focus();
    });
});



    /* Fermer modale */
    modal.addEventListener('click', e => {
        if (e.target.id === 'previewModal') closeModal();
    });

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) closeModal();
    });

    function closeModal() {
        if (!modal) return;
        if (modalVideo) {
            modalVideo.pause();
            modalVideo.currentTime = 0;
            modalVideo.removeAttribute('src');
            modalVideo.load();
        }
        modal.classList.remove('show');
        modal.setAttribute('aria-hidden', 'true');
    }
});
