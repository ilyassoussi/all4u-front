import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface Slide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  backgroundColor: string;
  textColor: string;
}

interface SliderHeroProps {
  slides?: Slide[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  className?: string;
}

// Mock data for development - in real app this would come from API
const defaultSlides: Slide[] = [
  {
    id: "1",
    title: "AirPods Pro - Nouvelle génération",
    subtitle: "Son immersif avec réduction de bruit active",
    description: "Découvrez l'excellence audio avec les nouveaux AirPods Pro",
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=1200&h=600&fit=crop",
    buttonText: "Découvrir",
    buttonLink: "/categories/airpods",
    backgroundColor: "#1a1a2e",
    textColor: "#ffffff"
  },
  {
    id: "2",
    title: "PowerBank Anker - Jusqu'à 50% de réduction",
    subtitle: "Charge ultra-rapide pour tous vos appareils",
    description: "Ne tombez plus jamais en panne de batterie",
    image: "https://images.unsplash.com/photo-1609592806955-d2e18cb9df7e?w=1200&h=600&fit=crop",
    buttonText: "Voir les offres",
    buttonLink: "/categories/powerbank",
    backgroundColor: "#16213e",
    textColor: "#ffffff"
  },
  {
    id: "3",
    title: "Smartphones dernière génération",
    subtitle: "iPhone, Samsung, Xiaomi disponibles",
    description: "Les meilleurs smartphones du marché avec garantie officielle",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop",
    buttonText: "Explorer",
    buttonLink: "/categories/telephones",
    backgroundColor: "#0f1419",
    textColor: "#ffffff"
  }
];

export default function SliderHero({
  slides = defaultSlides,
  autoPlay = true,
  autoPlayInterval = 5000,
  showDots = true,
  showArrows = true,
  className = ""
}: SliderHeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const activeSlides = slides.filter(slide => slide);
  const totalSlides = activeSlides.length;

  const nextSlide = useCallback(() => {
    if (isTransitioning || totalSlides <= 1) return;
    
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning, totalSlides]);

  const prevSlide = useCallback(() => {
    if (isTransitioning || totalSlides <= 1) return;
    
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning, totalSlides]);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || index === currentSlide) return;
    
    setIsTransitioning(true);
    setCurrentSlide(index);
    
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning, currentSlide]);

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || totalSlides <= 1) return;

    const interval = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isPlaying, nextSlide, autoPlayInterval, totalSlides]);

  // Pause on hover
  const handleMouseEnter = () => setIsPlaying(false);
  const handleMouseLeave = () => setIsPlaying(autoPlay);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === " ") {
        e.preventDefault();
        setIsPlaying(!isPlaying);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide, isPlaying]);

  if (totalSlides === 0) {
    return (
      <div className={`relative h-96 bg-gradient-to-r from-gray-900 to-gray-700 rounded-2xl overflow-hidden ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-2xl font-bold mb-2">Aucun slide configuré</h2>
            <p className="text-gray-300">Ajoutez des slides depuis l'administration</p>
          </div>
        </div>
      </div>
    );
  }

  const currentSlideData = activeSlides[currentSlide];

  return (
    <div 
      className={`relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background with gradient overlay */}
      <div 
        className="absolute inset-0 transition-colors duration-500"
        style={{ backgroundColor: currentSlideData.backgroundColor }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
      </div>

      {/* Slide Images */}
      <div className="relative h-full overflow-hidden">
        {activeSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-500 ease-in-out transform ${
              index === currentSlide 
                ? "translate-x-0 opacity-100 z-10" 
                : index < currentSlide
                ? "-translate-x-full opacity-0 z-0"
                : "translate-x-full opacity-0 z-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center z-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <div 
              className={`transform transition-all duration-700 ${
                isTransitioning ? "translate-y-4 opacity-0" : "translate-y-0 opacity-100"
              }`}
            >
              <h1 
                className="text-3xl lg:text-5xl font-bold mb-4 leading-tight"
                style={{ color: currentSlideData.textColor }}
              >
                {currentSlideData.title}
              </h1>
              <p 
                className="text-lg lg:text-xl mb-2"
                style={{ color: currentSlideData.textColor }}
              >
                {currentSlideData.subtitle}
              </p>
              <p 
                className="text-sm lg:text-base mb-8 opacity-90"
                style={{ color: currentSlideData.textColor }}
              >
                {currentSlideData.description}
              </p>
              {currentSlideData.buttonText && (
                <Button 
                  size="lg" 
                  className="bg-white/90 text-gray-900 hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl"
                  asChild
                >
                  <a href={currentSlideData.buttonLink}>
                    {currentSlideData.buttonText}
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {showArrows && totalSlides > 1 && (
        <>
          <button
            onClick={prevSlide}
            disabled={isTransitioning}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 
                     bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3
                     transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                     hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Slide précédent"
          >
            <ChevronLeftIcon className="h-6 w-6 text-white" />
          </button>
          <button
            onClick={nextSlide}
            disabled={isTransitioning}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 
                     bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3
                     transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                     hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Slide suivant"
          >
            <ChevronRightIcon className="h-6 w-6 text-white" />
          </button>
        </>
      )}

      {/* Dots Navigation */}
      {showDots && totalSlides > 1 && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30">
          <div className="flex space-x-3">
            {activeSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isTransitioning}
                className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 ${
                  index === currentSlide
                    ? "bg-white scale-125 shadow-lg"
                    : "bg-white/50 hover:bg-white/75 hover:scale-110"
                } disabled:cursor-not-allowed`}
                aria-label={`Aller au slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Progress Bar */}
      {isPlaying && totalSlides > 1 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-30">
          <div 
            className="h-full bg-white transition-all duration-100 ease-linear"
            style={{
              width: `${((Date.now() % autoPlayInterval) / autoPlayInterval) * 100}%`
            }}
          />
        </div>
      )}

      {/* Play/Pause Indicator */}
      {totalSlides > 1 && (
        <div className="absolute top-4 right-4 z-30">
          <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${
            isPlaying ? "bg-green-400" : "bg-red-400"
          }`} />
        </div>
      )}
    </div>
  );
}
