document.addEventListener('DOMContentLoaded', function() {
    
    // --- ВАШ ОРИГИНАЛЬНЫЙ КОД (АНИМАЦИИ И ЧАСТИЦЫ) ---

    const shards = document.querySelectorAll('.shard');

    function startBreathing() {
        shards.forEach(shard => {
            const depth = parseFloat(shard.getAttribute('data-depth')) || 0;
            const baseTransform = `translateZ(${depth * 40}px)`;
            
            shard.style.setProperty('--base-transform', baseTransform);
            shard.classList.add('is-breathing');
        });
    }

    function gaussianRandom(mean = 0, stdev = 1) {
        let u = 1 - Math.random();
        let v = Math.random();
        let z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
        return z * stdev + mean;
    }

    function createFlickeringParticles() {
        const container = document.getElementById('flickering-particles-container');
        if (!container) return;

        const particleCount = 150; 
        const centerX = 1400 / 2; // Используем фиксированную ширину сцены
        const centerY = 900 / 2;  // Используем фиксированную высоту сцены
        const standardDeviation = centerX / 2.5;
        const movementStrength = 0.1; 

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'flickering-particle';
            const size = Math.random() * 2 + 0.5;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            const x = gaussianRandom(centerX, standardDeviation);
            const y = gaussianRandom(centerY, standardDeviation);
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            const fullTargetX = centerX - x;
            const fullTargetY = centerY - y;
            const targetX = fullTargetX * movementStrength;
            const targetY = fullTargetY * movementStrength;
            particle.style.setProperty('--target-x', `${targetX}px`);
            particle.style.setProperty('--target-y', `${targetY}px`);
            const flickerDuration = Math.random() * 3 + 2;
            const pullDuration = Math.random() * 10 + 10;
            const delay = Math.random() * 10;
            particle.style.animation = `
                flicker ${flickerDuration}s ${delay}s infinite linear,
                centerPull ${pullDuration}s ${delay}s infinite ease-in-out
            `;
            container.appendChild(particle);
        }
    }

    startBreathing();
    createFlickeringParticles();

    // --- НАДЕЖНЫЙ КОД ДЛЯ АДАПТИВНОСТИ ---
    
    const sceneContainer = document.getElementById('scene-container');
    if (!sceneContainer) return;

    const designWidth = 1400;
    const designHeight = 900;

    function adjustScale() {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        const scaleX = screenWidth / designWidth;
        const scaleY = screenHeight / designHeight;

        const scale = Math.min(scaleX, scaleY);

        // Устанавливаем CSS-переменную, которую использует #scene-container
        document.documentElement.style.setProperty('--scene-scale', scale);
    }

    adjustScale();
    window.addEventListener('resize', adjustScale);

});
