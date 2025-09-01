import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  StarIcon,
  FunnelIcon,
  Squares2X2Icon,
  ListBulletIcon,
  HeartIcon,
  ShoppingCartIcon,
  AdjustmentsHorizontalIcon,
  GiftIcon,
  SparklesIcon,
  CakeIcon,
  HomeIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";

const giftProducts = [
  {
    id: 1,
    name: "AirPods Pro (2ème génération)",
    price: 2599,
    originalPrice: 2899,
    image:
      "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 127,
    badge: "Bestseller",
    category: "Audio",
    occasion: ["Anniversaire", "Premium"],
    giftType: "High-tech",
    features: ["Réduction de bruit", "Sans fil", "Premium"],
    inStock: true,
    discount: 10,
    giftWrapping: true,
    perfectFor: "Mélomanes et professionnels",
  },
  {
    id: 2,
    name: "PowerBank 20000mAh Xiaomi",
    price: 299,
    originalPrice: 399,
    image:
      "https://images.unsplash.com/photo-1609592094942-de7623e46633?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 89,
    badge: "Économique",
    category: "Accessoires",
    occasion: ["Budget", "Pratique"],
    giftType: "Accessoires",
    features: ["Charge rapide", "Portable", "Durable"],
    inStock: true,
    discount: 25,
    giftWrapping: true,
    perfectFor: "Étudiants et voyageurs",
  },
  {
    id: 3,
    name: "Casque Gaming RGB Premium",
    price: 899,
    originalPrice: 1099,
    image:
      "https://images.unsplash.com/photo-1599669454699-248893623440?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 203,
    badge: "Gaming",
    category: "Audio",
    occasion: ["Anniversaire", "Fête"],
    giftType: "Gaming",
    features: ["RGB", "Microphone", "Confortable"],
    inStock: true,
    discount: 18,
    giftWrapping: true,
    perfectFor: "Gamers passionnés",
  },
  {
    id: 4,
    name: "Smartwatch Élégante",
    price: 1299,
    originalPrice: 1599,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    rating: 4.4,
    reviews: 156,
    badge: "Tendance",
    category: "Accessoires",
    occasion: ["Premium", "Anniversaire"],
    giftType: "High-tech",
    features: ["Écran OLED", "Étanche", "Notifications"],
    inStock: true,
    discount: 19,
    giftWrapping: true,
    perfectFor: "Sportifs et connectés",
  },
  {
    id: 5,
    name: "Enceinte Bluetooth Portable",
    price: 599,
    originalPrice: 799,
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
    rating: 4.5,
    reviews: 178,
    badge: "Portable",
    category: "Audio",
    occasion: ["Fête", "Budget"],
    giftType: "Audio",
    features: ["Étanche IPX7", "Autonomie 24h", "Basses puissantes"],
    inStock: true,
    discount: 25,
    giftWrapping: true,
    perfectFor: "Amateurs de musique",
  },
  {
    id: 6,
    name: "Kit Accessoires iPhone Premium",
    price: 449,
    originalPrice: 599,
    image:
      "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 92,
    badge: "Complet",
    category: "Accessoires",
    occasion: ["Pratique", "Budget"],
    giftType: "Accessoires",
    features: ["Coque + Protecteur", "Chargeur sans fil", "Support voiture"],
    inStock: true,
    discount: 25,
    giftWrapping: true,
    perfectFor: "Nouveaux propriétaires iPhone",
  },
  {
    id: 7,
    name: "Drone Caméra 4K",
    price: 1999,
    originalPrice: 2399,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 145,
    badge: "Innovation",
    category: "High-tech",
    occasion: ["Premium", "Anniversaire"],
    giftType: "High-tech",
    features: ["Caméra 4K", "Stabilisation", "GPS"],
    inStock: true,
    discount: 17,
    giftWrapping: true,
    perfectFor: "Photographes créatifs",
  },
  {
    id: 8,
    name: "Coffret Accessoires Gaming",
    price: 799,
    originalPrice: 999,
    image:
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 167,
    badge: "Coffret",
    category: "Gaming",
    occasion: ["Fête", "Premium"],
    giftType: "Gaming",
    features: ["Souris RGB", "Tapis XL", "Repose-poignet"],
    inStock: true,
    discount: 20,
    giftWrapping: true,
    perfectFor: "Setup gaming parfait",
  },
];

const categories = ["Tous", "Audio", "Accessoires", "High-tech", "Gaming"];
const occasions = [
  "Tous",
  "Anniversaire",
  "Fête",
  "Premium",
  "Budget",
  "Pratique",
];
const giftTypes = ["Tous", "High-tech", "Audio", "Accessoires", "Gaming"];

