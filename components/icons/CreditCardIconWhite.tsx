export default function CreditCardIconWhite({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="5" width="20" height="14" rx="2" stroke="white" strokeWidth="2" fill="none" />
      <line x1="2" y1="10" x2="22" y2="10" stroke="white" strokeWidth="2" />
      <line x1="6" y1="15" x2="10" y2="15" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <line x1="14" y1="15" x2="16" y2="15" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

