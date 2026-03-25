const footerLinks = {
  Explore: ['Destinations', 'Expeditions', 'Local Guides', 'Adventure Types', 'Travel Seasons'],
  Journal: ['Stories', 'Photography', 'Guest Writers', 'Press', 'About Us'],
  Support: ['How It Works', 'FAQ', 'Contact', 'Safety', 'Accessibility'],
}

export default function Footer() {
  return (
    <footer className="bg-surface-container pt-16 pb-8 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16" style={{ paddingLeft: '2rem' }}>
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <svg width="26" height="26" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="14" cy="14" r="13" stroke="#a03f28" strokeWidth="1.5" fill="none"/>
                <path d="M7 14 C7 10 10.5 7 14 7 C17.5 7 21 10 21 14" stroke="#a03f28" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                <path d="M10 18 L14 8 L18 18" stroke="#a03f28" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11.5 15.5 H16.5" stroke="#a03f28" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span className="font-bold text-on-surface" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', letterSpacing: '-0.01em' }}>
                Nomad Journal
              </span>
            </div>
            <p
              className="text-on-surface-variant leading-relaxed mb-6 max-w-xs text-sm"
              style={{ fontFamily: 'Manrope, sans-serif', lineHeight: '1.75' }}
            >
              High-end editorial travel for people who believe the best souvenirs are the ones you carry inside.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-4">
              {['Instagram', 'Twitter', 'YouTube'].map((platform) => (
                <a
                  key={platform}
                  href="#"
                  className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary transition-all duration-200"
                  aria-label={platform}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="10" height="10" rx="2.5"/>
                    <circle cx="7" cy="7" r="2.5"/>
                    <circle cx="10.5" cy="3.5" r="0.5" fill="currentColor" stroke="none"/>
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <p className="text-label text-on-surface mb-4">{heading.toUpperCase()}</p>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-on-surface-variant hover:text-primary text-sm transition-colors duration-150"
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar — no line, just bg shift */}
        <div className="bg-surface-container-high rounded-xl px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-on-surface-variant text-xs" style={{ fontFamily: 'Manrope, sans-serif' }}>
            © 2026 Nomad Journal. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {['Privacy', 'Terms', 'Cookies'].map((item) => (
              <a key={item} href="#" className="text-on-surface-variant hover:text-primary text-xs transition-colors duration-150"
                style={{ fontFamily: 'Manrope, sans-serif' }}>
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
