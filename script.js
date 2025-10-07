document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Get Elements ---
    const surpriseBox = document.getElementById('surprise-box'); // The main box container
    const giftLid = document.getElementById('gift-lid'); // New ID for lid
    const ribbonV = document.getElementById('ribbon-v'); // New ID for vertical ribbon
    const ribbonH = document.getElementById('ribbon-h'); // New ID for horizontal ribbon
    const mainContent = document.getElementById('main-content');
    const birthdaySong = document.getElementById('birthday-song');
    const signatureElement = document.getElementById('signature-text'); // New ID for signature
    
    // Containers for effects
    const particleContainer = document.getElementById('particle-container');
    const balloonContainer = document.getElementById('balloon-container');
    const heartsContainer = document.getElementById('hearts-container');
    const petalContainer = document.getElementById('petal-container'); // New Petal Container

    const balloonColors = ['#ff69b4', '#ffd700', '#00bfff', '#9370db', '#32cd32', '#ff4500', '#ffa500'];
    const petalEmojis = ['🌸', '🌷', '🌹', '💖', '🌼']; // Romantic Emojis/Petals

    // --- 2. Main Click Handler ---
    surpriseBox.addEventListener('click', () => {
        // A. Gift Box Opening Animation
        if (giftLid) giftLid.classList.add('gift-lid-open');
        if (ribbonV) ribbonV.classList.add('ribbon-released');
        if (ribbonH) ribbonH.classList.add('ribbon-released');

        // B. Show Main Content (Delayed to allow lid animation to start)
        setTimeout(() => {
            surpriseBox.style.display = 'none';
            mainContent.classList.remove('hidden');
            mainContent.style.display = 'flex';
            document.body.classList.add('revealed'); // For background transition
            
            // Play the music
            birthdaySong.play().catch(error => {
                console.error("Audio autoplay was blocked:", error);
            });

            // Initial big burst of confetti
            createFourCenterBurstParticles(); 
            
            // Typewriter effect for signature (Delayed further after pop-in)
            setTimeout(() => {
                if (signatureElement) {
                    signatureElement.style.opacity = 1; 
                    // Remove/override CSS animation to allow JS control
                    signatureElement.style.animation = 'none'; 
                    typeWriterEffect(signatureElement, 75); // 75ms speed
                }
            }, 3000); 

        }, 500); // Start showing main content half a second after click

        // C. Continuous effects
        createContinuousBalloons();
        createContinuousHearts();
        createContinuousParticles();
        createContinuousPetals(); // New Petal Rain
    });

    // --- 3. New: Typewriter Effect Function ---
    function typeWriterEffect(element, speed = 75) {
        // Use textContent to safely handle the content (assuming signature is just text)
        const text = element.textContent;
        element.textContent = ''; 
        let i = 0;
        
        // Ensure initial opacity is 1 for the effect
        element.style.opacity = 1;

        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        // Wait a small moment for the transition before starting
        setTimeout(type, 100); 
    }

    // --- 4. New: Petal Rain Effect ---
    function createPetal() {
        const petal = document.createElement('div');
        petal.className = 'petal';
        // Use a random romantic emoji/petal shape
        petal.innerHTML = petalEmojis[Math.floor(Math.random() * petalEmojis.length)]; 

        // Random position, size, and duration
        petal.style.left = `${Math.random() * 100}%`;
        petal.style.fontSize = `${Math.random() * 1.5 + 1.2}rem`; // Vary size

        const duration = Math.random() * 6 + 7;
        petal.style.animationDuration = `${duration}s`;
        petal.style.animationDelay = `${Math.random() * 2}s`;
        
        // Set a random sway distance for the CSS keyframe
        const swayDistance = Math.random() * 60 - 30; // -30px to 30px
        petal.style.setProperty('--sway-distance', `${swayDistance}px`);
        
        petalContainer.appendChild(petal);
        
        petal.addEventListener('animationend', () => {
            petal.remove();
        });
    }
    
    function createContinuousPetals() {
        setInterval(createPetal, 400); // New petal every 400ms
    }

    // --- 5. Modified: Four Center Burst Particles (Added Trail Color) ---
    function createFourCenterBurstParticles() {
        const BURST_COUNT_PER_CENTER = 75; 
        const boxRect = surpriseBox.getBoundingClientRect();

        const centers = [
            { x: boxRect.left + boxRect.width * 0.25, y: boxRect.top + boxRect.height * 0.25 },
            { x: boxRect.left + boxRect.width * 0.75, y: boxRect.top + boxRect.height * 0.25 },
            { x: boxRect.left + boxRect.width * 0.25, y: boxRect.top + boxRect.height * 0.75 },
            { x: boxRect.left + boxRect.width * 0.75, y: boxRect.top + boxRect.height * 0.75 } 
        ];

        for (let c = 0; c < centers.length; c++) {
            const currentCenter = centers[c];
            for (let i = 0; i < BURST_COUNT_PER_CENTER; i++) {
                const particle = document.createElement('div');
                particle.className = 'burst-particle';
                
                const size = Math.random() * 6 + 8; 
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                
                // Set particle color and CSS variable for the trail glow
                const particleColor = `hsl(${Math.random() * 360}, 100%, 70%)`;
                particle.style.backgroundColor = particleColor;
                particle.style.setProperty('--particle-color', particleColor); // Set CSS var
                
                particle.style.left = `${currentCenter.x}px`;
                particle.style.top = `${currentCenter.y}px`;

                const angle = Math.random() * 2 * Math.PI;
                const distance = Math.random() * 250 + 300; 
                const targetX = Math.cos(angle) * distance;
                const targetY = Math.sin(angle) * distance;

                particle.style.setProperty('--x', `${targetX}px`);
                particle.style.setProperty('--y', `${targetY}px`);
                
                const duration = Math.random() * 1.5 + 1.5;
                particle.style.animationDuration = `${duration}s`;
                particle.style.animationDelay = `${Math.random() * 0.1}s`;
                
                document.body.appendChild(particle);

                setTimeout(() => {
                    particle.remove();
                }, duration * 1000);
            }
        }
    }

    // --- 6. Other Continuous Effects (Kept for completeness) ---

    function createContinuousParticles() {
        setInterval(() => {
            const particle = document.createElement('div');
            particle.className = 'continuous-particle';

            const size = Math.random() * 7 + 5;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 75%)`;

            particle.style.left = `${Math.random() * 100}%`; 

            const duration = Math.random() * 2 + 3;
            particle.style.animationDuration = `${duration}s`;

            particleContainer.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, duration * 1000);

        }, 50); 
    }

    function createBalloon() {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.backgroundColor = balloonColors[Math.floor(Math.random() * balloonColors.length)];
        balloon.style.left = `${Math.random() * 90}%`; 
        const duration = Math.random() * 10 + 10;
        balloon.style.animationDuration = `${duration}s`;
        balloonContainer.appendChild(balloon);
        balloon.addEventListener('animationend', () => {
            balloon.remove();
        });
    }

    function createContinuousBalloons() {
        setInterval(createBalloon, 2000);
    }

    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '❤️';
        heart.style.left = `${Math.random() * 100}%`;
        const duration = Math.random() * 4 + 4;
        heart.style.animationDuration = `${duration}s`;
        heartsContainer.appendChild(heart);
        heart.addEventListener('animationend', () => {
            heart.remove();
        });
    }

    function createContinuousHearts() {
        setInterval(createHeart, 300);
    }
});
