export const HeroShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Top right circles */}
      <svg className="absolute -right-10 -top-10 w-72 h-72 text-[#00A9A5]/10" viewBox="0 0 200 200">
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#00A9A5', stopOpacity: 0.2 }} />
            <stop offset="100%" style={{ stopColor: '#1A4B84', stopOpacity: 0.1 }} />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r="80" fill="url(#gradient1)" />
        <circle cx="100" cy="100" r="60" fill="url(#gradient1)" opacity="0.5" />
        <circle cx="100" cy="100" r="40" fill="url(#gradient1)" opacity="0.3" />
      </svg>

      {/* Bottom left waves */}
      <svg className="absolute -left-16 bottom-0 w-80 h-80 text-[#FF6B35]/10" viewBox="0 0 200 200">
        <path
          fill="currentColor"
          d="M44.6,-76.9C59.1,-69.9,73,-59.5,79.8,-45.8C86.6,-32.1,86.3,-16.1,84.5,-1.1C82.7,14,79.4,27.9,72.7,40.4C66,52.9,55.9,64,43.4,70.9C30.9,77.8,15.4,80.4,0.6,79.4C-14.3,78.4,-28.5,73.8,-41.7,67C-54.9,60.2,-67,51.2,-74.9,38.8C-82.8,26.4,-86.5,10.7,-85.8,-4.9C-85.2,-20.5,-80.3,-36,-71.1,-48.3C-61.9,-60.6,-48.4,-69.8,-34.4,-77.1C-20.4,-84.5,-6.8,-90.1,4.9,-88.1C16.7,-86.1,30.1,-83.9,44.6,-76.9Z"
          transform="translate(100 100)"
        />
      </svg>

      {/* Middle right blob */}
      <svg className="absolute right-1/4 top-1/3 w-64 h-64 text-[#1A4B84]/5" viewBox="0 0 200 200">
        <path
          fill="currentColor"
          d="M38.5,-64.3C51.9,-56.7,66.3,-49.6,73.2,-37.7C80.1,-25.8,79.5,-9.2,76.7,6.4C73.8,22,68.7,36.5,59.7,47.9C50.7,59.3,37.9,67.5,23.7,72.3C9.5,77.1,-6,78.5,-19.8,74.3C-33.6,70.2,-45.6,60.5,-54.7,48.8C-63.8,37.2,-69.9,23.6,-73.1,8.8C-76.4,-6,-76.8,-22,-71.1,-35.8C-65.4,-49.7,-53.6,-61.3,-40.1,-69C-26.6,-76.7,-11.5,-80.4,1.4,-82.6C14.3,-84.8,25.1,-71.9,38.5,-64.3Z"
          transform="translate(100 100)"
        />
      </svg>

      {/* Scattered dots */}
      <div className="absolute inset-0">
        <div className="absolute h-2 w-2 rounded-full bg-[#00A9A5]/20 top-1/4 left-1/4" />
        <div className="absolute h-3 w-3 rounded-full bg-[#1A4B84]/20 top-1/3 right-1/3" />
        <div className="absolute h-2 w-2 rounded-full bg-[#FF6B35]/20 bottom-1/4 right-1/4" />
        <div className="absolute h-4 w-4 rounded-full bg-[#00A9A5]/10 top-1/2 left-1/3" />
      </div>
    </div>
  );
}; 