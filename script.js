/**
 * Checks if the password is correct and reveals the main content
 * Triggered by 'oninput' in index.html
 */
function checkPassword(input) {
    // 1. Get the config inside the function to ensure it is loaded
    const config = window.VALENTINE_CONFIG;

    // 2. Safety check: Ensure config and auth section exist
    if (!config || !config.auth) {
        console.error("Configuration not found! Check your config.js structure.");
        return;
    }

    const enteredPassword = input.value.trim();

    // 3. Comparison logic (Case-insensitive)
    if (enteredPassword.toLowerCase() === config.auth.password.toLowerCase()) {
        const gate = document.getElementById('passwordGate');
        const main = document.getElementById('mainContainer');

        // Animation: Slide up and fade out
        gate.style.transition = 'all 0.8s ease-in-out';
        gate.style.opacity = '0';
        gate.style.transform = 'translateY(-100%)';
            
        setTimeout(() => {
            gate.style.display = 'none';
            // Show the main romantic container
            main.classList.remove('main-content-hidden');
            main.style.display = 'block'; 
            
            // Start the animations now that the page is unlocked
            startFloatingLoop();
            
            // Try to play music (Browsers allow it now because of the user interaction)
            const bgMusic = document.getElementById('bgMusic');
            if (config.music && config.music.enabled) {
                bgMusic.play().catch(e => console.log("Music waiting for play button click."));
            }
        }, 800);
    }
}

// Set page title
if (window.VALENTINE_CONFIG) {
    document.title = window.VALENTINE_CONFIG.pageTitle;
}

// Initialize the page content when DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
    const config = window.VALENTINE_CONFIG;
    if (!config) return;

    // Set texts from config
    document.getElementById('valentineTitle').textContent = `${config.valentineName}, my love...`;
    
    // Question 1
    document.getElementById('question1Text').textContent = config.questions.first.text;
    document.getElementById('yesBtn1').textContent = config.questions.first.yesBtn;
    document.getElementById('noBtn1').textContent = config.questions.first.noBtn;
    document.getElementById('secretAnswerBtn').textContent = config.questions.first.secretAnswer;
    
    // Question 2
    document.getElementById('question2Text').textContent = config.questions.second.text;
    document.getElementById('startText').textContent = config.questions.second.startText;
    document.getElementById('nextBtn').textContent = config.questions.second.nextBtn;
    
    // Question 3
    document.getElementById('question3Text').textContent = config.questions.third.text;
    document.getElementById('yesBtn3').textContent = config.questions.third.yesBtn;
    document.getElementById('noBtn3').textContent = config.questions.third.noBtn;

    // Setup music player
    setupMusicPlayer();
});

function startFloatingLoop() {
    const config = window.VALENTINE_CONFIG;
    const container = document.querySelector('.floating-elements');
    const allEmojis = [...config.floatingEmojis.hearts, ...config.floatingEmojis.bears];

    setInterval(() => {
        const div = document.createElement('div');
        div.className = 'heart';
        div.innerHTML = allEmojis[Math.floor(Math.random() * allEmojis.length)];
        div.style.left = Math.random() * 100 + 'vw';
        div.style.fontSize = (Math.random() * 1.5 + 1.5) + 'rem';
        div.style.animationDuration = (Math.random() * 10 + 10) + 's';
        container.appendChild(div);
        setTimeout(() => div.remove(), 20000);
    }, 1500);
}

function showNextQuestion(questionNumber) {
    document.querySelectorAll('.question-section').forEach(q => q.classList.add('hidden'));
    document.getElementById(`question${questionNumber}`).classList.remove('hidden');
}

function moveButton(button) {
    const x = Math.random() * (window.innerWidth - button.offsetWidth);
    const y = Math.random() * (window.innerHeight - button.offsetHeight);
    button.style.position = 'fixed';
    button.style.left = x + 'px';
    button.style.top = y + 'px';
}

// Love meter functionality
const loveMeter = document.getElementById('loveMeter');
if (loveMeter) {
    loveMeter.addEventListener('input', () => {
        const config = window.VALENTINE_CONFIG;
        const value = parseInt(loveMeter.value);
        document.getElementById('loveValue').textContent = value;
        const extraLove = document.getElementById('extraLove');
        
        if (value > 100) {
            extraLove.classList.remove('hidden');
            if (value >= 5000) {
                extraLove.className = 'super-love';
                extraLove.textContent = config.loveMessages.extreme;
            } else if (value > 1000) {
                extraLove.textContent = config.loveMessages.high;
            } else {
                extraLove.textContent = config.loveMessages.normal;
            }
        } else {
            extraLove.classList.add('hidden');
        }
    });
}

function celebrate() {
    const config = window.VALENTINE_CONFIG;
    document.querySelectorAll('.question-section').forEach(q => q.classList.add('hidden'));
    document.getElementById('celebration').classList.remove('hidden');
    
    document.getElementById('celebrationTitle').textContent = config.celebration.title;
    document.getElementById('celebrationMessage').textContent = config.celebration.message;
    document.getElementById('celebrationEmojis').textContent = config.celebration.emojis;

    const giftLink = document.querySelector('.gift-btn');
    if(giftLink) giftLink.href = config.celebration.driveLink;
}

