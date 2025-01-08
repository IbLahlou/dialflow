'use client'

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/50" />
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute inset-0 opacity-20"
            style={{
              background: `radial-gradient(circle at ${50 + (i * 20)}% ${50 + (i * 10)}%, rgba(65, 149, 255, 0.1) 0%, transparent 70%)`,
              transform: `scale(${1 + i * 0.2})`,
              animation: `wave ${20 + i * 5}s linear infinite`
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              backgroundColor: i % 2 === 0 ? 'rgba(65, 149, 255, 0.1)' : 'rgba(103, 219, 255, 0.1)',
              width: Math.random() * 4 + 1 + 'px',
              height: Math.random() * 4 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animation: `pulse ${Math.random() * 3 + 2}s linear infinite`
            }}
          />
        ))}
      </div>
    </div>
  )
}

