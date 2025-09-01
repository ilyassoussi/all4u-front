import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AdminLayout  from "../../components/admin/AdminLayout";
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
  TagIcon
} from "@heroicons/react/24/outline";

// Mock categories data
const mockCategories = [
  {
    id: "1",
    name: "AirPods",
    slug: "airpods",
    description: "Écouteurs sans fil Apple et compatibles",
    status: "active" as const,
    image: "/placeholder.svg",
    productCount: 12,
    createdAt: "2024-01-01",
    displayOrder: 1
  },
  {
    id: "2", 
    name: "PowerBank",
    slug: "powerbank",
    description: "Batteries externes et chargeurs portables",
    status: "active" as const,
    image: "/placeholder.svg",
    productCount: 18,
    createdAt: "2024-01-01",
    displayOrder: 2
  },
  {
    id: "3",
    name: "Téléphones",
    slug: "telephones",
    description: "Smartphones et accessoires",
    status: "active" as const,
    image: "/placeholder.svg",
    productCount: 25,
    createdAt: "2024-01-01",
    displayOrder: 3
  },
  {
    id: "4",
    name: "Watch Électronique",
    slug: "watches",
    description: "Montres connectées et smartwatches",
    status: "active" as const,
    image: "/placeholder.svg",
    productCount: 8,
    createdAt: "2024-01-01",
    displayOrder: 4
  },
  {
    id: "5",
    name: "Chargeurs & Câbles",
    slug: "chargeurs-cables",
    description: "Accessoires de charge pour tous appareils",
    status: "active" as const,
    image: "/placeholder.svg",
    productCount: 32,
    createdAt: "2024-01-01",
    displayOrder: 5
  },
  {
    id: "6",
    name: "Pack",
    slug: "pack",
    description: "Packs et bundles d'accessoires",
    status: "active" as const,
    image: "/placeholder.svg",
    productCount: 6,
    createdAt: "2024-01-01",
    displayOrder: 6
  },
  {
    id: "7",
    name: "Cadeaux",
    slug: "cadeaux",
    description: "Idées cadeaux tech pour toutes occasions",
    status: "active" as const,
    image: "/placeholder.svg",
    productCount: 0,
    createdAt: "2024-01-01",
    displayOrder: 7
  }
];

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: "active" | "inactive";
  image: string;
  productCount: number;
  createdAt: string;
  displayOrder: number;
}

export default function CategoriesManagement() {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>(mockCategories);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("displayOrder");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    status: "active" as "active" | "inactive",
    image: "",
    displayOrder: ""
  });

  useEffect(() => {
    let filtered = categories.filter(category => {
      const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            category.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === "all" || category.status === filterStatus;
      
      return matchesSearch && matchesStatus;
    });

    // Sort categories
    filtered.sort((a, b) => {
      let aValue: any = a[sortBy as keyof Category];
      let bValue: any = b[sortBy as keyof Category];
      
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

    setFilteredCategories(filtered);
  }, [categories, searchTerm, filterStatus, sortBy, sortOrder]);

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
      status: "active",
      image: "",
      displayOrder: ""
    });
    setEditingCategory(null);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description,
      status: category.status,
      image: category.image,
      displayOrder: category.displayOrder.toString()
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.description) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    const slug = formData.slug || generateSlug(formData.name);
    const displayOrder = formData.displayOrder ? Number(formData.displayOrder) : (categories.length + 1);

    const categoryData = {
      ...formData,
      slug,
      displayOrder,
      image: formData.image || "/placeholder.svg"
    };

    if (editingCategory) {
      // Update existing category
      setCategories(prev => prev.map(c => 
        c.id === editingCategory.id 
          ? { ...c, ...categoryData }
          : c
      ));
    } else {
      // Add new category
      const newCategory: Category = {
        ...categoryData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split('T')[0],
        productCount: 0
      };
      setCategories(prev => [...prev, newCategory]);
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    if (category && category.productCount > 0) {
      alert("Impossible de supprimer une catégorie contenant des produits. Veuillez d'abord déplacer ou supprimer les produits.");
      return;
    }
    
    if (confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")) {
      setCategories(prev => prev.filter(c => c.id !== categoryId));
    }
  };

  const getStatusBadge = (status: string) => {
    return status === "active" 
      ? <Badge variant="default">Active</Badge>
      : <Badge variant="outline">Inactive</Badge>;
  };

  return (
    <AdminLayout title="Gestion des Categories" subtitle="Ajoutez, modifiez ou supprimez des marques pour organiser votre catalogue." actions={null}>
      <div className="min-h-screen bg-muted/30">
        {/* Header */}
        <div className="bg-white border-b border-border">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Gestion des Catégories
                </h1>
                <p className="text-muted-foreground">
                  Organisez et gérez les catégories de produits
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
                      Ajouter une catégorie
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>
                        {editingCategory ? "Modifier la catégorie" : "Ajouter une nouvelle catégorie"}
                      </DialogTitle>
                      <DialogDescription>
                        Remplissez les informations de la catégorie ci-dessous.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nom de la catégorie *</Label>
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
                            placeholder="Ex: PowerBank..."
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="slug">Slug URL</Label>
                          <Input
                            id="slug"
                            value={formData.slug}
                            onChange={(e) => setFormData({...formData, slug: e.target.value})}
                            placeholder="powerbank"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Description *</Label>
                        <Textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) => setFormData({...formData, description: e.target.value})}
                          placeholder="Description de la catégorie..."
                          rows={3}
                        />
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

                      <div className="space-y-2">
                        <Label htmlFor="image">URL de l'image</Label>
                        <Input
                          id="image"
                          value={formData.image}
                          onChange={(e) => setFormData({...formData, image: e.target.value})}
                          placeholder="https://example.com/image.jpg"
                        />
                      </div>
                    </div>

                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Annuler
                      </Button>
                      <Button onClick={handleSave}>
                        {editingCategory ? "Mettre à jour" : "Ajouter"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Filters and Search */}
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

          {/* Categories Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  Catégories ({filteredCategories.length})
                </CardTitle>
                <div className="text-sm text-muted-foreground">
                  Total: {categories.reduce((sum, c) => sum + c.productCount, 0)} produits
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Catégorie</TableHead>
                      <TableHead>Slug</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Produits</TableHead>
                      <TableHead>Ordre</TableHead>
                      <TableHead>Créée</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCategories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <img 
                              src={category.image} 
                              alt={category.name}
                              className="w-10 h-10 rounded-lg object-cover"
                            />
                            <div>
                              <p className="font-medium">{category.name}</p>
                              <p className="text-sm text-muted-foreground">{category.description}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <code className="text-sm bg-muted px-2 py-1 rounded">
                            /{category.slug}
                          </code>
                        </TableCell>
                        <TableCell>{getStatusBadge(category.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <TagIcon className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{category.productCount}</span>
                          </div>
                        </TableCell>
                        <TableCell>{category.displayOrder}</TableCell>
                        <TableCell>{category.createdAt}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-1">
                            <Button variant="ghost" size="icon" asChild>
                              <a href={`/categories/${category.slug}`} target="_blank">
                                <EyeIcon className="h-4 w-4" />
                              </a>
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleEdit(category)}>
                              <PencilIcon className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleDelete(category.id)}
                              className="text-red-500 hover:text-red-700"
                              disabled={category.productCount > 0}
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
