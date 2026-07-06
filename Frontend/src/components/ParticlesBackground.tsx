// Pure CSS animated particles - no library needed!
function ParticlesBackground() {
  // 20 particles banate hain random position pe
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    width: Math.random() * 20 + 10,
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: Math.random() * 10 + 8,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.4 + 0.1,
  }))

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0,
      width: '100%', height: '100%', zIndex: 0,
      overflow: 'hidden', pointerEvents: 'none'
    }}>
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            width: p.width,
            height: p.width,
            borderRadius: '50%',
            background: `rgba(99, 102, 241, ${p.opacity})`,
            left: `${p.left}%`,
            top: `${p.top}%`,
            animation: `float ${p.duration}s ${p.delay}s infinite ease-in-out alternate`,
          }}
        />
      ))}

      {/* CSS animation */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px) scale(1); }
          100% { transform: translateY(-30px) scale(1.1); }
        }
      `}</style>
    </div>
  )
}

export default ParticlesBackground