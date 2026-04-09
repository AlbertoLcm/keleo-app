import { useState, useEffect, useCallback } from "react";
import type { CartItem } from "../types";
import { sendOrderItems } from "../services/accounts.service";

export const useLocalCart = (accountId?: string) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isSending, setIsSending] = useState(false);

  // Load from localStorage on mount or when accountId changes
  useEffect(() => {
    if (!accountId) {
      setItems([]);
      return;
    }
    const stored = localStorage.getItem(`keleo_cart_${accountId}`);
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse local cart data", e);
        setItems([]);
      }
    } else {
      setItems([]);
    }
  }, [accountId]);

  // Save to localStorage whenever items change
  useEffect(() => {
    if (!accountId) return;
    localStorage.setItem(`keleo_cart_${accountId}`, JSON.stringify(items));
  }, [items, accountId]);

  const addItem = useCallback((product: { id: string; name: string; price: number }) => {
    setItems((prev) => {
      const existingIdx = prev.findIndex((i) => i.productId === product.id);
      if (existingIdx !== -1) {
        const next = [...prev];
        next[existingIdx] = { ...next[existingIdx], quantity: next[existingIdx].quantity + 1 };
        return next;
      }
      return [...prev, { productId: product.id, name: product.name, price: product.price, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback((productId: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.productId === productId) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  }, []);

  const updateNote = useCallback((productId: string, note: string) => {
    setItems((prev) => prev.map((item) => item.productId === productId ? { ...item, notas: note } : item));
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const sendToKitchen = useCallback(async () => {
    if (!accountId || items.length === 0) return;
    setIsSending(true);
    try {
      await sendOrderItems(accountId, items);
      clearCart();
    } catch (error) {
      console.error("Error sending items to kitchen", error);
      throw error;
    } finally {
      setIsSending(false);
    }
  }, [accountId, items, clearCart]);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    items,
    isSending,
    addItem,
    updateQuantity,
    updateNote,
    removeItem,
    clearCart,
    sendToKitchen,
    total,
    itemsCount,
  };
};
