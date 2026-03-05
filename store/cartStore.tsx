'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  CART_CREATE_MUTATION,
  CART_LINES_ADD_MUTATION,
  CART_LINES_REMOVE_MUTATION,
  CART_LINES_UPDATE_MUTATION,
  GET_CART_QUERY,
} from '@/lib/shopifyQueries';

type CartContextType = {
  cart: any | null;
  isOpen: boolean;
  toastMessage: string | null;
  lastAddedProductId: string | null;
  lastAddedProductHandle: string | null;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (variantId: string, quantity?: number) => Promise<void>;
  removeFromCart: (lineId: string) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  isLoading: boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

async function shopifyClientFetch<T>({
  query,
  variables,
}: {
  query: string;
  variables?: Record<string, unknown>;
}): Promise<T> {
  const response = await fetch('/api/shopify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload?.error || 'Shopify request failed.');
  }
  return payload.data as T;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<any | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [lastAddedProductId, setLastAddedProductId] = useState<string | null>(null);
  const [lastAddedProductHandle, setLastAddedProductHandle] = useState<string | null>(null);

  // Load cart from local storage on mount
  useEffect(() => {
    const initializeCart = async () => {
      const storedCartId = localStorage.getItem('broken_arrow_cart_id');
      if (storedCartId) {
        try {
          const data = await shopifyClientFetch<any>({
            query: GET_CART_QUERY,
            variables: { cartId: storedCartId },
          });
          if (data.cart) {
            setCart(data.cart);
          } else {
            localStorage.removeItem('broken_arrow_cart_id');
          }
        } catch (error) {
          console.error('Failed to fetch cart:', error);
          localStorage.removeItem('broken_arrow_cart_id');
        }
      }
    };

    initializeCart();
  }, []);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 2200);
  };

  const addToCart = async (variantId: string, quantity: number = 1) => {
    setIsLoading(true);
    try {
      let newCart;
      if (!cart) {
        const data = await shopifyClientFetch<any>({
          query: CART_CREATE_MUTATION,
          variables: {
            lines: [{ merchandiseId: variantId, quantity }],
          },
        });
        if (data?.cartCreate?.userErrors?.length) {
          throw new Error(data.cartCreate.userErrors[0].message || 'Could not create cart.');
        }
        newCart = data.cartCreate.cart;
        localStorage.setItem('broken_arrow_cart_id', newCart.id);
      } else {
        const data = await shopifyClientFetch<any>({
          query: CART_LINES_ADD_MUTATION,
          variables: {
            cartId: cart.id,
            lines: [{ merchandiseId: variantId, quantity }],
          },
        });
        if (data?.cartLinesAdd?.userErrors?.length) {
          const firstError = data.cartLinesAdd.userErrors[0].message || 'Could not add to cart.';
          if (firstError.toLowerCase().includes('cart') && firstError.toLowerCase().includes('not found')) {
            localStorage.removeItem('broken_arrow_cart_id');
            setCart(null);
          }
          throw new Error(firstError);
        }
        newCart = data.cartLinesAdd.cart;
      }
      setCart(newCart);
      const latestLine = newCart?.lines?.edges?.[newCart?.lines?.edges?.length - 1]?.node;
      if (latestLine?.merchandise?.product?.id) {
        setLastAddedProductId(latestLine.merchandise.product.id);
        setLastAddedProductHandle(latestLine.merchandise.product.handle || null);
      }
      openCart();
      showToast('Added to cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      showToast(error instanceof Error ? error.message : 'Unable to add item');
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (lineId: string) => {
    if (!cart) return;
    setIsLoading(true);
    try {
      const data = await shopifyClientFetch<any>({
        query: CART_LINES_REMOVE_MUTATION,
        variables: {
          cartId: cart.id,
          lineIds: [lineId],
        },
      });
      if (data?.cartLinesRemove?.userErrors?.length) {
        throw new Error(data.cartLinesRemove.userErrors[0].message || 'Could not remove item.');
      }
      setCart(data.cartLinesRemove.cart);
    } catch (error) {
      console.error('Error removing from cart:', error);
      showToast(error instanceof Error ? error.message : 'Unable to remove item');
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (lineId: string, quantity: number) => {
    if (!cart) return;
    setIsLoading(true);
    try {
      const data = await shopifyClientFetch<any>({
        query: CART_LINES_UPDATE_MUTATION,
        variables: {
          cartId: cart.id,
          lines: [{ id: lineId, quantity }],
        },
      });
      if (data?.cartLinesUpdate?.userErrors?.length) {
        throw new Error(data.cartLinesUpdate.userErrors[0].message || 'Could not update quantity.');
      }
      setCart(data.cartLinesUpdate.cart);
    } catch (error) {
      console.error('Error updating quantity:', error);
      showToast(error instanceof Error ? error.message : 'Unable to update quantity');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        toastMessage,
        lastAddedProductId,
        lastAddedProductHandle,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        isLoading,
      }}
    >
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
