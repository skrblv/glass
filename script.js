document.addEventListener('DOMContentLoaded', function() {
    const scene = document.getElementById('scene-container');
    const shards = document.querySelectorAll('.shard');
    let movementTimer; // Таймер для отслеживания остановки мыши

    /**
     * Функция для запуска "дыхания" (состояние покоя).
     * Она устанавливает базовое Z-положение как CSS-переменную
     * и добавляет класс .is-breathing для запуска CSS-анимации.
     */
    function startBreathing() {
        shards.forEach(shard => {
            const depth = parseFloat(shard.getAttribute('data-depth')) || 0;
            // Базовый transform (только Z) нужен, чтобы анимация не сбрасывала 3D-положение
            const baseTransform = `translateZ(${depth * 40}px)`;
            
            shard.style.setProperty('--base-transform', baseTransform);
            
            // Убираем инлайновый transform, чтобы CSS-анимация могла его переопределить
            shard.style.transform = ''; 
            
            // Добавляем класс, который запускает CSS-анимацию
            shard.classList.add('is-breathing');
        });
    }

    /**
     * Функция для остановки "дыхания" (во время движения мыши).
     * Она снимает класс .is-breathing.
     */
    function stopBreathing() {
        shards.forEach(shard => {
            shard.classList.remove('is-breathing');
            // Сбрасываем CSS-переменную (не обязательно, но для чистоты)
            shard.style.setProperty('--base-transform', 'none'); 
        });
    }

    // Listener 'mousemove' теперь делает больше:
    scene.addEventListener('mousemove', (e) => {
        
        // 1. Немедленно останавливаем "дыхание"
        stopBreathing();

        // 2. Сбрасываем таймер "остановки" (если он был)
        clearTimeout(movementTimer);

        // 3. Выполняем вашу оригинальную логику параллакса
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        shards.forEach(shard => {
            const depth = parseFloat(shard.getAttribute('data-depth')) || 0;
            const moveX = mouseX * depth * 0.1;
            const moveY = mouseY * depth * 0.1;

            // (Эти переменные все еще нужны для эффекта ::before)
            shard.style.setProperty('--x', moveX);
            shard.style.setProperty('--y', moveY);

            // Применяем полный transform для параллакса
            // (Он переопределит любую CSS-анимацию)
            shard.style.transform = `
                translateX(${moveX}px) 
                translateY(${moveY}px) 
                translateZ(${depth * 40}px)
                rotateY(${moveX * 0.1}deg)
                rotateX(${-moveY * 0.1}deg)
            `;
        });

        // 4. Запускаем новый таймер. Если мышь не двигалась 200мс,
        //    мы считаем, что пользователь остановился, и запускаем "дыхание"
        movementTimer = setTimeout(() => {
            startBreathing();
        }, 200);
    });

    // Запускаем breathing по умолчанию (когда страница загружена и мышь не движется)
    startBreathing();

    // Если указатель покидает сцену, сразу включаем breathing
    scene.addEventListener('mouseleave', () => {
        clearTimeout(movementTimer);
        startBreathing();
    });
});
