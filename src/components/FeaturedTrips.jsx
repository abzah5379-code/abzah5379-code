const trips = [
  {
    id: 1,
    title: 'The Atacama Salt Flats',
    location: 'San Pedro de Atacama, Chile',
    tags: ['Desert Crossing', 'Photography'],
    duration: '8 days',
    price: '$2,400',
    rating: 4.9,
    reviews: 142,
    img: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?fit=crop&w=800&h=560&q=80',
    guide: 'Led by Ana Vargas',
    featured: true,
  },
  {
    id: 2,
    title: 'Lofoten Islands by Kayak',
    location: 'Nordland, Norway',
    tags: ['Coastal', 'Wildlife'],
    duration: '6 days',
    price: '$3,100',
    rating: 4.8,
    reviews: 89,
    img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?fit=crop&w=800&h=560&q=80',
    guide: 'Led by Erik Solberg',
    featured: false,
  },
  {
    id: 3,
    title: 'Cappadocia at Dawn',
    location: 'Nevşehir, Turkey',
    tags: ['Hot Air Balloon', 'Wine Tasting'],
    duration: '5 days',
    price: '$1,850',
    rating: 4.9,
    reviews: 217,
    img: 'https://images.unsplash.com/photo-1575999502951-4ab25b5ca889?fit=crop&w=800&h=560&q=80',
    guide: 'Led by Fatma Çelik',
    featured: false,
  },
  {
    id: 4,
    title: 'Rwandan Gorilla Trek',
    location: 'Volcanoes NP, Rwanda',
    tags: ['Wildlife Safari', 'Hiking'],
    duration: '7 days',
    price: '$4,200',
    rating: 5.0,
    reviews: 64,
    img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?fit=crop&w=800&h=560&q=80',
    guide: 'Led by Jean Kaboyi',
    featured: true,
  },
  {
    id: 5,
    title: 'Kyoto Forest Pilgrimage',
    location: 'Kyoto Prefecture, Japan',
    tags: ['Hiking', 'Cultural'],
    duration: '4 days',
    price: '$1,600',
    rating: 4.7,
    reviews: 183,
    img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?fit=crop&w=800&h=560&q=80',
    guide: 'Led by Yuki Tanaka',
    featured: false,
  },
  {
    id: 6,
    title: 'Torres del Paine Circuit',
    location: 'Patagonia, Chile',
    tags: ['Hiking & Trekking', 'Alpine'],
    duration: '10 days',
    price: '$3,400',
    rating: 4.9,
    reviews: 301,
    img: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?fit=crop&w=800&h=560&q=80',
    guide: 'Led by Carlos Bravo',
    featured: false,
  },
]

function AdventureTag({ label }) {
  return (
    <span
      className="text-label text-on-tertiary rounded-full px-2.5 py-1"
      style={{ background: 'rgba(136,115,93,0.72)', fontFamily: 'Manrope, sans-serif' }}
    >
      {label}
    </span>
  )
}

function TripCard({ trip }) {
  return (
    <div className="bg-surface-container-lowest rounded-xl overflow-hidden card-hover cursor-pointer">
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: '220px' }}>
        <img
          src={trip.img}
          alt={trip.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 img-overlay" />
        {/* Tags on image */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {trip.tags.slice(0, 2).map((tag) => (
            <AdventureTag key={tag} label={tag} />
          ))}
        </div>
        {/* Duration badge */}
        <div className="absolute top-3 right-3">
          <span className="glass-overlay text-white text-label rounded-full px-2.5 py-1">
            {trip.duration}
          </span>
        </div>
        {/* Location at bottom */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <span className="text-white/70 text-xs" style={{ fontFamily: 'Manrope, sans-serif' }}>
            {trip.location}
          </span>
        </div>
      </div>

      {/* Card body — paper-on-sand */}
      <div className="p-4 pb-5">
        <h3
          className="text-on-surface font-bold mb-1 leading-snug"
          style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: '1.05rem', letterSpacing: '-0.01em' }}
        >
          {trip.title}
        </h3>
        <p className="text-on-surface-variant text-xs mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>
          {trip.guide}
        </p>

        {/* Rating + Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="#a03f28">
              <polygon points="6,1 7.5,4.5 11,4.8 8.5,7.2 9.2,11 6,9.2 2.8,11 3.5,7.2 1,4.8 4.5,4.5"/>
            </svg>
            <span className="text-sm font-semibold text-on-surface" style={{ fontFamily: 'Manrope, sans-serif' }}>
              {trip.rating}
            </span>
            <span className="text-xs text-on-surface-variant" style={{ fontFamily: 'Manrope, sans-serif' }}>
              ({trip.reviews})
            </span>
          </div>
          <div className="text-right">
            <span className="text-on-surface-variant text-xs" style={{ fontFamily: 'Manrope, sans-serif' }}>from </span>
            <span className="text-primary font-bold" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              {trip.price}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FeaturedTrips() {
  return (
    <section className="bg-surface py-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Asymmetric header — generous left margin */}
        <div className="mb-12" style={{ paddingLeft: '4rem' }}>
          <span className="text-label text-on-surface-variant block mb-3">Curated Expeditions</span>
          <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-16">
            <h2
              className="text-on-surface font-bold"
              style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                letterSpacing: '-0.02em',
                lineHeight: '1.1',
              }}
            >
              Trips worth
              <br />
              the journey.
            </h2>
            <p
              className="max-w-xs text-on-surface-variant leading-relaxed mb-1"
              style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.9rem', lineHeight: '1.7' }}
            >
              Each route is verified by our editorial team and led by a local expert who has made this land their home.
            </p>
          </div>
        </div>

        {/* Grid — vertical spacing instead of dividers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 flex justify-center">
          <button
            className="border border-primary/25 text-primary rounded-full px-8 py-3.5 font-semibold btn-scale hover:bg-primary-container/10 transition-colors duration-200 text-sm"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            View all 340+ expeditions
          </button>
        </div>
      </div>
    </section>
  )
}
