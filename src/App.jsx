import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SearchSection from './components/SearchSection'
import AdventureCategories from './components/AdventureCategories'
import FeaturedTrips from './components/FeaturedTrips'
import EditorialSection from './components/EditorialSection'
import LocalGuides from './components/LocalGuides'
import QuoteSection from './components/QuoteSection'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <main>
        <Hero />
        <SearchSection />
        <AdventureCategories />
        <FeaturedTrips />
        <EditorialSection />
        <LocalGuides />
        <QuoteSection />
      </main>
      <Footer />
    </div>
  )
}
