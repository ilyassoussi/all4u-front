import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { 
  HeartIcon,
  ShoppingCartIcon,
  TrashIcon,
  ShoppingBagIcon,
  StarIcon
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid, StarIcon as StarIconSolid } from "@heroicons/react/24/solid";

export default function Wishlist() {
  const { wishlist, removeFromWishlist, addToCart, isInCart } = useCart();

  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} د.م.`;
  };

  const handleAddToCart = (product: any) => {
    addToCart(product);
  };

  if (wishlist.items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <Card>
              <CardHeader>
                <div className="mx-auto mb-4 bg-muted p-6 rounded-full w-fit">
                  <HeartIcon className="h-16 w-16 text-muted-foreground" />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground">
                  Votre liste de souhaits est vide
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">
                  Ajoutez vos produits favoris à votre liste de souhaits pour les retrouver facilement.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button asChild>
                    <a href="/">
                      <ShoppingBagIcon className="mr-2 h-4 w-4" />
                      Découvrir nos produits
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="/cart">
                      <ShoppingCartIcon className="mr-2 h-4 w-4" />
                      Voir mon panier
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-muted/30 py-4">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-muted-foreground">
            <a href="/" className="hover:text-brand-600">Accueil</a> 
            <span className="mx-2">/</span>
            <span className="text-foreground font-medium">Liste de souhaits</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              ❤️ Ma Liste de Souhaits
            </h1>
            <p className="text-muted-foreground">
              {wishlist.itemsCount} produit{wishlist.itemsCount > 1 ? 's' : ''} sauvegardé{wishlist.itemsCount > 1 ? 's' : ''}
            </p>
          </div>
          <Button variant="outline" asChild>
            <a href="/">
              Continuer mes achats
            </a>
          </Button>
        </div>

        {/* Wishlist Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.items.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Remove from wishlist button */}
                  <div className="absolute top-3 right-3">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-8 w-8 bg-white/90 hover:bg-white"
                      onClick={() => removeFromWishlist(product.id)}
                    >
                      <HeartIconSolid className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>

                  {/* Stock status */}
                  {!product.inStock && (
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary">
                        Rupture de stock
                      </Badge>
                    </div>
                  )}

                  {/* Discount badge */}
                  {product.originalPrice && (
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-red-500 text-white">
                        -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                      </Badge>
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="font-medium text-foreground mb-2 line-clamp-2 group-hover:text-brand-600 transition-colors">
                    <a href={`/product/${product.id}`}>
                      {product.name}
                    </a>
                  </h3>
                  
                  {/* Rating */}
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
                  
                  {/* Features */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {product.features.slice(0, 2).map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  
                  {/* Price */}
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-lg font-bold text-foreground">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  
                  {/* Actions */}
                  <div className="space-y-2">
                    <Button 
                      className="w-full bg-brand-500 hover:bg-brand-600" 
                      size="sm"
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.inStock || isInCart(product.id)}
                    >
                      <ShoppingCartIcon className="mr-2 h-4 w-4" />
                      {!product.inStock 
                        ? 'Indisponible' 
                        : isInCart(product.id)
                        ? 'Déjà dans le panier'
                        : 'Ajouter au panier'
                      }
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full text-destructive hover:text-destructive"
                      onClick={() => removeFromWishlist(product.id)}
                    >
                      <TrashIcon className="mr-2 h-4 w-4" />
                      Retirer des favoris
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Actions */}
        <div className="flex justify-center mt-12 space-x-4">
          <Button asChild>
            <a href="/">
              Continuer mes achats
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="/cart">
              Voir mon panier
            </a>
          </Button>
        </div>

        {/* Tips */}
        <div className="mt-12 bg-muted/50 rounded-lg p-6">
          <h3 className="font-semibold text-foreground mb-4">💡 Astuces pour votre liste de souhaits</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
            <div>
              <strong>Suivez les prix :</strong> Nous vous notifierons si le prix d'un produit diminue.
            </div>
            <div>
              <strong>Partagez vos envies :</strong> Partagez votre liste avec vos proches pour vos cadeaux.
            </div>
            <div>
              <strong>Stock limité :</strong> Ajoutez rapidement au panier avant rupture de stock.
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
