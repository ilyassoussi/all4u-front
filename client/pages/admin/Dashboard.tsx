import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ChartBarIcon,
  ShoppingCartIcon,
  UsersIcon,
  CurrencyDollarIcon,
  TruckIcon,
  ExclamationTriangleIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon
} from "@heroicons/react/24/outline";

// Mock data - in real app, this would come from API
const mockStats = {
  revenue: {
    total: 125680,
    change: 12.5,
    period: "ce mois"
  },
  orders: {
    total: 847,
    change: 8.2,
    period: "ce mois"
  },
  customers: {
    total: 2453,
    change: 15.7,
    period: "ce mois"
  },
  avgOrder: {
    total: 148.4,
    change: -2.1,
    period: "ce mois"
  }
};

const mockRecentOrders = [
  {
    id: "CMD-001234",
    customer: "Ahmed Bennani",
    date: "2024-01-20",
    total: 2599,
    status: "completed",
    items: ["AirPods Pro (2ème génération)"]
  },
  {
    id: "CMD-001235",
    customer: "Fatima Alaoui",
    date: "2024-01-20",
    total: 4299,
    status: "processing",
    items: ["Apple Watch Series 9", "Chargeur USB-C"]
  },
  {
    id: "CMD-001236",
    customer: "Mohammed Kadiri",
    date: "2024-01-19",
    total: 1899,
    status: "shipped",
    items: ["AirPods (3ème génération)"]
  },
  {
    id: "CMD-001237",
    customer: "Aisha Benali",
    date: "2024-01-19",
    total: 459,
    status: "pending",
    items: ["PowerBank Anker 20000mAh"]
  }
];

