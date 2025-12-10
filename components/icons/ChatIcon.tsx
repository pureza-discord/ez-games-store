export default function ChatIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <defs>
        <linearGradient id="chatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF2D95" />
          <stop offset="50%" stopColor="#B624FF" />
          <stop offset="100%" stopColor="#00D9FF" />
        </linearGradient>
      </defs>
      <path 
        d="M7 9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C17 12.7614 14.7614 15 12 15H11L7 19V15C5.34315 15 4 13.6569 4 12V10C4 8.34315 5.34315 7 7 7V9Z" 
        stroke="url(#chatGrad)" 
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="9.5" cy="10" r="0.8" fill="url(#chatGrad)"/>
      <circle cx="12" cy="10" r="0.8" fill="url(#chatGrad)"/>
      <circle cx="14.5" cy="10" r="0.8" fill="url(#chatGrad)"/>
    </svg>
  )
}

