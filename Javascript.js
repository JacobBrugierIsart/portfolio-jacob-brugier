function createSnowflakes() {
    const snowContainer = document.getElementById('snow');
    const numberOfSnowflakes = 150;

    for (let i = 0; i < numberOfSnowflakes; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        
        const size = Math.random() * 70;
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
    'Csharp': 'assets/icons/csharp-icon.png',
    'English': 'assets/icons/english-icon.png',
    'HTML': 'assets/icons/html-icon.png',
    'Blender': 'assets/icons/blender-icon.png',
    'Git': 'assets/icons/git-icon.png'
};

const skillLabels = {
    'Csharp': 'C#',
    'English': 'English',
    'HTML': 'HTML',
    'Godot': 'Godot',
    'Unity': 'Unity',
    'Blender': 'Blender',
    'Git': 'Git'
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
        
        modalVideo.load();

        modalVideo.play().then(() => {
        }).catch(error => {
            console.error("Échec de la lecture de la vidéo. Vérifiez le chemin (data-videosrc) et la propriété 'muted'.", error);
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
                img.alt = `Photo ${index + 1} du projet`;
                
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
        
        modal.classList.add('show');
        modal.setAttribute('aria-hidden', 'false');
    });
});

modalClose.addEventListener('click', () => {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    modalVideo.pause();
    modalVideo.src = '';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
        modal.setAttribute('aria-hidden', 'true');
        modalVideo.pause();
        modalVideo.src = '';
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
