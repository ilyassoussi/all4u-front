import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const products = [
  {
    id: 1,
    name: "Huawei P60 Pro",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
    price: 8999,
    description: "Smartphone haut de gamme Huawei."
  },
  {
    id: 2,
    name: "Huawei FreeBuds 5",
    image: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=400&h=400&fit=crop",
    price: 1299,
    description: "Écouteurs sans fil Huawei."
  },
  {
    id: 3,
    name: "Huawei Watch GT 4",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    price: 1999,
    description: "Montre connectée Huawei."
  }
];

export default function HuaweiBrand() {
  return (
    <Layout>
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto p-8 text-center mb-8">
            <img src="/placeholder.svg" alt="Huawei" className="mx-auto mb-6 h-20" />
            <h1 className="text-3xl font-bold mb-2 text-brand-600">Huawei</h1>
            <p className="text-muted-foreground mb-4">Smartphones et accessoires Huawei</p>
            <a href="https://huawei.com" target="_blank" rel="noopener" className="text-brand-500 underline">Site officiel</a>
          </Card>
          <h2 className="text-2xl font-bold mb-6 text-brand-700">Produits Huawei</h2>
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
