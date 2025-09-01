import React from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

// Mock data for demonstration
const products = [
  {
    id: 1,
    name: "Oraimo PowerBank 20000mAh",
    description: "Grande capacité, charge rapide, design compact.",
    image: "https://cdn.oraimo.com/powerbank.jpg",
    price: 399,
    category: "powerbank",
    features: [
      "Capacité 20000mAh",
      "Charge rapide 18W",
      "Design compact et léger",
      "Protection contre la surcharge"
    ]
  },
  {
    id: 2,
    name: "Oraimo FreePods 3",
    description: "Écouteurs sans fil, réduction de bruit, autonomie longue durée.",
    image: "https://cdn.oraimo.com/freepods3.jpg",
    price: 299,
    category: "earbuds",
    features: [
      "Bluetooth 5.2",
      "Réduction de bruit",
      "Autonomie 8h + boîtier",
      "Résistant à l'eau IPX5"
    ]
  },
  {
    id: 3,
    name: "Oraimo Smart Watch OSW-16",
    description: "Montre connectée, suivi santé, écran HD.",
    image: "https://cdn.oraimo.com/osw16.jpg",
    price: 499,
    category: "watch",
    features: [
      "Écran HD 1.69''",
      "Suivi santé et sport",
      "Notifications intelligentes",
      "Autonomie 7 jours"
    ]
  },
  {
    id: 4,
    name: "Oraimo Chargeur Rapide 18W",
    description: "Chargeur mural, USB-C, sécurité avancée.",
    image: "https://cdn.oraimo.com/charger.jpg",
    price: 149,
    category: "charger",
    features: [
      "Charge rapide 18W",
      "USB-C & USB-A",
      "Protection multiple",
      "Design compact"
    ]
  }
];

export async function getStaticPaths() {
  return {
    paths: products.map((p) => ({ params: { id: p.id.toString() } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const product = products.find((p) => p.id.toString() === params.id);
  return { props: { product } };
}

export default function OraimoProductDetail({ product }) {
  if (!product) return <Layout>Produit introuvable.</Layout>;
  return (
    <Layout>
      <section className="py-16 min-h-screen bg-gradient-to-br from-[#0f172a] via-[#00c896] to-[#00bfae] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto rounded-3xl bg-gradient-to-r from-[#00c896] via-[#00bfae] to-[#0f172a] shadow-2xl border border-green-900/30 p-10 animate-fade-in">
            <div className="flex flex-col items-center gap-6">
              <img src={product.image} alt={product.name} className="h-56 w-auto rounded-2xl bg-white/80 shadow-xl mb-4" />
              <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00c896] via-[#00bfae] to-[#0f172a] mb-2 tracking-tight drop-shadow-lg">{product.name}</h1>
              <div className="text-green-100 text-lg font-medium mb-4 text-center">{product.description}</div>
              <div className="font-extrabold text-3xl text-white mb-4 drop-shadow">{product.price} د.م.</div>
              <ul className="bg-white/10 rounded-xl p-6 mb-6 w-full text-left shadow-lg">
                <h2 className="text-xl font-bold text-[#00c896] mb-3">Caractéristiques :</h2>
                {product.features.map((feature, idx) => (
                  <li key={idx} className="mb-2 text-green-100 flex items-center gap-2">
                    <span className="inline-block w-2 h-2 bg-[#00c896] rounded-full"></span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-gradient-to-r from-[#00c896] to-[#00bfae] hover:from-[#00bfae] hover:to-[#00c896] text-white font-bold py-3 rounded-xl transition-all duration-200 shadow-xl text-lg flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l1.4-7H6.4M7 13l-1.4 7h12.8M7 13l-4-8h18" />
                </svg>
                Ajouter au panier
              </Button>
              <a href="https://oraimo.com" target="_blank" rel="noopener" className="mt-6 text-[#00c896] underline font-bold text-lg">Voir sur le site officiel Oraimo</a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
