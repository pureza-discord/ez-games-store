export default function CreditCardIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <defs>
        <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF2D95" />
          <stop offset="50%" stopColor="#B624FF" />
          <stop offset="100%" stopColor="#00D9FF" />
        </linearGradient>
      </defs>
      <rect 
        x="3" 
        y="6" 
        width="18" 
        height="12" 
        rx="2" 
        stroke="url(#cardGrad)" 
        strokeWidth="2"
        fill="none"
      />
      <line 
        x1="3" 
        y1="10" 
        x2="21" 
        y2="10" 
        stroke="url(#cardGrad)" 
        strokeWidth="2"
      />
      <line 
        x1="7" 
        y1="14" 
        x2="10" 
        y2="14" 
        stroke="url(#cardGrad)" 
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

