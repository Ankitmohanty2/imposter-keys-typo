"use client"

import { Sun, Moon } from "lucide-react"

interface ThemeToggleProps {
  showControls: boolean
  isDark: boolean
  toggleTheme: () => void
}

export function ThemeToggle({ showControls, isDark, toggleTheme }: ThemeToggleProps) {
  return (
    <div
      className={`transition-all duration-500 ease-out ${
        showControls ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-4 scale-95 pointer-events-none"
      }`}
    >
      <button
        onClick={toggleTheme}
        role="switch"
        aria-checked={isDark}
        aria-label="Toggle theme"
        title="Toggle theme (T)"
        className={`
          group relative w-12 h-12 cursor-pointer rounded-2xl 
          backdrop-blur-xl border transition-all duration-300 
          flex items-center justify-center
          hover:scale-105 active:scale-95
          shadow-2xl hover:shadow-3xl
          ${isDark
            ? "bg-black/20 border-white/20 text-white hover:bg-black/30 hover:border-white/30"
            : "bg-white/20 border-gray-300/30 text-black hover:bg-white/30 hover:border-gray-400/40"
          }
        `}
      >
        {/* Background glow effect */}
        <div className={`
          absolute inset-0 rounded-2xl transition-all duration-300
          ${isDark 
            ? "bg-gradient-to-br from-purple-500/10 to-blue-500/10" 
            : "bg-gradient-to-br from-yellow-500/10 to-orange-500/10"
          }
          opacity-0 group-hover:opacity-100
        `}></div>
        
        {/* Icon with smooth transition */}
        <div className="relative transition-all duration-300 group-hover:rotate-12">
          {isDark ? (
            <Sun className="h-5 w-5 transition-all duration-300 group-hover:scale-110" />
          ) : (
            <Moon className="h-5 w-5 transition-all duration-300 group-hover:scale-110" />
          )}
        </div>
        
        {/* Ripple effect on click */}
        <div className="absolute inset-0 rounded-2xl bg-current opacity-0 group-active:opacity-10 transition-opacity duration-150"></div>
      </button>
    </div>
  )
}
