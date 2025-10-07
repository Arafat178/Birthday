document.addEventListener('DOMContentLoaded', () => {
    const surpriseBox = document.getElementById('surprise-box');
    const mainContent = document.getElementById('main-content');
    const birthdaySong = document.getElementById('birthday-song');

    const particleContainer = document.getElementById('particle-container');
    const balloonContainer = document.getElementById('balloon-container');
    const heartsContainer = document.getElementById('hearts-container');

    const balloonColors = ['#ff69b4', '#ffd700', '#00bfff', '#9370db', '#32cd32', '#ff4500', '#ffa500'];

    surpriseBox.addEventListener('click', () => {
        // Hide the surprise box
        surpriseBox.style.display = 'none';

        // Show the main content
        mainContent.classList.remove('hidden');
        mainContent.style.display = 'flex';

        // Play the music
        birthdaySong.play().catch(error => {
            console.error("Audio autoplay was blocked by the browser:", error);
        });

        // 1. Initial big burst of confetti (now from 4 centers)
        createFourCenterBurstParticles(); // <-- MODIFIED FUNCTION CALL

        // 2. Continuous effects
        createContinuousBalloons();
        createContinuousHearts();
        createContinuousParticles();
    });


    // MODIFIED FUNCTION: Creates burst particles from 4 centers
    function createFourCenterBurstParticles() {
        const BURST_COUNT_PER_CENTER = 75; // Number of particles per center
        const TOTAL_BURST_COUNT = BURST_COUNT_PER_CENTER * 4; // Total particles in the burst

        const boxRect = surpriseBox.getBoundingClientRect();

        // Define 4 centers relative to the surprise box
        const centers = [
            { x: boxRect.left + boxRect.width * 0.25, y: boxRect.top + boxRect.height * 0.25 }, // Top-left
            { x: boxRect.left + boxRect.width * 0.75, y: boxRect.top + boxRect.height * 0.25 }, // Top-right
            { x: boxRect.left + boxRect.width * 0.25, y: boxRect.top + boxRect.height * 0.75 }, // Bottom-left
            { x: boxRect.left + boxRect.width * 0.75, y: boxRect.top + boxRect.height * 0.75 }  // Bottom-right
        ];

        for (let c = 0; c < centers.length; c++) {
            const currentCenter = centers[c];
            for (let i = 0; i < BURST_COUNT_PER_CENTER; i++) {
                const particle = document.createElement('div');
                particle.className = 'burst-particle';
                
                // INCREASE PARTICLE SIZE HERE: (e.g., 6 to 12 pixels)
                const size = Math.random() * 6 + 8; 
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`;

                // Position at the current center
                particle.style.left = `${currentCenter.x}px`;
                particle.style.top = `${currentCenter.y}px`;

                // Random direction for explosion from this center
                const angle = Math.random() * 2 * Math.PI;
                const distance = Math.random() * 250 + 300; // INCREASE BURST DISTANCE (e.g., 100-350px)
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

    // MODIFIED FUNCTION: For continuous particle blast (fountain)
    function createContinuousParticles() {
        // We'll use setInterval to create particles continuously
        setInterval(() => {
            const particle = document.createElement('div');
            particle.className = 'continuous-particle';

            // INCREASE CONTINUOUS PARTICLE SIZE HERE: (e.g., 5 to 12 pixels)
            const size = Math.random() * 7 + 5; // partical size
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 75%)`;

            // Spread them across the bottom of the screen
            particle.style.left = `${Math.random() * 100}%`; 

            const duration = Math.random() * 2 + 3;
            particle.style.animationDuration = `${duration}s`;

            particleContainer.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, duration * 1000);

        }, 50); // INCREASE FREQUENCY: Create a new particle every 50ms for denser fountain
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