const mockLowStock = [
  { name: "AirPods Pro (2ème génération)", stock: 3, category: "AirPods" },
  { name: "iPhone 15 Pro 128GB", stock: 1, category: "Téléphones" },
  { name: "Apple Watch Series 9", stock: 2, category: "Watches" },
  { name: "PowerBank Anker 10000mAh", stock: 4, category: "PowerBank" }
];

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState("month");

  const formatPrice = (price: number) => `${price.toLocaleString()} د.م.`;

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: { label: "Terminée", variant: "default" as const, color: "bg-green-500" },
      processing: { label: "En cours", variant: "secondary" as const, color: "bg-blue-500" },
      shipped: { label: "Expédiée", variant: "outline" as const, color: "bg-purple-500" },
      pending: { label: "En attente", variant: "destructive" as const, color: "bg-orange-500" }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge variant={config.variant} className="flex items-center space-x-1">
        <div className={`h-2 w-2 rounded-full ${config.color}`} />
        <span>{config.label}</span>
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Admin Header */}
      <div className="bg-white border-b border-border">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Tableau de bord ALL4U
              </h1>
              <p className="text-muted-foreground">
                Gestion et supervision de la boutique électronique
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className="bg-green-100 text-green-800">
                🟢 Système opérationnel
              </Badge>
              <Button variant="outline" asChild>
                <a href="/">Voir la boutique</a>
              </Button>
              <Button variant="destructive">
                Se déconnecter
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Revenue */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chiffre d'affaires</CardTitle>
              <CurrencyDollarIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatPrice(mockStats.revenue.total)}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <ArrowUpIcon className="h-3 w-3 text-green-500 mr-1" />
                +{mockStats.revenue.change}% par rapport au mois dernier
              </div>
            </CardContent>
          </Card>

          {/* Orders */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Commandes</CardTitle>
              <ShoppingCartIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.orders.total}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <ArrowUpIcon className="h-3 w-3 text-green-500 mr-1" />
                +{mockStats.orders.change}% {mockStats.orders.period}
              </div>
            </CardContent>
          </Card>

          {/* Customers */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clients</CardTitle>
              <UsersIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.customers.total}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <ArrowUpIcon className="h-3 w-3 text-green-500 mr-1" />
                +{mockStats.customers.change}% {mockStats.customers.period}
              </div>
            </CardContent>
          </Card>

          {/* Average Order */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Panier moyen</CardTitle>
              <ChartBarIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatPrice(mockStats.avgOrder.total)}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <ArrowDownIcon className="h-3 w-3 text-red-500 mr-1" />
                {mockStats.avgOrder.change}% {mockStats.avgOrder.period}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Commandes récentes</CardTitle>
                <Button variant="outline" size="sm" asChild>
                  <a href="/admin/orders">Voir toutes</a>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRecentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div>
                          <p className="font-medium text-foreground">{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.customer}</p>
                        </div>
                        {getStatusBadge(order.status)}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {order.items.join(", ")}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{formatPrice(order.total)}</p>
                      <p className="text-xs text-muted-foreground">{order.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions & Alerts */}
          <div className="space-y-6">
            {/* Low Stock Alert */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ExclamationTriangleIcon className="h-5 w-5 text-orange-500" />
                  <span>Stock faible</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockLowStock.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-muted-foreground">{item.category}</p>
                      </div>
                      <Badge variant="destructive">
                        {item.stock} restants
                      </Badge>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4" variant="outline" size="sm" asChild>
                  <a href="/admin/inventory">Gérer le stock</a>
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline" asChild>
                  <a href="/admin/products/new">
                    + Ajouter un produit
                  </a>
                </Button>
                <Button className="w-full" variant="outline" asChild>
                  <a href="/admin/orders">
                    <ShoppingCartIcon className="mr-2 h-4 w-4" />
                    Gérer les commandes
                  </a>
                </Button>
                <Button className="w-full" variant="outline" asChild>
                  <a href="/admin/customers">
                    <UsersIcon className="mr-2 h-4 w-4" />
                    Gérer les clients
                  </a>
                </Button>
                <Button className="w-full" variant="outline" asChild>
                  <a href="/admin/promotions">
                    🎯 Créer une promotion
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Management Tabs */}
        <div className="mt-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
              <TabsTrigger value="products">Produits</TabsTrigger>
              <TabsTrigger value="orders">Commandes</TabsTrigger>
              <TabsTrigger value="customers">Clients</TabsTrigger>
              <TabsTrigger value="settings">Paramètres</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Ventes du jour</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {formatPrice(12450)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      23 commandes aujourd'hui
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Taux de conversion</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      3.2%
                    </div>
                    <p className="text-sm text-muted-foreground">
                      +0.5% vs mois dernier
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Produits vendus</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      847
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Ce mois-ci
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="products" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Gestion des produits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Interface de gestion des produits</p>
                    <p className="text-sm mt-2">
                      Fonctionnalités: CRUD produits, gestion des variantes, 
                      prix, stocks, SEO, images
                    </p>
                    <Button className="mt-4" asChild>
                      <a href="/admin/products">Accéder à la gestion produits</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="orders" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Gestion des commandes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Interface de gestion des commandes</p>
                    <p className="text-sm mt-2">
                      Fonctionnalités: Statuts, expédition, factures, 
                      remboursements, suivi client
                    </p>
                    <Button className="mt-4" asChild>
                      <a href="/admin/orders">Accéder à la gestion commandes</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="customers" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Gestion des clients</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Interface de gestion des clients</p>
                    <p className="text-sm mt-2">
                      Fonctionnalités: Profils clients, historique, 
                      segmentation, export CSV
                    </p>
                    <Button className="mt-4" asChild>
                      <a href="/admin/customers">Accéder à la gestion clients</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Paramètres boutique</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Configuration générale</p>
                    <p className="text-sm mt-2">
                      Fonctionnalités: Devises, TVA, e-mails, 
                      paiements, expédition, SEO
                    </p>
                    <Button className="mt-4" asChild>
                      <a href="/admin/settings">Accéder aux paramètres</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
