function createSnowflakes() {
    const snowContainer = document.getElementById('snow');
    const numberOfSnowflakes = 50;

    for (let i = 0; i < numberOfSnowflakes; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        
        const size = Math.random() * 50 + 10;
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        
        snowflake.style.left = `${Math.random() * 100}%`;
        snowflake.style.top = `${Math.random() * 150 - 50}%`; 
        
        snowflake.style.animationDuration = `${Math.random() * 8 + 10}s`;
        snowflake.style.animationDelay = `${Math.random() * 8}s`;
        
        snowContainer.appendChild(snowflake);
    }
}

createSnowflakes();

const cartouches = document.querySelectorAll('.cartouche');
const modal = document.getElementById('previewModal');
const modalVideo = modal.querySelector('.tv-screen video');
const modalTitle = modal.querySelector('.modal-text h2');
const modalDescription = modal.querySelector('.modal-text p');
const modalSkillsContainer = modal.querySelector('.modal-skills .skills-container');
const modalTasksList = modal.querySelector('.tasks-list');
const modalGalleryContainer = modal.querySelector('.gallery-container');
const modalClose = modal.querySelector('.modal-close');
const modalPdfSection = modal.querySelector('.modal-pdf-section');
const modalPdfLink = modalPdfSection.querySelector('.pdf-open-btn');

const imageModal = document.getElementById('imageModal');
const fullScreenImage = imageModal.querySelector('.full-screen-image');
const imageModalClose = imageModal.querySelector('.modal-close-photo');
const leftArrow = imageModal.querySelector('.left-arrow');
const rightArrow = imageModal.querySelector('.right-arrow');

let currentGalleryPhotos = [];
let currentPhotoIndex = 0;

const skillIcons = {
    'Godot': 'assets/icons/godot-icon.png',
    'Unity': 'assets/icons/unity-icon.png',
    'Unreal': 'assets/icons/unreal-icon.png',
    'Csharp': 'assets/icons/csharp-icon.png',
    'English': 'assets/icons/english-icon.png',
    'HTML': 'assets/icons/html-icon.png',
    'Blender': 'assets/icons/blender-icon.png',
    'Git': 'assets/icons/git-icon.png'
};

const skillLabels = {
    'Csharp': 'C#',
    'English': 'English',
    'Godot': 'Godot',
    'Unity': 'Unity',
    'Blender': 'Blender',
    'Git': 'Git',
    'Unreal': 'Unreal',
    'GroupProject': 'Group Project',
    'SoloProject': 'Solo Project'
};

cartouches.forEach(cartouche => {
    cartouche.addEventListener('click', (e) => {
        e.stopPropagation();
        
        const title = cartouche.dataset.title;
        const description = cartouche.dataset.description;
        const videoSrc = cartouche.dataset.videosrc || ''; 
        const skills = JSON.parse(cartouche.dataset.skills || '[]');
        const tasks = JSON.parse(cartouche.dataset.tasks || '[]');
        const photos = JSON.parse(cartouche.dataset.photos || '[]');
        
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        modalVideo.src = videoSrc;
        modalVideo.muted = true;
        modalVideo.playsInline = true; 
        modalVideo.load();

        modalVideo.play().then(() => {
        }).catch(error => {
            console.error(error);
        });
        
        modalSkillsContainer.innerHTML = '';
        skills.forEach(skill => {
            const skillBox = document.createElement('div');
            skillBox.className = 'skill-box';
            
            const iconPath = skillIcons[skill];
            if (iconPath) {
                const icon = document.createElement('img');
                icon.src = iconPath;
                icon.alt = skill;
                icon.className = 'skill-icon';
                skillBox.appendChild(icon);
            }
            
            const label = document.createElement('span');
            label.textContent = skillLabels[skill] || skill;
            skillBox.appendChild(label);
            
            modalSkillsContainer.appendChild(skillBox);
        });
        
        modalTasksList.innerHTML = '';
        if (tasks.length > 0) {
            tasks.forEach(task => {
                const li = document.createElement('li');
                li.textContent = task;
                modalTasksList.appendChild(li);
            });
            modal.querySelector('.modal-text h3').style.display = 'block';
        } else {
            modal.querySelector('.modal-text h3').style.display = 'none';
        }
        
        modalGalleryContainer.innerHTML = '';
        currentGalleryPhotos = photos;
        
        if (photos.length > 0) {
            modal.querySelector('.modal-gallery-section').style.display = 'block';
            photos.forEach((photoSrc, index) => {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                
                const img = document.createElement('img');
                img.src = photoSrc;
                img.alt = `${title} screenshot ${index + 1}`;
                img.loading = 'lazy';
                
                galleryItem.appendChild(img);
                galleryItem.addEventListener('click', (e) => {
                    e.stopPropagation();
                    openImageModal(index);
                });
                
                modalGalleryContainer.appendChild(galleryItem);
            });
        } else {
            modal.querySelector('.modal-gallery-section').style.display = 'none';
        }
        
        const linkHref = cartouche.dataset.linkHref || '';
        if (linkHref) {
            modalPdfSection.style.display = 'block';
            modalPdfLink.href = linkHref;
            modalPdfSection.querySelector('.link-heading').textContent = cartouche.dataset.linkHeading || '';
            modalPdfSection.querySelector('.pdf-note').textContent = cartouche.dataset.linkNote || '';
            modalPdfSection.querySelector('.link-label').textContent = cartouche.dataset.linkLabel || 'Open';
            const icon = modalPdfSection.querySelector('.link-icon');
            if (cartouche.dataset.linkIcon) {
                icon.src = cartouche.dataset.linkIcon;
                icon.style.display = '';
            } else {
                icon.removeAttribute('src');
                icon.style.display = 'none';
            }
        } else {
            modalPdfSection.style.display = 'none';
        }
        
        if (cartouche.id) {
            window.history.replaceState(null, null, '#' + cartouche.id);
        }
        
        modal.classList.add('show');
        modal.setAttribute('aria-hidden', 'false');
    });
});

