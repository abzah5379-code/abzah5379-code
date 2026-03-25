import { useState } from 'react'

export default function SearchSection() {
  const [focused, setFocused] = useState(null)

  const inputClass = (name) =>
    `w-full bg-surface-container-highest rounded-md px-4 py-3 text-on-surface text-sm outline-none transition-all duration-200 font-body placeholder-on-surface-variant/50 ${
      focused === name
        ? 'bg-surface-container-highest shadow-[0_0_0_3px_rgba(160,63,40,0.12)]'
        : 'bg-surface-container-low hover:bg-surface-container'
    }`

  return (
    <section className="bg-surface py-10 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-8" style={{ paddingLeft: '4rem' }}>
          <div className="w-6 h-px bg-primary/40" />
          <span className="text-label text-on-surface-variant">Find your next adventure</span>
        </div>

        {/* Search card — sits on surface-container-highest to appear inset */}
        <div className="bg-surface-container-highest rounded-2xl p-5 md:p-6 shadow-ambient" style={{ marginLeft: '2rem', marginRight: '1rem' }}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {/* Destination */}
            <div className="md:col-span-2">
              <label className="text-label text-on-surface-variant block mb-1.5">Destination</label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="6.5" cy="6.5" r="4.5"/>
                  <line x1="10.5" y1="10.5" x2="14" y2="14"/>
                </svg>
                <input
                  type="text"
                  placeholder="Where to? Mountains, coast, desert..."
                  className={`${inputClass('destination')} pl-9`}
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                  onFocus={() => setFocused('destination')}
                  onBlur={() => setFocused(null)}
                />
              </div>
            </div>

            {/* Dates */}
            <div>
              <label className="text-label text-on-surface-variant block mb-1.5">When</label>
              <input
                type="text"
                placeholder="Add dates"
                className={inputClass('dates')}
                style={{ fontFamily: 'Manrope, sans-serif' }}
                onFocus={() => setFocused('dates')}
                onBlur={() => setFocused(null)}
              />
            </div>

            {/* Search button */}
            <div className="flex items-end">
              <button
                className="w-full gradient-primary text-on-primary rounded-full py-3 font-semibold btn-scale text-sm"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                Search
              </button>
            </div>
          </div>

          {/* Quick filters */}
          <div className="mt-4 flex flex-wrap gap-2">
            {['Under 7 days', 'Solo Friendly', 'Off the Grid', 'Family', 'Photography', 'Budget Friendly'].map((tag) => (
              <button
                key={tag}
                className="text-label text-on-surface-variant bg-surface-container hover:bg-surface-container-low rounded-full px-3 py-1.5 transition-colors duration-150"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
