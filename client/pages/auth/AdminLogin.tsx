import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  ShieldCheckIcon,
  KeyIcon,
  ExclamationTriangleIcon
} from "@heroicons/react/24/outline";

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    adminKey: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [attempts, setAttempts] = useState(0);

  // Mock admin credentials - in real app, this would be handled securely
  const ADMIN_CREDENTIALS = {
    username: "admin@all4u.ma",
    password: "ALL4U_Admin_2024!",
    adminKey: "ALL4U_SECURE_KEY"
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    // Rate limiting - prevent brute force
    if (attempts >= 3) {
      setErrors({ general: "Trop de tentatives. Veuillez attendre 15 minutes." });
      return;
    }

    // Validation
    const newErrors: Record<string, string> = {};
    
    if (!formData.username.trim()) {
      newErrors.username = "L'identifiant administrateur est requis";
    }
    
    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    }
    
    if (!formData.adminKey.trim()) {
      newErrors.adminKey = "La clé d'administration est requise";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    
    // Simulate API call with admin verification
    setTimeout(() => {
      if (
        formData.username === ADMIN_CREDENTIALS.username &&
        formData.password === ADMIN_CREDENTIALS.password &&
        formData.adminKey === ADMIN_CREDENTIALS.adminKey
      ) {
        console.log("Admin login successful");
        setIsLoading(false);
        // In real app, redirect to admin dashboard
        window.location.href = "/admin/dashboard";
      } else {
        setAttempts(prev => prev + 1);
        setErrors({ 
          general: "Identifiants administrateur invalides. Accès refusé." 
        });
        setIsLoading(false);
        
        // Clear sensitive fields
        setFormData(prev => ({
          ...prev,
          password: "",
          adminKey: ""
        }));
      }
    }, 1500);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          {/* Security Warning */}
          <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="flex items-center space-x-2 text-orange-800">
              <ExclamationTriangleIcon className="h-5 w-5" />
              <span className="text-sm font-medium">Espace Administrateur Sécurisé</span>
            </div>
            <p className="text-xs text-orange-700 mt-1">
              Accès restreint au personnel autorisé uniquement. 
              Toutes les tentatives de connexion sont enregistrées.
            </p>
          </div>

          <Card className="border-red-200">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto bg-red-100 p-3 rounded-full w-fit">
                <ShieldCheckIcon className="h-8 w-8 text-red-600" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-foreground">
                  Administration ALL4U
                </CardTitle>
                <p className="text-muted-foreground mt-2">
                  Connexion sécurisée au back-office
                </p>
                <Badge variant="destructive" className="mt-2">
                  Accès Restreint
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* General Error */}
                {errors.general && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-700">{errors.general}</p>
                  </div>
                )}

                {/* Attempts Warning */}
                {attempts > 0 && (
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-700">
                      Tentative {attempts}/3. Après 3 échecs, l'accès sera bloqué.
                    </p>
                  </div>
                )}

                {/* Admin Username */}
                <div className="space-y-2">
                  <Label htmlFor="username">Identifiant Administrateur</Label>
                  <div className="relative">
                    <ShieldCheckIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="username"
                      type="text"
                      placeholder="admin@all4u.ma"
                      value={formData.username}
                      onChange={(e) => handleChange("username", e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                  {errors.username && (
                    <p className="text-sm text-destructive">{errors.username}</p>
                  )}
                </div>

                {/* Admin Password */}
                <div className="space-y-2">
                  <Label htmlFor="password">Mot de Passe Administrateur</Label>
                  <div className="relative">
                    <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Mot de passe sécurisé"
                      value={formData.password}
                      onChange={(e) => handleChange("password", e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-destructive">{errors.password}</p>
                  )}
                </div>

                {/* Admin Key */}
                <div className="space-y-2">
                  <Label htmlFor="adminKey">Clé d'Administration</Label>
                  <div className="relative">
                    <KeyIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="adminKey"
                      type="password"
                      placeholder="Clé de sécurité"
                      value={formData.adminKey}
                      onChange={(e) => handleChange("adminKey", e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                  {errors.adminKey && (
                    <p className="text-sm text-destructive">{errors.adminKey}</p>
                  )}
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full bg-red-600 hover:bg-red-700" 
                  size="lg"
                  disabled={isLoading || attempts >= 3}
                >
                  {isLoading ? "Vérification..." : "Accéder au Back-Office"}
                </Button>
              </form>

              {/* Demo Credentials (for development only) */}
              <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <h4 className="text-sm font-medium text-gray-800 mb-2">
                  🚀 Identifiants de démonstration :
                </h4>
                <div className="text-xs font-mono text-gray-600 space-y-1">
                  <p><strong>Identifiant :</strong> admin@all4u.ma</p>
                  <p><strong>Mot de passe :</strong> ALL4U_Admin_2024!</p>
                  <p><strong>Clé admin :</strong> ALL4U_SECURE_KEY</p>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  ⚠️ Ces identifiants sont uniquement pour la démonstration
                </p>
              </div>

              {/* Back to Store */}
              <div className="text-center">
                <a 
                  href="/" 
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  ← Retour à la boutique
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Security Features */}
          <div className="mt-6 text-center text-xs text-muted-foreground">
            <p>🔒 Connexion chiffrée SSL/TLS</p>
            <p>🛡️ Protection anti-brute force</p>
            <p>📊 Logs d'audit complets</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
