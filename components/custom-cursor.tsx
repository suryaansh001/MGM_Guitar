"use client"

import { useEffect, useState } from "react"
import { Music, Music2, Music3, Music4 } from "lucide-react"

const musicIcons = [Music, Music2, Music3, Music4]

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [currentIcon, setCurrentIcon] = useState(0)

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const hideOnLeave = () => setIsVisible(false)

    const changeIcon = () => {
      setCurrentIcon((prev) => (prev + 1) % musicIcons.length)
    }

    document.addEventListener("mousemove", updatePosition)
    document.addEventListener("mouseleave", hideOnLeave)

    const iconInterval = setInterval(changeIcon, 2000)

    return () => {
      document.removeEventListener("mousemove", updatePosition)
      document.removeEventListener("mouseleave", hideOnLeave)
      clearInterval(iconInterval)
    }
  }, [])

  const IconComponent = musicIcons[currentIcon]

  return (
    <div
      className={`fixed top-0 left-0 pointer-events-none z-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        transform: `translate(${position.x - 12}px, ${position.y - 12}px)`,
      }}
    >
      <IconComponent className="w-6 h-6 text-blue-400 animate-pulse drop-shadow-lg" />
    </div>
  )
}
