import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { toast } from "@/components/ui/use-toast";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: Review[];
  brand: string;
  category: string;
  inStock: boolean;
  features: string[];
  description?: string;
  specifications?: Record<string, string>;
}

interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
  itemsCount: number;
}

export interface WishlistState {
  items: Product[];
  itemsCount: number;
}

type CartAction =
  | { type: 'ADD_TO_CART'; product: Product }
  | { type: 'REMOVE_FROM_CART'; productId: number }
  | { type: 'UPDATE_QUANTITY'; productId: number; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; items: CartItem[] };

type WishlistAction =
  | { type: 'ADD_TO_WISHLIST'; product: Product }
  | { type: 'REMOVE_FROM_WISHLIST'; productId: number }
  | { type: 'CLEAR_WISHLIST' }
  | { type: 'LOAD_WISHLIST'; items: Product[] };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(item => item.id === action.product.id);
      
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.id === action.product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        const total = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const itemsCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
        
        return { items: updatedItems, total, itemsCount };
      }
      
      const newItems = [...state.items, { ...action.product, quantity: 1 }];
      const total = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const itemsCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
      
      return { items: newItems, total, itemsCount };
    }
    
    case 'REMOVE_FROM_CART': {
      const newItems = state.items.filter(item => item.id !== action.productId);
      const total = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const itemsCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
      
      return { items: newItems, total, itemsCount };
    }
    
    case 'UPDATE_QUANTITY': {
      if (action.quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_FROM_CART', productId: action.productId });
      }
      
      const updatedItems = state.items.map(item =>
        item.id === action.productId
          ? { ...item, quantity: action.quantity }
          : item
      );
      const total = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const itemsCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      
      return { items: updatedItems, total, itemsCount };
    }
    
    case 'CLEAR_CART':
      return { items: [], total: 0, itemsCount: 0 };
    
    case 'LOAD_CART': {
      const total = action.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const itemsCount = action.items.reduce((sum, item) => sum + item.quantity, 0);
      return { items: action.items, total, itemsCount };
    }
    
    default:
      return state;
  }
};

const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
  switch (action.type) {
    case 'ADD_TO_WISHLIST': {
      const exists = state.items.find(item => item.id === action.product.id);
      if (exists) return state;
      
      const newItems = [...state.items, action.product];
      return { items: newItems, itemsCount: newItems.length };
    }
    
    case 'REMOVE_FROM_WISHLIST': {
      const newItems = state.items.filter(item => item.id !== action.productId);
      return { items: newItems, itemsCount: newItems.length };
    }
    
    case 'CLEAR_WISHLIST':
      return { items: [], itemsCount: 0 };
    
    case 'LOAD_WISHLIST':
      return { items: action.items, itemsCount: action.items.length };
    
    default:
      return state;
  }
};

interface CartContextType {
  cart: CartState;
  wishlist: WishlistState;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: number) => boolean;
  isInCart: (productId: number) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'all4u-cart';
const WISHLIST_STORAGE_KEY = 'all4u-wishlist';

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, dispatchCart] = useReducer(cartReducer, { items: [], total: 0, itemsCount: 0 });
  const [wishlist, dispatchWishlist] = useReducer(wishlistReducer, { items: [], itemsCount: 0 });

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const cartData = JSON.parse(savedCart);
        dispatchCart({ type: 'LOAD_CART', items: cartData });
      }

      const savedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (savedWishlist) {
        const wishlistData = JSON.parse(savedWishlist);
        dispatchWishlist({ type: 'LOAD_WISHLIST', items: wishlistData });
      }
    } catch (error) {
      console.error('Error loading cart/wishlist from localStorage:', error);
    }
  }, []);

  // Save to localStorage when cart changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart.items));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cart.items]);

  // Save to localStorage when wishlist changes
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist.items));
    } catch (error) {
      console.error('Error saving wishlist to localStorage:', error);
    }
  }, [wishlist.items]);

  // toast importé en haut du fichier
  const addToCart = (product: Product) => {
    dispatchCart({ type: 'ADD_TO_CART', product });
    toast({
      title: "Produit ajouté au panier",
      description: `${product.name} a été ajouté à votre panier !`,
      duration: 2000,
    });
    const cartIcon = document.getElementById('cart-header-icon');
    if (cartIcon) {
      cartIcon.classList.add('animate-cart-bounce');
      setTimeout(() => cartIcon.classList.remove('animate-cart-bounce'), 700);
    }
  };

  const removeFromCart = (productId: number) => {
    dispatchCart({ type: 'REMOVE_FROM_CART', productId });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    dispatchCart({ type: 'UPDATE_QUANTITY', productId, quantity });
  };

  const clearCart = () => {
    dispatchCart({ type: 'CLEAR_CART' });
  };

  const addToWishlist = (product: Product) => {
    dispatchWishlist({ type: 'ADD_TO_WISHLIST', product });
  };

  const removeFromWishlist = (productId: number) => {
    dispatchWishlist({ type: 'REMOVE_FROM_WISHLIST', productId });
  };

  const toggleWishlist = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const isInWishlist = (productId: number) => {
    return wishlist.items.some(item => item.id === productId);
  };

  const isInCart = (productId: number) => {
    return cart.items.some(item => item.id === productId);
  };

  const value = {
    cart,
    wishlist,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    isInCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export default CartContext;
