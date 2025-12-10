export default function GameIcon({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <defs>
        <linearGradient id="gameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF2D95" />
          <stop offset="50%" stopColor="#B624FF" />
          <stop offset="100%" stopColor="#00D9FF" />
        </linearGradient>
      </defs>
      <path 
        d="M20 9.5C20 7.567 18.433 6 16.5 6h-9C5.567 6 4 7.567 4 9.5v2C4 13.433 5.567 15 7.5 15h1.586l1.707 1.707a1 1 0 001.414 0L13.914 15h1.586c1.933 0 3.5-1.567 3.5-3.5v-2z" 
        fill="url(#gameGrad)" 
        opacity="0.3"
      />
      <path 
        d="M7 10h2M8 9v2" 
        stroke="url(#gameGrad)" 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
      <circle cx="15" cy="10" r="0.8" fill="url(#gameGrad)"/>
      <circle cx="17" cy="10" r="0.8" fill="url(#gameGrad)"/>
      <path 
        d="M20 9.5C20 7.567 18.433 6 16.5 6h-9C5.567 6 4 7.567 4 9.5v2C4 13.433 5.567 15 7.5 15h1.586l1.707 1.707a1 1 0 001.414 0L13.914 15h1.586c1.933 0 3.5-1.567 3.5-3.5v-2z" 
        stroke="url(#gameGrad)" 
        strokeWidth="2"
        fill="none"
      />
    </svg>
  )
}