export default function GiftPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("popularity");
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [selectedGiftTypes, setSelectedGiftTypes] = useState<string[]>([]);
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [showWithGiftWrap, setShowWithGiftWrap] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState("tous");

  // Animation states
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const filteredProducts = giftProducts.filter((product) => {
    if (showInStockOnly && !product.inStock) return false;
    if (showWithGiftWrap && !product.giftWrapping) return false;
    if (product.price < priceRange[0] || product.price > priceRange[1])
      return false;
    if (
      selectedCategories.length > 0 &&
      !selectedCategories.includes(product.category)
    )
      return false;
    if (
      selectedGiftTypes.length > 0 &&
      !selectedGiftTypes.includes(product.giftType)
    )
      return false;
    if (
      selectedOccasions.length > 0 &&
      !selectedOccasions.some((occasion) => product.occasion.includes(occasion))
    )
      return false;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "discount":
        return b.discount - a.discount;
      case "newest":
        return b.id - a.id;
      default:
        return b.reviews - a.reviews; // popularity
    }
  });

  const resetFilters = () => {
    setPriceRange([0, 3000]);
    setSelectedCategories([]);
    setSelectedOccasions([]);
    setSelectedGiftTypes([]);
    setShowInStockOnly(false);
    setShowWithGiftWrap(false);
  };

  const getTabProducts = (tab: string) => {
    switch (tab) {
      case "premium":
        return sortedProducts.filter((p) => p.occasion.includes("Premium"));
      case "budget":
        return sortedProducts.filter((p) => p.occasion.includes("Budget"));
      case "anniversaire":
        return sortedProducts.filter((p) =>
          p.occasion.includes("Anniversaire"),
        );
      case "fete":
        return sortedProducts.filter((p) => p.occasion.includes("Fête"));
      default:
        return sortedProducts;
    }
  };

  const currentProducts = getTabProducts(activeTab);

  return (
    <Layout>
      {/* Hero Section avec ambiance premium */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600" />
          <svg
            className="absolute inset-0 w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="gift-pattern"
                x="0"
                y="0"
                width="60"
                height="60"
                patternUnits="userSpaceOnUse"
              >
                <circle
                  cx="30"
                  cy="30"
                  r="2"
                  fill="currentColor"
                  opacity="0.5"
                />
                <path
                  d="M25 25 L35 35 M35 25 L25 35"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.3"
                />
              </pattern>
            </defs>
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#gift-pattern)"
            />
          </svg>
        </div>

        {/* Floating gift elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute transform transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-70" : "translate-y-10 opacity-0"}`}
              style={{
                left: `${15 + i * 15}%`,
                top: `${10 + (i % 3) * 20}%`,
                animationDelay: `${i * 200}ms`,
                animation: `float ${3 + (i % 2)}s ease-in-out infinite`,
              }}
            >
              <div className="text-yellow-400 text-2xl transform rotate-12">
                {i % 3 === 0 ? "🎁" : i % 3 === 1 ? "🎀" : "✨"}
              </div>
            </div>
          ))}
        </div>

        <div className="relative container mx-auto px-4 py-16 lg:py-24">
          <div
            className={`text-center transform transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
          >
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <SparklesIcon className="h-5 w-5 text-yellow-400 mr-2" />
              <span className="text-white/90 text-sm font-medium">
                Collection Cadeaux Premium
              </span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Des Cadeaux qui
              <span className="block bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-400 bg-clip-text text-transparent">
                Marquent les Cœurs
              </span>
            </h1>

            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8 leading-relaxed">
              Découvrez notre sélection exclusive de cadeaux high-tech, conçue
              pour émerveiller et créer des moments inoubliables à chaque
              occasion spéciale.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                size="lg"
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-8 py-3 rounded-full font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <GiftIcon className="mr-2 h-5 w-5" />
                Explorer les Cadeaux
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white bg-transparent hover:bg-white/10 px-8 py-3 rounded-full font-semibold backdrop-blur-sm"
              >
                Guide Cadeaux
              </Button>
            </div>

            {/* Stats rapides */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              {[
                { number: "100+", label: "Idées Cadeaux" },
                { number: "24h", label: "Livraison Express" },
                { number: "✓", label: "Emballage Gratuit" },
                { number: "2 ans", label: "Garantie" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className={`text-center transform transition-all duration-700 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                  style={{ animationDelay: `${index * 100 + 500}ms` }}
                >
                  <div className="text-2xl font-bold text-white mb-1">
                    {stat.number}
                  </div>
                  <div className="text-white/70 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Vague décorative */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="w-full h-16 fill-current text-white"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* Navigation par occasions et contenu complet */}
      <section className="py-8 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-white shadow-lg rounded-xl p-2">
              <TabsTrigger
                value="tous"
                className="rounded-lg font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
              >
                <HomeIcon className="h-4 w-4 mr-2" />
                Tous
              </TabsTrigger>
              <TabsTrigger
                value="premium"
                className="rounded-lg font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-orange-500 data-[state=active]:text-white"
              >
                <SparklesIcon className="h-4 w-4 mr-2" />
                Premium
              </TabsTrigger>
              <TabsTrigger
                value="anniversaire"
                className="rounded-lg font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-rose-500 data-[state=active]:text-white"
              >
                <CakeIcon className="h-4 w-4 mr-2" />
                Anniversaire
              </TabsTrigger>
              <TabsTrigger
                value="fete"
                className="rounded-lg font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white"
              >
                <GiftIcon className="h-4 w-4 mr-2" />
                Fête
              </TabsTrigger>
              <TabsTrigger
                value="budget"
                className="rounded-lg font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
              >
                <CurrencyDollarIcon className="h-4 w-4 mr-2" />
                Budget
              </TabsTrigger>
            </TabsList>

            <div className="mt-8">
              <div className="container mx-auto px-4">
                <div className="flex gap-8">
                  {/* Sidebar Filtres - Desktop */}
                  <div className="hidden lg:block w-80 flex-shrink-0">
                    <div className="sticky top-8 space-y-6">
                      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 shadow-lg">
                        <CardContent className="p-6">
                          <div className="flex items-center space-x-2 mb-6">
                            <FunnelIcon className="h-5 w-5 text-purple-600" />
                            <h3 className="font-semibold text-gray-900">
                              Filtres Cadeaux
                            </h3>
                          </div>

                          {/* Budget cadeau */}
                          <div className="space-y-4">
                            <h4 className="font-medium text-gray-900 flex items-center">
                              <CurrencyDollarIcon className="h-4 w-4 mr-2 text-green-600" />
                              Budget (د.م.)
                            </h4>
                            <div className="px-2">
                              <Slider
                                value={priceRange}
                                onValueChange={setPriceRange}
                                max={3000}
                                min={0}
                                step={50}
                                className="mb-2"
                              />
                              <div className="flex justify-between text-sm text-gray-600">
                                <span>{priceRange[0]} د.م.</span>
                                <span>{priceRange[1]} د.م.</span>
                              </div>
                            </div>
                          </div>

                          <Separator className="my-6" />

                          {/* Options cadeaux */}
                          <div className="space-y-3">
                            <h4 className="font-medium text-gray-900 flex items-center">
                              <GiftIcon className="h-4 w-4 mr-2 text-pink-600" />
                              Services Cadeaux
                            </h4>
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="inStock"
                                  checked={showInStockOnly}
                                  onCheckedChange={(checked) =>
                                    setShowInStockOnly(checked as boolean)
                                  }
                                />
                                <Label htmlFor="inStock" className="text-sm">
                                  En stock uniquement
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="giftWrap"
                                  checked={showWithGiftWrap}
                                  onCheckedChange={(checked) =>
                                    setShowWithGiftWrap(checked as boolean)
                                  }
                                />
                                <Label htmlFor="giftWrap" className="text-sm">
                                  Emballage cadeau gratuit
                                </Label>
                              </div>
                            </div>
                          </div>

                          <Separator className="my-6" />

                          {/* Occasions */}
                          <div className="space-y-3">
                            <h4 className="font-medium text-gray-900 flex items-center">
                              <SparklesIcon className="h-4 w-4 mr-2 text-yellow-600" />
                              Occasions
                            </h4>
                            {occasions
                              .filter((o) => o !== "Tous")
                              .map((occasion) => (
                                <div
                                  key={occasion}
                                  className="flex items-center space-x-2"
                                >
                                  <Checkbox
                                    id={`occasion-${occasion}`}
                                    checked={selectedOccasions.includes(
                                      occasion,
                                    )}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        setSelectedOccasions([
                                          ...selectedOccasions,
                                          occasion,
                                        ]);
                                      } else {
                                        setSelectedOccasions(
                                          selectedOccasions.filter(
                                            (o) => o !== occasion,
                                          ),
                                        );
                                      }
                                    }}
                                  />
                                  <Label
                                    htmlFor={`occasion-${occasion}`}
                                    className="text-sm"
                                  >
                                    {occasion}
                                  </Label>
                                </div>
                              ))}
                          </div>

                          <Separator className="my-6" />

                          {/* Catégories */}
                          <div className="space-y-3">
                            <h4 className="font-medium text-gray-900">
                              Catégories
                            </h4>
                            {categories
                              .filter((c) => c !== "Tous")
                              .map((category) => (
                                <div
                                  key={category}
                                  className="flex items-center space-x-2"
                                >
                                  <Checkbox
                                    id={`category-${category}`}
                                    checked={selectedCategories.includes(
                                      category,
                                    )}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        setSelectedCategories([
                                          ...selectedCategories,
                                          category,
                                        ]);
                                      } else {
                                        setSelectedCategories(
                                          selectedCategories.filter(
                                            (c) => c !== category,
                                          ),
                                        );
                                      }
                                    }}
                                  />
                                  <Label
                                    htmlFor={`category-${category}`}
                                    className="text-sm"
                                  >
                                    {category}
                                  </Label>
                                </div>
                              ))}
                          </div>

                          <Button
                            variant="outline"
                            onClick={resetFilters}
                            className="w-full mt-6 border-purple-300 text-purple-600 hover:bg-purple-50"
                          >
                            Réinitialiser
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Contenu Principal */}
                  <div className="flex-1">
                    <TabsContent value={activeTab} className="mt-0">
                      {/* Barre d'outils */}
                      <div className="flex items-center justify-between mb-6 p-4 bg-gradient-to-r from-white to-purple-50 rounded-xl shadow-sm border border-purple-100">
                        <div className="flex items-center space-x-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowFilters(!showFilters)}
                            className="lg:hidden border-purple-300 text-purple-600"
                          >
                            <AdjustmentsHorizontalIcon className="h-4 w-4 mr-2" />
                            Filtres
                          </Button>
                          <div className="text-sm text-gray-600">
                            <span className="font-medium text-purple-600">
                              {currentProducts.length}
                            </span>{" "}
                            cadeau{currentProducts.length > 1 ? "x" : ""} trouvé
                            {currentProducts.length > 1 ? "s" : ""}
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">
                              Trier par:
                            </span>
                            <Select value={sortBy} onValueChange={setSortBy}>
                              <SelectTrigger className="w-40 border-purple-200">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="popularity">
                                  Popularité
                                </SelectItem>
                                <SelectItem value="discount">
                                  Meilleures offres
                                </SelectItem>
                                <SelectItem value="price-low">
                                  Prix croissant
                                </SelectItem>
                                <SelectItem value="price-high">
                                  Prix décroissant
                                </SelectItem>
                                <SelectItem value="rating">
                                  Mieux notés
                                </SelectItem>
                                <SelectItem value="newest">
                                  Plus récent
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="flex items-center space-x-1 border border-purple-200 rounded-lg p-1">
                            <Button
                              variant={
                                viewMode === "grid" ? "default" : "ghost"
                              }
                              size="sm"
                              onClick={() => setViewMode("grid")}
                              className="h-8 w-8 p-0 data-[state=on]:bg-purple-100"
                            >
                              <Squares2X2Icon className="h-4 w-4" />
                            </Button>
                            <Button
                              variant={
                                viewMode === "list" ? "default" : "ghost"
                              }
                              size="sm"
                              onClick={() => setViewMode("list")}
                              className="h-8 w-8 p-0"
                            >
                              <ListBulletIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Grille de Produits */}
                      <div
                        className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}
                      >
                        {currentProducts.map((product, index) => (
                          <Card
                            key={product.id}
                            className={`group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-white to-purple-50/30 overflow-hidden transform hover:scale-[1.02] ${isLoaded ? "animate-fade-in" : "opacity-0"}`}
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            <CardContent className="p-0">
                              <div
                                className={`${viewMode === "list" ? "flex" : ""}`}
                              >
                                <div
                                  className={`relative overflow-hidden ${viewMode === "list" ? "w-48 h-48 flex-shrink-0" : ""}`}
                                >
                                  <img
                                    src={product.image}
                                    alt={product.name}
                                    className={`object-cover group-hover:scale-110 transition-transform duration-700 ${
                                      viewMode === "list"
                                        ? "w-full h-full"
                                        : "w-full h-56"
                                    }`}
                                  />

                                  {/* Overlay gradien */}
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                  {/* Badges */}
                                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                                    {product.badge && (
                                      <Badge
                                        className={`${
                                          product.badge === "Bestseller"
                                            ? "bg-gradient-to-r from-orange-500 to-red-500"
                                            : product.badge === "Innovation"
                                              ? "bg-gradient-to-r from-purple-500 to-pink-500"
                                              : product.badge === "Gaming"
                                                ? "bg-gradient-to-r from-green-500 to-teal-500"
                                                : product.badge === "Premium"
                                                  ? "bg-gradient-to-r from-yellow-500 to-amber-500"
                                                  : "bg-gradient-to-r from-blue-500 to-cyan-500"
                                        } text-white border-0 shadow-lg`}
                                      >
                                        {product.badge}
                                      </Badge>
                                    )}
                                    {product.discount > 0 && (
                                      <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 shadow-lg">
                                        -{product.discount}%
                                      </Badge>
                                    )}
                                    {product.giftWrapping && (
                                      <Badge className="bg-gradient-to-r from-purple-500 to-violet-500 text-white border-0 shadow-lg">
                                        🎁 Emballage gratuit
                                      </Badge>
                                    )}
                                  </div>

                                  {/* Actions rapides */}
                                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                                    <Button
                                      size="icon"
                                      variant="secondary"
                                      className="h-8 w-8 bg-white/90 backdrop-blur-sm shadow-lg"
                                    >
                                      <HeartIcon className="h-4 w-4" />
                                    </Button>
                                  </div>

                                  {/* Indicateur "Parfait pour" */}
                                  <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                    <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 text-xs font-medium text-gray-700">
                                      💝 {product.perfectFor}
                                    </div>
                                  </div>
                                </div>

                                <div
                                  className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}
                                >
                                  <div className="mb-3">
                                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
                                      {product.name}
                                    </h3>

                                    <div className="flex items-center space-x-1 mb-2">
                                      <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                          <StarIconSolid
                                            key={i}
                                            className={`h-4 w-4 ${
                                              i < Math.floor(product.rating)
                                                ? "text-yellow-400"
                                                : "text-gray-300"
                                            }`}
                                          />
                                        ))}
                                      </div>
                                      <span className="text-sm text-gray-600">
                                        ({product.reviews})
                                      </span>
                                    </div>
                                  </div>

                                  {/* Tags occasions */}
                                  <div className="flex flex-wrap gap-1 mb-3">
                                    {product.occasion
                                      .slice(0, 2)
                                      .map((occasion, index) => (
                                        <Badge
                                          key={index}
                                          variant="outline"
                                          className="text-xs border-purple-200 text-purple-600"
                                        >
                                          {occasion}
                                        </Badge>
                                      ))}
                                  </div>

                                  {/* Prix */}
                                  <div className="flex items-center space-x-2 mb-4">
                                    <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                      {product.price.toLocaleString()} د.م.
                                    </span>
                                    {product.originalPrice && (
                                      <span className="text-sm text-gray-500 line-through">
                                        {product.originalPrice.toLocaleString()}{" "}
                                        د.م.
                                      </span>
                                    )}
                                  </div>

                                  <Button
                                    className={`bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${viewMode === "list" ? "" : "w-full"}`}
                                    size="sm"
                                    disabled={!product.inStock}
                                  >
                                    <ShoppingCartIcon className="mr-2 h-4 w-4" />
                                    {product.inStock
                                      ? "Ajouter au panier"
                                      : "Indisponible"}
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      {/* État vide */}
                      {currentProducts.length === 0 && (
                        <div className="text-center py-16">
                          <div className="text-6xl mb-4">🎁</div>
                          <div className="text-gray-600 text-xl mb-4">
                            Aucun cadeau trouvé avec ces critères
                          </div>
                          <p className="text-gray-500 mb-6">
                            Essayez d'ajuster vos filtres ou explorez d'autres
                            catégories
                          </p>
                          <Button
                            variant="outline"
                            onClick={resetFilters}
                            className="border-purple-300 text-purple-600 hover:bg-purple-50"
                          >
                            Réinitialiser les filtres
                          </Button>
                        </div>
                      )}
                    </TabsContent>
                  </div>
                </div>
              </div>
            </div>
          </Tabs>
        </div>
      </section>

      {/* Section promotionnelle */}
      <section className="py-16 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">🎉 Offre Spéciale Cadeaux</h2>
          <p className="text-xl mb-8 opacity-90">
            Livraison gratuite + Emballage cadeau offert pour toute commande de
            plus de 500 د.م.
          </p>
          <Button
            size="lg"
            className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold shadow-xl"
          >
            Profiter de l'offre
          </Button>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(12deg);
          }
          50% {
            transform: translateY(-10px) rotate(12deg);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </Layout>
  );
}
