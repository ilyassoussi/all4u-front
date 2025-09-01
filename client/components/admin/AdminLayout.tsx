import { useState, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Bars3Icon,
  XMarkIcon,
  BellIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  MagnifyingGlassIcon,
  HomeIcon,
  ShoppingBagIcon,
  TagIcon,
  BuildingStorefrontIcon,
  PhotoIcon,
  ShoppingCartIcon,
  UsersIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  QuestionMarkCircleIcon
} from "@heroicons/react/24/outline";

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}

interface MenuItem {
  id: string;
  label: string;
  icon: any;
  href: string;
  badge?: string;
  submenu?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    id: "dashboard",
    label: "Tableau de bord",
    icon: HomeIcon,
    href: "/admin/dashboard"
  },
  {
    id: "catalog",
    label: "Catalogue",
    icon: ShoppingBagIcon,
    href: "#",
    submenu: [
      { id: "products", label: "Produits", icon: ShoppingBagIcon, href: "/admin/products" },
      { id: "categories", label: "Catégories", icon: TagIcon, href: "/admin/categories" },
      { id: "brands", label: "Marques", icon: BuildingStorefrontIcon, href: "/admin/brands" }
    ]
  },
  {
    id: "slider",
    label: "Slider",
    icon: PhotoIcon,
    href: "/admin/slider"
  },
  {
    id: "orders",
    label: "Commandes",
    icon: ShoppingCartIcon,
    href: "/admin/orders",
    badge: "3"
  },
  {
    id: "customers",
    label: "Clients",
    icon: UsersIcon,
    href: "/admin/customers"
  },
  {
    id: "promotions",
    label: "Promotions & Coupons",
    icon: CurrencyDollarIcon,
    href: "/admin/promotions"
  },
  {
    id: "stats",
    label: "Statistiques",
    icon: ChartBarIcon,
    href: "#",
    submenu: [
      { id: "analytics", label: "Analytics", icon: ChartBarIcon, href: "/admin/analytics" },
      { id: "reports", label: "Rapports", icon: DocumentTextIcon, href: "/admin/reports" }
    ]
  },
  {
    id: "settings",
    label: "Paramètres",
    icon: Cog6ToothIcon,
    href: "/admin/settings"
  }
];

export default function AdminLayout({ children, title, subtitle, actions }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const [notifications] = useState(3);

  const toggleSubmenu = (menuId: string) => {
    setExpandedMenus(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  const renderMenuItem = (item: MenuItem, depth = 0) => {
    const hasSubmenu = item.submenu && item.submenu.length > 0;
    const isExpanded = expandedMenus.includes(item.id);
    const IconComponent = item.icon;

    return (
      <div key={item.id}>
        <div
          className={`
            group flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg cursor-pointer
            transition-all duration-200 
            ${depth > 0 ? 'ml-6 text-admin-300 hover:text-white hover:bg-admin-600' : 'text-admin-200 hover:text-white hover:bg-admin-600'}
            ${window.location.pathname === item.href ? 'bg-admin-600 text-white' : ''}
          `}
          onClick={() => hasSubmenu ? toggleSubmenu(item.id) : window.location.href = item.href}
        >
          <div className="flex items-center space-x-3">
            <IconComponent className={`h-5 w-5 ${depth > 0 ? 'h-4 w-4' : ''}`} />
            <span className={sidebarOpen ? 'block' : 'hidden lg:block'}>{item.label}</span>
          </div>
          <div className="flex items-center space-x-2">
            {item.badge && (
              <Badge className="bg-red-500 text-white text-xs px-1.5 py-0.5">
                {item.badge}
              </Badge>
            )}
            {hasSubmenu && (
              <svg
                className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </div>
        </div>
        
        {hasSubmenu && isExpanded && (
          <div className="mt-1 space-y-1">
            {item.submenu?.map(subItem => renderMenuItem(subItem, 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-admin-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-admin-800 transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } ${sidebarOpen ? 'lg:w-72' : 'lg:w-16'}`}>
        
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 bg-admin-900">
          <div className={`flex items-center space-x-3 ${sidebarOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <div className={sidebarOpen ? 'block' : 'hidden lg:block'}>
              <h1 className="text-white font-bold text-lg">ALL4U Admin</h1>
              <p className="text-admin-300 text-xs">Gestion boutique</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-admin-300 hover:text-white hover:bg-admin-700 lg:hidden"
          >
            <XMarkIcon className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {menuItems.map(item => renderMenuItem(item))}
        </nav>

        {/* Bottom section */}
        <div className="p-4 border-t border-admin-700">
          <div className={`${sidebarOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-admin-700 rounded-lg p-3 mb-3">
              <p className="text-admin-200 text-xs font-medium mb-1">Système</p>
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-admin-300">Opérationnel</span>
              </div>
            </div>
          </div>
          
          <Button
            variant="ghost"
            className="w-full justify-start text-admin-300 hover:text-white hover:bg-admin-700"
            asChild
          >
            <a href="/" target="_blank">
              <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3" />
              <span className={sidebarOpen ? 'block' : 'hidden lg:block'}>Voir la boutique</span>
            </a>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-72' : 'lg:ml-16'}`}>
        {/* Header */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-500 hover:text-gray-700"
            >
              <Bars3Icon className="h-5 w-5" />
            </Button>
            
            <div>
              <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
              {subtitle && (
                <p className="text-sm text-gray-500">{subtitle}</p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative hidden md:block">
              <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Rechercher..."
                className="pl-9 w-80"
              />
            </div>

            {/* Actions */}
            {actions && (
              <div className="flex items-center space-x-2">
                {actions}
              </div>
            )}

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <BellIcon className="h-5 w-5" />
              {notifications > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center p-0">
                  {notifications}
                </Badge>
              )}
            </Button>

            {/* User Menu */}
            <div className="flex items-center space-x-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">admin@all4u.ma</p>
              </div>
              <Button variant="ghost" size="sm">
                <UserCircleIcon className="h-8 w-8" />
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>

      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
