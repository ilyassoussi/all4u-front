import {useNavigate} from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { 
  ShoppingCartIcon,
  TrashIcon,
  MinusIcon,
  PlusIcon,
  HeartIcon,
  ArrowLeftIcon,
  ShoppingBagIcon
} from "@heroicons/react/24/outline";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, addToWishlist, clearCart } = useCart();
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} د.م.`;
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const moveToWishlist = (item: any) => {
    addToWishlist(item);
    removeFromCart(item.id);
  };

  if (cart.items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <Card>
              <CardHeader>
                <div className="mx-auto mb-4 bg-muted p-6 rounded-full w-fit">
                  <ShoppingCartIcon className="h-16 w-16 text-muted-foreground" />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground">
                  Votre panier est vide
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">
                  Découvrez nos produits et ajoutez-les à votre panier pour commencer vos achats.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button asChild>
                    <a href="/">
                      <ShoppingBagIcon className="mr-2 h-4 w-4" />
                      Continuer mes achats
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="/wishlist">
                      <HeartIcon className="mr-2 h-4 w-4" />
                      Voir ma liste de souhaits
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
            <span className="text-foreground font-medium">Panier</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              🛒 Mon Panier
            </h1>
            <p className="text-muted-foreground">
              {cart.itemsCount} article{cart.itemsCount > 1 ? 's' : ''} dans votre panier
            </p>
          </div>
          <Button variant="outline" asChild>
            <a href="/">
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Continuer mes achats
            </a>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <Card key={item.id} className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img 
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="font-medium text-foreground hover:text-brand-600 cursor-pointer">
                          <a href={`/product/${item.id}`}>
                            {item.name}
                          </a>
                        </h3>
                        <p className="text-sm text-muted-foreground">{item.brand}</p>
                        {item.features.slice(0, 2).map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs mr-1 mt-1">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg text-foreground">
                          {formatPrice(item.price)}
                        </div>
                        {item.originalPrice && (
                          <div className="text-sm text-muted-foreground line-through">
                            {formatPrice(item.originalPrice)}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Quantity Controls & Actions */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center border border-border rounded-lg">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="h-8 w-8 p-0"
                          >
                            <MinusIcon className="h-4 w-4" />
                          </Button>
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                            className="w-16 h-8 text-center border-0 focus:ring-0"
                            min="1"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="h-8 w-8 p-0"
                          >
                            <PlusIcon className="h-4 w-4" />
                          </Button>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          = {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => moveToWishlist(item)}
                          className="text-muted-foreground hover:text-brand-600"
                        >
                          <HeartIcon className="h-4 w-4 mr-1" />
                          Favoris
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <TrashIcon className="h-4 w-4 mr-1" />
                          Supprimer
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            {/* Clear Cart */}
            <div className="flex justify-end pt-4">
              <Button
                variant="outline"
                onClick={clearCart}
                className="text-destructive hover:text-destructive"
              >
                <TrashIcon className="mr-2 h-4 w-4" />
                Vider le panier
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Récapitulatif de commande</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Sous-total ({cart.itemsCount} article{cart.itemsCount > 1 ? 's' : ''})</span>
                    <span>{formatPrice(cart.total)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Livraison</span>
                    <span className="text-green-600 font-medium">Gratuite</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>TVA incluse</span>
                    <span>{formatPrice(cart.total * 0.2)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(cart.total)}</span>
                </div>

                <div className="space-y-3">
                  <Button
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-brand-500 hover:bg-brand-600" size="lg">
                    Passer la commande
                  </Button>
                  <Button variant="outline" className="w-full" size="lg">
                    Continuer mes achats
                  </Button>
                </div>

                <div className="text-center text-sm text-muted-foreground">
                  <p>✓ Livraison gratuite à Khemisset</p>
                  <p>✓ Paiement sécurisé</p>
                  <p>✓ Garantie officielle</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
