import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  PhotoIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  BuildingStorefrontIcon
} from "@heroicons/react/24/outline";
import AdminLayout from "../../components/admin/AdminLayout";

// Mock brands data with the brands mentioned by user
const mockBrands = [
  {
    id: "1",
    name: "Apple",
    slug: "apple",
    description: "Produits Apple officiels - iPhone, AirPods, Watch",
    status: "active" as const,
    logo: "/placeholder.svg",
    website: "https://apple.com",
    productCount: 45,
    createdAt: "2024-01-01",
    displayOrder: 1,
    featured: true
  },
  {
    id: "2", 
    name: "Samsung",
    slug: "samsung",
    description: "Smartphones et accessoires Samsung",
    status: "active" as const,
    logo: "/placeholder.svg",
    website: "https://samsung.com",
    productCount: 32,
    createdAt: "2024-01-01",
    displayOrder: 2,
    featured: true
  },
  {
    id: "3",
    name: "Xiaomi",
    slug: "xiaomi",
    description: "Écosystème Xiaomi - Smartphones et accessoires",
    status: "active" as const,
    logo: "/placeholder.svg",
    website: "https://mi.com",
    productCount: 28,
    createdAt: "2024-01-01",
    displayOrder: 3,
    featured: true
  },
  {
    id: "4",
    name: "Oraimo",
    slug: "oraimo",
    description: "Accessoires de charge et audio Oraimo",
    status: "active" as const,
    logo: "/placeholder.svg",
    website: "https://oraimo.com",
    productCount: 22,
    createdAt: "2024-01-01",
    displayOrder: 4,
    featured: true
  },
  {
    id: "5",
    name: "Soundcore",
    slug: "soundcore",
    description: "Produits audio Soundcore by Anker",
    status: "active" as const,
    logo: "/placeholder.svg",
    website: "https://soundcore.com",
    productCount: 18,
    createdAt: "2024-01-01",
    displayOrder: 5,
    featured: false
  },
  {
    id: "6",
    name: "SoundPEATS",
    slug: "soundpeats",
    description: "Écouteurs sans fil et casques SoundPEATS",
    status: "active" as const,
    logo: "/placeholder.svg",
    website: "https://soundpeats.com",
    productCount: 15,
    createdAt: "2024-01-01",
    displayOrder: 6,
    featured: false
  },
  {
    id: "7",
    name: "Anker",
    slug: "anker",
    description: "PowerBank et chargeurs Anker",
    status: "active" as const,
    logo: "/placeholder.svg",
    website: "https://anker.com",
    productCount: 35,
    createdAt: "2024-01-01",
    displayOrder: 7,
    featured: true
  },
  {
    id: "8",
    name: "Belkin",
    slug: "belkin",
    description: "Accessoires et protections Belkin",
    status: "active" as const,
    logo: "/placeholder.svg",
    website: "https://belkin.com",
    productCount: 12,
    createdAt: "2024-01-01",
    displayOrder: 8,
    featured: false
  },
  {
    id: "9",
    name: "Baseus",
    slug: "baseus",
    description: "Accessoires automobiles et chargeurs Baseus",
    status: "active" as const,
    logo: "/placeholder.svg",
    website: "https://baseus.com",
    productCount: 24,
    createdAt: "2024-01-01",
    displayOrder: 9,
    featured: false
  },
  {
    id: "10",
    name: "Ugreen",
    slug: "ugreen",
    description: "Câbles et hubs USB Ugreen",
    status: "inactive" as const,
    logo: "/placeholder.svg",
    website: "https://ugreen.com",
    productCount: 8,
    createdAt: "2024-01-01",
    displayOrder: 10,
    featured: false
  }
];

interface Brand {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: "active" | "inactive";
  logo: string;
  website: string;
  productCount: number;
  createdAt: string;
  displayOrder: number;
  featured: boolean;
}

