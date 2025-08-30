import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  EyeIcon,
  TruckIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  PrinterIcon,
  CurrencyDollarIcon
} from "@heroicons/react/24/outline";

// Mock orders data
const mockOrders = [
  {
    id: "CMD-001234",
    customer: {
      name: "Ahmed Bennani",
      email: "ahmed.bennani@email.com",
      phone: "+212 6XX-XXXXXX"
    },
    date: "2024-01-20T10:30:00",
    status: "completed",
    paymentStatus: "paid",
    shippingAddress: "Av. Mohammed V, Khemisset 15000",
    total: 2599,
    items: [
      { name: "AirPods Pro (2ème génération)", quantity: 1, price: 2599 }
    ],
    tracking: "MAR123456789",
    notes: "Livraison express demandée"
  },
  {
    id: "CMD-001235",
    customer: {
      name: "Fatima Alaoui",
      email: "fatima.alaoui@email.com",
      phone: "+212 6XX-XXXXXX"
    },
    date: "2024-01-20T14:15:00",
    status: "processing",
    paymentStatus: "paid",
    shippingAddress: "Quartier Al Massira, Rabat 10000",
    total: 4299,
    items: [
      { name: "Apple Watch Series 9", quantity: 1, price: 3999 },
      { name: "Chargeur USB-C", quantity: 1, price: 300 }
    ],
    tracking: "",
    notes: ""
  },
  {
    id: "CMD-001236",
    customer: {
      name: "Mohammed Kadiri",
      email: "mohammed.kadiri@email.com", 
      phone: "+212 6XX-XXXXXX"
    },
    date: "2024-01-19T16:45:00",
    status: "shipped",
    paymentStatus: "paid",
    shippingAddress: "Rue Atlas, Casablanca 20000",
    total: 1899,
    items: [
      { name: "AirPods (3ème génération)", quantity: 1, price: 1899 }
    ],
    tracking: "MAR987654321",
    notes: ""
  },
  {
    id: "CMD-001237",
    customer: {
      name: "Aisha Benali",
      email: "aisha.benali@email.com",
      phone: "+212 6XX-XXXXXX"
    },
    date: "2024-01-19T09:20:00",
    status: "pending",
    paymentStatus: "pending",
    shippingAddress: "Boulevard Zerktouni, Marrakech 40000",
    total: 459,
    items: [
      { name: "PowerBank Anker 20000mAh", quantity: 1, price: 459 }
    ],
    tracking: "",
    notes: "Client demande confirmation par SMS"
  },
  {
    id: "CMD-001238",
    customer: {
      name: "Youssef Tazi",
      email: "youssef.tazi@email.com",
      phone: "+212 6XX-XXXXXX"
    },
    date: "2024-01-18T11:30:00",
    status: "cancelled",
    paymentStatus: "refunded",
    shippingAddress: "Agdal, Rabat 10000",
    total: 1299,
    items: [
      { name: "iPhone 15 Case", quantity: 2, price: 649.5 }
    ],
    tracking: "",
    notes: "Annulation à la demande du client"
  }
];

interface Order {
  id: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  date: string;
  status: "pending" | "processing" | "shipped" | "completed" | "cancelled";
  paymentStatus: "pending" | "paid" | "refunded";
  shippingAddress: string;
  total: number;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  tracking: string;
  notes: string;
}

const statusOptions = [
  { value: "pending", label: "En attente", color: "bg-orange-500" },
  { value: "processing", label: "En cours", color: "bg-blue-500" },
  { value: "shipped", label: "Expédiée", color: "bg-purple-500" },
  { value: "completed", label: "Terminée", color: "bg-green-500" },
  { value: "cancelled", label: "Annulée", color: "bg-red-500" }
];

const paymentStatusOptions = [
  { value: "pending", label: "En attente", color: "bg-orange-500" },
  { value: "paid", label: "Payée", color: "bg-green-500" },
  { value: "refunded", label: "Remboursée", color: "bg-red-500" }
];

