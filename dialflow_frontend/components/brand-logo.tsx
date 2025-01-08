import Link from "next/link"

interface BrandLogoProps {
  variant?: "default" | "white"
  href?: string
}

export function BrandLogo({ variant = "default", href = "/" }: BrandLogoProps) {
  const logo = (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4195FF] to-[#67DBFF] flex items-center justify-center overflow-hidden">
          <div className="absolute w-4 h-4 bg-white rounded-sm transform rotate-45 translate-y-4"></div>
          <div className="absolute w-4 h-4 bg-white rounded-sm transform -translate-y-4"></div>
        </div>
      </div>
      <span 
        className={`font-ubuntu font-bold text-xl ${
          variant === "white" ? "text-white" : "text-foreground"
        }`}
      >
        DialFlow
      </span>
    </div>
  )

  if (href) {
    return (
      <Link href={href}>
        {logo}
      </Link>
    )
  }

  return logo
}

