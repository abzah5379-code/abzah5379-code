const categories = [
  {
    label: 'Hiking & Trekking',
    img: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?fit=crop&w=400&h=300&q=75',
    count: 84,
  },
  {
    label: 'Coastal & Sailing',
    img: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?fit=crop&w=400&h=300&q=75',
    count: 51,
  },
  {
    label: 'Desert Crossings',
    img: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?fit=crop&w=400&h=300&q=75',
    count: 32,
  },
  {
    label: 'Alpine & Snow',
    img: 'https://images.unsplash.com/photo-1464822759023-fed107b4e71b?fit=crop&w=400&h=300&q=75',
    count: 47,
  },
  {
    label: 'Wine & Culinary',
    img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?fit=crop&w=400&h=300&q=75',
    count: 29,
  },
  {
    label: 'Wildlife Safari',
    img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?fit=crop&w=400&h=300&q=75',
    count: 38,
  },
]

export default function AdventureCategories() {
  return (
    <section className="bg-surface-container-low py-16 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Asymmetric header */}
        <div className="flex items-end justify-between mb-10" style={{ paddingLeft: '3rem' }}>
          <div>
            <span className="text-label text-on-surface-variant block mb-3">Browse by experience</span>
            <h2
              className="text-on-surface font-bold"
              style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
                letterSpacing: '-0.02em',
                lineHeight: '1.15',
              }}
            >
              Every landscape.
              <br />
              Every calling.
            </h2>
          </div>
          <a href="#" className="hidden md:flex items-center gap-2 text-primary font-medium text-sm btn-scale"
            style={{ fontFamily: 'Manrope, sans-serif' }}>
            All categories
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="2" y1="7" x2="12" y2="7"/>
              <polyline points="8,3 12,7 8,11"/>
            </svg>
          </a>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map(({ label, img, count }, i) => (
            <div
              key={label}
              className="relative rounded-xl overflow-hidden cursor-pointer card-hover group"
              style={{
                aspectRatio: i === 0 || i === 3 ? '3/4' : '2/3',
                ...(i === 0 ? { gridRow: 'span 1' } : {}),
              }}
            >
              <img
                src={img}
                alt={label}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ minHeight: '160px' }}
              />
              {/* 10% black overlay at bottom for legibility */}
              <div className="absolute inset-0 img-overlay" />
              {/* Adventure tag glassmorphism chip */}
              <div className="absolute top-3 left-3">
                <span
                  className="glass-overlay text-white text-label rounded-full px-2.5 py-1"
                  style={{ background: 'rgba(136,115,93,0.55)' }}
                >
                  {count} trips
                </span>
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-white font-semibold text-sm leading-tight"
                  style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
