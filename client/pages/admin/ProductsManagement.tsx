import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
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
  ArrowDownIcon
} from "@heroicons/react/24/outline";

// Mock product data
const mockProducts: Product[] = [
  {
    id: "1",
    name: "AirPods Pro (2ème génération)",
    category: "AirPods",
    price: 2599,
    stock: 15,
    status: "active",
    image: "/placeholder.svg",
    description: "AirPods Pro avec réduction de bruit active",
    brand: "Apple",
    createdAt: "2024-01-15",
    sales: 125
  },
  {
    id: "2",
    name: "PowerBank Anker 20000mAh",
    category: "PowerBank",
    price: 459,
    stock: 3,
    status: "active",
    image: "/placeholder.svg",
    description: "PowerBank haute capacité avec charge rapide",
    brand: "Anker",
    createdAt: "2024-01-10",
    sales: 89
  },
  {
    id: "3",
    name: "iPhone 15 Pro 128GB",
    category: "Téléphones",
    price: 12999,
    stock: 1,
    status: "active",
    image: "/placeholder.svg",
    description: "iPhone 15 Pro avec puce A17 Pro",
    brand: "Apple",
    createdAt: "2024-01-08",
    sales: 45
  },
  {
    id: "4",
    name: "AirPods (3ème génération)",
    category: "AirPods",
    price: 1899,
    stock: 22,
    status: "active",
    image: "/placeholder.svg",
    description: "AirPods avec audio spatial",
    brand: "Apple",
    createdAt: "2024-01-05",
    sales: 67
  },
  {
    id: "5",
    name: "Chargeur USB-C 20W",
    category: "Chargeurs & Câbles",
    price: 89,
    stock: 0,
    status: "inactive",
    image: "/placeholder.svg",
    description: "Chargeur rapide USB-C officiel Apple",
    brand: "Apple",
    createdAt: "2024-01-01",
    sales: 234
  }
];

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "active" | "inactive";
  image: string;
  description: string;
  brand: string;
  createdAt: string;
  sales: number;
  features?: string;
  specifications?: string;
  images?: string[];
}

const categories = [
  "AirPods",
  "PowerBank", 
  "Téléphones",
  "Watch Électronique",
  "Chargeurs & Câbles",
  "Pack",
  "Cadeaux"
];

const brands = [
  "Apple",
  "Samsung",
  "Anker",
  "Belkin",
  "Aukey",
  "Ugreen",
  "Baseus"
];

