document.addEventListener('DOMContentLoaded', function() {
    const scene = document.getElementById('scene-container');
    const shards = document.querySelectorAll('.shard');

    function startBreathing() {
        shards.forEach(shard => {
            const depth = parseFloat(shard.getAttribute('data-depth')) || 0;
            const baseTransform = `translateZ(${depth * 40}px)`;
            
            shard.style.setProperty('--base-transform', baseTransform);
            shard.classList.add('is-breathing');
        });
    }

    /**
     * Вспомогательная функция для генерации случайных чисел 
     * с нормальным (гауссовым) распределением.
     * Это поможет создать естественное, хаотичное облако частиц.
     */
    function gaussianRandom(mean = 0, stdev = 1) {
        let u = 1 - Math.random(); // Converting [0,1) to (0,1]
        let v = Math.random();
        let z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
        return z * stdev + mean;
    }

    /**
     * ОБНОВЛЕНО: Частицы создаются в виде хаотичного облака.
     */
    function createFlickeringParticles() {
        const container = document.getElementById('flickering-particles-container');
        if (!container) return;

        const particleCount = 150; 
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        // --- НОВЫЙ БЛОК: Настройки для хаотичного облака ---
        // 1. Стандартное отклонение. 
        // Чем больше это значение, тем шире будет облако частиц.
        // centerX / 2.5 сделает облако достаточно широким, чтобы доходить до краев.
        const standardDeviation = centerX / 2.5;

        // 2. Сила "дыхания" (остается прежней).
        const movementStrength = 0.1; 
        // --- КОНЕЦ НОВОГО БЛОКА ---

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'flickering-particle';

            const size = Math.random() * 2 + 0.5;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;

            // --- ОБНОВЛЕНО: Генерация позиции с помощью гауссова распределения ---
            const x = gaussianRandom(centerX, standardDeviation);
            const y = gaussianRandom(centerY, standardDeviation);
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            // --- КОНЕЦ ОБНОВЛЕНИЯ ПОЗИЦИИ ---

            // Расчет вектора для легкой пульсации (логика та же)
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
});
