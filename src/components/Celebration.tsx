import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  delay: number;
  duration: number;
  shape: 'circle' | 'square' | 'triangle';
}

const colors = [
  'bg-red-500', 'bg-blue-500', 'bg-yellow-500', 'bg-green-500', 
  'bg-pink-500', 'bg-purple-500', 'bg-indigo-500', 'bg-orange-500'
];

const shapes: ('circle' | 'square' | 'triangle')[] = ['circle', 'square', 'triangle'];

const Celebration: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles: Particle[] = Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage width
      y: Math.random() * -20 - 10, // start above screen
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 12 + 6,
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 2,
      shape: shapes[Math.floor(Math.random() * shapes.length)]
    }));

    setParticles(newParticles);

    // Auto-cleanup after animation finishes
    const timer = setTimeout(() => {
      setParticles([]);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => {
        let shapeClass = '';
        if (p.shape === 'circle') {
          shapeClass = 'rounded-full';
        } else if (p.shape === 'triangle') {
          shapeClass = 'w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[16px] border-b-indigo-500 bg-transparent';
        }

        return (
          <div
            key={p.id}
            className={`absolute animate-bounce ${p.shape !== 'triangle' ? p.color : ''} ${shapeClass}`}
            style={{
              left: `${p.x}%`,
              top: `${p.y}px`,
              width: p.shape !== 'triangle' ? `${p.size}px` : undefined,
              height: p.shape !== 'triangle' ? `${p.size}px` : undefined,
              opacity: 0.8,
              animation: `fall ${p.duration}s linear ${p.delay}s infinite, spin ${p.duration * 0.8}s linear infinite`,
            }}
          />
        );
      })}
      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotate(720deg);
            opacity: 0;
          }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Celebration;