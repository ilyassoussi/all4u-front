import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { 
  TicketIcon,
  TagIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  PowerIcon,
  CalendarIcon,
  UsersIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  GiftIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";

// Mock data
const mockCoupons = [
  {
    id: 1,
    code: "WELCOME20",
    description: "Coupon de bienvenue",
    type: "percentage",
    value: 20,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    usageLimit: 1000,
    usageCount: 342,
    status: "active",
    categories: ["Tous"],
    minAmount: 100,
    createdAt: "2024-01-01"
  },
  {
    id: 2,
    code: "SUMMER2024",
    description: "Promo été 2024",
    type: "fixed",
    value: 50,
    startDate: "2024-06-01",
    endDate: "2024-08-31",
    usageLimit: 500,
    usageCount: 127,
    status: "active",
    categories: ["Audio", "Accessoires"],
    minAmount: 200,
    createdAt: "2024-05-15"
  },
  {
    id: 3,
    code: "STUDENT15",
    description: "Réduction étudiants",
    type: "percentage",
    value: 15,
    startDate: "2024-01-01",
    endDate: "2024-06-30",
    usageLimit: 200,
    usageCount: 198,
    status: "expired",
    categories: ["High-tech"],
    minAmount: 150,
    createdAt: "2023-12-15"
  }
];

const mockPromotions = [
  {
    id: 1,
    name: "Promo AirPods",
    description: "Réduction sur tous les AirPods",
    type: "category",
    target: "Audio",
    discountType: "percentage",
    discountValue: 15,
    startDate: "2024-01-15",
    endDate: "2024-02-15",
    status: "active",
    conditions: {
      minQuantity: 1,
      maxQuantity: null,
      minAmount: 0
    },
    results: {
      orders: 145,
      revenue: 25680,
      avgOrder: 177
    }
  },
  {
    id: 2,
    name: "Pack Gaming",
    description: "2 achetés = 1 offert sur accessoires gaming",
    type: "product",
    target: "Gaming",
    discountType: "bogo",
    discountValue: 0,
    startDate: "2024-01-01",
    endDate: "2024-03-31",
    status: "active",
    conditions: {
      minQuantity: 2,
      maxQuantity: null,
      minAmount: 0
    },
    results: {
      orders: 89,
      revenue: 15420,
      avgOrder: 173
    }
  },
  {
    id: 3,
    name: "Black Friday",
    description: "Méga promotion Black Friday",
    type: "global",
    target: "Tous",
    discountType: "percentage",
    discountValue: 30,
    startDate: "2023-11-24",
    endDate: "2023-11-27",
    status: "completed",
    conditions: {
      minQuantity: 1,
      maxQuantity: null,
      minAmount: 100
    },
    results: {
      orders: 1250,
      revenue: 185000,
      avgOrder: 148
    }
  }
];

const categories = ["Tous", "Audio", "Accessoires", "High-tech", "Gaming"];
const brands = ["Apple", "Xiaomi", "Samsung", "Soundcore", "Oraimo"];

export default function PromotionsManagement() {
  const [activeTab, setActiveTab] = useState("coupons");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedCoupon, setSelectedCoupon] = useState<any>(null);
  const [selectedPromotion, setSelectedPromotion] = useState<any>(null);
  const [isCreateCouponOpen, setIsCreateCouponOpen] = useState(false);
  const [isCreatePromotionOpen, setIsCreatePromotionOpen] = useState(false);

  // Form states
  const [couponForm, setCouponForm] = useState({
    code: "",
    description: "",
    type: "percentage",
    value: "",
    startDate: "",
    endDate: "",
    usageLimit: "",
    categories: [] as string[],
    minAmount: ""
  });

  const [promotionForm, setPromotionForm] = useState({
    name: "",
    description: "",
    type: "category",
    target: "",
    discountType: "percentage",
    discountValue: "",
    startDate: "",
    endDate: "",
    minQuantity: "1",
    minAmount: ""
  });

  const headerActions = (
    <div className="flex items-center space-x-3">
      <Badge className="bg-emerald-100 text-emerald-800 border-0">
        🟢 Système promotions actif
      </Badge>
      <Dialog open={isCreateCouponOpen} onOpenChange={setIsCreateCouponOpen}>
        <DialogTrigger asChild>
          <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <TicketIcon className="mr-2 h-4 w-4" />
            Nouveau Coupon
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <TicketIcon className="mr-2 h-5 w-5 text-blue-600" />
              Créer un nouveau coupon
            </DialogTitle>
            <DialogDescription>
              Configurez les paramètres de votre coupon de réduction
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="code">Code du coupon*</Label>
                <Input
                  id="code"
                  value={couponForm.code}
                  onChange={(e) => setCouponForm({...couponForm, code: e.target.value.toUpperCase()})}
                  placeholder="ex. WELCOME20"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="type">Type de réduction*</Label>
                <Select value={couponForm.type} onValueChange={(value) => setCouponForm({...couponForm, type: value})}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Pourcentage (%)</SelectItem>
                    <SelectItem value="fixed">Montant fixe (د.م.)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={couponForm.description}
                onChange={(e) => setCouponForm({...couponForm, description: e.target.value})}
                placeholder="Description du coupon"
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="value">Valeur de réduction*</Label>
                <Input
                  id="value"
                  type="number"
                  value={couponForm.value}
                  onChange={(e) => setCouponForm({...couponForm, value: e.target.value})}
                  placeholder={couponForm.type === "percentage" ? "20" : "50"}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="usageLimit">Nombre d'utilisations max</Label>
                <Input
                  id="usageLimit"
                  type="number"
                  value={couponForm.usageLimit}
                  onChange={(e) => setCouponForm({...couponForm, usageLimit: e.target.value})}
                  placeholder="1000"
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Date de début</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={couponForm.startDate}
                  onChange={(e) => setCouponForm({...couponForm, startDate: e.target.value})}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="endDate">Date de fin</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={couponForm.endDate}
                  onChange={(e) => setCouponForm({...couponForm, endDate: e.target.value})}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="minAmount">Montant minimum de commande (د.م.)</Label>
              <Input
                id="minAmount"
                type="number"
                value={couponForm.minAmount}
                onChange={(e) => setCouponForm({...couponForm, minAmount: e.target.value})}
                placeholder="100"
                className="mt-1"
              />
            </div>

            <div>
              <Label>Catégories applicables</Label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`cat-${category}`}
                      checked={couponForm.categories.includes(category)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setCouponForm({...couponForm, categories: [...couponForm.categories, category]});
                        } else {
                          setCouponForm({...couponForm, categories: couponForm.categories.filter(c => c !== category)});
                        }
                      }}
                    />
                    <Label htmlFor={`cat-${category}`} className="text-sm">{category}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateCouponOpen(false)}>
              Annuler
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
              Créer le coupon
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isCreatePromotionOpen} onOpenChange={setIsCreatePromotionOpen}>
        <DialogTrigger asChild>
          <Button size="sm" variant="outline" className="border-green-300 text-green-700 hover:bg-green-50">
            <TagIcon className="mr-2 h-4 w-4" />
            Nouvelle Promotion
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <TagIcon className="mr-2 h-5 w-5 text-green-600" />
              Créer une nouvelle promotion
            </DialogTitle>
            <DialogDescription>
              Configurez votre campagne promotionnelle
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            <div>
              <Label htmlFor="promoName">Nom de la promotion*</Label>
              <Input
                id="promoName"
                value={promotionForm.name}
                onChange={(e) => setPromotionForm({...promotionForm, name: e.target.value})}
                placeholder="ex. Promo AirPods Été"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="promoDescription">Description</Label>
              <Textarea
                id="promoDescription"
                value={promotionForm.description}
                onChange={(e) => setPromotionForm({...promotionForm, description: e.target.value})}
                placeholder="Description de la promotion"
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="promoType">Type de promotion*</Label>
                <Select value={promotionForm.type} onValueChange={(value) => setPromotionForm({...promotionForm, type: value})}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="global">Globale (tous produits)</SelectItem>
                    <SelectItem value="category">Par catégorie</SelectItem>
                    <SelectItem value="brand">Par marque</SelectItem>
                    <SelectItem value="product">Produits spécifiques</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="promoTarget">Cible</Label>
                <Select value={promotionForm.target} onValueChange={(value) => setPromotionForm({...promotionForm, target: value})}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Sélectionner..." />
                  </SelectTrigger>
                  <SelectContent>
                    {promotionForm.type === "category" && categories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                    {promotionForm.type === "brand" && brands.map(brand => (
                      <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                    ))}
                    {promotionForm.type === "global" && (
                      <SelectItem value="all">Tous les produits</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="discountType">Type de réduction*</Label>
                <Select value={promotionForm.discountType} onValueChange={(value) => setPromotionForm({...promotionForm, discountType: value})}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Pourcentage (%)</SelectItem>
                    <SelectItem value="fixed">Montant fixe (د.م.)</SelectItem>
                    <SelectItem value="bogo">2 achetés = 1 offert</SelectItem>
                    <SelectItem value="bundle">Pack spécial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="discountValue">Valeur</Label>
                <Input
                  id="discountValue"
                  type="number"
                  value={promotionForm.discountValue}
                  onChange={(e) => setPromotionForm({...promotionForm, discountValue: e.target.value})}
                  placeholder="15"
                  className="mt-1"
                  disabled={promotionForm.discountType === "bogo"}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="promoStartDate">Date de début</Label>
                <Input
                  id="promoStartDate"
                  type="date"
                  value={promotionForm.startDate}
                  onChange={(e) => setPromotionForm({...promotionForm, startDate: e.target.value})}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="promoEndDate">Date de fin</Label>
                <Input
                  id="promoEndDate"
                  type="date"
                  value={promotionForm.endDate}
                  onChange={(e) => setPromotionForm({...promotionForm, endDate: e.target.value})}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="minQuantity">Quantité minimum</Label>
                <Input
                  id="minQuantity"
                  type="number"
                  value={promotionForm.minQuantity}
                  onChange={(e) => setPromotionForm({...promotionForm, minQuantity: e.target.value})}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="promoMinAmount">Montant minimum (د.م.)</Label>
                <Input
                  id="promoMinAmount"
                  type="number"
                  value={promotionForm.minAmount}
                  onChange={(e) => setPromotionForm({...promotionForm, minAmount: e.target.value})}
                  placeholder="0"
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreatePromotionOpen(false)}>
              Annuler
            </Button>
            <Button className="bg-gradient-to-r from-green-600 to-emerald-600">
              Créer la promotion
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );

  const filteredCoupons = mockCoupons.filter(coupon => {
    const matchesSearch = coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         coupon.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || coupon.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredPromotions = mockPromotions.filter(promo => {
    const matchesSearch = promo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         promo.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || promo.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 border-0">🟢 Actif</Badge>;
      case "expired":
        return <Badge className="bg-red-100 text-red-800 border-0">🔴 Expiré</Badge>;
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800 border-0">✅ Terminé</Badge>;
      case "scheduled":
        return <Badge className="bg-yellow-100 text-yellow-800 border-0">⏰ Programmé</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const calculateProgress = (used: number, total: number) => {
    return Math.round((used / total) * 100);
  };

  return (
    <AdminLayout 
      title="Promotions & Coupons" 
      subtitle="Gérez vos campagnes promotionnelles et codes de réduction"
      actions={headerActions}
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Coupons Actifs</p>
                <p className="text-2xl font-bold text-blue-900">
                  {mockCoupons.filter(c => c.status === 'active').length}
                </p>
              </div>
              <TicketIcon className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Promotions Actives</p>
                <p className="text-2xl font-bold text-green-900">
                  {mockPromotions.filter(p => p.status === 'active').length}
                </p>
              </div>
              <TagIcon className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Économies Clients</p>
                <p className="text-2xl font-bold text-orange-900">15,680 د.م.</p>
                <p className="text-xs text-orange-600 flex items-center mt-1">
                  <ArrowUpIcon className="h-3 w-3 mr-1" />
                  +23% ce mois
                </p>
              </div>
              <GiftIcon className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Conversion Promo</p>
                <p className="text-2xl font-bold text-purple-900">18.5%</p>
                <p className="text-xs text-purple-600 flex items-center mt-1">
                  <ArrowUpIcon className="h-3 w-3 mr-1" />
                  +5.2% ce mois
                </p>
              </div>
              <SparklesIcon className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gray-100 p-1 rounded-lg mb-6">
          <TabsTrigger value="coupons" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <TicketIcon className="h-4 w-4 mr-2" />
            Gestion des Coupons
          </TabsTrigger>
          <TabsTrigger value="promotions" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <TagIcon className="h-4 w-4 mr-2" />
            Gestion des Promotions
          </TabsTrigger>
        </TabsList>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex items-center space-x-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <MagnifyingGlassIcon className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="active">Actifs</SelectItem>
                    <SelectItem value="expired">Expirés</SelectItem>
                    <SelectItem value="scheduled">Programmés</SelectItem>
                    <SelectItem value="completed">Terminés</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <FunnelIcon className="h-4 w-4 mr-2" />
                  Filtres avancés
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <TabsContent value="coupons">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TicketIcon className="mr-2 h-5 w-5 text-blue-600" />
                Coupons de Réduction ({filteredCoupons.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Code</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Description</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Réduction</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Utilisation</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Période</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Statut</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCoupons.map((coupon) => (
                      <tr key={coupon.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="font-mono font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded text-sm inline-block">
                            {coupon.code}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-medium text-gray-900">{coupon.description}</div>
                          <div className="text-sm text-gray-500">Min: {coupon.minAmount} د.م.</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-semibold text-gray-900">
                            {coupon.type === 'percentage' ? `${coupon.value}%` : `${coupon.value} د.م.`}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="space-y-1">
                            <div className="text-sm font-medium">
                              {coupon.usageCount} / {coupon.usageLimit}
                            </div>
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${calculateProgress(coupon.usageCount, coupon.usageLimit)}%` }}
                              ></div>
                            </div>
                            <div className="text-xs text-gray-500">
                              {calculateProgress(coupon.usageCount, coupon.usageLimit)}%
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-sm">
                            <div>{formatDate(coupon.startDate)}</div>
                            <div className="text-gray-500">→ {formatDate(coupon.endDate)}</div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          {getStatusBadge(coupon.status)}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-end space-x-2">
                            <Button variant="ghost" size="sm">
                              <EyeIcon className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <PencilIcon className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-green-600">
                              <PowerIcon className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600">
                              <TrashIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="promotions">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TagIcon className="mr-2 h-5 w-5 text-green-600" />
                Promotions Actives ({filteredPromotions.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {filteredPromotions.map((promotion) => (
                  <Card key={promotion.id} className="border-l-4 border-l-green-500">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Info Promotion */}
                        <div className="lg:col-span-2">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="font-semibold text-lg text-gray-900 mb-2">{promotion.name}</h3>
                              <p className="text-gray-600 mb-3">{promotion.description}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span className="flex items-center">
                                  <CalendarIcon className="h-4 w-4 mr-1" />
                                  {formatDate(promotion.startDate)} - {formatDate(promotion.endDate)}
                                </span>
                                <span className="flex items-center">
                                  <TagIcon className="h-4 w-4 mr-1" />
                                  {promotion.target}
                                </span>
                              </div>
                            </div>
                            {getStatusBadge(promotion.status)}
                          </div>

                          <div className="bg-gray-50 rounded-lg p-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-gray-500">Type:</span>
                                <span className="ml-2 font-medium">{promotion.type}</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Réduction:</span>
                                <span className="ml-2 font-medium text-green-600">
                                  {promotion.discountType === 'percentage' ? `${promotion.discountValue}%` :
                                   promotion.discountType === 'fixed' ? `${promotion.discountValue} د.م.` :
                                   promotion.discountType === 'bogo' ? '2+1 Offert' : 'Pack spécial'}
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-500">Qté min:</span>
                                <span className="ml-2 font-medium">{promotion.conditions.minQuantity}</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Montant min:</span>
                                <span className="ml-2 font-medium">{promotion.conditions.minAmount} د.م.</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Résultats */}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                            <ChartBarIcon className="h-4 w-4 mr-2" />
                            Résultats
                          </h4>
                          <div className="space-y-3">
                            <div className="bg-blue-50 rounded-lg p-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-blue-600">Commandes</span>
                                <span className="font-semibold text-blue-900">{promotion.results.orders}</span>
                              </div>
                            </div>
                            <div className="bg-green-50 rounded-lg p-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-green-600">Chiffre d'affaires</span>
                                <span className="font-semibold text-green-900">{promotion.results.revenue.toLocaleString()} د.م.</span>
                              </div>
                            </div>
                            <div className="bg-purple-50 rounded-lg p-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-purple-600">Panier moyen</span>
                                <span className="font-semibold text-purple-900">{promotion.results.avgOrder} د.م.</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">Actions</h4>
                          <div className="space-y-2">
                            <Button variant="outline" size="sm" className="w-full justify-start">
                              <EyeIcon className="h-4 w-4 mr-2" />
                              Voir détails
                            </Button>
                            <Button variant="outline" size="sm" className="w-full justify-start">
                              <PencilIcon className="h-4 w-4 mr-2" />
                              Modifier
                            </Button>
                            <Button variant="outline" size="sm" className="w-full justify-start text-green-600 border-green-300 hover:bg-green-50">
                              <PowerIcon className="h-4 w-4 mr-2" />
                              Dupliquer
                            </Button>
                            <Button variant="outline" size="sm" className="w-full justify-start text-red-600 border-red-300 hover:bg-red-50">
                              <TrashIcon className="h-4 w-4 mr-2" />
                              Désactiver
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}
