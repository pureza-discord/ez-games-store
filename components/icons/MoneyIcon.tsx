export default function MoneyIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <defs>
        <linearGradient id="moneyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF2D95" />
          <stop offset="50%" stopColor="#B624FF" />
          <stop offset="100%" stopColor="#00D9FF" />
        </linearGradient>
      </defs>
      <circle 
        cx="12" 
        cy="12" 
        r="8" 
        stroke="url(#moneyGrad)" 
        strokeWidth="2"
        fill="none"
      />
      <path 
        d="M12 8V9M12 15V16M9 10.5C9 9.67157 9.67157 9 10.5 9H13.5C14.3284 9 15 9.67157 15 10.5C15 11.3284 14.3284 12 13.5 12H10.5C9.67157 12 9 12.6716 9 13.5C9 14.3284 9.67157 15 10.5 15H13.5C14.3284 15 15 14.3284 15 13.5" 
        stroke="url(#moneyGrad)" 
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

