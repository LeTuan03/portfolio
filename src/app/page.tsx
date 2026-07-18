import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-full bg-gray-900 py-32 text-center text-white">
        <div className="absolute inset-0 overflow-hidden">
          {/* Placeholder for a hero image background */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/90 z-10" />
        </div>
        
        <div className="relative z-20 mx-auto max-w-4xl px-4">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Stunning Photos for Your Projects
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300">
            Discover millions of high-quality royalty-free images from our community of professional photographers.
          </p>
          
          <div className="mt-10 mx-auto max-w-2xl">
            <form className="flex items-center rounded-full bg-white p-2">
              <input 
                type="text" 
                placeholder="Search for photos..." 
                className="w-full border-none bg-transparent px-4 py-2 text-gray-900 focus:outline-none"
              />
              <button 
                type="submit"
                className="rounded-full bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-500"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900">Explore Categories</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-6">
          {["Nature", "Business", "Technology", "People", "Architecture", "Food", "Travel", "Animals"].map((category) => (
            <Link 
              key={category} 
              href={`/search?q=${category.toLowerCase()}`}
              className="group relative flex h-32 items-center justify-center overflow-hidden rounded-xl bg-gray-200"
            >
              <div className="absolute inset-0 bg-gray-800/40 transition-colors group-hover:bg-gray-800/20" />
              <span className="relative z-10 font-medium text-white">{category}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Photos (Mockup) */}
      <section className="w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Trending Now</h2>
          <Link href="/explore" className="text-sm font-medium text-blue-600 hover:text-blue-500">
            View all
          </Link>
        </div>
        
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="group overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-gray-200">
              <div className="aspect-[4/3] w-full bg-gray-200 relative overflow-hidden">
                {/* Mockup image placeholder */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  Image {i}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900">Amazing Landscape {i}</h3>
                <p className="mt-1 text-sm text-gray-500">By Photographer {i}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-bold text-gray-900">$10</span>
                  <button className="rounded bg-gray-100 px-3 py-1 text-xs font-medium text-gray-900 hover:bg-gray-200">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