modalClose.addEventListener('click', () => {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    modalVideo.pause();
    modalVideo.src = '';
    window.history.replaceState(null, null, window.location.pathname);
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
        modal.setAttribute('aria-hidden', 'true');
        modalVideo.pause();
        modalVideo.src = '';
        window.history.replaceState(null, null, window.location.pathname);
    }
});

function openImageModal(index) {
    currentPhotoIndex = index;
    updateFullScreenImage();
    imageModal.classList.add('show');
    imageModal.setAttribute('aria-hidden', 'false');
}

function updateFullScreenImage() {
    if (currentGalleryPhotos.length > 0) {
        fullScreenImage.src = currentGalleryPhotos[currentPhotoIndex];
    }
}

imageModalClose.addEventListener('click', () => {
    imageModal.classList.remove('show');
    imageModal.setAttribute('aria-hidden', 'true');
});

imageModal.addEventListener('click', (e) => {
    if (e.target === imageModal || e.target === imageModal.querySelector('.modal-content-photo')) {
        imageModal.classList.remove('show');
        imageModal.setAttribute('aria-hidden', 'true');
    }
});

leftArrow.addEventListener('click', (e) => {
    e.stopPropagation();
    currentPhotoIndex = (currentPhotoIndex - 1 + currentGalleryPhotos.length) % currentGalleryPhotos.length;
    updateFullScreenImage();
});

rightArrow.addEventListener('click', (e) => {
    e.stopPropagation();
    currentPhotoIndex = (currentPhotoIndex + 1) % currentGalleryPhotos.length;
    updateFullScreenImage();
});

const filterButtons = document.querySelectorAll('.filter-btn');
const allCartouches = document.querySelectorAll('.cartouche');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const filter = button.dataset.filter;
        
        allCartouches.forEach(cartouche => {
            const tags = cartouche.dataset.tags || '';
            
            if (filter === 'all') {
                cartouche.classList.remove('hidden');
            } else {
                if (tags.includes(filter)) {
                    cartouche.classList.remove('hidden');
                } else {
                    cartouche.classList.add('hidden');
                }
            }
        });
    });
});

window.addEventListener('DOMContentLoaded', () => {
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1); 
        const targetCartouche = document.getElementById(targetId);
        
        if (targetCartouche) {
            targetCartouche.click();
            document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
        }
    }
});

/* ---------- Header: solid background once the page is scrolled ---------- */
const siteHeader = document.querySelector('header');
function updateHeader() {
    siteHeader.classList.toggle('scrolled', window.scrollY > 20);
}
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

/* ---------- Pop-up TV player controls ---------- */
const tvPlay = modal.querySelector('.tv-play');
const tvSound = modal.querySelector('.tv-sound');
const tvFull = modal.querySelector('.tv-full');
const tvProgress = modal.querySelector('.tv-progress');

