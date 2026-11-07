// Hand-drawn style botanical line ornaments.
export function Sprig({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 200" fill="none" stroke="currentColor" strokeWidth="1.2" className={className} aria-hidden>
      <path d="M60 195 C 58 140, 62 90, 60 10" />
      {[30, 55, 80, 105, 130, 155].map((y, i) => (
        <g key={y}>
          <path d={`M60 ${y + 10} C ${i % 2 ? 85 : 35} ${y}, ${i % 2 ? 100 : 20} ${y - 12}, ${i % 2 ? 98 : 22} ${y - 18}`} />
          <ellipse cx={i % 2 ? 92 : 28} cy={y - 10} rx="10" ry="5" transform={`rotate(${i % 2 ? -35 : 35} ${i % 2 ? 92 : 28} ${y - 10})`} />
        </g>
      ))}
      <circle cx="60" cy="8" r="5" />
    </svg>
  );
}

export function Chamomile({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2" className={className} aria-hidden>
      {Array.from({ length: 12 }).map((_, i) => (
        <ellipse key={i} cx="50" cy="26" rx="6" ry="18" transform={`rotate(${i * 30} 50 50)`} />
      ))}
      <circle cx="50" cy="50" r="9" fill="currentColor" fillOpacity=".25" />
    </svg>
  );
}

export function Divider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 text-gold ${className}`} aria-hidden>
      <span className="h-px w-12 bg-gold/50" />
      <Chamomile className="h-5 w-5" />
      <span className="h-px w-12 bg-gold/50" />
    </div>
  );
}
