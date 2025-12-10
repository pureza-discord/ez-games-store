import Image from 'next/image'

interface LogoProps {
  size?: number
  showText?: boolean
}

export default function Logo({ size = 40, showText = true }: LogoProps) {
  return (
    <div className="flex items-center space-x-3 group">
      <div className="relative group-hover:scale-110 transition-transform">
        <Image 
          src="/assets/icons/image.png" 
          alt="Ez Games" 
          width={size} 
          height={size}
          className="rounded-xl"
        />
      </div>
      {showText && (
        <div className="hidden sm:block">
          <span className="text-xl font-bold text-text">Ez Games</span>
          <span className="block text-xs text-text-muted -mt-1">Jogos Premium</span>
        </div>
      )}
    </div>
  )
}

