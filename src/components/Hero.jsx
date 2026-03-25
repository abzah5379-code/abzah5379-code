export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden gradient-hero flex items-center">
      {/* Background texture overlay */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fff8f5' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Right bleed photo — overlapping asymmetry */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 lg:w-[52%] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed107b4e71b?fit=crop&w=1200&h=900&q=80"
          alt="Mountain landscape"
          className="w-full h-full object-cover opacity-40"
          style={{ mixBlendMode: 'luminosity' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #a03f28 0%, transparent 50%)' }} />
      </div>

      {/* Floating photo card — scrapbook overlap */}
      <div className="absolute right-[8%] top-[18%] hidden lg:block w-64 xl:w-72 rounded-2xl overflow-hidden shadow-ambient-lg rotate-2">
        <img
          src="https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?fit=crop&w=600&h=440&q=80"
          alt="Hiking trail"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 img-overlay" />
        <div className="absolute bottom-4 left-4">
          <span className="text-label text-white/80">Patagonia, Chile</span>
        </div>
      </div>

      {/* Second floating card — even more overlap */}
      <div className="absolute right-[22%] top-[48%] hidden xl:block w-44 rounded-2xl overflow-hidden shadow-ambient-lg -rotate-1">
        <img
          src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?fit=crop&w=400&h=300&q=80"
          alt="Beach adventure"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Main content — intentionally left-heavy */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-28 pb-20 w-full">
        <div className="max-w-2xl" style={{ marginLeft: '0', paddingLeft: '2rem' }}>
          {/* Eyebrow label */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-white/60" />
            <span className="text-label text-white/70">The Modern Nomad's Journal</span>
          </div>

          {/* Display headline */}
          <h1
            className="text-white font-bold leading-none mb-6"
            style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontSize: 'clamp(2.8rem, 6vw, 3.5rem)',
              letterSpacing: '-0.02em',
              lineHeight: '1.05',
            }}
          >
            Where the Earth
            <br />
            <em className="not-italic" style={{ color: 'rgba(255,248,245,0.82)' }}>becomes</em>
            <br />
            your story.
          </h1>

          <p
            className="text-white/70 mb-10 max-w-md leading-relaxed"
            style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.05rem', lineHeight: '1.75' }}
          >
            Curated expeditions, local-led adventures, and editorial travel guides for those who travel with intention—not just a checklist.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              className="bg-surface text-primary rounded-full px-7 py-3.5 font-semibold btn-scale shadow-ambient-lg"
              style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.95rem' }}
            >
              Explore Expeditions
            </button>
            <button
              className="flex items-center gap-2.5 text-white/80 hover:text-white transition-colors duration-200"
              style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.9rem' }}
            >
              <span className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="3,1 13,7 3,13" fill="currentColor" stroke="none" />
                </svg>
              </span>
              Watch the journey
            </button>
          </div>

          {/* Stats row */}
          <div className="mt-16 flex items-center gap-8 pt-8" style={{ borderTop: '1px solid rgba(255,248,245,0.15)' }}>
            {[
              { number: '340+', label: 'Destinations' },
              { number: '1,200', label: 'Local Guides' },
              { number: '98%', label: 'Return Travelers' },
            ].map(({ number, label }) => (
              <div key={label}>
                <div className="text-white font-bold" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: '1.6rem', letterSpacing: '-0.02em' }}>
                  {number}
                </div>
                <div className="text-label text-white/50 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom wave into next section */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 80 L0 40 Q360 0 720 30 Q1080 60 1440 20 L1440 80 Z" fill="#fff8f5"/>
        </svg>
      </div>
    </section>
  )
}
