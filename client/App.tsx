import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AirPodsCategory from "./pages/categories/AirPods";
import PowerBankCategory from "./pages/categories/PowerBank";
import PlaceholderPage from "./components/layout/PlaceholderPage";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import AdminLogin from "./pages/auth/AdminLogin";
import AdminDashboard from "./pages/admin/Dashboard";
import ProductsManagement from "./pages/admin/ProductsManagement";
import OrdersManagement from "./pages/admin/OrdersManagement";
import CustomersManagement from "./pages/admin/CustomersManagement";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />

          {/* Category Routes */}
          <Route path="/categories/airpods" element={<AirPodsCategory />} />
          <Route path="/categories/powerbank" element={<PowerBankCategory />} />
          <Route path="/categories/telephones" element={
            <PlaceholderPage
              title="Téléphones"
              description="Smartphones dernière génération disponibles au Maroc."
              suggestions={[
                "iPhone, Samsung, Huawei, Oppo",
                "Filtres par marque, prix, stockage",
                "Smartphones 5G",
                "Comparaison de spécifications",
                "Garantie officielle Maroc"
              ]}
            />
          } />
          <Route path="/categories/watches" element={
            <PlaceholderPage
              title="Watch Électronique"
              description="Montres connectées et accessoires intelligents."
              suggestions={[
                "Apple Watch, Samsung Galaxy Watch",
                "Bracelets et accessoires",
                "Montres sport et fitness",
                "Montres hybrides",
                "Compatibilité iOS/Android"
              ]}
            />
          } />
          <Route path="/categories/pack" element={
            <PlaceholderPage
              title="Pack"
              description="Packs et bundles d'accessoires électroniques."
              suggestions={[
                "Pack iPhone + AirPods",
                "Pack chargeur + PowerBank",
                "Pack protection complète",
                "Offres spéciales groupées",
                "Économies sur les packs"
              ]}
            />
          } />
          <Route path="/categories/cadeau" element={
            <PlaceholderPage
              title="Cadeaux"
              description="Idées cadeaux tech pour toutes les occasions."
              suggestions={[
                "Cadeaux par budget",
                "Cadeaux par occasion (anniversaire, fête)",
                "Coffrets cadeaux",
                "Cartes cadeaux électroniques",
                "Emballage cadeau gratuit"
              ]}
            />
          } />
          <Route path="/categories/chargeurs-cables" element={
            <PlaceholderPage
              title="Chargeurs & Câbles"
              description="Accessoires de charge pour tous vos appareils."
              suggestions={[
                "Chargeurs USB-C, Lightning, Micro-USB",
                "Chargeurs rapides et sans fil",
                "Câbles de différentes longueurs",
                "Adaptateurs multi-prises",
                "Chargeurs voiture et voyage"
              ]}
            />
          } />

          {/* Account & Customer Routes */}
          <Route path="/account" element={
            <PlaceholderPage
              title="Mon Compte"
              description="Gérez votre profil et vos préférences."
              suggestions={[
                "Informations personnelles",
                "Adresses de livraison",
                "Moyens de paiement",
                "Préférences de communication",
                "Historique des connexions"
              ]}
            />
          } />
          <Route path="/orders" element={
            <PlaceholderPage
              title="Mes Commandes"
              description="Suivez l'état de vos commandes."
              suggestions={[
                "Historique des commandes",
                "Suivi de livraison en temps réel",
                "Factures et reçus",
                "Demandes de retour/échange",
                "Récommander rapidement"
              ]}
            />
          } />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />

          {/* Product Detail */}
          <Route path="/product/:id" element={<ProductDetail />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Support & Information Routes */}
          <Route path="/support" element={
            <PlaceholderPage
              title="Support & SAV"
              description="Assistance technique et service après-vente."
              suggestions={[
                "Chat en ligne",
                "Guide de dépannage",
                "Demande de garantie",
                "Centre de réparation Khemisset",
                "FAQ produits"
              ]}
            />
          } />
          <Route path="/contact" element={
            <PlaceholderPage
              title="Nous Contacter"
              description="Plusieurs moyens pour nous joindre."
              suggestions={[
                "Formulaire de contact",
                "Téléphone: +212 6XX-XXXXXX",
                "Email: contact@all4u.ma",
                "Adresse magasin Khemisset",
                "Horaires d'ouverture"
              ]}
            />
          } />
          <Route path="/about" element={
            <PlaceholderPage
              title="À Propos d'ALL4U"
              description="Notre histoire et notre mission au Maroc."
              suggestions={[
                "Histoire de l'entreprise",
                "Notre équipe",
                "Nos valeurs",
                "Présence au Maroc",
                "Partenaires officiels"
              ]}
            />
          } />

          {/* Legal Routes */}
          <Route path="/terms" element={
            <PlaceholderPage
              title="Conditions Générales"
              description="Conditions d'utilisation et de vente."
            />
          } />
          <Route path="/privacy" element={
            <PlaceholderPage
              title="Politique de Confidentialité"
              description="Protection et utilisation de vos données."
            />
          } />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<ProductsManagement />} />
          <Route path="/admin/orders" element={<OrdersManagement />} />
          <Route path="/admin/customers" element={<CustomersManagement />} />
          <Route path="/admin/settings" element={
            <PlaceholderPage
              title="Paramètres Boutique"
              description="Configuration générale de la boutique."
              suggestions={[
                "Devises et taxes",
                "Moyens de paiement",
                "Options d'expédition",
                "Configuration emails",
                "SEO et analytics"
              ]}
            />
          } />
          <Route path="/admin/promotions" element={
            <PlaceholderPage
              title="Promotions & Coupons"
              description="Gérez vos campagnes promotionnelles."
              suggestions={[
                "Codes de réduction",
                "Promotions par catégorie",
                "Offres spéciales",
                "Programmes de fidélité",
                "Analytics promotions"
              ]}
            />
          } />
          <Route path="/admin/*" element={
            <PlaceholderPage
              title="Administration"
              description="Fonctionnalités d'administration avancées."
              suggestions={[
                "Gestion produits CRUD complet",
                "Gestion commandes et expéditions",
                "Gestion clients et segmentation",
                "Promotions et coupons",
                "Rapports et analytics"
              ]}
            />
          } />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
