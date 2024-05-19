import { useTheme } from "next-themes"

export function ToggleTheme() {
    const { theme, setTheme } = useTheme()
    return (
        <button
            aria-label="Toggle Dark Mode"
            type="button"
            className="p-3 h-12 w-12"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
            {theme === "dark" ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                    />
                </svg>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11a8 8 0 11-16 0 8 8 0 0116 0z"
                    />
                </svg>
            )}
        </button>
    )
}
