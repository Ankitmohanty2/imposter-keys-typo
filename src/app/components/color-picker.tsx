"use client"

import { useState } from "react"
import { COLORS } from "../constants/colors"
import { CustomColorPicker } from "./custom-color-picker"

interface ColorPickerProps {
  textColor: string
  setTextColor: (color: string) => void
  showColorPicker: boolean
  setShowColorPicker: (show: boolean) => void
  onOpen: () => void
  isDark: boolean
}

export function ColorPicker({
  textColor,
  setTextColor,
  showColorPicker,
  setShowColorPicker,
  onOpen,
  isDark,
}: ColorPickerProps) {
  const [activeTab, setActiveTab] = useState<'presets' | 'custom'>('presets')

  const handleColorSelect = (color: string) => {
    setTextColor(color)
    setShowColorPicker(false)
  }

  return (
    <div className="w-full">
      <button
        onClick={() => {
          setShowColorPicker(!showColorPicker);
          onOpen();
        }}
        aria-controls="color-picker-panel"
        aria-expanded={showColorPicker}
        className={`
          group flex items-center justify-between gap-3 px-4 py-3 w-full border cursor-pointer
          transition-all duration-300 backdrop-blur-xl
          hover:scale-[1.02] active:scale-[0.98]
          ${showColorPicker ? "rounded-t-2xl rounded-b-none" : "rounded-2xl"}
          ${isDark
            ? "bg-black/20 border-white/20 text-white hover:bg-black/30 hover:border-white/30"
            : "bg-white/20 border-gray-300/30 text-black hover:bg-white/30 hover:border-gray-400/40"
          }
        `}
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <div
              className={`w-6 h-6 rounded-full border-2 transition-all duration-300 group-hover:scale-110 ${
                isDark ? 'border-white/30' : 'border-gray-400/50'
              }`}
              style={{ backgroundColor: textColor }}
            />
            <div 
              className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </div>
          <span className="font-medium tracking-wide">Colors</span>
        </div>
        <svg
          className={`h-4 w-4 transition-all duration-300 ${showColorPicker ? "rotate-90 scale-110" : "rotate-0 scale-100"}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div
        className={`
          overflow-hidden transition-all duration-500 ease-out
          ${showColorPicker ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
          ${isDark 
            ? "bg-black/20 border-x border-b border-white/20" 
            : "bg-white/20 border-x border-b border-gray-300/30"
          }
          backdrop-blur-xl shadow-2xl rounded-b-2xl
        `}
        id="color-picker-panel"
      >
        {/* Tab Navigation */}
        <div className={`flex border-b ${isDark ? 'border-white/20' : 'border-gray-300/30'}`}>
          <button
            onClick={() => setActiveTab('presets')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-all duration-300 ${
              activeTab === 'presets'
                ? isDark 
                  ? 'text-white border-b-2 border-blue-400 bg-blue-500/10' 
                  : 'text-black border-b-2 border-blue-500 bg-blue-500/10'
                : isDark 
                  ? 'text-gray-400 hover:text-gray-300 hover:bg-white/5' 
                  : 'text-gray-600 hover:text-gray-800 hover:bg-black/5'
            }`}
          >
            Presets
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-all duration-300 ${
              activeTab === 'custom'
                ? isDark 
                  ? 'text-white border-b-2 border-blue-400 bg-blue-500/10' 
                  : 'text-black border-b-2 border-blue-500 bg-blue-500/10'
                : isDark 
                  ? 'text-gray-400 hover:text-gray-300 hover:bg-white/5' 
                  : 'text-gray-600 hover:text-gray-800 hover:bg-black/5'
            }`}
          >
            Custom
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-4">
          {activeTab === 'presets' ? (
            <div className="grid grid-cols-5 gap-3">
              {COLORS.map((color, idx) => (
                <button
                  key={idx}
                  onClick={() => handleColorSelect(color)}
                  className={`
                    group relative w-10 h-10 rounded-full transition-all duration-300
                    hover:scale-110 active:scale-95 cursor-pointer
                    ${textColor === color
                      ? "ring-2 ring-blue-400 ring-offset-2 ring-offset-transparent shadow-lg scale-110" 
                      : "hover:shadow-md border border-white/20"
                    }
                  `}
                  style={{ backgroundColor: color }}
                  aria-label={`Select color ${color}`}
                >
                  {/* Glow effect on hover */}
                  <div 
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  {/* Check mark for selected color */}
                  {textColor === color && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          ) : (
            <CustomColorPicker
              value={textColor}
              onChange={setTextColor}
              isDark={isDark}
            />
          )}
        </div>
      </div>
    </div>
  )
}