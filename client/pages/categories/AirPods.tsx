import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { 
  StarIcon,
  FunnelIcon,
  Squares2X2Icon,
  ListBulletIcon,
  HeartIcon,
  ShoppingCartIcon,
  AdjustmentsHorizontalIcon
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";

const airPodsProducts = [
  {
    id: 1,
    name: "AirPods Pro (2ème génération)",
    price: 2599,
    originalPrice: 2899,
    image: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 127,
    badge: "Bestseller",
    brand: "Apple",
    type: "Pro",
    features: ["Réduction de bruit active", "Audio spatial", "Résistance à l'eau IPX4"],
    inStock: true,
    discount: 10
  },
  {
    id: 2,
    name: "AirPods (3ème génération)",
    price: 1899,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 89,
    badge: null,
    brand: "Apple",
    type: "Standard",
    features: ["Audio spatial", "Résistance à l'eau IPX4", "Boîtier de charge"],
    inStock: true,
    discount: 0
  },
  {
    id: 3,
    name: "AirPods Max",
    price: 5999,
    originalPrice: 6299,
    image: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 203,
    badge: "Premium",
    brand: "Apple",
    type: "Max",
    features: ["Réduction de bruit active", "Audio haute-fidélité", "Coussinets en mousse à mémoire"],
    inStock: true,
    discount: 5
  },
  {
    id: 4,
    name: "AirPods (2ème génération)",
    price: 1299,
    originalPrice: 1499,
    image: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=400&h=400&fit=crop",
    rating: 4.4,
    reviews: 156,
    badge: "Économique",
    brand: "Apple",
    type: "Standard",
    features: ["Puce H1", "Hey Siri", "Boîtier de charge"],
    inStock: false,
    discount: 13
  },
  {
    id: 5,
    name: "AirPods Pro (1ère génération)",
    price: 1999,
    originalPrice: 2299,
    image: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=400&h=400&fit=crop",
    rating: 4.5,
    reviews: 178,
    badge: "Promo",
    brand: "Apple",
    type: "Pro",
    features: ["Réduction de bruit active", "Mode Transparence", "Résistance à l'eau IPX4"],
    inStock: true,
    discount: 13
  },
  {
    id: 6,
    name: "AirPods Pro USB-C",
    price: 2799,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 92,
    badge: "Nouveau",
    brand: "Apple",
    type: "Pro",
    features: ["USB-C", "Réduction de bruit adaptive", "Audio spatial personnalisé"],
    inStock: true,
    discount: 0
  }
];

const brands = ["Apple"];
const types = ["Standard", "Pro", "Max"];
const features = [
  "Réduction de bruit active",
  "Audio spatial", 
  "Résistance à l'eau",
  "Mode Transparence",
  "Hey Siri",
  "Charge sans fil"
];

export default function AirPodsCategory() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popularity');
  const [priceRange, setPriceRange] = useState([0, 7000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = airPodsProducts.filter(product => {
    if (showInStockOnly && !product.inStock) return false;
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) return false;
    if (selectedTypes.length > 0 && !selectedTypes.includes(product.type)) return false;
    if (selectedFeatures.length > 0 && !selectedFeatures.some(feature => 
      product.features.some(productFeature => productFeature.includes(feature))
    )) return false;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.id - a.id;
      default:
        return b.reviews - a.reviews; // popularity
    }
  });

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-muted/30 py-4">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-muted-foreground">
            <a href="/" className="hover:text-brand-600">Accueil</a> 
            <span className="mx-2">/</span>
            <span className="text-foreground font-medium">AirPods</span>
          </nav>
        </div>
      </div>

      {/* Page Header */}
      <section className="py-8 bg-gradient-to-r from-brand-50 to-brand-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                🎧 AirPods
              </h1>
              <p className="text-muted-foreground">
                Découvrez la gamme complète d'écouteurs sans fil Apple AirPods
              </p>
            </div>
            <div className="hidden md:block">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-sm text-muted-foreground">Produits trouvés</div>
                <div className="text-2xl font-bold text-brand-600">{sortedProducts.length}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-8 space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <FunnelIcon className="h-5 w-5 text-muted-foreground" />
                    <h3 className="font-semibold text-foreground">Filtres</h3>
                  </div>

                  {/* Price Range */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground">Prix (د.م.)</h4>
                    <div className="px-2">
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={7000}
                        min={0}
                        step={100}
                        className="mb-2"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{priceRange[0]} د.م.</span>
                        <span>{priceRange[1]} د.م.</span>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  {/* Stock Status */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-foreground">Disponibilité</h4>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="inStock" 
                        checked={showInStockOnly}
                        onCheckedChange={(checked) => setShowInStockOnly(checked as boolean)}
                      />
                      <Label htmlFor="inStock" className="text-sm">En stock uniquement</Label>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  {/* Types */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-foreground">Type</h4>
                    {types.map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`type-${type}`}
                          checked={selectedTypes.includes(type)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedTypes([...selectedTypes, type]);
                            } else {
                              setSelectedTypes(selectedTypes.filter(t => t !== type));
                            }
                          }}
                        />
                        <Label htmlFor={`type-${type}`} className="text-sm">{type}</Label>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-6" />

                  {/* Features */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-foreground">Fonctionnalités</h4>
                    {features.map((feature) => (
                      <div key={feature} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`feature-${feature}`}
                          checked={selectedFeatures.includes(feature)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedFeatures([...selectedFeatures, feature]);
                            } else {
                              setSelectedFeatures(selectedFeatures.filter(f => f !== feature));
                            }
                          }}
                        />
                        <Label htmlFor={`feature-${feature}`} className="text-sm">{feature}</Label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <AdjustmentsHorizontalIcon className="h-4 w-4 mr-2" />
                  Filtres
                </Button>
                <div className="text-sm text-muted-foreground">
                  {sortedProducts.length} produit{sortedProducts.length > 1 ? 's' : ''}
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Trier par:</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popularity">Popularité</SelectItem>
                      <SelectItem value="newest">Plus récent</SelectItem>
                      <SelectItem value="price-low">Prix croissant</SelectItem>
                      <SelectItem value="price-high">Prix décroissant</SelectItem>
                      <SelectItem value="rating">Mieux notés</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-1 border border-border rounded-lg p-1">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="h-8 w-8 p-0"
                  >
                    <Squares2X2Icon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="h-8 w-8 p-0"
                  >
                    <ListBulletIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
              {sortedProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-0">
                    <div className={`${viewMode === 'list' ? 'flex' : ''}`}>
                      <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-48 h-48 flex-shrink-0' : 'rounded-t-lg'}`}>
                        <img 
                          src={product.image}
                          alt={product.name}
                          className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                            viewMode === 'list' ? 'w-full h-full' : 'w-full h-48'
                          }`}
                        />
                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                          {product.badge && (
                            <Badge className={`${
                              product.badge === 'Bestseller' ? 'bg-orange-500' :
                              product.badge === 'Nouveau' ? 'bg-emerald-500' :
                              product.badge === 'Premium' ? 'bg-purple-500' :
                              'bg-red-500'
                            } text-white`}>
                              {product.badge}
                            </Badge>
                          )}
                          {product.discount > 0 && (
                            <Badge className="bg-red-500 text-white">
                              -{product.discount}%
                            </Badge>
                          )}
                          {!product.inStock && (
                            <Badge variant="secondary">
                              Rupture de stock
                            </Badge>
                          )}
                        </div>
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="icon" variant="secondary" className="h-8 w-8">
                            <HeartIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                        <h3 className="font-medium text-foreground mb-2 group-hover:text-brand-600 transition-colors">
                          {product.name}
                        </h3>
                        
                        <div className="flex items-center space-x-1 mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <StarIconSolid 
                                key={i} 
                                className={`h-4 w-4 ${
                                  i < Math.floor(product.rating) 
                                    ? 'text-yellow-400' 
                                    : 'text-gray-300'
                                }`} 
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">({product.reviews})</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mb-3">
                          {product.features.slice(0, 2).map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center space-x-2 mb-3">
                          <span className="text-lg font-bold text-foreground">
                            {product.price.toLocaleString()} د.م.
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              {product.originalPrice.toLocaleString()} د.م.
                            </span>
                          )}
                        </div>
                        
                        <Button 
                          className={`bg-brand-500 hover:bg-brand-600 ${viewMode === 'list' ? '' : 'w-full'}`} 
                          size="sm"
                          disabled={!product.inStock}
                        >
                          <ShoppingCartIcon className="mr-2 h-4 w-4" />
                          {product.inStock ? 'Ajouter au panier' : 'Indisponible'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-muted-foreground text-lg mb-4">
                  Aucun produit trouvé avec ces filtres
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setPriceRange([0, 7000]);
                    setSelectedBrands([]);
                    setSelectedTypes([]);
                    setSelectedFeatures([]);
                    setShowInStockOnly(false);
                  }}
                >
                  Réinitialiser les filtres
                </Button>
              </div>
            )}

            {/* Pagination */}
            {sortedProducts.length > 0 && (
              <div className="flex justify-center mt-12">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">Précédent</Button>
                  <Button variant="default" size="sm">1</Button>
                  <Button variant="outline" size="sm">2</Button>
                  <Button variant="outline" size="sm">3</Button>
                  <Button variant="outline" size="sm">Suivant</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
