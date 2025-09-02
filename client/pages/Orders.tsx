import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ShoppingBagIcon,
  TruckIcon,
  CheckCircleIcon,
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
  CreditCardIcon,
  EyeIcon,
  ArrowPathIcon
} from "@heroicons/react/24/outline";

// Mock data - en production, cela viendrait d'une API
const mockOrders = [
  {
    id: "CMD-123456",
    date: "2024-01-20",
    status: "delivered",
    total: 2599,
    paymentMethod: "card",
    deliveryAddress: "123 Rue Mohammed V, Khemisset",
    items: [
      {
        id: 1,
        name: "AirPods Pro (2ème génération)",
        price: 2599,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=400&h=400&fit=crop"
      }
    ],
    tracking: {
      steps: [
        { date: "2024-01-20 10:30", status: "Commande confirmée", completed: true },
        { date: "2024-01-20 14:00", status: "En préparation", completed: true },
        { date: "2024-01-21 09:15", status: "Expédiée", completed: true },
        { date: "2024-01-21 16:45", status: "Livrée", completed: true }
      ]
    }
  },
  {
    id: "CMD-123457",
    date: "2024-01-22",
    status: "in_transit",
    total: 1299,
    paymentMethod: "cod",
    deliveryAddress: "456 Avenue Hassan II, Khemisset",
    items: [
      {
        id: 4,
        name: "Apple Watch Series 9",
        price: 1299,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop"
      }
    ],
    tracking: {
      steps: [
        { date: "2024-01-22 11:00", status: "Commande confirmée", completed: true },
        { date: "2024-01-22 15:30", status: "En préparation", completed: true },
        { date: "2024-01-23 08:00", status: "Expédiée", completed: true },
        { date: "", status: "En cours de livraison", completed: false }
      ]
    }
  },
  {
    id: "CMD-123458",
    date: "2024-01-23",
    status: "processing",
    total: 899,
    paymentMethod: "card",
    deliveryAddress: "789 Rue Al Massira, Khemisset",
    items: [
      {
        id: 5,
        name: "PowerBank Anker 20000mAh",
        price: 459,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1609592518760-b3aa87b1ea54?w=400&h=400&fit=crop"
      },
      {
        id: 6,
        name: "Enceinte Bluetooth JBL",
        price: 440,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop"
      }
    ],
    tracking: {
      steps: [
        { date: "2024-01-23 13:20", status: "Commande confirmée", completed: true },
        { date: "", status: "En préparation", completed: false },
        { date: "", status: "Expédiée", completed: false },
        { date: "", status: "Livrée", completed: false }
      ]
    }
  }
];

export default function Orders() {
  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} د.م.`;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return <Badge className="bg-green-100 text-green-800 border-0">✅ Livrée</Badge>;
      case "in_transit":
        return <Badge className="bg-blue-100 text-blue-800 border-0">🚚 En transit</Badge>;
      case "processing":
        return <Badge className="bg-yellow-100 text-yellow-800 border-0">⏳ En préparation</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800 border-0">❌ Annulée</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircleIcon className="h-5 w-5 text-green-600" />;
      case "in_transit":
        return <TruckIcon className="h-5 w-5 text-blue-600" />;
      case "processing":
        return <ClockIcon className="h-5 w-5 text-yellow-600" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-400" />;
    }
  };

  if (mockOrders.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <Card>
              <CardHeader>
                <div className="mx-auto mb-4 bg-muted p-6 rounded-full w-fit">
                  <ShoppingBagIcon className="h-16 w-16 text-muted-foreground" />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground">
                  Aucune commande trouvée
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">
                  Vous n'avez pas encore passé de commande. Découvrez nos produits et commencez vos achats !
                </p>
                <Button asChild>
                  <a href="/">
                    <ShoppingBagIcon className="mr-2 h-4 w-4" />
                    Découvrir nos produits
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-muted/30 py-4">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-muted-foreground">
            <a href="/" className="hover:text-brand-600">Accueil</a> 
            <span className="mx-2">/</span>
            <span className="text-foreground font-medium">Mes Commandes</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            📦 Mes Commandes
          </h1>
          <p className="text-muted-foreground">
            Suivez l'état de vos commandes et consultez votre historique d'achats
          </p>
        </div>

        <div className="space-y-6">
          {mockOrders.map((order) => (
            <Card key={order.id} className="overflow-hidden">
              <CardHeader className="bg-muted/30">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                  <div>
                    <CardTitle className="text-lg font-semibold">
                      Commande #{order.id}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Passée le {formatDate(order.date)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    {getStatusBadge(order.status)}
                    <Button variant="outline" size="sm">
                      <EyeIcon className="h-4 w-4 mr-2" />
                      Détails
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Produits commandés */}
                  <div className="lg:col-span-2">
                    <h3 className="font-medium mb-4 flex items-center">
                      <ShoppingBagIcon className="h-4 w-4 mr-2" />
                      Produits ({order.items.length})
                    </h3>
                    <div className="space-y-3">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex space-x-3 p-3 bg-muted/20 rounded-lg">
                          <img 
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{item.name}</h4>
                            <div className="flex items-center justify-between mt-1">
                              <p className="text-sm text-muted-foreground">
                                Quantité: {item.quantity}
                              </p>
                              <p className="font-semibold">{formatPrice(item.price)}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Separator className="my-4" />

                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>{formatPrice(order.total)}</span>
                    </div>
                  </div>

                  {/* Informations commande */}
                  <div className="space-y-4">
                    {/* Suivi */}
                    <div>
                      <h3 className="font-medium mb-3 flex items-center">
                        <TruckIcon className="h-4 w-4 mr-2" />
                        Suivi de commande
                      </h3>
                      <div className="space-y-3">
                        {order.tracking.steps.map((step, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                              step.completed 
                                ? 'bg-brand-500 border-brand-500' 
                                : 'border-gray-300 bg-white'
                            }`}>
                              {step.completed && (
                                <CheckCircleIcon className="h-3 w-3 text-white" />
                              )}
                            </div>
                            <div className="flex-1">
                              <p className={`text-sm font-medium ${
                                step.completed ? 'text-brand-600' : 'text-muted-foreground'
                              }`}>
                                {step.status}
                              </p>
                              {step.date && (
                                <p className="text-xs text-muted-foreground">
                                  {formatDate(step.date)}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Livraison */}
                    <div>
                      <h3 className="font-medium mb-2 flex items-center">
                        <MapPinIcon className="h-4 w-4 mr-2" />
                        Livraison
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {order.deliveryAddress}
                      </p>
                    </div>

                    {/* Paiement */}
                    <div>
                      <h3 className="font-medium mb-2 flex items-center">
                        <CreditCardIcon className="h-4 w-4 mr-2" />
                        Paiement
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {order.paymentMethod === 'card' ? 'Carte bancaire' : 'Paiement à la livraison'}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="space-y-2 pt-4">
                      {order.status === 'delivered' && (
                        <Button variant="outline" size="sm" className="w-full">
                          <ArrowPathIcon className="h-4 w-4 mr-2" />
                          Recommander
                        </Button>
                      )}
                      {(order.status === 'processing' || order.status === 'in_transit') && (
                        <Button variant="outline" size="sm" className="w-full">
                          <PhoneIcon className="h-4 w-4 mr-2" />
                          Contacter le support
                        </Button>
                      )}
                      <Button variant="outline" size="sm" className="w-full">
                        Télécharger la facture
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">Précédent</Button>
            <Button variant="default" size="sm">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">3</Button>
            <Button variant="outline" size="sm">Suivant</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
