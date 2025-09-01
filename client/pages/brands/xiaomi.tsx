import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const products = [
  {
    id: 1,
    name: "Xiaomi 13 Pro",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
    price: 7999,
    description: "Smartphone Xiaomi haut de gamme.",
    category: "telephones"
  },
  {
    id: 2,
    name: "Xiaomi Buds 4",
    image: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=400&h=400&fit=crop",
    price: 899,
    description: "Écouteurs sans fil Xiaomi.",
    category: "airpods"
  },
  {
    id: 3,
    name: "Xiaomi Watch S1",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    price: 1499,
    description: "Montre connectée Xiaomi.",
    category: "watch"
  },
  {
    id: 4,
    name: "Xiaomi PowerBank 20000mAh",
    image: "https://images.unsplash.com/photo-1609592518760-b3aa87b1ea54?w=400&h=400&fit=crop",
    price: 399,
    description: "Batterie externe Xiaomi.",
    category: "powerbanks"
  }
];

export default function XiaomiBrand() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const categories = [
    { key: "all", label: "Tous" },
    { key: "telephones", label: "Téléphones" },
    { key: "airpods", label: "Buds" },
    { key: "watch", label: "Watch" },
    { key: "powerbanks", label: "PowerBanks" }
  ];
  const filteredProducts = selectedCategory === "all"
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <Layout>
      <section className="py-16 min-h-screen bg-gradient-to-br from-orange-100 via-orange-300 to-orange-200 text-orange-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-14 rounded-3xl bg-white/90 backdrop-blur-xl shadow-2xl border border-orange-200/40 flex flex-col md:flex-row items-center gap-10 p-8 md:p-16 animate-fade-in">
            {/* Logo Xiaomi sur fond blanc, style officiel */}
            <div className="flex-shrink-0 flex flex-col items-center justify-center">
              <div className="bg-white rounded-2xl shadow-lg p-4 flex items-center justify-center">
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/29/Xiaomi_logo.svg" alt="Xiaomi Logo" className="h-20 w-auto" />
              </div>
              <span className="mt-4 px-4 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-orange-400 to-orange-600 text-white shadow-lg border border-orange-300/40 animate-bounce">Official Brand</span>
            </div>
            {/* Texte et bouton inspirés du site Xiaomi */}
            <div className="flex-1 text-center md:text-left flex flex-col items-center md:items-start gap-4">
              <h1 className="text-5xl md:text-7xl font-extrabold mb-2 text-orange-600 tracking-tight drop-shadow-lg font-sans">Xiaomi</h1>
              <p className="text-orange-700 mb-2 text-lg md:text-2xl font-medium max-w-xl">Découvrez l'univers Xiaomi : smartphones, montres, écouteurs, accessoires et innovations. Inspiré du style officiel Xiaomi Store.</p>
              <a href="https://mi.com" target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-orange-600 text-white font-bold shadow-xl hover:bg-orange-700 transition-all text-xl">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.868v4.264a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                </svg>
                Site officiel
              </a>
            </div>
          </div>
          <h2 className="text-3xl font-extrabold mb-10 text-orange-600 text-center drop-shadow-lg tracking-tight animate-fade-in">Produits Xiaomi</h2>
          <div className="flex gap-2 mb-12 flex-wrap justify-center animate-fade-in">
            {categories.map(cat => (
              <Button
                key={cat.key}
                variant={selectedCategory === cat.key ? "default" : "outline"}
                className={selectedCategory === cat.key ? "bg-orange-600 text-white shadow-xl scale-105" : "border-orange-600 text-orange-600 hover:bg-orange-100/30"}
                onClick={() => setSelectedCategory(cat.key)}
              >
                {cat.label}
              </Button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProducts.map(product => (
              <div key={product.id} className="relative group bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.04] border border-orange-300/20 animate-fade-in">
                <div className="absolute top-4 left-4 z-10 animate-bounce">
                  <span className="px-4 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-orange-400 to-orange-600 text-white shadow-lg border border-orange-300/40">{categories.find(c => c.key === product.category)?.label}</span>
                </div>
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-t-3xl group-hover:brightness-110 transition duration-300 shadow-lg" />
                <div className="p-6 text-center flex flex-col gap-3">
                  <h3 className="font-extrabold text-xl text-orange-600 group-hover:text-orange-700 transition-colors drop-shadow-lg tracking-tight">{product.name}</h3>
                  <p className="text-orange-700 text-base mb-2 line-clamp-2 font-medium">{product.description}</p>
                  <div className="font-extrabold text-2xl text-orange-600 mb-2 drop-shadow">{product.price} د.م.</div>
                  <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 rounded-xl transition-all duration-200 shadow-xl flex items-center justify-center gap-2 group-hover:scale-105">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l1.4-7H6.4M7 13l-1.4 7h12.8M7 13l-4-8h18" />
                    </svg>
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
