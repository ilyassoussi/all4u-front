import { 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon,
  CreditCardIcon,
  TruckIcon,
  ShieldCheckIcon
} from "@heroicons/react/24/outline";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      {/* Main footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-brand-500 text-white px-3 py-2 rounded-lg font-bold text-xl">
                ALL4U
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Votre destination pour tous vos besoins électroniques au Maroc. 
              Nous offrons les dernières technologies à des prix compétitifs avec 
              une livraison rapide à Khemisset et dans tout le Maroc.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-slate-300">
                <MapPinIcon className="h-4 w-4" />
                <span>Khemisset, Maroc</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-300">
                <PhoneIcon className="h-4 w-4" />
                <span>+212 661 51 21 21</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-300">
                <EnvelopeIcon className="h-4 w-4" />
                <span>contact@all4u.ma</span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Catégories</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><a href="/categories/airpods" className="hover:text-brand-400 transition-colors">AirPods</a></li>
              <li><a href="/categories/powerbank" className="hover:text-brand-400 transition-colors">PowerBank</a></li>
              <li><a href="/categories/telephones" className="hover:text-brand-400 transition-colors">Téléphones</a></li>
              <li><a href="/categories/watches" className="hover:text-brand-400 transition-colors">Watch Électronique</a></li>
              <li><a href="/categories/pack" className="hover:text-brand-400 transition-colors">Pack</a></li>
              <li><a href="/categories/cadeau" className="hover:text-brand-400 transition-colors">Cadeau</a></li>
              <li><a href="/categories/chargeurs-cables" className="hover:text-brand-400 transition-colors">Chargeurs & Câbles</a></li>
            </ul>
          </div>

          {/* Customer service */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Service Client</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><a href="/account" className="hover:text-brand-400 transition-colors">Mon Compte</a></li>
              <li><a href="/orders" className="hover:text-brand-400 transition-colors">Mes Commandes</a></li>
              <li><a href="/wishlist" className="hover:text-brand-400 transition-colors">Liste de Souhaits</a></li>
              <li><a href="/support" className="hover:text-brand-400 transition-colors">Support & SAV</a></li>
              <li><a href="/shipping" className="hover:text-brand-400 transition-colors">Livraison</a></li>
              <li><a href="/returns" className="hover:text-brand-400 transition-colors">Retours</a></li>
              <li><a href="/contact" className="hover:text-brand-400 transition-colors">Nous Contacter</a></li>
            </ul>
          </div>

          {/* Legal & company */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">ALL4U</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><a href="/about" className="hover:text-brand-400 transition-colors">À Propos</a></li>
              <li><a href="/careers" className="hover:text-brand-400 transition-colors">Carrières</a></li>
              <li><a href="/press" className="hover:text-brand-400 transition-colors">Presse</a></li>
              <li><a href="/terms" className="hover:text-brand-400 transition-colors">Conditions Générales</a></li>
              <li><a href="/privacy" className="hover:text-brand-400 transition-colors">Politique de Confidentialité</a></li>
              <li><a href="/cookies" className="hover:text-brand-400 transition-colors">Politique des Cookies</a></li>
            </ul>
          </div>
        </div>

        {/* Features */}
        <div className="mt-12 pt-8 border-t border-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3 text-slate-300">
              <div className="bg-brand-500/20 p-2 rounded-lg">
                <TruckIcon className="h-6 w-6 text-brand-400" />
              </div>
              <div>
                <div className="font-medium text-white">Livraison Gratuite</div>
                <div className="text-sm">À Khemisset - Délai 24-48h</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-slate-300">
              <div className="bg-brand-500/20 p-2 rounded-lg">
                <ShieldCheckIcon className="h-6 w-6 text-brand-400" />
              </div>
              <div>
                <div className="font-medium text-white">Garantie Officielle</div>
                <div className="text-sm">Produits authentiques garantis</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-slate-300">
              <div className="bg-brand-500/20 p-2 rounded-lg">
                <CreditCardIcon className="h-6 w-6 text-brand-400" />
              </div>
              <div>
                <div className="font-medium text-white">Paiement Sécurisé</div>
                <div className="text-sm">Carte bancaire & COD</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-700 bg-slate-950">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
            <div className="text-sm text-slate-400">
              © 2024 ALL4U Electronics Store. Tous droits réservés.
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-sm text-slate-400">
                Paiements acceptés:
              </div>
              <div className="flex items-center space-x-2">
                <div className="bg-white rounded px-2 py-1 text-xs font-medium text-slate-900">
                  VISA
                </div>
                <div className="bg-white rounded px-2 py-1 text-xs font-medium text-slate-900">
                  MC
                </div>
                <div className="bg-white rounded px-2 py-1 text-xs font-medium text-slate-900">
                  COD
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
