const ThemeToggle = ({ isDark, onToggle }) => {
    return (
        <button
            onClick={onToggle}
            className={`fixed top-4 right-4 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50 ${
                isDark 
                    ? 'bg-gray-800 border-2 border-yellow-400 text-yellow-400 hover:bg-gray-700' 
                    : 'bg-white border-2 border-yellow-600 text-yellow-600 hover:bg-gray-50'
            }`}
            aria-label="Toggle theme"
        >
            <div className="w-6 h-6 relative">
                {isDark ? (
                    // Moon icon
                    <svg
                        className="w-6 h-6 transition-transform duration-300 rotate-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
                            clipRule="evenodd"
                        />
                    </svg>
                ) : (
                    // Sun icon
                    <svg
                        className="w-6 h-6 transition-transform duration-300 rotate-180"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                            clipRule="evenodd"
                        />
                    </svg>
                )}
            </div>
        </button>
    );
};

window.ThemeToggle = ThemeToggle;
