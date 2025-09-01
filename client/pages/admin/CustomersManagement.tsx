import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
  EnvelopeIcon,
  PhoneIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  UserIcon,
  CurrencyDollarIcon,
  ShoppingCartIcon,
  CalendarIcon
} from "@heroicons/react/24/outline";
import AdminLayout from "@/components/admin/AdminLayout";

// Mock customers data
const mockCustomers = [
  {
    id: "1",
    name: "Ahmed Bennani",
    email: "ahmed.bennani@email.com",
    phone: "+212 661 51 21 21",
    city: "Khemisset",
    registeredAt: "2023-12-15T10:30:00",
    lastOrderAt: "2024-01-20T10:30:00",
    totalOrders: 5,
    totalSpent: 8950,
    status: "active" as const,
    segment: "premium" as const,
    addresses: [
      { type: "billing", address: "Av. Mohammed V, Khemisset 15000" },
      { type: "shipping", address: "Av. Mohammed V, Khemisset 15000" }
    ],
    orders: [
      { id: "CMD-001234", date: "2024-01-20", total: 2599, status: "completed" },
      { id: "CMD-001180", date: "2024-01-10", total: 1899, status: "completed" },
      { id: "CMD-001145", date: "2023-12-25", total: 4452, status: "completed" }
    ]
  },
  {
    id: "2",
    name: "Fatima Alaoui",
    email: "fatima.alaoui@email.com",
    phone: "+212 661 51 21 21",
    city: "Rabat",
    registeredAt: "2024-01-01T14:15:00",
    lastOrderAt: "2024-01-20T14:15:00",
    totalOrders: 2,
    totalSpent: 5299,
    status: "active" as const,
    segment: "regular" as const,
    addresses: [
      { type: "billing", address: "Quartier Al Massira, Rabat 10000" },
      { type: "shipping", address: "Quartier Al Massira, Rabat 10000" }
    ],
    orders: [
      { id: "CMD-001235", date: "2024-01-20", total: 4299, status: "processing" },
      { id: "CMD-001190", date: "2024-01-05", total: 1000, status: "completed" }
    ]
  },
  {
    id: "3",
    name: "Mohammed Kadiri",
    email: "mohammed.kadiri@email.com",
    phone: "+212 661 51 21 21",
    city: "Casablanca",
    registeredAt: "2023-11-20T16:45:00",
    lastOrderAt: "2024-01-19T16:45:00",
    totalOrders: 8,
    totalSpent: 12450,
    status: "active" as const,
    segment: "vip" as const,
    addresses: [
      { type: "billing", address: "Rue Atlas, Casablanca 20000" },
      { type: "shipping", address: "Rue Atlas, Casablanca 20000" }
    ],
    orders: [
      { id: "CMD-001236", date: "2024-01-19", total: 1899, status: "shipped" },
      { id: "CMD-001200", date: "2024-01-12", total: 3299, status: "completed" }
    ]
  },
  {
    id: "4",
    name: "Aisha Benali",
    email: "aisha.benali@email.com",
    phone: "+212 661 51 21 21",
    city: "Marrakech",
    registeredAt: "2024-01-18T09:20:00",
    lastOrderAt: "2024-01-19T09:20:00",
    totalOrders: 1,
    totalSpent: 459,
    status: "active" as const,
    segment: "new" as const,
    addresses: [
      { type: "billing", address: "Boulevard Zerktouni, Marrakech 40000" },
      { type: "shipping", address: "Boulevard Zerktouni, Marrakech 40000" }
    ],
    orders: [
      { id: "CMD-001237", date: "2024-01-19", total: 459, status: "pending" }
    ]
  },
  {
    id: "5",
    name: "Youssef Tazi",
    email: "youssef.tazi@email.com",
    phone: "+212 661 51 21 21",
    city: "Rabat",
    registeredAt: "2023-10-05T11:30:00",
    lastOrderAt: "2024-01-18T11:30:00",
    totalOrders: 3,
    totalSpent: 2150,
    status: "inactive" as const,
    segment: "regular" as const,
    addresses: [
      { type: "billing", address: "Agdal, Rabat 10000" },
      { type: "shipping", address: "Agdal, Rabat 10000" }
    ],
    orders: [
      { id: "CMD-001238", date: "2024-01-18", total: 1299, status: "cancelled" },
      { id: "CMD-001150", date: "2023-12-20", total: 851, status: "completed" }
    ]
  }
];

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  registeredAt: string;
  lastOrderAt: string;
  totalOrders: number;
  totalSpent: number;
  status: "active" | "inactive";
  segment: "new" | "regular" | "premium" | "vip";
  addresses: Array<{
    type: string;
    address: string;
  }>;
  orders: Array<{
    id: string;
    date: string;
    total: number;
    status: string;
  }>;
}

