export default function LightningIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <defs>
        <linearGradient id="lightningGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF2D95" />
          <stop offset="50%" stopColor="#B624FF" />
          <stop offset="100%" stopColor="#00D9FF" />
        </linearGradient>
      </defs>
      <path 
        d="M13 2L3 14H12L11 22L21 10H12L13 2Z" 
        stroke="url(#lightningGrad)" 
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="url(#lightningGrad)"
        fillOpacity="0.2"
      />
    </svg>
  )
}

