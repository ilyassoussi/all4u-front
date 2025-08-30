import { useState } from "react";
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
  HeartIcon,
  MapPinIcon,
  PhoneIcon
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";

const categories = [
  { name: "AirPods", href: "/categories/airpods", icon: "🎧" },
  { name: "PowerBank", href: "/categories/powerbank", icon: "🔋" },
  { name: "Téléphones", href: "/categories/telephones", icon: "📱" },
  { name: "Watch Électronique", href: "/categories/watches", icon: "⌚" },
  { name: "Pack", href: "/categories/pack", icon: "📦" },
  { name: "Cadeau", href: "/categories/cadeau", icon: "🎁" },
  { name: "Chargeurs & Câbles", href: "/categories/chargeurs-cables", icon: "🔌" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { cart, wishlist } = useCart();

  return (
    <header className="bg-white border-b border-border shadow-sm">
      {/* Top bar */}
      <div className="bg-brand-50 border-b border-brand-100">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-sm text-brand-700">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <MapPinIcon className="h-4 w-4" />
                <span>Livraison gratuite à Khemisset</span>
              </div>
              <div className="hidden md:flex items-center gap-1">
                <PhoneIcon className="h-4 w-4" />
                <span>+212 6XX-XXXXXX</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span>🇲🇦 Maroc</span>
              <span>د.م. MAD</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <div className="bg-brand-500 text-white px-3 py-2 rounded-lg font-bold text-xl">
                ALL4U
              </div>
              <div className="hidden sm:block">
                <div className="text-sm text-muted-foreground">Electronics Store</div>
                <div className="text-xs text-brand-600">Khemisset, Maroc</div>
              </div>
            </a>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-xl mx-4 hidden md:block">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher des produits, marques..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border-border focus:border-brand-500 focus:ring-brand-500"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Mobile search */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <MagnifyingGlassIcon className="h-5 w-5" />
            </Button>

            {/* Wishlist */}
            <Button variant="ghost" size="icon" className="hidden sm:flex relative" asChild>
              <a href="/wishlist">
                <HeartIcon className="h-5 w-5" />
                {wishlist.itemsCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-brand-500 hover:bg-brand-600">
                    {wishlist.itemsCount}
                  </Badge>
                )}
              </a>
            </Button>

            {/* Account */}
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <UserIcon className="h-5 w-5" />
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="icon" className="relative" asChild>
              <a href="/cart">
                <ShoppingCartIcon className="h-5 w-5" />
                {cart.itemsCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-brand-500 hover:bg-brand-600">
                    {cart.itemsCount}
                  </Badge>
                )}
              </a>
            </Button>

            {/* Mobile menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Bars3Icon className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-lg font-semibold">Menu</div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </Button>
                </div>
                
                {/* Mobile search */}
                <div className="mb-6">
                  <div className="relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Rechercher..."
                      className="pl-10 pr-4"
                    />
                  </div>
                </div>

                {/* Mobile categories */}
                <nav className="space-y-2">
                  {categories.map((category) => (
                    <a
                      key={category.name}
                      href={category.href}
                      className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors"
                    >
                      <span className="text-lg">{category.icon}</span>
                      <span>{category.name}</span>
                    </a>
                  ))}
                </nav>

                {/* Mobile account links */}
                <div className="mt-6 pt-6 border-t border-border space-y-2">
                  <a href="/account" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors">
                    <UserIcon className="h-5 w-5" />
                    <span>Mon Compte</span>
                  </a>
                  <a href="/wishlist" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors">
                    <HeartIcon className="h-5 w-5" />
                    <span>Liste de souhaits ({wishlist.itemsCount})</span>
                  </a>
                  <a href="/cart" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors">
                    <ShoppingCartIcon className="h-5 w-5" />
                    <span>Panier ({cart.itemsCount})</span>
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Categories navigation */}
      <div className="hidden md:block border-t border-border bg-muted/30">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-8 py-3">
            {categories.map((category) => (
              <a
                key={category.name}
                href={category.href}
                className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-brand-600 transition-colors group"
              >
                <span className="text-base group-hover:scale-110 transition-transform">
                  {category.icon}
                </span>
                <span>{category.name}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
