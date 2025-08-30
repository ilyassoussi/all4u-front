import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import {
  StarIcon,
  TruckIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  ArrowRightIcon
} from "@heroicons/react/24/solid";
import {
  HeartIcon,
  ShoppingCartIcon
} from "@heroicons/react/24/outline";

const categories = [
  {
    name: "AirPods",
    href: "/categories/airpods",
    icon: "🎧",
    image: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=400&h=300&fit=crop",
    description: "Écouteurs sans fil Apple",
    count: "24 produits"
  },
  {
    name: "PowerBank",
    href: "/categories/powerbank",
    icon: "🔋",
    image: "https://images.unsplash.com/photo-1609592518760-b3aa87b1ea54?w=400&h=300&fit=crop",
    description: "Batteries portables",
    count: "18 produits"
  },
  {
    name: "Téléphones",
    href: "/categories/telephones",
    icon: "📱",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
    description: "Smartphones dernière génération",
    count: "42 produits"
  },
  {
    name: "Watch Électronique",
    href: "/categories/watches",
    icon: "⌚",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
    description: "Montres connectées",
    count: "15 produits"
  },
  {
    name: "Chargeurs & Câbles",
    href: "/categories/chargeurs-cables",
    icon: "🔌",
    image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop",
    description: "Accessoires de charge",
    count: "31 produits"
  },
  {
    name: "Cadeaux",
    href: "/categories/cadeau",
    icon: "🎁",
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop",
    description: "Idées cadeaux tech",
    count: "26 produits"
  }
];

const featuredProducts = [
  {
    id: 1,
    name: "AirPods Pro (2ème génération)",
    price: 2599,
    originalPrice: 2899,
    image: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 127,
    badge: "Bestseller",
    isNew: false
  },
  {
    id: 2,
    name: "iPhone 15 Pro 128GB",
    price: 12999,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 89,
    badge: "Nouveau",
    isNew: true
  },
  {
    id: 3,
    name: "Apple Watch Series 9",
    price: 4299,
    originalPrice: 4599,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 203,
    badge: "Promo",
    isNew: false
  },
  {
    id: 4,
    name: "PowerBank Anker 20000mAh",
    price: 459,
    originalPrice: 529,
    image: "https://images.unsplash.com/photo-1609592518760-b3aa87b1ea54?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 156,
    badge: "-13%",
    isNew: false
  }
];

export default function Index() {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  const handleAddToCart = (product: any) => {
    addToCart({
      ...product,
      category: "featured",
      brand: "Apple",
      features: ["Audio spatial", "Garantie officielle"],
      inStock: true
    });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-600 to-brand-800 text-white overflow-hidden">
        <div className={"absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.05\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"}></div>
        <div className="container mx-auto px-4 py-16 lg:py-24 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  ALL4U
                  <span className="block text-brand-200">Electronics Store</span>
                </h1>
                <p className="text-xl text-brand-100 max-w-lg">
                  Découvrez les dernières technologies à Khemisset. 
                  Livraison gratuite, garantie officielle et prix compétitifs.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-brand-600 hover:bg-brand-50 font-semibold">
                  Découvrir nos produits
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-600">
                  Voir les promotions
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-4 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold">2000+</div>
                  <div className="text-brand-200 text-sm">Produits</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-brand-200 text-sm">Clients satisfaits</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">24h</div>
                  <div className="text-brand-200 text-sm">Livraison Khemisset</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <img 
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop"
                  alt="Electronics showcase"
                  className="w-full h-80 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-4 p-6 bg-white rounded-lg shadow-sm">
              <div className="bg-brand-100 p-3 rounded-lg">
                <TruckIcon className="h-8 w-8 text-brand-600" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Livraison Gratuite</h3>
                <p className="text-muted-foreground text-sm">À Khemisset - Délai 24-48h</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-6 bg-white rounded-lg shadow-sm">
              <div className="bg-brand-100 p-3 rounded-lg">
                <ShieldCheckIcon className="h-8 w-8 text-brand-600" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Garantie Officielle</h3>
                <p className="text-muted-foreground text-sm">Produits authentiques garantis</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-6 bg-white rounded-lg shadow-sm">
              <div className="bg-brand-100 p-3 rounded-lg">
                <CreditCardIcon className="h-8 w-8 text-brand-600" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Paiement Sécurisé</h3>
                <p className="text-muted-foreground text-sm">Carte bancaire & COD</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Nos Catégories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explorez notre large gamme de produits électroniques soigneusement sélectionnés 
              pour répondre à tous vos besoins technologiques.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Card key={category.name} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={category.image}
                      alt={category.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-brand-500 hover:bg-brand-600 text-white">
                        {category.count}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-2xl">{category.icon}</span>
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-brand-600 transition-colors">
                        {category.name}
                      </h3>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4">{category.description}</p>
                    <Button variant="outline" size="sm" className="group-hover:bg-brand-50 group-hover:border-brand-200">
                      Voir les produits
                      <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Produits Vedettes</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Découvrez nos produits les plus populaires, sélectionnés pour leur qualité 
              et leur rapport qualité-prix exceptionnel.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge 
                        className={`${
                          product.isNew 
                            ? 'bg-emerald-500 hover:bg-emerald-600' 
                            : product.badge === 'Bestseller'
                            ? 'bg-orange-500 hover:bg-orange-600'
                            : 'bg-red-500 hover:bg-red-600'
                        } text-white`}
                      >
                        {product.badge}
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-8 w-8"
                        onClick={() => toggleWishlist({
                          ...product,
                          category: "featured",
                          brand: "Apple",
                          features: ["Audio spatial", "Garantie officielle"],
                          inStock: true
                        })}
                      >
                        <HeartIcon className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                      </Button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-foreground mb-2 line-clamp-2 group-hover:text-brand-600 transition-colors">
                      <a href={`/product/${product.id}`}>
                        {product.name}
                      </a>
                    </h3>
                    <div className="flex items-center space-x-1 mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon 
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
                    <div className="flex space-x-2">
                      <Button
                        className="flex-1 bg-brand-500 hover:bg-brand-600"
                        size="sm"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingCartIcon className="mr-2 h-4 w-4" />
                        Panier
                      </Button>
                      <Button className="px-3" variant="outline" size="sm" asChild>
                        <a href={`/product/${product.id}`}>
                          Voir
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Voir tous les produits
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-brand-600">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Restez Informé</h2>
            <p className="text-brand-100 mb-8 max-w-2xl mx-auto">
              Inscrivez-vous à notre newsletter pour recevoir les dernières offres 
              et nouveautés directement dans votre boîte e-mail.
            </p>
            <div className="max-w-md mx-auto flex gap-2">
              <input 
                type="email" 
                placeholder="Votre adresse e-mail"
                className="flex-1 px-4 py-3 rounded-lg text-foreground"
              />
              <Button className="bg-white text-brand-600 hover:bg-brand-50 font-semibold px-6">
                S'inscrire
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
