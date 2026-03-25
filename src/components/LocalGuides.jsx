const guides = [
  {
    name: 'Ana Vargas',
    region: 'Atacama Desert, Chile',
    specialty: 'Desert Ecology & Photography',
    trips: 34,
    rating: 4.97,
    bio: 'Born at the edge of the Atacama, Ana turns salt flats into poetry. She has guided scientists, artists, and wanderers for over 12 years.',
    img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?fit=crop&w=400&h=400&q=80',
  },
  {
    name: 'Erik Solberg',
    region: 'Lofoten Islands, Norway',
    specialty: 'Sea Kayaking & Arctic Light',
    trips: 52,
    rating: 4.94,
    bio: 'Erik grew up fishing these fjords. Now he takes guests into the places maps don\'t bother naming—where the aurora reflects off still water.',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=crop&w=400&h=400&q=80',
  },
  {
    name: 'Fatma Çelik',
    region: 'Cappadocia, Turkey',
    specialty: 'Cultural Heritage & Local Gastronomy',
    trips: 88,
    rating: 4.99,
    bio: 'A historian by training, a storyteller by nature. Fatma\'s walks through Cappadocia\'s cave cities feel like being inside a living book.',
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fit=crop&w=400&h=400&q=80',
  },
]

export default function LocalGuides() {
  return (
    <section className="bg-surface py-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12" style={{ paddingLeft: '2rem' }}>
          <span className="text-label text-on-surface-variant block mb-3">The People Behind the Journey</span>
          <h2
            className="text-on-surface font-bold"
            style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
              letterSpacing: '-0.02em',
              lineHeight: '1.15',
            }}
          >
            Meet your local guide.
          </h2>
        </div>

        {/* Cards — vertical spacing, no dividers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {guides.map((guide) => (
            <div
              key={guide.name}
              className="bg-surface-container-lowest rounded-xl p-6 card-hover cursor-pointer"
            >
              {/* Avatar + meta */}
              <div className="flex items-start gap-4 mb-5">
                <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-surface-container">
                  <img src={guide.img} alt={guide.name} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <h3
                    className="text-on-surface font-bold leading-snug"
                    style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: '1rem' }}
                  >
                    {guide.name}
                  </h3>
                  {/* LABEL style metadata */}
                  <p className="text-label text-on-surface-variant mt-0.5">LOCAL GUIDE</p>
                  <p className="text-xs text-on-surface-variant mt-1" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    {guide.region}
                  </p>
                </div>
              </div>

              {/* Specialty tag */}
              <div className="mb-4">
                <span
                  className="text-label rounded-full px-3 py-1"
                  style={{
                    background: 'rgba(136,115,93,0.14)',
                    color: '#6b5744',
                    fontFamily: 'Manrope, sans-serif',
                  }}
                >
                  {guide.specialty}
                </span>
              </div>

              <p
                className="text-on-surface-variant leading-relaxed mb-5 text-sm"
                style={{ fontFamily: 'Manrope, sans-serif', lineHeight: '1.7' }}
              >
                {guide.bio}
              </p>

              {/* Stats row */}
              <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid rgba(115,103,97,0.12)' }}>
                <div>
                  <div className="text-on-surface font-bold" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                    {guide.trips}
                  </div>
                  <div className="text-label text-on-surface-variant">Trips led</div>
                </div>
                <div className="flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="#a03f28">
                    <polygon points="6,1 7.5,4.5 11,4.8 8.5,7.2 9.2,11 6,9.2 2.8,11 3.5,7.2 1,4.8 4.5,4.5"/>
                  </svg>
                  <span className="font-bold text-sm text-on-surface" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                    {guide.rating}
                  </span>
                </div>
                <button
                  className="text-primary text-sm font-semibold btn-scale"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                  View trips →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
