import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
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
  XCircleIcon,
  PlusIcon
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

  const headerActions = (
    <>
      <Badge className="bg-green-100 text-green-800 border-0">
        🟢 Système opérationnel
      </Badge>
      <Button size="sm" asChild>
        <a href="/admin/products">
          <PlusIcon className="mr-2 h-4 w-4" />
          Ajouter produit
        </a>
      </Button>
    </>
  );

  return (
    <AdminLayout 
      title="Tableau de bord" 
      subtitle="Vue d'ensemble de votre boutique électronique"
      actions={headerActions}
    >
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Revenue */}
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-900">Chiffre d'affaires</CardTitle>
            <div className="p-2 bg-blue-500 rounded-lg">
              <CurrencyDollarIcon className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{formatPrice(mockStats.revenue.total)}</div>
            <div className="flex items-center text-xs text-blue-700 mt-1">
              <ArrowUpIcon className="h-3 w-3 text-green-500 mr-1" />
              +{mockStats.revenue.change}% par rapport au mois dernier
            </div>
          </CardContent>
        </Card>

        {/* Orders */}
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-900">Commandes</CardTitle>
            <div className="p-2 bg-green-500 rounded-lg">
              <ShoppingCartIcon className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{mockStats.orders.total}</div>
            <div className="flex items-center text-xs text-green-700 mt-1">
              <ArrowUpIcon className="h-3 w-3 text-green-500 mr-1" />
              +{mockStats.orders.change}% {mockStats.orders.period}
            </div>
          </CardContent>
        </Card>

        {/* Customers */}
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-900">Clients</CardTitle>
            <div className="p-2 bg-purple-500 rounded-lg">
              <UsersIcon className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">{mockStats.customers.total}</div>
            <div className="flex items-center text-xs text-purple-700 mt-1">
              <ArrowUpIcon className="h-3 w-3 text-green-500 mr-1" />
              +{mockStats.customers.change}% {mockStats.customers.period}
            </div>
          </CardContent>
        </Card>

        {/* Average Order */}
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-900">Panier moyen</CardTitle>
            <div className="p-2 bg-orange-500 rounded-lg">
              <ChartBarIcon className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">{formatPrice(mockStats.avgOrder.total)}</div>
            <div className="flex items-center text-xs text-orange-700 mt-1">
              <ArrowDownIcon className="h-3 w-3 text-red-500 mr-1" />
              {mockStats.avgOrder.change}% {mockStats.avgOrder.period}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
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
                <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div>
                        <p className="font-medium text-gray-900">{order.id}</p>
                        <p className="text-sm text-gray-600">{order.customer}</p>
                      </div>
                      {getStatusBadge(order.status)}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {order.items.join(", ")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{formatPrice(order.total)}</p>
                    <p className="text-xs text-gray-500">{order.date}</p>
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
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-gray-600">{item.category}</p>
                    </div>
                    <Badge variant="destructive">
                      {item.stock} restants
                    </Badge>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4" variant="outline" size="sm" asChild>
                <a href="/admin/products">Gérer le stock</a>
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions rapides</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline" asChild>
                <a href="/admin/products">
                  📦 Gérer les produits
                </a>
              </Button>
              <Button className="w-full justify-start" variant="outline" asChild>
                <a href="/admin/slider">
                  🖼️ Gérer le slider
                </a>
              </Button>
              <Button className="w-full justify-start" variant="outline" asChild>
                <a href="/admin/categories">
                  🏷️ Gérer les catégories
                </a>
              </Button>
              <Button className="w-full justify-start" variant="outline" asChild>
                <a href="/admin/brands">
                  🏢 Gérer les marques
                </a>
              </Button>
              <Button className="w-full justify-start" variant="outline" asChild>
                <a href="/admin/orders">
                  <ShoppingCartIcon className="mr-2 h-4 w-4" />
                  Gérer les commandes
                </a>
              </Button>
              <Button className="w-full justify-start" variant="outline" asChild>
                <a href="/admin/customers">
                  <UsersIcon className="mr-2 h-4 w-4" />
                  Gérer les clients
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Analytics Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Analytics détaillées</CardTitle>
        </CardHeader>
        <CardContent>
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
                <Card className="bg-gradient-to-br from-green-50 to-green-100">
                  <CardHeader>
                    <CardTitle className="text-lg text-green-900">Ventes du jour</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-700 mb-2">
                      {formatPrice(12450)}
                    </div>
                    <p className="text-sm text-green-600">
                      23 commandes aujourd'hui
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-900">Taux de conversion</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-700 mb-2">
                      3.2%
                    </div>
                    <p className="text-sm text-blue-600">
                      +0.5% vs mois dernier
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
                  <CardHeader>
                    <CardTitle className="text-lg text-purple-900">Produits vendus</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-purple-700 mb-2">
                      847
                    </div>
                    <p className="text-sm text-purple-600">
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
                  <div className="text-center py-8 text-gray-600">
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
                  <div className="text-center py-8 text-gray-600">
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
                  <div className="text-center py-8 text-gray-600">
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
                  <div className="text-center py-8 text-gray-600">
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
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
