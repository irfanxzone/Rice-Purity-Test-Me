// Hand-drawn single-stroke check — feels like a pencil mark on a test paper.
export default function HandCheck({ className = "", strokeWidth = 2.2 }) {
    return (
        <svg
            viewBox="0 0 24 24"
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d="M4.2 13.1 C 5.8 14.6, 7.3 16.4, 9.2 18.8 C 11.8 14.2, 14.9 9.4, 20.1 5.2" />
        </svg>
    );
}
