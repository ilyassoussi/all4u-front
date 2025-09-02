import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useCart } from "@/contexts/CartContext";
import { 
  ShoppingBagIcon,
  CreditCardIcon,
  TruckIcon,
  MapPinIcon,
  PhoneIcon,
  UserIcon,
  ShieldCheckIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowLeftIcon,
  BanknotesIcon
} from "@heroicons/react/24/outline";

interface DeliveryInfo {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  notes: string;
}

interface PaymentMethod {
  type: 'card' | 'cod';
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  cardHolder?: string;
}

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    city: "Khemisset",
    postalCode: "15000",
    notes: ""
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>({
    type: 'cod'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} د.م.`;
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};

    if (!deliveryInfo.firstName.trim()) newErrors.firstName = "Le prénom est requis";
    if (!deliveryInfo.lastName.trim()) newErrors.lastName = "Le nom est requis";
    if (!deliveryInfo.phone.trim()) newErrors.phone = "Le téléphone est requis";
    if (!deliveryInfo.email.trim()) newErrors.email = "L'email est requis";
    if (!deliveryInfo.address.trim()) newErrors.address = "L'adresse est requise";
    if (!deliveryInfo.city.trim()) newErrors.city = "La ville est requise";

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (deliveryInfo.email && !emailRegex.test(deliveryInfo.email)) {
      newErrors.email = "Format d'email invalide";
    }

    // Validation téléphone
    const phoneRegex = /^(\+212|0)[5-7][0-9]{8}$/;
    if (deliveryInfo.phone && !phoneRegex.test(deliveryInfo.phone.replace(/\s/g, ''))) {
      newErrors.phone = "Format de téléphone invalide (ex: 0612345678)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};

    if (paymentMethod.type === 'card') {
      if (!paymentMethod.cardNumber?.trim()) newErrors.cardNumber = "Numéro de carte requis";
      if (!paymentMethod.expiryDate?.trim()) newErrors.expiryDate = "Date d'expiration requise";
      if (!paymentMethod.cvv?.trim()) newErrors.cvv = "CVV requis";
      if (!paymentMethod.cardHolder?.trim()) newErrors.cardHolder = "Nom sur la carte requis";

      // Validation numéro de carte (simple)
      if (paymentMethod.cardNumber && paymentMethod.cardNumber.replace(/\s/g, '').length < 16) {
        newErrors.cardNumber = "Numéro de carte invalide";
      }

      // Validation CVV
      if (paymentMethod.cvv && paymentMethod.cvv.length < 3) {
        newErrors.cvv = "CVV invalide";
      }
    }

    if (!acceptedTerms) {
      newErrors.terms = "Vous devez accepter les conditions générales";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePlaceOrder = async () => {
    if (!validateStep2()) return;

    setIsProcessing(true);

    try {
      // Simulation d'appel API
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Générer numéro de commande
      const orderNum = `CMD-${Date.now().toString().slice(-6)}`;
      setOrderNumber(orderNum);

      // Vider le panier
      clearCart();

      // Marquer comme terminé
      setOrderComplete(true);
      setCurrentStep(4);
    } catch (error) {
      console.error('Erreur lors de la commande:', error);
      setErrors({ general: "Une erreur est survenue. Veuillez réessayer." });
    } finally {
      setIsProcessing(false);
    }
  };

  const updateDeliveryInfo = (field: keyof DeliveryInfo, value: string) => {
    setDeliveryInfo(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const updatePaymentMethod = (field: keyof PaymentMethod, value: string) => {
    setPaymentMethod(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  if (cart.items.length === 0 && !orderComplete) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <Card>
              <CardContent className="p-8">
                <ExclamationTriangleIcon className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-4">Panier vide</h2>
                <p className="text-muted-foreground mb-6">
                  Votre panier est vide. Ajoutez des produits avant de passer commande.
                </p>
                <Button onClick={() => navigate('/')}>
                  Retourner à l'accueil
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  if (orderComplete) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <Card>
              <CardContent className="p-8">
                <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-green-700 mb-4">Commande confirmée !</h2>
                <p className="text-muted-foreground mb-6">
                  Votre commande <strong>#{orderNumber}</strong> a été enregistrée avec succès.
                </p>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span>Numéro de commande:</span>
                      <span className="font-mono font-bold">{orderNumber}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Mode de paiement:</span>
                      <span>{paymentMethod.type === 'card' ? 'Carte bancaire' : 'Paiement à la livraison'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Livraison:</span>
                      <span>24-48h à {deliveryInfo.city}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button onClick={() => navigate('/orders')} className="w-full">
                    Suivre ma commande
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/')} className="w-full">
                    Continuer mes achats
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground mt-6">
                  Un email de confirmation vous sera envoyé à {deliveryInfo.email}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-muted/30 py-4">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-muted-foreground">
            <a href="/" className="hover:text-brand-600">Accueil</a> 
            <span className="mx-2">/</span>
            <a href="/cart" className="hover:text-brand-600">Panier</a>
            <span className="mx-2">/</span>
            <span className="text-foreground font-medium">Commande</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            {[
              { step: 1, title: "Livraison", icon: TruckIcon },
              { step: 2, title: "Paiement", icon: CreditCardIcon },
              { step: 3, title: "Confirmation", icon: CheckCircleIcon }
            ].map(({ step, title, icon: Icon }) => (
              <div key={step} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step 
                    ? 'bg-brand-500 border-brand-500 text-white' 
                    : 'border-gray-300 text-gray-400'
                }`}>
                  {currentStep > step ? (
                    <CheckCircleIcon className="h-5 w-5" />
                  ) : (
                    <Icon className="h-5 w-5" />
                  )}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  currentStep >= step ? 'text-brand-600' : 'text-gray-400'
                }`}>
                  {title}
                </span>
                {step < 3 && (
                  <div className={`w-24 h-1 mx-4 ${
                    currentStep > step ? 'bg-brand-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Delivery Information */}
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TruckIcon className="mr-2 h-5 w-5 text-brand-600" />
                    Informations de livraison
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Prénom *</Label>
                      <Input
                        id="firstName"
                        value={deliveryInfo.firstName}
                        onChange={(e) => updateDeliveryInfo('firstName', e.target.value)}
                        className={errors.firstName ? "border-red-500" : ""}
                      />
                      {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <Label htmlFor="lastName">Nom *</Label>
                      <Input
                        id="lastName"
                        value={deliveryInfo.lastName}
                        onChange={(e) => updateDeliveryInfo('lastName', e.target.value)}
                        className={errors.lastName ? "border-red-500" : ""}
                      />
                      {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Téléphone *</Label>
                      <Input
                        id="phone"
                        placeholder="0612345678"
                        value={deliveryInfo.phone}
                        onChange={(e) => updateDeliveryInfo('phone', e.target.value)}
                        className={errors.phone ? "border-red-500" : ""}
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="votre@email.com"
                        value={deliveryInfo.email}
                        onChange={(e) => updateDeliveryInfo('email', e.target.value)}
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Adresse complète *</Label>
                    <Textarea
                      id="address"
                      placeholder="Numéro, rue, quartier..."
                      value={deliveryInfo.address}
                      onChange={(e) => updateDeliveryInfo('address', e.target.value)}
                      className={errors.address ? "border-red-500" : ""}
                    />
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">Ville *</Label>
                      <Input
                        id="city"
                        value={deliveryInfo.city}
                        onChange={(e) => updateDeliveryInfo('city', e.target.value)}
                        className={errors.city ? "border-red-500" : ""}
                      />
                      {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Code postal</Label>
                      <Input
                        id="postalCode"
                        value={deliveryInfo.postalCode}
                        onChange={(e) => updateDeliveryInfo('postalCode', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="notes">Notes de livraison (optionnel)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Instructions spéciales, point de repère..."
                      value={deliveryInfo.notes}
                      onChange={(e) => updateDeliveryInfo('notes', e.target.value)}
                    />
                  </div>

                  <Alert>
                    <ClockIcon className="h-4 w-4" />
                    <AlertDescription>
                      Livraison gratuite à Khemisset sous 24-48h. Pour les autres villes, nous vous contacterons pour confirmer.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Payment Method */}
            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCardIcon className="mr-2 h-5 w-5 text-brand-600" />
                    Mode de paiement
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <RadioGroup 
                    value={paymentMethod.type} 
                    onValueChange={(value) => setPaymentMethod({ type: value as 'card' | 'cod' })}
                  >
                    {/* Paiement à la livraison */}
                    <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/50">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod" className="flex-1 cursor-pointer">
                        <div className="flex items-center space-x-3">
                          <BanknotesIcon className="h-6 w-6 text-green-600" />
                          <div>
                            <div className="font-medium">Paiement à la livraison</div>
                            <div className="text-sm text-muted-foreground">
                              Payez en espèces à la réception de votre commande
                            </div>
                          </div>
                        </div>
                      </Label>
                    </div>

                    {/* Carte bancaire */}
                    <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/50">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex-1 cursor-pointer">
                        <div className="flex items-center space-x-3">
                          <CreditCardIcon className="h-6 w-6 text-blue-600" />
                          <div>
                            <div className="font-medium">Carte bancaire</div>
                            <div className="text-sm text-muted-foreground">
                              Paiement sécurisé par carte Visa/Mastercard
                            </div>
                          </div>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>

                  {/* Card details form */}
                  {paymentMethod.type === 'card' && (
                    <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
                      <div>
                        <Label htmlFor="cardHolder">Nom sur la carte *</Label>
                        <Input
                          id="cardHolder"
                          placeholder="NOM PRENOM"
                          value={paymentMethod.cardHolder || ''}
                          onChange={(e) => updatePaymentMethod('cardHolder', e.target.value.toUpperCase())}
                          className={errors.cardHolder ? "border-red-500" : ""}
                        />
                        {errors.cardHolder && <p className="text-red-500 text-sm mt-1">{errors.cardHolder}</p>}
                      </div>

                      <div>
                        <Label htmlFor="cardNumber">Numéro de carte *</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={paymentMethod.cardNumber || ''}
                          onChange={(e) => {
                            const formatted = e.target.value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
                            updatePaymentMethod('cardNumber', formatted);
                          }}
                          maxLength={19}
                          className={errors.cardNumber ? "border-red-500" : ""}
                        />
                        {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Date d'expiration *</Label>
                          <Input
                            id="expiryDate"
                            placeholder="MM/AA"
                            value={paymentMethod.expiryDate || ''}
                            onChange={(e) => {
                              let value = e.target.value.replace(/\D/g, '');
                              if (value.length >= 2) {
                                value = value.substring(0, 2) + '/' + value.substring(2, 4);
                              }
                              updatePaymentMethod('expiryDate', value);
                            }}
                            maxLength={5}
                            className={errors.expiryDate ? "border-red-500" : ""}
                          />
                          {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV *</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            value={paymentMethod.cvv || ''}
                            onChange={(e) => updatePaymentMethod('cvv', e.target.value.replace(/\D/g, ''))}
                            maxLength={4}
                            className={errors.cvv ? "border-red-500" : ""}
                          />
                          {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                        </div>
                      </div>

                      <Alert>
                        <ShieldCheckIcon className="h-4 w-4" />
                        <AlertDescription>
                          Vos informations bancaires sont cryptées et sécurisées. Nous ne stockons aucune donnée de carte.
                        </AlertDescription>
                      </Alert>
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="terms" 
                      checked={acceptedTerms}
                      onCheckedChange={(checked) => {
                        setAcceptedTerms(checked as boolean);
                        if (errors.terms) {
                          setErrors(prev => ({ ...prev, terms: "" }));
                        }
                      }}
                    />
                    <Label htmlFor="terms" className="text-sm">
                      J'accepte les <a href="/terms" className="text-brand-600 hover:underline">conditions générales</a> et la 
                      <a href="/privacy" className="text-brand-600 hover:underline ml-1">politique de confidentialité</a>
                    </Label>
                  </div>
                  {errors.terms && <p className="text-red-500 text-sm">{errors.terms}</p>}
                </CardContent>
              </Card>
            )}

            {/* Step 3: Order Confirmation */}
            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircleIcon className="mr-2 h-5 w-5 text-brand-600" />
                    Confirmation de commande
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Delivery Info Summary */}
                  <div>
                    <h3 className="font-medium mb-3 flex items-center">
                      <MapPinIcon className="h-4 w-4 mr-2" />
                      Adresse de livraison
                    </h3>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <p className="font-medium">{deliveryInfo.firstName} {deliveryInfo.lastName}</p>
                      <p>{deliveryInfo.address}</p>
                      <p>{deliveryInfo.city} {deliveryInfo.postalCode}</p>
                      <p className="flex items-center mt-2">
                        <PhoneIcon className="h-4 w-4 mr-2" />
                        {deliveryInfo.phone}
                      </p>
                    </div>
                  </div>

                  {/* Payment Method Summary */}
                  <div>
                    <h3 className="font-medium mb-3 flex items-center">
                      <CreditCardIcon className="h-4 w-4 mr-2" />
                      Mode de paiement
                    </h3>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      {paymentMethod.type === 'cod' ? (
                        <div className="flex items-center">
                          <BanknotesIcon className="h-5 w-5 mr-2 text-green-600" />
                          <span>Paiement à la livraison</span>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <CreditCardIcon className="h-5 w-5 mr-2 text-blue-600" />
                          <span>Carte bancaire ****{paymentMethod.cardNumber?.slice(-4)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {errors.general && (
                    <Alert variant="destructive">
                      <ExclamationTriangleIcon className="h-4 w-4" />
                      <AlertDescription>{errors.general}</AlertDescription>
                    </Alert>
                  )}

                  <Button 
                    onClick={handlePlaceOrder} 
                    disabled={isProcessing}
                    className="w-full bg-brand-500 hover:bg-brand-600"
                    size="lg"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Traitement en cours...
                      </>
                    ) : (
                      <>
                        <ShoppingBagIcon className="mr-2 h-4 w-4" />
                        Confirmer la commande
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Navigation Buttons */}
            {currentStep < 3 && (
              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={currentStep === 1 ? () => navigate('/cart') : handlePreviousStep}
                >
                  <ArrowLeftIcon className="mr-2 h-4 w-4" />
                  {currentStep === 1 ? 'Retour au panier' : 'Précédent'}
                </Button>
                <Button onClick={handleNextStep} className="bg-brand-500 hover:bg-brand-600">
                  Suivant
                  <ArrowLeftIcon className="ml-2 h-4 w-4 rotate-180" />
                </Button>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Récapitulatif</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Products */}
                <div className="space-y-3">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex space-x-3">
                      <img 
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qté: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Sous-total</span>
                    <span>{formatPrice(cart.total)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Livraison</span>
                    <span className="text-green-600 font-medium">Gratuite</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>TVA incluse</span>
                    <span>{formatPrice(cart.total * 0.2)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(cart.total)}</span>
                </div>

                <div className="text-center text-xs text-muted-foreground space-y-1">
                  <p>✓ Livraison gratuite</p>
                  <p>✓ Garantie officielle</p>
                  <p>✓ Paiement sécurisé</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
