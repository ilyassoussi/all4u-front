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
  PlayIcon,
  PauseIcon
} from "@heroicons/react/24/outline";
import AdminLayout from "@/components/admin/AdminLayout";

// Mock slider data
const mockSlides = [
  {
    id: "1",
    title: "AirPods Pro - Nouvelle génération",
    subtitle: "Son immersif avec réduction de bruit active",
    description: "Découvrez l'excellence audio avec les nouveaux AirPods Pro",
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=1200&h=600&fit=crop",
    buttonText: "Découvrir",
    buttonLink: "/categories/airpods",
    isActive: true,
    displayOrder: 1,
    backgroundColor: "#1a1a2e",
    textColor: "#ffffff",
    createdAt: "2024-01-15"
  },
  {
    id: "2",
    title: "PowerBank Anker - Jusqu'à 50% de réduction",
    subtitle: "Charge ultra-rapide pour tous vos appareils",
    description: "Ne tombez plus jamais en panne de batterie",
    image: "https://images.unsplash.com/photo-1609592806955-d2e18cb9df7e?w=1200&h=600&fit=crop",
    buttonText: "Voir les offres",
    buttonLink: "/categories/powerbank",
    isActive: true,
    displayOrder: 2,
    backgroundColor: "#16213e",
    textColor: "#ffffff",
    createdAt: "2024-01-14"
  },
  {
    id: "3",
    title: "Smartphones dernière génération",
    subtitle: "iPhone, Samsung, Xiaomi disponibles",
    description: "Les meilleurs smartphones du marché avec garantie officielle",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop",
    buttonText: "Explorer",
    buttonLink: "/categories/telephones",
    isActive: true,
    displayOrder: 3,
    backgroundColor: "#0f1419",
    textColor: "#ffffff",
    createdAt: "2024-01-13"
  },
  {
    id: "4",
    title: "Montres connectées Apple Watch",
    subtitle: "Restez connecté à votre santé",
    description: "Apple Watch Series 9 avec nouvelles fonctionnalités",
    image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=1200&h=600&fit=crop",
    buttonText: "Acheter maintenant",
    buttonLink: "/categories/watches",
    isActive: false,
    displayOrder: 4,
    backgroundColor: "#2d1b69",
    textColor: "#ffffff",
    createdAt: "2024-01-12"
  }
];

interface Slide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  isActive: boolean;
  displayOrder: number;
  backgroundColor: string;
  textColor: string;
  createdAt: string;
}