function setupMusicPlayer() {
    const config = window.VALENTINE_CONFIG;
    const bgMusic = document.getElementById('bgMusic');
    const musicSource = document.getElementById('musicSource');
    const musicToggle = document.getElementById('musicToggle');

    if (!config.music.enabled) return;

    musicSource.src = config.music.musicUrl;
    bgMusic.load();

    musicToggle.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggle.textContent = config.music.stopText;
        } else {
            bgMusic.pause();
            musicToggle.textContent = config.music.startText;
        }
    });
}

// Gallery functionality
let currentImageIndex = 0;
const galleryImages = [
    'images/WhatsApp Image 2026-02-08 at 12.25.44 PM (1).jpeg',
    'images/WhatsApp Image 2026-02-08 at 12.25.44 PM.jpeg',
    'images/WhatsApp Image 2026-02-08 at 12.25.45 PM (1).jpeg',
    'images/WhatsApp Image 2026-02-08 at 12.25.45 PM.jpeg',
    'images/WhatsApp Image 2026-02-08 at 12.25.46 PM (1).jpeg',
    'images/WhatsApp Image 2026-02-08 at 12.25.46 PM (2).jpeg',
    'images/WhatsApp Image 2026-02-08 at 12.25.46 PM.jpeg',
    'images/WhatsApp Image 2026-02-08 at 12.25.47 PM (1).jpeg',
    'images/WhatsApp Image 2026-02-08 at 12.25.47 PM (2).jpeg',
    'images/WhatsApp Image 2026-02-08 at 12.25.47 PM.jpeg',
    'images/WhatsApp Image 2026-02-08 at 12.25.48 PM (1).jpeg',
    'images/WhatsApp Image 2026-02-08 at 12.25.48 PM (2).jpeg',
    'images/WhatsApp Image 2026-02-08 at 12.25.48 PM.jpeg',
    'images/WhatsApp Image 2026-02-08 at 12.25.49 PM (1).jpeg',
    'images/WhatsApp Image 2026-02-08 at 12.25.49 PM (2).jpeg',
    'images/WhatsApp Image 2026-02-08 at 12.25.49 PM.jpeg',
    'images/WhatsApp Image 2026-02-08 at 12.25.50 PM.jpeg'
];

function showGallery() {
    const gallery = document.getElementById('photoGallery');
    gallery.classList.remove('hidden');
    currentImageIndex = 0;
    updateGalleryImage();
    startAutoSlideshow();
}

function closeGallery() {
    const gallery = document.getElementById('photoGallery');
    gallery.classList.add('hidden');
    stopAutoSlideshow();
    stopGalleryFloatingLoop();
}

function updateGalleryImage() {
    const img = document.getElementById('galleryImage');
    img.src = galleryImages[currentImageIndex];
    img.style.opacity = '0';
    setTimeout(() => {
        img.style.opacity = '1';
    }, 100);
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    updateGalleryImage();
    resetAutoSlideshow();
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    updateGalleryImage();
    resetAutoSlideshow();
}

let slideshowInterval;

function startAutoSlideshow() {
    slideshowInterval = setInterval(() => {
        nextImage();
    }, 3000); // Change image every 3 seconds
}

function stopAutoSlideshow() {
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
    }
}

function resetAutoSlideshow() {
    stopAutoSlideshow();
    startAutoSlideshow();
}

// Close gallery when clicking outside
document.addEventListener('click', (e) => {
    const gallery = document.getElementById('photoGallery');
    if (e.target === gallery) {
        closeGallery();
    }
});

// Gallery floating elements
let galleryFloatingInterval;

function startGalleryFloatingLoop() {
    const container = document.querySelector('.gallery-floating-elements');
    const galleryEmojis = ['❤️', '💖', '💝', '💗', '💓', '💕', '💜', '🤍', '💙', '❤️‍🔥', '❤️‍🩹', '🧡', '💋', '😘', '🥰', '😍'];

    galleryFloatingInterval = setInterval(() => {
        const div = document.createElement('div');
        div.className = 'gallery-heart';
        div.innerHTML = galleryEmojis[Math.floor(Math.random() * galleryEmojis.length)];
        div.style.left = Math.random() * 100 + 'vw';
        div.style.fontSize = (Math.random() * 1.5 + 1.5) + 'rem';
        div.style.animationDuration = (Math.random() * 10 + 10) + 's';
        container.appendChild(div);
        setTimeout(() => div.remove(), 20000);
    }, 1000);
}

function stopGalleryFloatingLoop() {
    if (galleryFloatingInterval) {
        clearInterval(galleryFloatingInterval);
    }
    // Clear existing floating elements
    const container = document.querySelector('.gallery-floating-elements');
    if (container) {
        container.innerHTML = '';
    }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    const gallery = document.getElementById('photoGallery');
    if (!gallery.classList.contains('hidden')) {
        if (e.key === 'ArrowRight') {
            nextImage();
        } else if (e.key === 'ArrowLeft') {
            prevImage();
        } else if (e.key === 'Escape') {
            closeGallery();
        }
    }
});