export default function OrdersManagement() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(mockOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPayment, setFilterPayment] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  useEffect(() => {
    let filtered = orders.filter(order => {
      const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === "all" || order.status === filterStatus;
      const matchesPayment = filterPayment === "all" || order.paymentStatus === filterPayment;
      
      return matchesSearch && matchesStatus && matchesPayment;
    });

    // Sort orders
    filtered.sort((a, b) => {
      let aValue: any = a[sortBy as keyof Order];
      let bValue: any = b[sortBy as keyof Order];
      
      if (sortBy === "total") {
        aValue = Number(aValue);
        bValue = Number(bValue);
      } else if (sortBy === "date") {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      
      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredOrders(filtered);
  }, [orders, searchTerm, filterStatus, filterPayment, sortBy, sortOrder]);

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders(prev => prev.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const updatePaymentStatus = (orderId: string, newStatus: Order["paymentStatus"]) => {
    setOrders(prev => prev.map(order =>
      order.id === orderId ? { ...order, paymentStatus: newStatus } : order
    ));
  };

  const updateTracking = (orderId: string, tracking: string) => {
    setOrders(prev => prev.map(order =>
      order.id === orderId ? { ...order, tracking } : order
    ));
  };

  const formatPrice = (price: number) => `${price.toLocaleString()} د.م.`;
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR') + ' à ' + date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusBadge = (status: string, options: typeof statusOptions) => {
    const statusConfig = options.find(opt => opt.value === status);
    if (!statusConfig) return null;
    
    return (
      <Badge variant="outline" className="flex items-center space-x-1">
        <div className={`h-2 w-2 rounded-full ${statusConfig.color}`} />
        <span>{statusConfig.label}</span>
      </Badge>
    );
  };

  const getOrderStats = () => {
    const stats = {
      total: orders.length,
      pending: orders.filter(o => o.status === "pending").length,
      processing: orders.filter(o => o.status === "processing").length,
      shipped: orders.filter(o => o.status === "shipped").length,
      completed: orders.filter(o => o.status === "completed").length,
      cancelled: orders.filter(o => o.status === "cancelled").length,
      totalRevenue: orders.filter(o => o.paymentStatus === "paid").reduce((sum, o) => sum + o.total, 0)
    };
    return stats;
  };

  const stats = getOrderStats();

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Gestion des Commandes
              </h1>
              <p className="text-muted-foreground">
                Gérez et suivez toutes les commandes
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" asChild>
                <a href="/admin/dashboard">← Retour au tableau de bord</a>
              </Button>
              <Button variant="outline">
                <PrinterIcon className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">Total commandes</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
              <p className="text-xs text-muted-foreground">En attente</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">{stats.processing}</div>
              <p className="text-xs text-muted-foreground">En cours</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-600">{stats.shipped}</div>
              <p className="text-xs text-muted-foreground">Expédiées</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
              <p className="text-xs text-muted-foreground">Terminées</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-xl font-bold">{formatPrice(stats.totalRevenue)}</div>
              <p className="text-xs text-muted-foreground">Chiffre d'affaires</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FunnelIcon className="h-5 w-5" />
              <span>Filtres et recherche</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Rechercher</Label>
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="N° commande, client..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Statut commande</Label>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    {statusOptions.map(status => (
                      <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Statut paiement</Label>
                <Select value={filterPayment} onValueChange={setFilterPayment}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les paiements</SelectItem>
                    {paymentStatusOptions.map(status => (
                      <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Trier par</Label>
                <div className="flex space-x-2">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date">Date</SelectItem>
                      <SelectItem value="total">Montant</SelectItem>
                      <SelectItem value="status">Statut</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                  >
                    {sortOrder === "asc" ? <ArrowUpIcon className="h-4 w-4" /> : <ArrowDownIcon className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>
              Commandes ({filteredOrders.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Commande</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Paiement</TableHead>
                    <TableHead>Montant</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-muted-foreground">
                            {order.items.length} article{order.items.length > 1 ? 's' : ''}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{order.customer.name}</p>
                          <p className="text-sm text-muted-foreground">{order.customer.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm">{formatDate(order.date)}</p>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(order.status, statusOptions)}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(order.paymentStatus, paymentStatusOptions)}
                      </TableCell>
                      <TableCell className="font-medium">
                        {formatPrice(order.total)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-1">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => {
                              setSelectedOrder(order);
                              setIsDetailDialogOpen(true);
                            }}
                          >
                            <EyeIcon className="h-4 w-4" />
                          </Button>
                          <Select
                            value={order.status}
                            onValueChange={(value: Order["status"]) => updateOrderStatus(order.id, value)}
                          >
                            <SelectTrigger className="w-auto h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {statusOptions.map(status => (
                                <SelectItem key={status.value} value={status.value}>
                                  {status.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Order Detail Dialog */}
        <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Détails de la commande {selectedOrder?.id}</DialogTitle>
              <DialogDescription>
                Informations complètes et gestion de la commande
              </DialogDescription>
            </DialogHeader>
            
            {selectedOrder && (
              <div className="space-y-6">
                {/* Customer Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Informations client</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p><strong>Nom:</strong> {selectedOrder.customer.name}</p>
                    <p><strong>Email:</strong> {selectedOrder.customer.email}</p>
                    <p><strong>Téléphone:</strong> {selectedOrder.customer.phone}</p>
                    <p><strong>Adresse:</strong> {selectedOrder.shippingAddress}</p>
                  </CardContent>
                </Card>

                {/* Order Items */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Articles commandés</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {selectedOrder.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-2 border rounded">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">Quantité: {item.quantity}</p>
                          </div>
                          <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                        </div>
                      ))}
                      <div className="border-t pt-2 mt-2">
                        <div className="flex justify-between items-center font-bold">
                          <span>Total:</span>
                          <span>{formatPrice(selectedOrder.total)}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Status Management */}
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Statut commande</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Select
                        value={selectedOrder.status}
                        onValueChange={(value: Order["status"]) => {
                          updateOrderStatus(selectedOrder.id, value);
                          setSelectedOrder({...selectedOrder, status: value});
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {statusOptions.map(status => (
                            <SelectItem key={status.value} value={status.value}>
                              {status.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Statut paiement</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Select
                        value={selectedOrder.paymentStatus}
                        onValueChange={(value: Order["paymentStatus"]) => {
                          updatePaymentStatus(selectedOrder.id, value);
                          setSelectedOrder({...selectedOrder, paymentStatus: value});
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {paymentStatusOptions.map(status => (
                            <SelectItem key={status.value} value={status.value}>
                              {status.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </CardContent>
                  </Card>
                </div>

                {/* Tracking */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Suivi de livraison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Label>Numéro de suivi</Label>
                      <Input
                        value={selectedOrder.tracking}
                        onChange={(e) => {
                          const newTracking = e.target.value;
                          updateTracking(selectedOrder.id, newTracking);
                          setSelectedOrder({...selectedOrder, tracking: newTracking});
                        }}
                        placeholder="Ex: MAR123456789"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Notes */}
                {selectedOrder.notes && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Notes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{selectedOrder.notes}</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
