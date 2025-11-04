document.addEventListener('DOMContentLoaded', function() {
    const scene = document.getElementById('scene-container');
    const shards = document.querySelectorAll('.shard');

    scene.addEventListener('mousemove', (e) => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        shards.forEach(shard => {
            const depth = shard.getAttribute('data-depth');
            const moveX = mouseX * depth * 0.1;
            const moveY = mouseY * depth * 0.1;

            shard.style.setProperty('--x', moveX);
            shard.style.setProperty('--y', moveY);

            shard.style.transform = `
                translateX(${moveX}px) 
                translateY(${moveY}px) 
                translateZ(${depth * 40}px)
                rotateY(${moveX * 0.1}deg)
                rotateX(${-moveY * 0.1}deg)
            `;
        });
    });
});
