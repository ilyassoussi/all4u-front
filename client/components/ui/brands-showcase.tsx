import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";

interface Brand {
  id: string;
  name: string;
  logo: string;
  slug: string;
  featured: boolean;
}

interface BrandsShowcaseProps {
  brands?: Brand[];
  title?: string;
  subtitle?: string;
  className?: string;
  showTitle?: boolean;
  autoScroll?: boolean;
}

// Default featured brands as mentioned by user
const defaultBrands: Brand[] = [
  {
    id: "1",
    name: "Xiaomi",
    logo: "/placeholder.svg",
    slug: "xiaomi",
    featured: true
  },
  {
    id: "2",
    name: "Samsung",
    logo: "/placeholder.svg", 
    slug: "samsung",
    featured: true
  },
  {
    id: "3",
    name: "Soundcore",
    logo: "/placeholder.svg",
    slug: "soundcore", 
    featured: true
  },
  {
    id: "4",
    name: "SoundPEATS",
    logo: "/placeholder.svg",
    slug: "soundpeats",
    featured: true
  },
  {
    id: "5",
    name: "Oraimo",
    logo: "/placeholder.svg",
    slug: "oraimo",
    featured: true
  },
  {
    id: "6",
    name: "Huawei",
    logo: "/placeholder.svg",
    slug: "huawei",
    featured: true
  }
];

export default function BrandsShowcase({
  brands = defaultBrands,
  title = "Marques Partenaires",
  subtitle = "Découvrez nos marques de confiance",
  className = "",
  showTitle = true,
  autoScroll = true
}: BrandsShowcaseProps) {
  const [hoveredBrand, setHoveredBrand] = useState<string | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const featuredBrands = brands.filter(brand => brand.featured);

  // Auto-scroll effect
  useEffect(() => {
    if (!autoScroll || featuredBrands.length <= 6) return;

    const interval = setInterval(() => {
      setScrollPosition((prev) => (prev + 1) % featuredBrands.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [autoScroll, featuredBrands.length]);

  return (
    <section className={`py-12 bg-gradient-to-br from-slate-50 to-gray-100 ${className}`}>
      <div className="container mx-auto px-4">
        {showTitle && (
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              {title}
            </h2>
            <p className="text-gray-600 text-sm lg:text-base max-w-2xl mx-auto">
              {subtitle}
            </p>
          </div>
        )}

        {/* Desktop Grid Layout */}
        <div className="hidden md:grid grid-cols-3 lg:grid-cols-6 gap-6">
          {featuredBrands.slice(0, 6).map((brand, index) => (
            <div
              key={brand.id}
              className={`group relative transform transition-all duration-300 hover:scale-105 ${
                hoveredBrand && hoveredBrand !== brand.id ? "opacity-60" : "opacity-100"
              }`}
              onMouseEnter={() => setHoveredBrand(brand.id)}
              onMouseLeave={() => setHoveredBrand(null)}
            >
              <Card className="p-6 h-24 bg-white/80 backdrop-blur-sm border-0 shadow-md hover:shadow-xl transition-all duration-300 group-hover:bg-white">
                <a
                  href={`/brands/${brand.slug}`}
                  className="flex items-center justify-center h-full"
                >
                  <div className="text-center">
                    {/* Logo placeholder - replace with actual logos */}
                    <div className="flex items-center justify-center h-8 mb-1">
                      <span className="text-lg font-bold text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                        {brand.name}
                      </span>
                    </div>
                    
                    {/* Brand name */}
                    <div className="text-xs text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
                      {featuredBrands.findIndex(b => b.id === brand.id) < 3 ? "Premium" : "Accessoires"}
                    </div>
                  </div>
                </a>
              </Card>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Mobile Scrolling Layout */}
        <div className="md:hidden relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ 
              transform: `translateX(-${scrollPosition * 33.333}%)`,
              width: `${featuredBrands.length * 33.333}%`
            }}
          >
            {featuredBrands.map((brand) => (
              <div
                key={brand.id}
                className="w-1/3 px-2 flex-shrink-0"
              >
                <Card className="p-4 h-20 bg-white/80 backdrop-blur-sm border-0 shadow-md">
                  <a
                    href={`/brands/${brand.slug}`}
                    className="flex items-center justify-center h-full"
                  >
                    <div className="text-center">
                      <span className="text-sm font-bold text-gray-700">
                        {brand.name}
                      </span>
                    </div>
                  </a>
                </Card>
              </div>
            ))}
          </div>

          {/* Scroll indicators */}
          <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: Math.max(0, featuredBrands.length - 2) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setScrollPosition(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === scrollPosition
                    ? "bg-blue-500 scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Voir les marques ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Brand Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4">
            <div className="text-2xl font-bold text-gray-900">{featuredBrands.length}+</div>
            <div className="text-sm text-gray-600">Marques</div>
          </div>
          <div className="p-4">
            <div className="text-2xl font-bold text-gray-900">100%</div>
            <div className="text-sm text-gray-600">Authentique</div>
          </div>
          <div className="p-4">
            <div className="text-2xl font-bold text-gray-900">2ans</div>
            <div className="text-sm text-gray-600">Garantie</div>
          </div>
          <div className="p-4">
            <div className="text-2xl font-bold text-gray-900">24/7</div>
            <div className="text-sm text-gray-600">Support</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-8">
          <a
            href="/brands"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <span>Voir toutes les marques</span>
            <svg
              className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500" />
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="brands-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#brands-pattern)" />
        </svg>
      </div>
    </section>
  );
}
