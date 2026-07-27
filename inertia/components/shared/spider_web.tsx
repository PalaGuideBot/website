export function SpiderWeb() {
  return (
    <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none select-none opacity-70">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <g stroke="white" strokeWidth="0.5" fill="none">
          {[10, 20, 30, 40, 50].map((r) => (
            <circle key={r} cx="100" cy="0" r={r} />
          ))}
          {[...Array(8)].map((_, i) => {
            const angle = (i * Math.PI) / 4
            const x = 100 + 50 * Math.cos(angle)
            const y = 0 + 50 * Math.sin(angle)
            return <line key={i} x1="100" y1="0" x2={x} y2={y} />
          })}
        </g>
      </svg>
    </div>
  )
}
