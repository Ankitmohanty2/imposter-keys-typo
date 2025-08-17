"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { ThemeToggle } from "./theme-toggle"
import { ColorPicker } from "./color-picker"
import { BackgroundPicker } from "./background-picker"
import { FontSizePicker } from "./font-size-picker"
import { FontPicker } from "./font-picker"
import { TextArea } from "./text-area"
import { Title } from "./title"
import { AmbientBackground } from "./ambient-background"
import { useAutoFocus } from "../hooks/use-auto-focus"
import { useControlsVisibility } from "../hooks/use-controls-visibility"
import { DownloadButton } from "./download-btn"
import { useSearchParams, useRouter } from "next/navigation"
import ToastMsg from "./toast-msg"
export default function ImposterKeysTypo() {
    const [isDark, setIsDark] = useState(true)
    const [textColor, setTextColor] = useState("#ffffff")
    const [backgroundColor, setBackgroundColorState] = useState("#ffffff")
    
    const setBackgroundColor = (color: string) => {
        setBackgroundColorState(color)
    }
    const [fontSize, setFontSize] = useState(32)
    const [selectedFont, setSelectedFont] = useState("font-doto") // Default to Doto-Bold
    const [text, setText] = useState("")
    const [showColorPicker, setShowColorPicker] = useState(false)
    const [showBackgroundPicker, setShowBackgroundPicker] = useState(false)
    const [showFontSize, setShowFontSize] = useState(false)
    const [showFontPicker, setShowFontPicker] = useState(false)

    const inputRef = useRef<HTMLTextAreaElement>(null) as React.RefObject<HTMLTextAreaElement>
    const [toastMsg, setToastMsg] = useState<string | null>(null)
    const toastTimer = useRef<number | null>(null)
    const searchParams = useSearchParams()
    const router = useRouter()

    const { showControls, handleMouseMove } = useControlsVisibility({
        onHide: () => {
            setShowColorPicker(false)
            setShowBackgroundPicker(false)
            setShowFontSize(false)
            setShowFontPicker(false)
        },
    })

    useAutoFocus(inputRef)

    // Load initial state from URL or localStorage
    useEffect(() => {
        try {
            const paramsIsDark = searchParams.get("dark")
            const paramsText = searchParams.get("t")
            const paramsColor = searchParams.get("c")
            const paramsBg = searchParams.get("bg")
            const paramsFs = searchParams.get("fs")
            const paramsFont = searchParams.get("font")

            const ls = typeof window !== 'undefined' ? window.localStorage : null
            const getLS = (k: string) => ls?.getItem(k) ?? undefined

            setIsDark(paramsIsDark ? paramsIsDark === "1" : (getLS("jts_dark") ?? "1") === "1")
            setText(paramsText ?? getLS("jts_text") ?? "")
            setTextColor(paramsColor ?? getLS("jts_color") ?? "#ffffff")
            setBackgroundColorState(paramsBg ?? getLS("jts_bg") ?? "#ffffff")
            const fs = parseInt(paramsFs ?? getLS("jts_fs") ?? "32", 10)
            setFontSize(Number.isFinite(fs) ? Math.min(Math.max(fs, 12), 120) : 32)
            setSelectedFont(paramsFont ?? getLS("jts_font") ?? "font-doto")
        } catch {
            // noop
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Persist to localStorage and URL (shallow replace)
    useEffect(() => {
        if (typeof window === 'undefined') return
        try {
            const ls = window.localStorage
            ls.setItem("jts_dark", isDark ? "1" : "0")
            ls.setItem("jts_text", text)
            ls.setItem("jts_color", textColor)
            ls.setItem("jts_bg", backgroundColor)
            ls.setItem("jts_fs", String(fontSize))
            ls.setItem("jts_font", selectedFont)

            const params = new URLSearchParams()
            if (isDark) params.set("dark", "1")
            if (text) params.set("t", text)
            if (textColor) params.set("c", textColor)
            if (backgroundColor) params.set("bg", backgroundColor)
            if (fontSize !== 32) params.set("fs", String(fontSize))
            if (selectedFont !== "font-doto") params.set("font", selectedFont)
            const qs = params.toString()
            const id = window.setTimeout(() => {
                router.replace(qs ? `/?${qs}` : "/")
            }, 250)
            return () => window.clearTimeout(id)
        } catch {
            // ignore
        }
    }, [isDark, text, textColor, backgroundColor, fontSize, selectedFont, router])

    const increaseFontSize = useCallback(() => {
        setFontSize((prev) => Math.min(prev + 4, 120))
    }, [])

    const decreaseFontSize = useCallback(() => {
        setFontSize((prev) => Math.max(prev - 4, 12))
    }, [])

    const toggleTheme = useCallback(() => {
        setIsDark(!isDark)
        if (!isDark) {
            // Switching to dark mode
            if (textColor === "#000000") {
                setTextColor("#ffffff")
            }
        } else {
            // Switching to light mode
            if (textColor === "#ffffff") {
                setTextColor("#000000")
            }
        }
    }, [isDark, textColor])

    // Keyboard shortcuts
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            // Don't trigger shortcuts when typing in input/textarea elements
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
                return;
            }
            
            if ((e.ctrlKey || e.metaKey) && (e.key === "+" || e.key === "=")) {
                e.preventDefault(); increaseFontSize();
            } else if ((e.ctrlKey || e.metaKey) && (e.key === "-")) {
                e.preventDefault(); decreaseFontSize();
            } else if (e.key.toLowerCase() === 't') {
                toggleTheme()
            } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'l') {
                e.preventDefault();
                copyShareLink()
            }
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [increaseFontSize, decreaseFontSize, toggleTheme])

    const copyShareLink = useCallback(() => {
        try {
            const url = typeof window !== 'undefined' ? window.location.href : ''
            if (!url) return
            navigator.clipboard
                .writeText(url)
                .then(() => {
                    setToastMsg('Link copied')
                    if (toastTimer.current) window.clearTimeout(toastTimer.current)
                    toastTimer.current = window.setTimeout(() => setToastMsg(null), 1600)
                })
                .catch(() => {
                    setToastMsg('Copy failed')
                    if (toastTimer.current) window.clearTimeout(toastTimer.current)
                    toastTimer.current = window.setTimeout(() => setToastMsg(null), 1600)
                })
        } catch {
            setToastMsg('Copy failed')
            if (toastTimer.current) window.clearTimeout(toastTimer.current)
            toastTimer.current = window.setTimeout(() => setToastMsg(null), 1600)
        }
    }, [])

    return (
        <>
            <div
                className={`min-h-screen relative overflow-hidden transition-colors duration-500 ${
                    isDark ? "bg-black text-white" : "bg-white text-black"
                }`}
                onMouseMove={handleMouseMove}
            >

                {/* Toast notification */}
                <ToastMsg /> 

                {/* Enhanced control buttons with better positioning */}
                <div className="screenshot-exclude fixed top-6 right-6 z-50 flex flex-col gap-3">
                    <DownloadButton text={text} isDark={isDark} showControls={showControls} onCopyLink={copyShareLink} />
                    <ThemeToggle showControls={showControls} isDark={isDark} toggleTheme={toggleTheme} />
                </div>

                {/* Enhanced sidebar controls with glassmorphism */}
                <div
                    className={`screenshot-exclude fixed top-1/2 left-6 -translate-y-1/2 z-40
                        w-[280px] flex flex-col gap-4
                        transition-all duration-500 ease-out
                        ${showControls
                            ? "opacity-100 translate-x-0"
                            : "opacity-0 -translate-x-16 pointer-events-none"
                        }
                    `}
                    data-hide-for-screenshot
                >
                    {/* Colors Section */}
                    <div className="backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-gray-700/50 rounded-2xl shadow-2xl">
                        <ColorPicker
                            textColor={textColor}
                            setTextColor={setTextColor}
                            showColorPicker={showColorPicker}
                            setShowColorPicker={setShowColorPicker}
                            onOpen={() => { }}
                            isDark={isDark}
                        />
                    </div>

                    {/* Background Section */}
                    <div className="backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-gray-700/50 rounded-2xl shadow-2xl">
                        <BackgroundPicker
                            backgroundColor={backgroundColor}
                            setBackgroundColor={setBackgroundColor}
                            showBackgroundPicker={showBackgroundPicker}
                            setShowBackgroundPicker={setShowBackgroundPicker}
                            onOpen={() => { }}
                            isDark={isDark}
                        />
                    </div>

                    {/* Font Picker Section */}
                    <div className="backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-gray-700/50 rounded-2xl shadow-2xl">
                        <FontPicker
                            selectedFont={selectedFont}
                            setSelectedFont={setSelectedFont}
                            showFontPicker={showFontPicker}
                            setShowFontPicker={setShowFontPicker}
                            onOpen={() => { }}
                            isDark={isDark}
                        />
                    </div>

                    {/* Font Size Section */}
                    <div className="backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-gray-700/50 rounded-2xl shadow-2xl">
                        <FontSizePicker
                            fontSize={fontSize}
                            increaseFontSize={increaseFontSize}
                            decreaseFontSize={decreaseFontSize}
                            showFontSize={showFontSize}
                            setShowFontSize={setShowFontSize}
                            showColorPicker={showColorPicker}
                            onOpen={() => { }}
                            isDark={isDark}
                        />
                    </div>
                </div>

                {/* Enhanced text area with better focus states */}
                <div className="relative z-10">
                    <TextArea ref={inputRef} text={text} setText={setText} textColor={textColor} fontSize={fontSize} selectedFont={selectedFont} />
                </div>

                {/* Enhanced title with better positioning */}
                <div className="relative z-20">
                    <Title showControls={showControls} isDark={isDark} />
                </div>

                {/* Enhanced ambient background */}
                <div className="relative z-0">
                    <AmbientBackground backgroundColor={backgroundColor} isDark={isDark} />
                </div>

                {/* Enhanced toast notification */}
                <div
                    className={`screenshot-exclude fixed top-20 right-6 z-[60] transition-all duration-500 ${
                        toastMsg 
                            ? 'opacity-100 translate-y-0 scale-100' 
                            : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'
                    }`}
                    role="status"
                >
                    {toastMsg && (
                        <div className={`
                            px-4 py-3 rounded-xl shadow-2xl backdrop-blur-xl border
                            ${isDark 
                                ? 'bg-black/80 border-gray-700/50 text-white' 
                                : 'bg-white/80 border-gray-300/50 text-black'
                            }
                        `}>
                            {toastMsg}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}