export default function ProductsManagement() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [formData, setFormData] = useState({
  name: "",
  category: "",
  price: "",
  stock: "",
  status: "active" as "active" | "inactive",
  image: "",
  description: "",
  brand: "",
  features: "",
  specifications: "",
  images: [] as string[]
  });

  useEffect(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.brand.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === "all" || product.category === filterCategory;
      const matchesStatus = filterStatus === "all" || product.status === filterStatus;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });

    // Sort products
    filtered.sort((a, b) => {
      let aValue: any = a[sortBy as keyof Product];
      let bValue: any = b[sortBy as keyof Product];
      
      if (sortBy === "price" || sortBy === "stock" || sortBy === "sales") {
        aValue = Number(aValue);
        bValue = Number(bValue);
      }
      
      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchTerm, filterCategory, filterStatus, sortBy, sortOrder]);

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      price: "",
      stock: "",
      status: "active",
      image: "",
      description: "",
      brand: "",
      features: "",
      specifications: "",
      images: []
    });
    setEditingProduct(null);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
      status: product.status,
      image: product.image,
      description: product.description,
      brand: product.brand,
      features: product.features || "",
      specifications: product.specifications || "",
      images: Array.isArray(product.images) ? product.images : []
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.category || !formData.price || !formData.stock || !formData.brand) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    const productData = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
      image: formData.image || "/placeholder.svg",
      images: Array.isArray(formData.images) ? formData.images : []
    };

    if (editingProduct) {
      // Update existing product
      setProducts(prev => prev.map(p => 
        p.id === editingProduct.id 
          ? { ...p, ...productData }
          : p
      ));
    } else {
      // Add new product
      const newProduct: Product = {
        ...productData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split('T')[0],
        sales: 0
      };
      setProducts(prev => [newProduct, ...prev]);
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = (productId: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      setProducts(prev => prev.filter(p => p.id !== productId));
    }
  };

  const formatPrice = (price: number) => `${price.toLocaleString()} د.م.`;

  const getStockBadge = (stock: number) => {
    if (stock === 0) return <Badge variant="destructive">Rupture</Badge>;
    if (stock <= 5) return <Badge variant="secondary">Stock faible</Badge>;
    return <Badge variant="default">En stock</Badge>;
  };

  const getStatusBadge = (status: string) => {
    return status === "active" 
      ? <Badge variant="default">Actif</Badge>
      : <Badge variant="outline">Inactif</Badge>;
  };

  const headerActions = (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button onClick={resetForm}>
            <PlusIcon className="mr-2 h-4 w-4" />
            Ajouter un produit
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? "Modifier le produit" : "Ajouter un nouveau produit"}
            </DialogTitle>
            <DialogDescription>
              Remplissez les informations du produit ci-dessous.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom du produit *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Ex: AirPods Pro..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="brand">Marque *</Label>
                <Select value={formData.brand} onValueChange={(value) => setFormData({...formData, brand: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une marque" />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map(brand => (
                      <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Catégorie *</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Statut</Label>
                <Select value={formData.status} onValueChange={(value: "active" | "inactive") => setFormData({...formData, status: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Actif</SelectItem>
                    <SelectItem value="inactive">Inactif</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Prix (د.م.) *</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Stock *</Label>
                <Input
                  id="stock"
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({...formData, stock: e.target.value})}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Description détaillée du produit..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="features">Caractéristiques </Label>
              <Textarea
                id="features"
                value={formData.features || ""}
                onChange={(e) => setFormData({...formData, features: e.target.value})}
                placeholder="Ex: Bluetooth 5.3, IPX4, etc."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specifications">Spécifications </Label>
              <Textarea
                id="specifications"
                value={formData.specifications || ""}
                onChange={(e) => setFormData({...formData, specifications: e.target.value})}
                placeholder="Ex: Autonomie, Puce, Dimensions, etc."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="images">Images du produit (2 à 5 fichiers)</Label>
              <Input
                id="images"
                type="file"
                accept="image/*"
                multiple
                onChange={async (e) => {
                  const files = Array.from(e.target.files || []).slice(0, 5);
                  const imagesPromises = files.map(file => {
                    return new Promise<string>((resolve, reject) => {
                      const reader = new FileReader();
                      reader.onload = () => resolve(reader.result as string);
                      reader.onerror = reject;
                      reader.readAsDataURL(file);
                    });
                  });
                  const imagesBase64 = await Promise.all(imagesPromises);
                  setFormData({...formData, images: imagesBase64});
                }}
              />
              <div className="flex gap-2 mt-2">
                {Array.isArray(formData.images) && formData.images.map((img, idx) => (
                  <img key={idx} src={img} alt={`img${idx}`} className="h-12 w-12 object-cover rounded" />
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSave}>
              {editingProduct ? "Mettre à jour" : "Ajouter"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );

  return (
    <AdminLayout
      title="Gestion des Produits" 
      subtitle="Gérez votre catalogue de produits"
      actions={headerActions}
    >
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
                  placeholder="Nom ou marque..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Catégorie</Label>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
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
                  <SelectItem value="active">Actif</SelectItem>
                  <SelectItem value="inactive">Inactif</SelectItem>
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
                    <SelectItem value="price">Prix</SelectItem>
                    <SelectItem value="stock">Stock</SelectItem>
                    <SelectItem value="sales">Ventes</SelectItem>
                    <SelectItem value="createdAt">Date création</SelectItem>
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

      {/* Products Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              Produits ({filteredProducts.length})
            </CardTitle>
            <div className="text-sm text-muted-foreground">
              Total: {products.length} produits
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produit</TableHead>
                  <TableHead>Images</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Prix</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Ventes</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground">{product.brand}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {Array.isArray(product.images) && product.images.length > 0
                          ? product.images.slice(0, 3).map((img, idx) => (
                              <img key={idx} src={img} alt={`img${idx}`} className="h-10 w-10 object-cover rounded" />
                            ))
                          : (
                              <img src={product.image} alt={product.name} className="h-10 w-10 object-cover rounded" />
                            )}
                      </div>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell className="font-medium">{formatPrice(product.price)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span>{product.stock}</span>
                        {getStockBadge(product.stock)}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(product.status)}</TableCell>
                    <TableCell>{product.sales} vendus</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-1">
                        <Button variant="ghost" size="icon" asChild>
                          <a href={`/product/${product.id}`} target="_blank">
                            <EyeIcon className="h-4 w-4" />
                          </a>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(product)}>
                          <PencilIcon className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDelete(product.id)}
                          className="text-red-500 hover:text-red-700"
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
    </AdminLayout>
  );
}
