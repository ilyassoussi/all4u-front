import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MagnifyingGlassIcon, BuildingStorefrontIcon } from "@heroicons/react/24/outline";

// Mock brands data - same as in admin
const brands = [
  {
    id: "1",
    name: "Apple",
    slug: "apple",
    description: "Produits Apple officiels - iPhone, AirPods, Watch",
    logo: "/placeholder.svg",
    website: "https://apple.com",
    productCount: 45,
    featured: true
  },
  {
    id: "2", 
    name: "Samsung",
    slug: "samsung",
    description: "Smartphones et accessoires Samsung",
    logo: "/placeholder.svg",
    website: "https://samsung.com",
    productCount: 32,
    featured: true
  },
  {
    id: "3",
    name: "Xiaomi",
    slug: "xiaomi",
    description: "Écosystème Xiaomi - Smartphones et accessoires",
    logo: "/placeholder.svg",
    website: "https://mi.com",
    productCount: 28,
    featured: true
  },
  {
    id: "4",
    name: "Oraimo",
    slug: "oraimo",
    description: "Accessoires de charge et audio Oraimo",
    logo: "/placeholder.svg",
    website: "https://oraimo.com",
    productCount: 22,
    featured: true
  },
  {
    id: "5",
    name: "Soundcore",
    slug: "soundcore",
    description: "Produits audio Soundcore by Anker",
    logo: "/placeholder.svg",
    website: "https://soundcore.com",
    productCount: 18,
    featured: false
  },
  {
    id: "6",
    name: "SoundPEATS",
    slug: "soundpeats",
    description: "Écouteurs sans fil et casques SoundPEATS",
    logo: "/placeholder.svg",
    website: "https://soundpeats.com",
    productCount: 15,
    featured: false
  },
  {
    id: "7",
    name: "Anker",
    slug: "anker",
    description: "PowerBank et chargeurs Anker",
    logo: "/placeholder.svg",
    website: "https://anker.com",
    productCount: 35,
    featured: true
  },
  {
    id: "8",
    name: "Belkin",
    slug: "belkin",
    description: "Accessoires et protections Belkin",
    logo: "/placeholder.svg",
    website: "https://belkin.com",
    productCount: 12,
    featured: false
  },
  {
    id: "9",
    name: "Baseus",
    slug: "baseus",
    description: "Accessoires automobiles et chargeurs Baseus",
    logo: "/placeholder.svg",
    website: "https://baseus.com",
    productCount: 24,
    featured: false
  },
  {
    id: "10",
    name: "Huawei",
    slug: "huawei",
    description: "Smartphones et accessoires Huawei",
    logo: "/placeholder.svg",
    website: "https://huawei.com",
    productCount: 19,
    featured: true
  }
];

export default function Brands() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredBrands = brands.filter(brand => {
    const matchesSearch = brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         brand.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || 
                           (selectedCategory === "featured" && brand.featured) ||
                           (selectedCategory === "all-brands" && !brand.featured);
    
    return matchesSearch && matchesCategory;
  });

  const featuredBrands = brands.filter(brand => brand.featured);
  const allBrands = brands.filter(brand => !brand.featured);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
        {/* Header */}
        <section className="bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Nos Marques Partenaires
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Découvrez les meilleures marques d'électronique disponibles chez ALL4U. 
              Produits authentiques avec garantie officielle.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Rechercher une marque..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={selectedCategory === "all" ? "default" : "outline"}
                  onClick={() => setSelectedCategory("all")}
                  size="sm"
                >
                  Toutes ({brands.length})
                </Button>
                <Button
                  variant={selectedCategory === "featured" ? "default" : "outline"}
                  onClick={() => setSelectedCategory("featured")}
                  size="sm"
                >
                  En vedette ({featuredBrands.length})
                </Button>
              </div>
            </div>
          </div>

          {/* Featured Brands */}
          {selectedCategory === "all" && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text mr-2">⭐</span>
                Marques En Vedette
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {featuredBrands.map((brand) => (
                  <Card key={brand.id} className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                        <span className="text-2xl font-bold text-gray-700">
                          {brand.name.substring(0, 2)}
                        </span>
                      </div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2">{brand.name}</h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{brand.description}</p>
                      <div className="flex items-center justify-center text-sm text-gray-500 mb-4">
                        <BuildingStorefrontIcon className="h-4 w-4 mr-1" />
                        {brand.productCount} produits
                      </div>
                      <Button 
                        asChild 
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                      >
                        <a href={`/brands/${brand.slug}`}>
                          Voir les produits
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* All Brands Grid */}
          <div>
            {selectedCategory === "all" && (
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Toutes les Marques
              </h2>
            )}
            
            {filteredBrands.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <BuildingStorefrontIcon className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-medium text-gray-600 mb-2">Aucune marque trouvée</h3>
                <p className="text-gray-500">Essayez de modifier vos critères de recherche</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBrands.map((brand) => (
                  <a href={`/brands/${brand.slug}`} className="block">
                    <Card key={brand.id} className="group hover:shadow-lg transition-all duration-300 hover:border-blue-300 cursor-pointer">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                              <span className="text-lg font-bold text-gray-600">
                                {brand.name.substring(0, 2)}
                              </span>
                            </div>
                            <div>
                              <CardTitle className="text-lg">{brand.name}</CardTitle>
                              {brand.featured && (
                                <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                                  ⭐ En vedette
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                          {brand.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-gray-500">
                            <BuildingStorefrontIcon className="h-4 w-4 mr-1" />
                            {brand.productCount} produits
                          </div>
                          <Button variant="outline" size="sm">
                            Découvrir
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Votre marque préférée n'est pas listée ?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Contactez-nous pour connaître notre disponibilité ou pour des demandes spéciales. 
              Nous travaillons constamment à élargir notre catalogue de marques partenaires.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <a href="/contact">Nous contacter</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/categories/pack">Voir nos packs</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
