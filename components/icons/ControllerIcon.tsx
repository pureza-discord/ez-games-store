export default function ControllerIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <defs>
        <linearGradient id="controllerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF2D95" />
          <stop offset="50%" stopColor="#B624FF" />
          <stop offset="100%" stopColor="#00D9FF" />
        </linearGradient>
      </defs>
      <path 
        d="M7 6C4.79086 6 3 7.79086 3 10V12C3 14.2091 4.79086 16 7 16H8L10 18H14L16 16H17C19.2091 16 21 14.2091 21 12V10C21 7.79086 19.2091 6 17 6H7Z" 
        stroke="url(#controllerGrad)" 
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <line x1="9" y1="10" x2="9" y2="13" stroke="url(#controllerGrad)" strokeWidth="2" strokeLinecap="round"/>
      <line x1="7.5" y1="11.5" x2="10.5" y2="11.5" stroke="url(#controllerGrad)" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="15.5" cy="10" r="1" fill="url(#controllerGrad)"/>
      <circle cx="17" cy="12" r="1" fill="url(#controllerGrad)"/>
    </svg>
  )
}

