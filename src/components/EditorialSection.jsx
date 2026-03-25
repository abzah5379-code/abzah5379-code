export default function EditorialSection() {
  return (
    <section className="bg-surface-container-low py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Intentional asymmetry: left margin 64px, right margin 32px */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center" style={{ paddingLeft: '4rem', paddingRight: '2rem' }}>

          {/* Left: Editorial text block */}
          <div className="lg:pr-16 mb-14 lg:mb-0">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-label text-on-surface-variant">The Journal</span>
              <div className="flex-1 h-px bg-on-surface-variant/20 max-w-[3rem]" />
            </div>
            <h2
              className="text-on-surface font-bold mb-8"
              style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
                letterSpacing: '-0.02em',
                lineHeight: '1.1',
              }}
            >
              Travel is never
              <br />
              <span className="text-primary italic">just</span> travel.
            </h2>

            <p
              className="text-on-surface-variant leading-relaxed mb-6"
              style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1rem', lineHeight: '1.8' }}
            >
              Our editorial team embeds with local guides, chases the light at the edges of roads, and uncovers the kind of places that demand you put the phone away. This is the journal of those moments.
            </p>
            <p
              className="text-on-surface-variant leading-relaxed mb-10"
              style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1rem', lineHeight: '1.8' }}
            >
              From the star-scarred silence of the Atacama to the fog-draped cliffs of the Faroe Islands—we find stories the algorithms can't reach.
            </p>

            <div className="flex items-center gap-5">
              <button
                className="gradient-primary text-on-primary rounded-full px-6 py-3 font-semibold btn-scale text-sm"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                Read the Journal
              </button>
              <div className="flex items-center gap-2 text-on-surface-variant text-sm" style={{ fontFamily: 'Manrope, sans-serif' }}>
                <span className="w-8 h-px bg-on-surface-variant/30" />
                48 stories this season
              </div>
            </div>
          </div>

          {/* Right: overlapping scrapbook image collage */}
          <div className="relative h-96 lg:h-[520px]">
            {/* Main photo — bleeds to the right edge */}
            <div className="absolute top-0 right-0 w-[88%] h-[80%] rounded-2xl overflow-hidden shadow-ambient-lg">
              <img
                src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?fit=crop&w=800&h=600&q=80"
                alt="Forest path"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 img-overlay" />
              <div className="absolute bottom-4 right-4">
                <span className="glass-overlay text-white text-label rounded-full px-3 py-1.5"
                  style={{ background: 'rgba(136,115,93,0.6)' }}>
                  Black Forest, Germany
                </span>
              </div>
            </div>

            {/* Overlapping secondary photo — scrapbook bleed */}
            <div className="absolute bottom-0 left-0 w-[55%] h-[55%] rounded-2xl overflow-hidden shadow-ambient-lg -rotate-2">
              <img
                src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?fit=crop&w=500&h=380&q=80"
                alt="Cityscape at dusk"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 img-overlay" />
            </div>

            {/* Glass label chip floating over gap */}
            <div
              className="absolute bottom-[28%] left-[42%] glass-overlay rounded-xl px-4 py-3 shadow-ambient"
              style={{ background: 'rgba(255,248,245,0.82)', backdropFilter: 'blur(20px)' }}
            >
              <p className="text-label text-on-surface-variant">New Story</p>
              <p className="text-on-surface text-xs font-semibold mt-0.5 max-w-[120px]" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                Faroe Islands: Edge of Silence
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
