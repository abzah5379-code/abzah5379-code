export default function QuoteSection() {
  return (
    <section className="relative py-28 overflow-hidden">
      {/* Full-bleed background photo */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed107b4e71b?fit=crop&w=1600&h=700&q=80"
          alt="Mountain vista"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(160,63,40,0.78) 0%, rgba(31,27,24,0.55) 100%)' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
        {/* Decorative quote mark */}
        <div
          className="text-white/20 mb-6 mx-auto"
          style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: '6rem', lineHeight: '1', height: '4rem', overflow: 'hidden' }}
        >
          "
        </div>

        <blockquote
          className="text-white font-bold mb-8"
          style={{
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
            letterSpacing: '-0.02em',
            lineHeight: '1.2',
          }}
        >
          The most profound journeys are the ones that change you so quietly, you don't realize it until you're home.
        </blockquote>

        <div className="flex items-center justify-center gap-4">
          <div className="w-10 h-px bg-white/40" />
          <div>
            <p className="text-white font-semibold text-sm" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              Mariana Albrecht
            </p>
            <p className="text-label text-white/60 mt-0.5">Nomad Journal, Issue 12</p>
          </div>
          <div className="w-10 h-px bg-white/40" />
        </div>

        {/* Glass CTA card */}
        <div
          className="mt-14 inline-flex flex-col sm:flex-row items-center gap-4 rounded-2xl px-8 py-6"
          style={{ background: 'rgba(255,248,245,0.12)', backdropFilter: 'blur(20px)' }}
        >
          <div className="text-left">
            <p className="text-white font-semibold" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: '1rem' }}>
              Subscribe to the Journal
            </p>
            <p className="text-white/60 text-sm mt-0.5" style={{ fontFamily: 'Manrope, sans-serif' }}>
              12 stories per season. No algorithm.
            </p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="rounded-full px-4 py-2.5 text-sm text-on-surface outline-none flex-1 sm:w-52"
              style={{
                background: 'rgba(255,248,245,0.9)',
                fontFamily: 'Manrope, sans-serif',
              }}
            />
            <button
              className="gradient-primary text-on-primary rounded-full px-5 py-2.5 font-semibold btn-scale text-sm flex-shrink-0"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