export default function SliderManagement() {
  const [slides, setSlides] = useState<Slide[]>(mockSlides);
  const [filteredSlides, setFilteredSlides] = useState<Slide[]>(mockSlides);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("displayOrder");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<Slide | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    image: "",
    buttonText: "",
    buttonLink: "",
    isActive: true,
    displayOrder: "",
    backgroundColor: "#1a1a2e",
    textColor: "#ffffff"
  });

  useEffect(() => {
    let filtered = slides.filter(slide => {
      const matchesSearch = slide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           slide.subtitle.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === "all" || 
                           (filterStatus === "active" && slide.isActive) ||
                           (filterStatus === "inactive" && !slide.isActive);
      
      return matchesSearch && matchesStatus;
    });

    // Sort slides
    filtered.sort((a, b) => {
      let aValue: any = a[sortBy as keyof Slide];
      let bValue: any = b[sortBy as keyof Slide];
      
      if (sortBy === "displayOrder") {
        aValue = Number(aValue);
        bValue = Number(bValue);
      }
      
      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredSlides(filtered);
  }, [slides, searchTerm, filterStatus, sortBy, sortOrder]);

  const resetForm = () => {
    setFormData({
      title: "",
      subtitle: "",
      description: "",
      image: "",
      buttonText: "",
      buttonLink: "",
      isActive: true,
      displayOrder: "",
      backgroundColor: "#1a1a2e",
      textColor: "#ffffff"
    });
    setEditingSlide(null);
  };

  const handleEdit = (slide: Slide) => {
    setEditingSlide(slide);
    setFormData({
      title: slide.title,
      subtitle: slide.subtitle,
      description: slide.description,
      image: slide.image,
      buttonText: slide.buttonText,
      buttonLink: slide.buttonLink,
      isActive: slide.isActive,
      displayOrder: slide.displayOrder.toString(),
      backgroundColor: slide.backgroundColor,
      textColor: slide.textColor
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.title || !formData.image) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    const displayOrder = formData.displayOrder ? Number(formData.displayOrder) : (slides.length + 1);

    const slideData = {
      ...formData,
      displayOrder
    };

    if (editingSlide) {
      // Update existing slide
      setSlides(prev => prev.map(s => 
        s.id === editingSlide.id 
          ? { ...s, ...slideData }
          : s
      ));
    } else {
      // Add new slide
      const newSlide: Slide = {
        ...slideData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split('T')[0]
      };
      setSlides(prev => [...prev, newSlide]);
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = (slideId: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce slide ?")) {
      setSlides(prev => prev.filter(s => s.id !== slideId));
    }
  };

  const toggleActive = (slideId: string) => {
    setSlides(prev => prev.map(s => 
      s.id === slideId ? { ...s, isActive: !s.isActive } : s
    ));
  };

  const getStatusBadge = (isActive: boolean) => {
    return isActive 
      ? <Badge variant="default">Actif</Badge>
      : <Badge variant="outline">Inactif</Badge>;
  };

  return (
    <AdminLayout title="Gestion du slider" subtitle="Ajoutez, modifiez ou supprimez les images du slider d'accueil." actions={null}>
      <div className="min-h-screen bg-muted/30">
        {/* Header */}
        <div className="bg-white border-b border-border">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Gestion du Slider
                </h1>
                <p className="text-muted-foreground">
                  Gérez les images et contenus du slider principal
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline" asChild>
                  <a href="/admin/dashboard">← Retour au tableau de bord</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/" target="_blank">
                    <EyeIcon className="mr-2 h-4 w-4" />
                    Aperçu en direct
                  </a>
                </Button>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={resetForm}>
                      <PlusIcon className="mr-2 h-4 w-4" />
                      Ajouter un slide
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>
                        {editingSlide ? "Modifier le slide" : "Ajouter un nouveau slide"}
                      </DialogTitle>
                      <DialogDescription>
                        Configurez le contenu et l'apparence de votre slide.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="grid gap-6 py-4">
                      {/* Preview */}
                      <div 
                        className="relative h-48 rounded-lg overflow-hidden"
                        style={{ backgroundColor: formData.backgroundColor }}
                      >
                        {formData.image && (
                          <img 
                            src={formData.image}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        )}
                        <div className="absolute inset-0 bg-black/40 flex items-center">
                          <div className="px-8">
                            <h2 
                              className="text-2xl font-bold mb-2"
                              style={{ color: formData.textColor }}
                            >
                              {formData.title || "Titre du slide"}
                            </h2>
                            <p 
                              className="text-lg mb-1"
                              style={{ color: formData.textColor }}
                            >
                              {formData.subtitle || "Sous-titre"}
                            </p>
                            <p 
                              className="text-sm opacity-80 mb-4"
                              style={{ color: formData.textColor }}
                            >
                              {formData.description || "Description"}
                            </p>
                            {formData.buttonText && (
                              <Button>{formData.buttonText}</Button>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Form Fields */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="title">Titre *</Label>
                          <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                            placeholder="Titre principal du slide"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subtitle">Sous-titre</Label>
                          <Input
                            id="subtitle"
                            value={formData.subtitle}
                            onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
                            placeholder="Sous-titre du slide"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) => setFormData({...formData, description: e.target.value})}
                          placeholder="Description détaillée..."
                          rows={2}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="image">URL de l'image *</Label>
                        <Input
                          id="image"
                          value={formData.image}
                          onChange={(e) => setFormData({...formData, image: e.target.value})}
                          placeholder="https://example.com/image.jpg"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="buttonText">Texte du bouton</Label>
                          <Input
                            id="buttonText"
                            value={formData.buttonText}
                            onChange={(e) => setFormData({...formData, buttonText: e.target.value})}
                            placeholder="Découvrir"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="buttonLink">Lien du bouton</Label>
                          <Input
                            id="buttonLink"
                            value={formData.buttonLink}
                            onChange={(e) => setFormData({...formData, buttonLink: e.target.value})}
                            placeholder="/categories/produits"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="backgroundColor">Couleur de fond</Label>
                          <Input
                            id="backgroundColor"
                            type="color"
                            value={formData.backgroundColor}
                            onChange={(e) => setFormData({...formData, backgroundColor: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="textColor">Couleur du texte</Label>
                          <Input
                            id="textColor"
                            type="color"
                            value={formData.textColor}
                            onChange={(e) => setFormData({...formData, textColor: e.target.value})}
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

                      <div className="space-y-2">
                        <Label htmlFor="isActive">Statut</Label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="isActive"
                            checked={formData.isActive}
                            onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                            className="h-4 w-4"
                          />
                          <Label htmlFor="isActive" className="text-sm">
                            Slide actif (affiché dans le slider)
                          </Label>
                        </div>
                      </div>
                    </div>

                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Annuler
                      </Button>
                      <Button onClick={handleSave}>
                        {editingSlide ? "Mettre à jour" : "Ajouter"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold">{slides.length}</div>
                <p className="text-xs text-muted-foreground">Total slides</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-600">{slides.filter(s => s.isActive).length}</div>
                <p className="text-xs text-muted-foreground">Slides actifs</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-red-600">{slides.filter(s => !s.isActive).length}</div>
                <p className="text-xs text-muted-foreground">Slides inactifs</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-blue-600">
                  {slides.filter(s => s.isActive).length > 0 ? "Auto" : "Manuel"}
                </div>
                <p className="text-xs text-muted-foreground">Mode rotation</p>
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
                      placeholder="Titre ou sous-titre..."
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
                      <SelectItem value="active">Actif</SelectItem>
                      <SelectItem value="inactive">Inactif</SelectItem>
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
                      <SelectItem value="title">Titre</SelectItem>
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

          {/* Slides Table */}
          <Card>
            <CardHeader>
              <CardTitle>
                Slides ({filteredSlides.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Slide</TableHead>
                      <TableHead>Contenu</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Ordre</TableHead>
                      <TableHead>Créé</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSlides.map((slide) => (
                      <TableRow key={slide.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <img 
                              src={slide.image} 
                              alt={slide.title}
                              className="w-16 h-10 rounded object-cover"
                            />
                            <div>
                              <p className="font-medium">{slide.title}</p>
                              <p className="text-sm text-muted-foreground">{slide.subtitle}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm">{slide.description}</p>
                            {slide.buttonText && (
                              <Badge variant="outline" className="mt-1 text-xs">
                                {slide.buttonText} → {slide.buttonLink}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => toggleActive(slide.id)}
                          >
                            {getStatusBadge(slide.isActive)}
                          </Button>
                        </TableCell>
                        <TableCell>{slide.displayOrder}</TableCell>
                        <TableCell>{slide.createdAt}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-1">
                            <Button variant="ghost" size="icon" onClick={() => handleEdit(slide)}>
                              <PencilIcon className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleDelete(slide.id)}
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
        </div>
      </div>
    </AdminLayout>
  );
}
