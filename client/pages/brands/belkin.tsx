import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const products = [
  {
    id: 1,
    name: "Belkin Chargeur Sans Fil",
    image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop",
    price: 299,
    description: "Chargeur sans fil rapide Belkin."
  },
  {
    id: 2,
    name: "Belkin Câble USB-C",
    image: "https://images.unsplash.com/photo-1609592518760-b3aa87b1ea54?w=400&h=400&fit=crop",
    price: 99,
    description: "Câble USB-C haute qualité."
  },
  {
    id: 3,
    name: "Belkin Support Téléphone",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
    price: 149,
    description: "Support de téléphone Belkin."
  }
];

export default function BelkinBrand() {
  return (
    <Layout>
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto p-8 text-center mb-8">
            <img src="/placeholder.svg" alt="Belkin" className="mx-auto mb-6 h-20" />
            <h1 className="text-3xl font-bold mb-2 text-brand-600">Belkin</h1>
            <p className="text-muted-foreground mb-4">Accessoires et protections Belkin</p>
            <a href="https://belkin.com" target="_blank" rel="noopener" className="text-brand-500 underline">Site officiel</a>
          </Card>
          <h2 className="text-2xl font-bold mb-6 text-brand-700">Produits Belkin</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4 text-center">
                  <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded mb-4" />
                  <h3 className="font-semibold text-lg mb-2 text-brand-600">{product.name}</h3>
                  <p className="text-muted-foreground text-sm mb-2">{product.description}</p>
                  <div className="font-bold text-brand-900 mb-2">{product.price} د.م.</div>
                  <Button className="w-full bg-brand-500 hover:bg-brand-600 text-white">Ajouter au panier</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
