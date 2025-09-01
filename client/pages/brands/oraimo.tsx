import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const products = [
  {
    id: 1,
    name: "Oraimo PowerBank 20000mAh",
    description: "Grande capacité, charge rapide, design compact.",
    image: "https://cdn.oraimo.com/powerbank.jpg",
    price: 399,
    category: "powerbank"
  },
  {
    id: 2,
    name: "Oraimo FreePods 3",
    description: "Écouteurs sans fil, réduction de bruit, autonomie longue durée.",
    image: "https://cdn.oraimo.com/freepods3.jpg",
    price: 299,
    category: "earbuds"
  },
  {
    id: 3,
    name: "Oraimo Smart Watch OSW-16",
    description: "Montre connectée, suivi santé, écran HD.",
    image: "https://cdn.oraimo.com/osw16.jpg",
    price: 499,
    category: "watch"
  },
  {
    id: 4,
    name: "Oraimo Chargeur Rapide 18W",
    description: "Chargeur mural, USB-C, sécurité avancée.",
    image: "https://cdn.oraimo.com/charger.jpg",
    price: 149,
    category: "charger"
  }
];

const categories = [
  { key: "all", label: "Tous" },
  { key: "powerbank", label: "PowerBanks" },
  { key: "earbuds", label: "Écouteurs" },
  { key: "watch", label: "Montres" },
  { key: "charger", label: "Chargeurs" }
];

export default function OraimoBrand() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <Layout>
      <section className="py-16 min-h-screen bg-gradient-to-br from-[#0f172a] via-[#00c896] to-[#00bfae] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-14 rounded-3xl bg-gradient-to-r from-[#00c896] via-[#00bfae] to-[#0f172a] shadow-2xl border border-green-900/30 flex flex-col md:flex-row items-center gap-10 p-8 md:p-16 animate-fade-in">
            <div className="flex-shrink-0 flex flex-col items-center justify-center">
              <img src="https://cdn.oraimo.com/logo.png" alt="Oraimo Logo" className="h-20 w-auto mb-4 drop-shadow-2xl bg-white/70 rounded-2xl p-2" />
              <span className="px-4 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-[#00c896] to-[#00bfae] text-white shadow-lg border border-green-300/40 animate-bounce">Official Brand</span>
            </div>
            <div className="flex-1 text-center md:text-left flex flex-col items-center md:items-start gap-3">
              <h1 className="text-5xl md:text-6xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#00c896] via-[#00bfae] to-[#0f172a] tracking-tight drop-shadow-lg font-sans">Oraimo</h1>
              <p className="text-green-100 mb-2 text-lg md:text-xl font-medium max-w-lg">Accessoires innovants, énergie, lifestyle, inspiré du site officiel Oraimo.</p>
              <a href="https://oraimo.com" target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00c896] to-[#00bfae] text-white font-bold shadow-xl hover:scale-105 transition-all text-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.868v4.264a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                </svg>
                Site officiel
              </a>
            </div>
          </div>
          <h2 className="text-3xl font-extrabold mb-10 text-[#00c896] text-center drop-shadow-lg tracking-tight animate-fade-in">Produits Oraimo</h2>
          <div className="flex gap-2 mb-10 flex-wrap justify-center animate-fade-in">
            {categories.map((cat) => (
              <Button
                key={cat.key}
                variant={selectedCategory === cat.key ? "default" : "outline"}
                className={selectedCategory === cat.key ? "bg-gradient-to-r from-[#00c896] to-[#00bfae] text-white shadow-xl scale-105" : "border-[#00c896] text-[#00c896] hover:bg-green-100/30"}
                onClick={() => setSelectedCategory(cat.key)}
              >
                {cat.label}
              </Button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredProducts.map((product) => (
              <a key={product.id} href={`/brands/oraimo/${product.id}`} className="relative group bg-gradient-to-br from-[#0f172a] via-[#00c896] to-[#00bfae] rounded-3xl shadow-2xl overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.04] border border-green-900/30 animate-fade-in block">
                {/* Badge catégorie */}
                <div className="absolute top-5 left-5 z-10">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#00c896] text-white shadow border border-green-300/40">{categories.find((c) => c.key === product.category)?.label}</span>
                </div>
                {/* Visuel immersif */}
                <img src={product.image} alt={product.name} className="w-full h-64 object-contain bg-white rounded-t-3xl transition duration-300 group-hover:scale-105 group-hover:brightness-110" />
                <div className="p-8 text-center flex flex-col gap-4">
                  <h3 className="font-extrabold text-2xl text-[#00c896] group-hover:text-[#00bfae] transition-colors drop-shadow-lg tracking-tight mb-2">{product.name}</h3>
                  <p className="text-green-100 text-base mb-2 line-clamp-2 font-medium">{product.description}</p>
                  <div className="font-extrabold text-2xl text-white mb-2 drop-shadow">{product.price} د.م.</div>
                  <Button className="w-full bg-gradient-to-r from-[#00c896] to-[#00bfae] hover:from-[#00bfae] hover:to-[#00c896] text-white font-bold py-2 rounded-xl transition-all duration-200 shadow-xl flex items-center justify-center gap-2 group-hover:scale-105">
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
