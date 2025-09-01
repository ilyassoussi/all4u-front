import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const products = [
  {
    id: 1,
    name: "Soundcore Liberty 4",
    image: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=400&h=400&fit=crop",
    price: 899,
    description: "Écouteurs sans fil Soundcore."
  },
  {
    id: 2,
    name: "Soundcore Motion+",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
    price: 1199,
    description: "Enceinte Bluetooth portable."
  },
  {
    id: 3,
    name: "Soundcore Life Q30",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    price: 699,
    description: "Casque sans fil à réduction de bruit."
  }
];

export default function SoundcoreBrand() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const categories = [
    { key: "all", label: "Tous" },
    { key: "earbuds", label: "Écouteurs" },
    { key: "speakers", label: "Enceintes" },
    { key: "headphones", label: "Casques" }
  ];
  const productsWithCategory = products.map(p => {
    if (p.name.toLowerCase().includes("liberty") || p.name.toLowerCase().includes("life")) return { ...p, category: "earbuds" };
    if (p.name.toLowerCase().includes("motion")) return { ...p, category: "speakers" };
    if (p.name.toLowerCase().includes("q30")) return { ...p, category: "headphones" };
    return { ...p, category: "earbuds" };
  });
  const filteredProducts = selectedCategory === "all"
    ? productsWithCategory
    : productsWithCategory.filter(p => p.category === selectedCategory);

  return (
    <Layout>
      <section className="py-16 min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#312e81] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-14 rounded-3xl bg-gradient-to-r from-[#1e293b] via-[#312e81] to-[#0ea5e9] shadow-2xl border border-blue-900/30 flex flex-col md:flex-row items-center gap-10 p-8 md:p-16 animate-fade-in">
            <div className="flex-shrink-0 flex flex-col items-center justify-center">
              <img src="https://cdn.soundcore.com/media/logo/soundcore_logo.svg" alt="Soundcore Logo" className="h-20 w-auto mb-4 drop-shadow-2xl bg-white/70 rounded-2xl p-2" />
              <span className="px-4 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-[#0ea5e9] to-[#312e81] text-white shadow-lg border border-blue-300/40 animate-bounce">Official Brand</span>
            </div>
            <div className="flex-1 text-center md:text-left flex flex-col items-center md:items-start gap-3">
              <h1 className="text-5xl md:text-6xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#0ea5e9] via-[#312e81] to-[#0ea5e9] tracking-tight drop-shadow-lg font-sans">Soundcore</h1>
              <p className="text-blue-100 mb-2 text-lg md:text-xl font-medium max-w-lg">Audio immersif, technologie avancée, énergie et design inspirés du site officiel Soundcore.</p>
              <a href="https://soundcore.com" target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#0ea5e9] to-[#312e81] text-white font-bold shadow-xl hover:scale-105 transition-all text-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.868v4.264a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                </svg>
                Site officiel
              </a>
            </div>
          </div>
          <h2 className="text-3xl font-extrabold mb-10 text-[#0ea5e9] text-center drop-shadow-lg tracking-tight animate-fade-in">Produits Soundcore</h2>
          <div className="flex gap-2 mb-10 flex-wrap justify-center animate-fade-in">
            {categories.map(cat => (
              <Button
                key={cat.key}
                variant={selectedCategory === cat.key ? "default" : "outline"}
                className={selectedCategory === cat.key ? "bg-gradient-to-r from-[#0ea5e9] to-[#312e81] text-white shadow-xl scale-105" : "border-[#0ea5e9] text-[#0ea5e9] hover:bg-blue-100/30"}
                onClick={() => setSelectedCategory(cat.key)}
              >
                {cat.label}
              </Button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredProducts.map(product => (
              <a key={product.id} href={`/brands/soundcore/${product.id}`} className="relative group bg-gradient-to-br from-[#1e293b] via-[#312e81] to-[#0ea5e9] rounded-3xl shadow-2xl overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.04] border border-blue-900/30 animate-fade-in block">
                {/* Badge innovant */}
                <div className="absolute top-5 left-5 z-10">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#0ea5e9] text-white shadow border border-blue-300/40">{categories.find(c => c.key === product.category)?.label}</span>
                </div>
                {/* Visuel immersif */}
                <img src={product.image} alt={product.name} className="w-full h-64 object-contain bg-black/30 rounded-t-3xl transition duration-300 group-hover:scale-105 group-hover:brightness-110" />
                <div className="p-8 text-center flex flex-col gap-4">
                  <h3 className="font-extrabold text-2xl text-[#0ea5e9] group-hover:text-white transition-colors drop-shadow-lg tracking-tight mb-2">{product.name}</h3>
                  <p className="text-blue-100 text-base mb-2 line-clamp-2 font-medium">{product.description}</p>
                  <div className="font-extrabold text-2xl text-white mb-2 drop-shadow">{product.price} د.م.</div>
                  <Button className="w-full bg-gradient-to-r from-[#0ea5e9] to-[#312e81] hover:from-[#312e81] hover:to-[#0ea5e9] text-white font-bold py-2 rounded-xl transition-all duration-200 shadow-xl flex items-center justify-center gap-2 group-hover:scale-105">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l1.4-7H6.4M7 13l-1.4 7h12.8M7 13l-4-8h18" />
                    </svg>
                    Ajouter au panier
                  </Button>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