export default function BrandsManagement() {
  const [brands, setBrands] = useState<Brand[]>(mockBrands);
  const [filteredBrands, setFilteredBrands] = useState<Brand[]>(mockBrands);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterFeatured, setFilterFeatured] = useState("all");
  const [sortBy, setSortBy] = useState("displayOrder");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    status: "active" as "active" | "inactive",
    logo: "",
    website: "",
    displayOrder: "",
    featured: false
  });

  useEffect(() => {
    let filtered = brands.filter(brand => {
      const matchesSearch = brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           brand.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === "all" || brand.status === filterStatus;
      const matchesFeatured = filterFeatured === "all" || 
                             (filterFeatured === "featured" && brand.featured) ||
                             (filterFeatured === "not-featured" && !brand.featured);
      
      return matchesSearch && matchesStatus && matchesFeatured;
    });

    // Sort brands
    filtered.sort((a, b) => {
      let aValue: any = a[sortBy as keyof Brand];
      let bValue: any = b[sortBy as keyof Brand];
      
      if (sortBy === "displayOrder" || sortBy === "productCount") {
        aValue = Number(aValue);
        bValue = Number(bValue);
      }
      
      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredBrands(filtered);
  }, [brands, searchTerm, filterStatus, filterFeatured, sortBy, sortOrder]);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove accents
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .trim();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      slug: "",
      description: "",
      status: "active" as const,
      logo: "",
      website: "",
      displayOrder: "",
      featured: false
    });
    setEditingBrand(null);
  };

  const handleEdit = (brand: Brand) => {
    setEditingBrand(brand);
    setFormData({
      name: brand.name,
      slug: brand.slug,
      description: brand.description,
      status: brand.status,
      logo: brand.logo,
      website: brand.website,
      displayOrder: brand.displayOrder.toString(),
      featured: brand.featured
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.description) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    const slug = formData.slug || generateSlug(formData.name);
    const displayOrder = formData.displayOrder ? Number(formData.displayOrder) : (brands.length + 1);

    const brandData = {
      ...formData,
      slug,
      displayOrder,
      logo: formData.logo || "/placeholder.svg"
    };

    if (editingBrand) {
      // Update existing brand
      setBrands(prev => prev.map(b => 
        b.id === editingBrand.id 
          ? { ...b, ...brandData }
          : b
      ));
    } else {
      // Add new brand
      const newBrand: Brand = {
        ...brandData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split('T')[0],
        productCount: 0
      };
      setBrands(prev => [...prev, newBrand]);
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = (brandId: string) => {
    const brand = brands.find(b => b.id === brandId);
    if (brand && brand.productCount > 0) {
      alert("Impossible de supprimer une marque contenant des produits. Veuillez d'abord déplacer ou supprimer les produits.");
      return;
    }
    
    if (confirm("Êtes-vous sûr de vouloir supprimer cette marque ?")) {
      setBrands(prev => prev.filter(b => b.id !== brandId));
    }
  };

  const toggleFeatured = (brandId: string) => {
    setBrands(prev => prev.map(b => 
      b.id === brandId ? { ...b, featured: !b.featured } : b
    ));
  };

  const getStatusBadge = (status: string) => {
    return status === "active" 
      ? <Badge variant="default">Active</Badge>
      : <Badge variant="outline">Inactive</Badge>;
  };

  const getFeaturedBadge = (featured: boolean) => {
    return featured 
      ? <Badge variant="default" className="bg-yellow-500">⭐ En vedette</Badge>
      : <Badge variant="outline">Standard</Badge>;
  };

  return (
    <AdminLayout title="Gestion des marques" subtitle="Ajoutez, modifiez ou supprimez des marques pour organiser votre catalogue." actions={null}>
      <div className="min-h-screen bg-muted/30">
        {/* Header */}
        <div className="bg-white border-b border-border">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Gestion des Marques
                </h1>
                <p className="text-muted-foreground">
                  Gérez les marques de vos produits
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline" asChild>
                  <a href="/admin/dashboard">← Retour au tableau de bord</a>
                </Button>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={resetForm}>
                      <PlusIcon className="mr-2 h-4 w-4" />
                      Ajouter une marque
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>
                        {editingBrand ? "Modifier la marque" : "Ajouter une nouvelle marque"}
                      </DialogTitle>
                      <DialogDescription>
                        Remplissez les informations de la marque ci-dessous.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nom de la marque *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => {
                              const name = e.target.value;
                              setFormData({
                                ...formData, 
                                name,
                                slug: generateSlug(name)
                              });
                            }}
                            placeholder="Ex: Apple..."
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="slug">Slug URL</Label>
                          <Input
                            id="slug"
                            value={formData.slug}
                            onChange={(e) => setFormData({...formData, slug: e.target.value})}
                            placeholder="apple"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Description *</Label>
                        <Textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) => setFormData({...formData, description: e.target.value})}
                          placeholder="Description de la marque..."
                          rows={3}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="website">Site web</Label>
                          <Input
                            id="website"
                            value={formData.website}
                            onChange={(e) => setFormData({...formData, website: e.target.value})}
                            placeholder="https://example.com"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="displayOrder">Ordre d'affichage</Label>
                          <Input
                            id="displayOrder"
                            type="number"
                            value={formData.displayOrder}
                            onChange={(e) => setFormData({...formData, displayOrder: e.target.value})}
                            placeholder="1"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="status">Statut</Label>
                          <Select value={formData.status} onValueChange={(value: "active" | "inactive") => setFormData({...formData, status: value})}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="inactive">Inactive</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="featured">En vedette</Label>
                          <div className="flex items-center space-x-2 pt-2">
                            <input
                              type="checkbox"
                              id="featured"
                              checked={formData.featured}
                              onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                              className="h-4 w-4"
                            />
                            <Label htmlFor="featured" className="text-sm">
                              Afficher dans la navigation principale
                            </Label>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="logo">URL du logo</Label>
                        <Input
                          id="logo"
                          value={formData.logo}
                          onChange={(e) => setFormData({...formData, logo: e.target.value})}
                          placeholder="https://example.com/logo.jpg"
                        />
                      </div>
                    </div>

                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Annuler
                      </Button>
                      <Button onClick={handleSave}>
                        {editingBrand ? "Mettre à jour" : "Ajouter"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold">{brands.filter(b => b.status === "active").length}</div>
                <p className="text-xs text-muted-foreground">Marques actives</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold">{brands.filter(b => b.featured).length}</div>
                <p className="text-xs text-muted-foreground">En vedette</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold">{brands.reduce((sum, b) => sum + b.productCount, 0)}</div>
                <p className="text-xs text-muted-foreground">Total produits</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold">{Math.round(brands.reduce((sum, b) => sum + b.productCount, 0) / brands.length)}</div>
                <p className="text-xs text-muted-foreground">Produits/marque</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
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
                      placeholder="Nom ou description..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Statut</Label>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les statuts</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Vedette</Label>
                  <Select value={filterFeatured} onValueChange={setFilterFeatured}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes</SelectItem>
                      <SelectItem value="featured">En vedette</SelectItem>
                      <SelectItem value="not-featured">Standard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Trier par</Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="displayOrder">Ordre d'affichage</SelectItem>
                      <SelectItem value="name">Nom</SelectItem>
                      <SelectItem value="productCount">Nb produits</SelectItem>
                      <SelectItem value="createdAt">Date création</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Ordre</Label>
                  <Button
                    variant="outline"
                    onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                    className="w-full"
                  >
                    {sortOrder === "asc" ? (
                      <>
                        <ArrowUpIcon className="mr-2 h-4 w-4" />
                        Croissant
                      </>
                    ) : (
                      <>
                        <ArrowDownIcon className="mr-2 h-4 w-4" />
                        Décroissant
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Brands Table */}
          <Card>
            <CardHeader>
              <CardTitle>
                Marques ({filteredBrands.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Marque</TableHead>
                      <TableHead>Slug</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Vedette</TableHead>
                      <TableHead>Produits</TableHead>
                      <TableHead>Ordre</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBrands.map((brand) => (
                      <TableRow key={brand.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <img 
                              src={brand.logo} 
                              alt={brand.name}
                              className="w-10 h-10 rounded-lg object-cover"
                            />
                            <div>
                              <p className="font-medium">{brand.name}</p>
                              <p className="text-sm text-muted-foreground">{brand.description}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <code className="text-sm bg-muted px-2 py-1 rounded">
                            /{brand.slug}
                          </code>
                        </TableCell>
                        <TableCell>{getStatusBadge(brand.status)}</TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => toggleFeatured(brand.id)}
                          >
                            {getFeaturedBadge(brand.featured)}
                          </Button>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <BuildingStorefrontIcon className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{brand.productCount}</span>
                          </div>
                        </TableCell>
                        <TableCell>{brand.displayOrder}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-1">
                            {brand.website && (
                              <Button variant="ghost" size="icon" asChild>
                                <a href={brand.website} target="_blank" rel="noopener noreferrer">
                                  <EyeIcon className="h-4 w-4" />
                                </a>
                              </Button>
                            )}
                            <Button variant="ghost" size="icon" onClick={() => handleEdit(brand)}>
                              <PencilIcon className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleDelete(brand.id)}
                              className="text-red-500 hover:text-red-700"
                              disabled={brand.productCount > 0}
                            >
                              <TrashIcon className="h-4 w-4" />
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
        </div>
      </div>
    </AdminLayout>
  );
}
