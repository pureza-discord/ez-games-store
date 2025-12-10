export default function BoxIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <defs>
        <linearGradient id="boxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF2D95" />
          <stop offset="50%" stopColor="#B624FF" />
          <stop offset="100%" stopColor="#00D9FF" />
        </linearGradient>
      </defs>
      <path 
        d="M3 8L12 3L21 8M3 8L12 13M3 8V16L12 21M21 8L12 13M21 8V16L12 21M12 13V21" 
        stroke="url(#boxGrad)" 
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

