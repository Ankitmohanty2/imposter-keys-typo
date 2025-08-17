"use client"

import { forwardRef } from "react"

interface TextAreaProps {
  text: string
  setText: (text: string) => void
  textColor: string
  fontSize: number
  selectedFont: string
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ text, setText, textColor, fontSize, selectedFont }, ref) => {
    return (
      <div className="relative w-full h-full">
        <textarea
          ref={ref}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing your thoughts..."
          autoFocus
          aria-label="Editor"
          spellCheck={false}         
          autoCorrect="off"         
          autoCapitalize="off"
          className={`
            fixed inset-0 w-full h-full 
            bg-transparent border-none outline-none resize-none 
            ${selectedFont} tracking-wide leading-relaxed text-center
            transition-all duration-300 ease-out
            focus:outline-none focus:ring-0
            placeholder:opacity-50 placeholder:transition-opacity
            focus:placeholder:opacity-30
            selection:bg-opacity-20 selection:bg-current
          `}
          style={{
            color: textColor,
            fontSize: `${fontSize}px`,
            caretColor: textColor,
            paddingTop: "calc(50vh - 0.5em)",
            paddingBottom: "calc(50vh - 0.5em)",
            overflow: "hidden",
            textShadow: `0 0 20px ${textColor}20`,
          }}
        />
        
        {/* Subtle focus indicator */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 transition-opacity duration-500 focus-within:opacity-5"></div>
        </div>
      </div>
    )
  },
)

TextArea.displayName = "TextArea"
