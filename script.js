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
     * ОБНОВЛЕНО: Функция для создания частиц с двойной анимацией.
     */
    function createFlickeringParticles() {
        const container = document.getElementById('flickering-particles-container');
        if (!container) return;

        const particleCount = 150; 
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'flickering-particle';

            const size = Math.random() * 2 + 0.5;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;

            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;

            // --- НОВЫЙ БЛОК: Расчет и установка вектора движения ---
            // 1. Рассчитываем, на сколько нужно сместить частицу, чтобы она попала в центр.
            const targetX = centerX - x;
            const targetY = centerY - y;

            // 2. Устанавливаем эти значения как CSS-переменные для этой конкретной частицы.
            particle.style.setProperty('--target-x', `${targetX}px`);
            particle.style.setProperty('--target-y', `${targetY}px`);
            // --- КОНЕЦ НОВОГО БЛОКА ---

            // --- ОБНОВЛЕНО: Назначаем обе анимации с разными параметрами ---
            const flickerDuration = Math.random() * 3 + 2; // от 2 до 5 секунд
            const pullDuration = Math.random() * 10 + 10; // от 10 до 20 секунд для плавности
            const delay = Math.random() * 10; // общая задержка для асинхронности

            particle.style.animation = `
                flicker ${flickerDuration}s ${delay}s infinite linear,
                centerPull ${pullDuration}s ${delay}s infinite ease-in-out
            `;
            // --- КОНЕЦ ОБНОВЛЕНИЯ ---

            container.appendChild(particle);
        }
    }

    startBreathing();
    createFlickeringParticles();
});