const segmentOptions = [
  { value: "new", label: "Nouveau", color: "bg-blue-500" },
  { value: "regular", label: "Régulier", color: "bg-green-500" },
  { value: "premium", label: "Premium", color: "bg-purple-500" },
  { value: "vip", label: "VIP", color: "bg-gold-500" }
];

const statusOptions = [
  { value: "active", label: "Actif", color: "bg-green-500" },
  { value: "inactive", label: "Inactif", color: "bg-red-500" }
];

export default function CustomersManagement() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>(mockCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSegment, setFilterSegment] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCity, setFilterCity] = useState("all");
  const [sortBy, setSortBy] = useState("lastOrderAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  // Get unique cities for filter
  const cities = Array.from(new Set(customers.map(c => c.city))).sort();

  useEffect(() => {
    let filtered = customers.filter(customer => {
      const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           customer.phone.includes(searchTerm);
      const matchesSegment = filterSegment === "all" || customer.segment === filterSegment;
      const matchesStatus = filterStatus === "all" || customer.status === filterStatus;
      const matchesCity = filterCity === "all" || customer.city === filterCity;
      
      return matchesSearch && matchesSegment && matchesStatus && matchesCity;
    });

    // Sort customers
    filtered.sort((a, b) => {
      let aValue: any = a[sortBy as keyof Customer];
      let bValue: any = b[sortBy as keyof Customer];
      
      if (sortBy === "totalSpent" || sortBy === "totalOrders") {
        aValue = Number(aValue);
        bValue = Number(bValue);
      } else if (sortBy === "registeredAt" || sortBy === "lastOrderAt") {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      
      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredCustomers(filtered);
  }, [customers, searchTerm, filterSegment, filterStatus, filterCity, sortBy, sortOrder]);

  const formatPrice = (price: number) => `${price.toLocaleString()} د.م.`;
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  const getSegmentBadge = (segment: string) => {
    const segmentConfig = segmentOptions.find(opt => opt.value === segment);
    if (!segmentConfig) return null;
    
    return (
      <Badge variant="outline" className="flex items-center space-x-1">
        <div className={`h-2 w-2 rounded-full ${segmentConfig.color}`} />
        <span>{segmentConfig.label}</span>
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = statusOptions.find(opt => opt.value === status);
    if (!statusConfig) return null;
    
    return (
      <Badge variant="outline" className="flex items-center space-x-1">
        <div className={`h-2 w-2 rounded-full ${statusConfig.color}`} />
        <span>{statusConfig.label}</span>
      </Badge>
    );
  };

  const getCustomerStats = () => {
    const stats = {
      total: customers.length,
      active: customers.filter(c => c.status === "active").length,
      inactive: customers.filter(c => c.status === "inactive").length,
      new: customers.filter(c => c.segment === "new").length,
      regular: customers.filter(c => c.segment === "regular").length,
      premium: customers.filter(c => c.segment === "premium").length,
      vip: customers.filter(c => c.segment === "vip").length,
      totalSpent: customers.reduce((sum, c) => sum + c.totalSpent, 0),
      avgSpent: customers.length > 0 ? customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.length : 0
    };
    return stats;
  };

  const stats = getCustomerStats();

  return (
    <AdminLayout title="Gestion des clients" subtitle="Gérez les informations et l'activité des clients." actions={null}>
      <div className="min-h-screen bg-muted/30">
        {/* Header */}
        <div className="bg-white border-b border-border">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Gestion des Clients
                </h1>
                <p className="text-muted-foreground">
                  Gérez votre base de clients et analysez leurs comportements
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline" asChild>
                  <a href="/admin/dashboard">← Retour au tableau de bord</a>
                </Button>
                <Button variant="outline">
                  Export CSV
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <UserIcon className="h-8 w-8 text-blue-500" />
                  <div>
                    <div className="text-2xl font-bold">{stats.total}</div>
                    <p className="text-xs text-muted-foreground">Total clients</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <UserIcon className="h-8 w-8 text-green-500" />
                  <div>
                    <div className="text-2xl font-bold">{stats.active}</div>
                    <p className="text-xs text-muted-foreground">Clients actifs</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <CurrencyDollarIcon className="h-8 w-8 text-purple-500" />
                  <div>
                    <div className="text-xl font-bold">{formatPrice(stats.totalSpent)}</div>
                    <p className="text-xs text-muted-foreground">CA total clients</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <ShoppingCartIcon className="h-8 w-8 text-orange-500" />
                  <div>
                    <div className="text-xl font-bold">{formatPrice(stats.avgSpent)}</div>
                    <p className="text-xs text-muted-foreground">Panier moyen</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Segment Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="text-lg font-bold text-blue-600">{stats.new}</div>
                <p className="text-xs text-muted-foreground">Nouveaux clients</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-lg font-bold text-green-600">{stats.regular}</div>
                <p className="text-xs text-muted-foreground">Clients réguliers</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-lg font-bold text-purple-600">{stats.premium}</div>
                <p className="text-xs text-muted-foreground">Clients premium</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-lg font-bold text-yellow-600">{stats.vip}</div>
                <p className="text-xs text-muted-foreground">Clients VIP</p>
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
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="space-y-2">
                  <Label>Rechercher</Label>
                  <div className="relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Nom, email, téléphone..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Segment</Label>
                  <Select value={filterSegment} onValueChange={setFilterSegment}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les segments</SelectItem>
                      {segmentOptions.map(segment => (
                        <SelectItem key={segment.value} value={segment.value}>{segment.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Statut</Label>
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
                  <Label>Ville</Label>
                  <Select value={filterCity} onValueChange={setFilterCity}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les villes</SelectItem>
                      {cities.map(city => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
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
                        <SelectItem value="name">Nom</SelectItem>
                        <SelectItem value="registeredAt">Date inscription</SelectItem>
                        <SelectItem value="lastOrderAt">Dernière commande</SelectItem>
                        <SelectItem value="totalSpent">Montant dépensé</SelectItem>
                        <SelectItem value="totalOrders">Nb commandes</SelectItem>
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

          {/* Customers Table */}
          <Card>
            <CardHeader>
              <CardTitle>
                Clients ({filteredCustomers.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Ville</TableHead>
                      <TableHead>Segment</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Commandes</TableHead>
                      <TableHead>Dépensé</TableHead>
                      <TableHead>Dernière commande</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCustomers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{customer.name}</p>
                            <p className="text-sm text-muted-foreground">{customer.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>{customer.city}</TableCell>
                        <TableCell>{getSegmentBadge(customer.segment)}</TableCell>
                        <TableCell>{getStatusBadge(customer.status)}</TableCell>
                        <TableCell className="font-medium">{customer.totalOrders}</TableCell>
                        <TableCell className="font-medium">{formatPrice(customer.totalSpent)}</TableCell>
                        <TableCell>{formatDate(customer.lastOrderAt)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-1">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => {
                                setSelectedCustomer(customer);
                                setIsDetailDialogOpen(true);
                              }}
                            >
                              <EyeIcon className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" asChild>
                              <a href={`mailto:${customer.email}`}>
                                <EnvelopeIcon className="h-4 w-4" />
                              </a>
                            </Button>
                            <Button variant="ghost" size="icon" asChild>
                              <a href={`tel:${customer.phone}`}>
                                <PhoneIcon className="h-4 w-4" />
                              </a>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Customer Detail Dialog */}
          <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Profil client - {selectedCustomer?.name}</DialogTitle>
                <DialogDescription>
                  Informations détaillées et historique des commandes
                </DialogDescription>
              </DialogHeader>
              
              {selectedCustomer && (
                <div className="space-y-6">
                  {/* Customer Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Informations personnelles</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <p><strong>Nom:</strong> {selectedCustomer.name}</p>
                        <p><strong>Email:</strong> {selectedCustomer.email}</p>
                        <p><strong>Téléphone:</strong> {selectedCustomer.phone}</p>
                        <p><strong>Ville:</strong> {selectedCustomer.city}</p>
                        <p><strong>Inscrit le:</strong> {formatDate(selectedCustomer.registeredAt)}</p>
                        <p><strong>Segment:</strong> {getSegmentBadge(selectedCustomer.segment)}</p>
                        <p><strong>Statut:</strong> {getStatusBadge(selectedCustomer.status)}</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Statistiques</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <ShoppingCartIcon className="h-5 w-5 text-blue-500" />
                          <div>
                            <p className="font-medium">{selectedCustomer.totalOrders} commandes</p>
                            <p className="text-sm text-muted-foreground">Total des commandes</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CurrencyDollarIcon className="h-5 w-5 text-green-500" />
                          <div>
                            <p className="font-medium">{formatPrice(selectedCustomer.totalSpent)}</p>
                            <p className="text-sm text-muted-foreground">Montant total dépensé</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CalendarIcon className="h-5 w-5 text-orange-500" />
                          <div>
                            <p className="font-medium">{formatDate(selectedCustomer.lastOrderAt)}</p>
                            <p className="text-sm text-muted-foreground">Dernière commande</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Addresses */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Adresses</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedCustomer.addresses.map((address, index) => (
                          <div key={index} className="p-3 border rounded-lg">
                            <p className="font-medium capitalize">{address.type}</p>
                            <p className="text-sm text-muted-foreground">{address.address}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Order History */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Historique des commandes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {selectedCustomer.orders.map((order) => (
                          <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <p className="font-medium">{order.id}</p>
                              <p className="text-sm text-muted-foreground">{formatDate(order.date)}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{formatPrice(order.total)}</p>
                              <Badge variant="outline" className="text-xs">
                                {order.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Button className="w-full mt-4" variant="outline" asChild>
                        <a href="/admin/orders">Voir toutes les commandes</a>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </AdminLayout>
  );
}
