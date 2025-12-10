export default function PixIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <defs>
        <linearGradient id="pixGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF2D95" />
          <stop offset="50%" stopColor="#B624FF" />
          <stop offset="100%" stopColor="#00D9FF" />
        </linearGradient>
      </defs>
      <path 
        d="M12 4L8 8M12 4L16 8M12 4V2M12 20L8 16M12 20L16 16M12 20V22M4 12L8 8M4 12L8 16M4 12H2M20 12L16 8M20 12L16 16M20 12H22M8 8V16M16 8V16" 
        stroke="url(#pixGrad)" 
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

