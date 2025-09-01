import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const products = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
    price: 12999,
    description: "Le dernier iPhone haut de gamme d'Apple.",
    category: "telephones"
  },
  {
    id: 2,
    name: "AirPods Pro 2",
    image: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=400&h=400&fit=crop",
    price: 2599,
    description: "Écouteurs sans fil avec réduction de bruit active.",
    category: "airpods"
  },
  {
    id: 3,
    name: "Apple Watch Series 9",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    price: 4299,
    description: "Montre connectée avec suivi de santé avancé.",
    category: "watch"
  },
  {
    id: 4,
    name: "Apple PowerBank MagSafe",
    image: "https://images.unsplash.com/photo-1609592518760-b3aa87b1ea54?w=400&h=400&fit=crop",
    price: 799,
    description: "Batterie externe MagSafe pour iPhone.",
    category: "powerbanks"
  }
];

export default function AppleBrand() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const categories = [
    { key: "all", label: "Tous" },
    { key: "telephones", label: "Téléphones" },
    { key: "airpods", label: "AirPods" },
    { key: "watch", label: "Watch" },
    { key: "powerbanks", label: "PowerBanks" }
  ];
  const filteredProducts = selectedCategory === "all"
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <Layout>
      <section className="py-16 min-h-screen bg-gradient-to-br from-gray-100 via-gray-300 to-gray-200 text-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-14 rounded-3xl bg-white/90 backdrop-blur-xl shadow-2xl border border-gray-200/40 flex flex-col md:flex-row items-center gap-10 p-8 md:p-16 animate-fade-in">
            {/* Logo Apple sur fond blanc, style officiel */}
            <div className="flex-shrink-0 flex flex-col items-center justify-center">
              <div className="bg-white rounded-2xl shadow-lg p-4 flex items-center justify-center">
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple Logo" className="h-20 w-auto" />
              </div>
              <span className="mt-4 px-4 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-gray-400 to-gray-700 text-white shadow-lg border border-gray-300/40 animate-bounce">Official Brand</span>
            </div>
            {/* Texte et bouton inspirés du site Apple */}
            <div className="flex-1 text-center md:text-left flex flex-col items-center md:items-start gap-4">
              <h1 className="text-5xl md:text-7xl font-extrabold mb-2 text-black tracking-tight drop-shadow-lg font-sans">Apple</h1>
              <p className="text-gray-700 mb-2 text-lg md:text-2xl font-medium max-w-xl">Découvrez l'univers Apple : iPhone, AirPods, Mac, accessoires et innovations. Inspiré du style officiel Apple Store.</p>
              <a href="https://apple.com" target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-black text-white font-bold shadow-xl hover:bg-gray-900 transition-all text-xl">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.868v4.264a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                </svg>
                Site officiel
              </a>
            </div>
          </div>
          <h2 className="text-3xl font-extrabold mb-10 text-black text-center drop-shadow-lg tracking-tight animate-fade-in">Produits Apple</h2>
          <div className="flex gap-2 mb-12 flex-wrap justify-center animate-fade-in">
            {categories.map(cat => (
              <Button
                key={cat.key}
                variant={selectedCategory === cat.key ? "default" : "outline"}
                className={selectedCategory === cat.key ? "bg-black text-white shadow-xl scale-105" : "border-black text-black hover:bg-gray-100/30"}
                onClick={() => setSelectedCategory(cat.key)}
              >
                {cat.label}
              </Button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredProducts.map(product => (
              <div key={product.id} className="relative group bg-white rounded-3xl shadow-xl overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.03] border border-gray-200 animate-fade-in">
                {/* Badge catégorie minimaliste */}
                <div className="absolute top-5 left-5 z-10">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 shadow border border-gray-200">{categories.find(c => c.key === product.category)?.label}</span>
                </div>
                {/* Visuel produit grand format */}
                <img src={product.image} alt={product.name} className="w-full h-64 object-contain bg-white rounded-t-3xl transition duration-300 group-hover:scale-105" />
                <div className="p-8 text-center flex flex-col gap-4">
                  <h3 className="font-semibold text-2xl text-gray-900 group-hover:text-black transition-colors tracking-tight mb-2">{product.name}</h3>
                  <p className="text-gray-500 text-base mb-2 line-clamp-2 font-light">{product.description}</p>
                  <div className="font-bold text-2xl text-black mb-2">{product.price} د.م.</div>
                  <Button className="w-full bg-black hover:bg-gray-900 text-white font-medium py-2 rounded-xl transition-all duration-200 shadow group-hover:scale-105">
                    Ajouter au panier
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
