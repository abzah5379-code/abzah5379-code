import { useState, useEffect } from 'react'

const navLinks = ['Destinations', 'Expeditions', 'Local Guides', 'Journal']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-nav shadow-ambient py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="14" cy="14" r="13" stroke="#a03f28" strokeWidth="1.5" fill="none"/>
            <path d="M7 14 C7 10 10.5 7 14 7 C17.5 7 21 10 21 14" stroke="#a03f28" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <path d="M10 18 L14 8 L18 18" stroke="#a03f28" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M11.5 15.5 H16.5" stroke="#a03f28" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span
            className="font-display font-bold text-on-surface tracking-tight"
            style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: '1.1rem', letterSpacing: '-0.01em' }}
          >
            Nomad Journal
          </span>
        </div>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="font-body text-on-surface-variant hover:text-primary transition-colors duration-200 text-sm font-medium"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              {link}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a href="#" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors duration-200"
            style={{ fontFamily: 'Manrope, sans-serif' }}>
            Sign in
          </a>
          <button
            className="gradient-primary text-on-primary rounded-full px-5 py-2 text-sm font-semibold btn-scale"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            Plan a Trip
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 text-on-surface"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            {menuOpen ? (
              <>
                <line x1="4" y1="4" x2="18" y2="18"/>
                <line x1="18" y1="4" x2="4" y2="18"/>
              </>
            ) : (
              <>
                <line x1="3" y1="7" x2="19" y2="7"/>
                <line x1="3" y1="11" x2="19" y2="11"/>
                <line x1="3" y1="15" x2="19" y2="15"/>
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden glass-nav border-t border-outline-variant px-6 pt-4 pb-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a key={link} href="#" className="text-on-surface font-medium py-1"
              style={{ fontFamily: 'Manrope, sans-serif' }}>
              {link}
            </a>
          ))}
          <button className="gradient-primary text-on-primary rounded-full px-5 py-2.5 text-sm font-semibold mt-2 btn-scale w-full"
            style={{ fontFamily: 'Manrope, sans-serif' }}>
            Plan a Trip
          </button>
        </div>
      )}
    </header>
  )
}
