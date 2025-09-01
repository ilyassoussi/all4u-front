import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const products = [
  {
    id: 1,
    name: "Anker PowerCore 20000",
    image: "https://images.unsplash.com/photo-1609592518760-b3aa87b1ea54?w=400&h=400&fit=crop",
    price: 499,
    description: "PowerBank haute capacité Anker."
  },
  {
    id: 2,
    name: "Anker Soundcore Life P2",
    image: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=400&h=400&fit=crop",
    price: 399,
    description: "Écouteurs sans fil Anker."
  },
  {
    id: 3,
    name: "Anker Chargeur USB-C",
    image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop",
    price: 199,
    description: "Chargeur rapide USB-C Anker."
  }
];

export default function AnkerBrand() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const categories = [
    { key: "all", label: "Tous" },
    { key: "powerbank", label: "PowerBanks" },
    { key: "earbuds", label: "Écouteurs" },
    { key: "charger", label: "Chargeurs" }
  ];
  const productsWithCategory = products.map(p => {
    if (p.name.toLowerCase().includes("powercore")) return { ...p, category: "powerbank" };
    if (p.name.toLowerCase().includes("soundcore") || p.name.toLowerCase().includes("life")) return { ...p, category: "earbuds" };
    if (p.name.toLowerCase().includes("chargeur")) return { ...p, category: "charger" };
    return { ...p, category: "powerbank" };
  });
  const filteredProducts = selectedCategory === "all"
    ? productsWithCategory
    : productsWithCategory.filter(p => p.category === selectedCategory);

  return (
    <Layout>
      <section className="py-16 min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#2563eb] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-14 rounded-3xl bg-gradient-to-r from-[#1e293b] via-[#2563eb] to-[#0ea5e9] shadow-2xl border border-blue-900/30 flex flex-col md:flex-row items-center gap-10 p-8 md:p-16 animate-fade-in">
            <div className="flex-shrink-0 flex flex-col items-center justify-center">
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Anker_logo.svg" alt="Anker Logo" className="h-20 w-auto mb-4 drop-shadow-2xl bg-white/70 rounded-2xl p-2" />
              <span className="px-4 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-[#2563eb] to-[#0ea5e9] text-white shadow-lg border border-blue-300/40 animate-bounce">Official Brand</span>
            </div>
            <div className="flex-1 text-center md:text-left flex flex-col items-center md:items-start gap-3">
              <h1 className="text-5xl md:text-6xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#2563eb] via-[#0ea5e9] to-[#2563eb] tracking-tight drop-shadow-lg font-sans">Anker</h1>
              <p className="text-blue-100 mb-2 text-lg md:text-xl font-medium max-w-lg">Technologie, énergie, accessoires premium, inspiré du site officiel Anker.</p>
              <a href="https://anker.com" target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#2563eb] to-[#0ea5e9] text-white font-bold shadow-xl hover:scale-105 transition-all text-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.868v4.264a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                </svg>
                Site officiel
              </a>
            </div>
          </div>
          <h2 className="text-3xl font-extrabold mb-10 text-[#2563eb] text-center drop-shadow-lg tracking-tight animate-fade-in">Produits Anker</h2>
          <div className="flex gap-2 mb-10 flex-wrap justify-center animate-fade-in">
            {categories.map(cat => (
              <Button
                key={cat.key}
                variant={selectedCategory === cat.key ? "default" : "outline"}
                className={selectedCategory === cat.key ? "bg-gradient-to-r from-[#2563eb] to-[#0ea5e9] text-white shadow-xl scale-105" : "border-[#2563eb] text-[#2563eb] hover:bg-blue-100/30"}
                onClick={() => setSelectedCategory(cat.key)}
              >
                {cat.label}
              </Button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredProducts.map(product => (
              <a key={product.id} href={`/brands/anker/${product.id}`} className="relative group bg-gradient-to-br from-[#1e293b] via-[#2563eb] to-[#0ea5e9] rounded-3xl shadow-2xl overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.04] border border-blue-900/30 animate-fade-in block">
                {/* Badge catégorie tech */}
                <div className="absolute top-5 left-5 z-10">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#2563eb] text-white shadow border border-blue-300/40">{categories.find(c => c.key === product.category)?.label}</span>
                </div>
                {/* Visuel immersif */}
                <img src={product.image} alt={product.name} className="w-full h-64 object-contain bg-white rounded-t-3xl transition duration-300 group-hover:scale-105 group-hover:brightness-110" />
                <div className="p-8 text-center flex flex-col gap-4">
                  <h3 className="font-extrabold text-2xl text-[#2563eb] group-hover:text-[#0ea5e9] transition-colors drop-shadow-lg tracking-tight mb-2">{product.name}</h3>
                  <p className="text-blue-100 text-base mb-2 line-clamp-2 font-medium">{product.description}</p>
                  <div className="font-extrabold text-2xl text-white mb-2 drop-shadow">{product.price} د.م.</div>
                  <Button className="w-full bg-gradient-to-r from-[#2563eb] to-[#0ea5e9] hover:from-[#0ea5e9] hover:to-[#2563eb] text-white font-bold py-2 rounded-xl transition-all duration-200 shadow-xl flex items-center justify-center gap-2 group-hover:scale-105">
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
