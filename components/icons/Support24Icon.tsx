export default function Support24Icon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2"/>
      <path d="M12 8V12L15 15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <path d="M9 2H15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <path d="M12 2V5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

