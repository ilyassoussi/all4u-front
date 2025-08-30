import { useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useCart, Product } from "@/contexts/CartContext";
import { 
  StarIcon,
  HeartIcon,
  ShoppingCartIcon,
  ShareIcon,
  TruckIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  CheckIcon,
  MinusIcon,
  PlusIcon
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid, HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

// Mock product data - in real app, this would come from API
const mockProducts: Record<string, Product & { 
  images: string[];
  description: string;
  specifications: Record<string, string>;
  reviews: Array<{
    id: number;
    user: string;
    rating: number;
    comment: string;
    date: string;
  }>;
}> = {
  "1": {
    id: 1,
    name: "AirPods Pro (2ème génération)",
    price: 2599,
    originalPrice: 2899,
    image: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop"
    ],
    rating: 4.8,
    reviews: 127,
    brand: "Apple",
    category: "AirPods",
    inStock: true,
    features: ["Réduction de bruit active", "Audio spatial", "Résistance à l'eau IPX4", "Hey Siri"],
    description: "Les AirPods Pro (2ème génération) offrent une expérience audio exceptionnelle avec la réduction de bruit active, l'audio spatial personnalisé et une autonomie prolongée. Parfaits pour une utilisation quotidienne avec une qualité sonore professionnelle.",
    specifications: {
      "Autonomie": "Jusqu'à 6 heures d'écoute avec réduction de bruit",
      "Autonomie avec boîtier": "Jusqu'à 30 heures d'écoute",
      "Résistance": "IPX4 (résistant à la sueur et à l'eau)",
      "Puce": "Puce H2",
      "Connectivité": "Bluetooth 5.3",
      "Capteurs": "Capteur de pression tactile",
      "Audio": "Audio spatial avec suivi dynamique de la tête",
      "Microphones": "3 microphones pour la réduction de bruit",
      "Charge": "USB-C, Charge sans fil MagSafe",
      "Dimensions": "30,9 × 21,8 × 24,0 mm",
      "Poids": "5,3 g chaque écouteur"
    },
    reviews: [
      {
        id: 1,
        user: "Ahmed M.",
        rating: 5,
        comment: "Excellente qualité sonore, la réduction de bruit est impressionnante. Parfait pour les trajets quotidiens.",
        date: "2024-01-15"
      },
      {
        id: 2,
        user: "Fatima L.",
        rating: 4,
        comment: "Très satisfaite de mon achat. Le son est cristallin et l'autonomie est correcte.",
        date: "2024-01-10"
      },
      {
        id: 3,
        user: "Mohammed K.",
        rating: 5,
        comment: "Livraison rapide à Khemisset. Produit conforme à la description, je recommande !",
        date: "2024-01-08"
      }
    ]
  }
};

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist, isInCart } = useCart();

  const product = id ? mockProducts[id] : null;

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Produit non trouvé</h1>
          <Button asChild>
            <a href="/">Retour à l'accueil</a>
          </Button>
        </div>
      </Layout>
    );
  }

  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} د.م.`;
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const toggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const discountPercent = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-muted/30 py-4">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-muted-foreground">
            <a href="/" className="hover:text-brand-600">Accueil</a> 
            <span className="mx-2">/</span>
            <a href={`/categories/${product.category.toLowerCase()}`} className="hover:text-brand-600">{product.category}</a>
            <span className="mx-2">/</span>
            <span className="text-foreground font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
              <img 
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-brand-500' : 'border-transparent'
                  }`}
                >
                  <img 
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Brand & Name */}
            <div>
              <Badge className="mb-2">{product.brand}</Badge>
              <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarIconSolid 
                      key={i} 
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) 
                          ? 'text-yellow-400' 
                          : 'text-gray-300'
                      }`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviews.length} avis)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-foreground">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <Badge className="bg-red-500 text-white">
                      -{discountPercent}%
                    </Badge>
                  </>
                )}
              </div>
              <p className="text-sm text-muted-foreground">Prix TTC, livraison gratuite à Khemisset</p>
            </div>

            {/* Features */}
            <div>
              <h3 className="font-semibold text-foreground mb-2">Caractéristiques principales</h3>
              <div className="grid grid-cols-1 gap-2">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckIcon className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div className={`h-3 w-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className={`font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                {product.inStock ? 'En stock' : 'Rupture de stock'}
              </span>
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-4">
              {/* Quantity */}
              <div className="flex items-center space-x-4">
                <span className="font-medium">Quantité:</span>
                <div className="flex items-center border border-border rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-10 w-10 p-0"
                  >
                    <MinusIcon className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-10 w-10 p-0"
                  >
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button 
                  className="w-full bg-brand-500 hover:bg-brand-600" 
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCartIcon className="mr-2 h-5 w-5" />
                  {isInCart(product.id) ? 'Ajouter plus au panier' : 'Ajouter au panier'}
                </Button>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={toggleWishlist}
                    className={isInWishlist(product.id) ? 'text-red-500 border-red-200' : ''}
                  >
                    {isInWishlist(product.id) ? (
                      <HeartIconSolid className="mr-2 h-5 w-5" />
                    ) : (
                      <HeartIcon className="mr-2 h-5 w-5" />
                    )}
                    {isInWishlist(product.id) ? 'Retiré des favoris' : 'Ajouter aux favoris'}
                  </Button>
                  
                  <Button variant="outline" size="lg">
                    <ShareIcon className="mr-2 h-5 w-5" />
                    Partager
                  </Button>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="space-y-3 border-t border-border pt-6">
              <div className="flex items-center space-x-3 text-sm">
                <TruckIcon className="h-5 w-5 text-brand-500" />
                <span>Livraison gratuite à Khemisset (24-48h)</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <ShieldCheckIcon className="h-5 w-5 text-brand-500" />
                <span>Garantie officielle constructeur</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <CreditCardIcon className="h-5 w-5 text-brand-500" />
                <span>Paiement sécurisé (carte bancaire ou COD)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Spécifications</TabsTrigger>
              <TabsTrigger value="reviews">Avis ({product.reviews.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex flex-col space-y-1">
                        <span className="font-medium text-foreground">{key}</span>
                        <span className="text-muted-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-4">
                {product.reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="font-medium text-foreground">{review.user}</div>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <StarIconSolid 
                                  key={i} 
                                  className={`h-4 w-4 ${
                                    i < review.rating 
                                      ? 'text-yellow-400' 
                                      : 'text-gray-300'
                                  }`} 
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
