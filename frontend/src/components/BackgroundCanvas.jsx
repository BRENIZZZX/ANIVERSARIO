import { useEffect, useRef } from 'react';

const BackgroundCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];
    let isFlowers = true;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = () => ({
      x: Math.random() * canvas.width,
      y: canvas.height + 50,
      size: Math.random() * 25 + 15,
      speedX: (Math.random() - 0.5) * 1,
      speedY: -(Math.random() * 2 + 1),
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 3,
      opacity: Math.random() * 0.4 + 0.2
    });

    const drawFlower = (ctx, x, y, size, rotation) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation * Math.PI / 180);
      
      // Pétalas
      for (let i = 0; i < 6; i++) {
        ctx.save();
        ctx.rotate((i * 60) * Math.PI / 180);
        ctx.beginPath();
        ctx.ellipse(0, -size/2, size/3, size/2, 0, 0, 2 * Math.PI);
        ctx.fillStyle = '#D16D85';
        ctx.fill();
        ctx.restore();
      }
      
      // Centro
      ctx.beginPath();
      ctx.arc(0, 0, size/5, 0, 2 * Math.PI);
      ctx.fillStyle = '#E8A4B8';
      ctx.fill();
      
      ctx.restore();
    };

    const drawHeart = (ctx, x, y, size, rotation) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation * Math.PI / 180);
      ctx.scale(size/20, size/20);
      
      ctx.beginPath();
      ctx.moveTo(0, 3);
      ctx.bezierCurveTo(-10, -5, -20, -5, -10, 0);
      ctx.bezierCurveTo(-10, -5, 0, -15, 0, -5);
      ctx.bezierCurveTo(0, -15, 10, -5, 10, 0);
      ctx.bezierCurveTo(20, -5, 10, -5, 0, 3);
      ctx.fillStyle = '#D16D85';
      ctx.fill();
      
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.rotation += particle.rotationSpeed;
        
        // Recriar partícula quando sair da tela
        if (particle.y < -50) {
          particles[index] = createParticle();
        }
        if (particle.x < -50) particle.x = canvas.width + 50;
        if (particle.x > canvas.width + 50) particle.x = -50;
        
        ctx.globalAlpha = particle.opacity;
        
        if (isFlowers) {
          drawFlower(ctx, particle.x, particle.y, particle.size, particle.rotation);
        } else {
          drawHeart(ctx, particle.x, particle.y, particle.size, particle.rotation);
        }
      });
      
      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(animate);
    };

    const init = () => {
      resizeCanvas();
      particles = [];
      for (let i = 0; i < 20; i++) {
        const particle = createParticle();
        particle.y = Math.random() * canvas.height;
        particles.push(particle);
      }
      animate();
    };

    init();
    window.addEventListener('resize', resizeCanvas);

    // Alternar entre flores e corações a cada 10 segundos
    const interval = setInterval(() => {
      isFlowers = !isFlowers;
    }, 10000);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
      clearInterval(interval);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.3 }}
    />
  );
};

export default BackgroundCanvas;