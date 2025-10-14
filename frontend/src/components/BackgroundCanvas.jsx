import React, { useEffect, useRef, useState } from 'react'

const BackgroundCanvas = () => {
  // Referência para o elemento canvas
  const canvasRef = useRef(null)
  // Estado para controlar o modo atual (flowers ou hearts)
  const [mode, setMode] = useState('flowers')
  // Referência para o ID da animação (para poder cancelar)
  const animationRef = useRef(null)
  // Array para armazenar as partículas
  const particlesRef = useRef([])

  // Classe para representar uma partícula (flor ou coração)
  class Particle {
    constructor(canvas, type) {
      this.canvas = canvas
      this.type = type // 'flower' ou 'heart'
      this.reset() // Inicializa posição e propriedades
    }

    // Reseta a partícula para uma nova posição inicial
    reset() {
      this.x = Math.random() * this.canvas.width // Posição X aleatória
      this.y = -50 // Começa acima da tela
      this.size = Math.random() * 20 + 10 // Tamanho entre 10 e 30
      this.speed = Math.random() * 2 + 1 // Velocidade entre 1 e 3
      this.rotation = 0 // Rotação inicial
      this.rotationSpeed = (Math.random() - 0.5) * 0.1 // Velocidade de rotação
      this.opacity = Math.random() * 0.7 + 0.3 // Opacidade entre 0.3 e 1
      
      // Cores específicas para cada tipo
      if (this.type === 'flower') {
        this.color = `rgba(236, 72, 153, ${this.opacity})` // Rosa
      } else {
        this.color = `rgba(239, 68, 68, ${this.opacity})` // Vermelho para corações
      }
    }

    // Atualiza a posição e rotação da partícula
    update() {
      this.y += this.speed // Move para baixo
      this.rotation += this.rotationSpeed // Rotaciona
      
      // Se saiu da tela, reseta para o topo
      if (this.y > this.canvas.height + 50) {
        this.reset()
      }
    }

    // Desenha a partícula no canvas
    draw(ctx) {
      ctx.save() // Salva o estado atual do contexto
      
      // Move o contexto para a posição da partícula
      ctx.translate(this.x, this.y)
      ctx.rotate(this.rotation)
      
      ctx.fillStyle = this.color
      ctx.strokeStyle = this.color
      ctx.lineWidth = 2
      
      if (this.type === 'flower') {
        // Desenha uma flor simples (5 pétalas)
        for (let i = 0; i < 5; i++) {
          ctx.save()
          ctx.rotate((i * Math.PI * 2) / 5) // Rotaciona para cada pétala
          
          // Desenha pétala como elipse
          ctx.beginPath()
          ctx.ellipse(0, -this.size/2, this.size/4, this.size/2, 0, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        }
        
        // Centro da flor
        ctx.beginPath()
        ctx.arc(0, 0, this.size/6, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`
        ctx.fill()
        
      } else {
        // Desenha um coração
        const size = this.size / 2
        ctx.beginPath()
        
        // Lado esquerdo do coração
        ctx.arc(-size/4, -size/4, size/4, 0, Math.PI * 2)
        // Lado direito do coração
        ctx.arc(size/4, -size/4, size/4, 0, Math.PI * 2)
        
        ctx.fill()
        
        // Parte inferior do coração (triângulo)
        ctx.beginPath()
        ctx.moveTo(-size/2, -size/8)
        ctx.lineTo(0, size/2)
        ctx.lineTo(size/2, -size/8)
        ctx.closePath()
        ctx.fill()
      }
      
      ctx.restore() // Restaura o estado do contexto
    }
  }

  // useEffect para configurar o canvas e iniciar a animação
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    
    // Função para redimensionar o canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Cria partículas iniciais
    const createParticles = (type, count = 15) => {
      const particles = []
      for (let i = 0; i < count; i++) {
        particles.push(new Particle(canvas, type))
      }
      return particles
    }

    // Inicializa com flores
    particlesRef.current = createParticles('flower')

    // Função de animação principal
    const animate = () => {
      // Limpa o canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Atualiza e desenha cada partícula
      particlesRef.current.forEach(particle => {
        particle.update()
        particle.draw(ctx)
      })
      
      // Solicita o próximo frame de animação
      animationRef.current = requestAnimationFrame(animate)
    }

    animate() // Inicia a animação

    // Cleanup function - executa quando o componente é desmontado
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, []) // Executa apenas uma vez ao montar

  // useEffect para alternar entre modos a cada 10 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setMode(prevMode => {
        const newMode = prevMode === 'flowers' ? 'hearts' : 'flowers'
        
        // Atualiza o tipo das partículas existentes com fade
        particlesRef.current.forEach((particle, index) => {
          setTimeout(() => {
            particle.type = newMode === 'flowers' ? 'flower' : 'heart'
            particle.reset() // Reseta para aplicar novas cores
          }, index * 100) // Delay escalonado para efeito suave
        })
        
        return newMode
      })
    }, 10000) // 10 segundos

    return () => clearInterval(interval)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      id="background-canvas"
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ 
        background: 'linear-gradient(135deg, #fce7f3 0%, #e9d5ff 100%)',
        transition: 'opacity 1s ease-in-out' // Transição suave para mudanças
      }}
    />
  )
}

export default BackgroundCanvas