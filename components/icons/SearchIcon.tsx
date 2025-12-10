export default function SearchIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <defs>
        <linearGradient id="searchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF2D95" />
          <stop offset="50%" stopColor="#B624FF" />
          <stop offset="100%" stopColor="#00D9FF" />
        </linearGradient>
      </defs>
      <circle 
        cx="11" 
        cy="11" 
        r="6" 
        stroke="url(#searchGrad)" 
        strokeWidth="2"
        fill="none"
      />
      <path 
        d="M20 20L16 16" 
        stroke="url(#searchGrad)" 
        strokeWidth="2" 
        strokeLinecap="round"
      />
    </svg>
  )
}