function refreshTvButtons() {
    tvPlay.textContent = modalVideo.paused ? '▶' : '❚❚';
    tvSound.textContent = modalVideo.muted ? 'SOUND OFF' : 'SOUND ON';
}

function togglePlay() {
    if (modalVideo.paused) modalVideo.play().catch(() => {});
    else modalVideo.pause();
}

tvPlay.addEventListener('click', (e) => { e.stopPropagation(); togglePlay(); });
modal.querySelector('.tv-screen').addEventListener('click', (e) => { e.stopPropagation(); togglePlay(); });
tvSound.addEventListener('click', (e) => {
    e.stopPropagation();
    modalVideo.muted = !modalVideo.muted;
    refreshTvButtons();
});
tvFull.addEventListener('click', (e) => {
    e.stopPropagation();
    if (modalVideo.requestFullscreen) modalVideo.requestFullscreen();
    else if (modalVideo.webkitEnterFullscreen) modalVideo.webkitEnterFullscreen();
});
['play', 'pause', 'volumechange', 'loadeddata'].forEach(evt => modalVideo.addEventListener(evt, refreshTvButtons));
const tvTimeline = modal.querySelector('.tv-timeline');
let scrubbing = false;
function seekFromEvent(e) {
    if (!modalVideo.duration) return;
    const rect = tvTimeline.getBoundingClientRect();
    const ratio = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    modalVideo.currentTime = ratio * modalVideo.duration;
    tvProgress.style.width = (ratio * 100) + '%';
}
tvTimeline.addEventListener('click', (e) => e.stopPropagation());
tvTimeline.addEventListener('pointerdown', (e) => {
    e.stopPropagation();
    scrubbing = true;
    tvTimeline.setPointerCapture(e.pointerId);
    seekFromEvent(e);
});
tvTimeline.addEventListener('pointermove', (e) => { if (scrubbing) seekFromEvent(e); });
tvTimeline.addEventListener('pointerup', () => { scrubbing = false; });

modalVideo.addEventListener('timeupdate', () => {
    if (scrubbing) return;
    const pct = modalVideo.duration ? (modalVideo.currentTime / modalVideo.duration) * 100 : 0;
    tvProgress.style.width = pct + '%';
});

/* ---------- Talking bird ---------- */
const birdImg = document.querySelector('.bird-character');
const bubble = document.querySelector('.bubble-text');
const birdLines = [
    'Looking for an internship!\n- Feb-Apr 2027\n- 1 to 3 months\n- Full time\n- Game programming\n- Game design\n- QA testing',
    'Click a cartridge to see the game, the video and what Jacob did on it.',
    'Soko 1977 was his internship in Berlin. 4 months, all in English!',
    'You can find his resume (PDF) at the very bottom of the page.',
    'Want to hire him? His email is in the footer too. Tweet!'
];
let birdIndex = 0;
let typingTimer = null;

function sayLine(text) {
    clearInterval(typingTimer);
    bubble.textContent = '';
    bubble.classList.add('typing');
    let i = 0;
    typingTimer = setInterval(() => {
        bubble.textContent = text.slice(0, ++i);
        if (i >= text.length) {
            clearInterval(typingTimer);
            typingTimer = null;
            bubble.classList.remove('typing');
        }
    }, 28);
}

function nextBirdLine() {
    if (typingTimer) {
        // Click while typing: show the whole line at once
        clearInterval(typingTimer);
        typingTimer = null;
        bubble.textContent = birdLines[birdIndex];
        bubble.classList.remove('typing');
        return;
    }
    birdIndex = (birdIndex + 1) % birdLines.length;
    sayLine(birdLines[birdIndex]);
}

if (birdImg && bubble) {
    birdImg.addEventListener('click', nextBirdLine);
    bubble.addEventListener('click', nextBirdLine);
    sayLine(birdLines[0]);
}


/* ---------- Back of the cartridges: list the skills used ---------- */
document.querySelectorAll('.cartouche').forEach(cartouche => {
    const container = cartouche.querySelector('.back-skills');
    if (!container) return;
    JSON.parse(cartouche.dataset.skills || '[]').forEach(skill => {
        const tag = document.createElement('span');
        tag.className = 'back-skill';
        if (skillIcons[skill]) {
            const icon = document.createElement('img');
            icon.src = skillIcons[skill];
            icon.alt = '';
            tag.appendChild(icon);
        }
        tag.appendChild(document.createTextNode(skillLabels[skill] || skill));
        container.appendChild(tag);
    });
});
