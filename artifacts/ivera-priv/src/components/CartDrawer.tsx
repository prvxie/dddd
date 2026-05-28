import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeFromCart, cartTotal } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 z-50 w-full max-w-md h-[100dvh] bg-background border-l border-white/10 p-6 flex flex-col shadow-2xl"
            data-testid="cart-drawer"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-black uppercase tracking-tighter text-white">Your Cart</h2>
              <button onClick={onClose} className="text-muted-foreground hover:text-white transition-colors" data-testid="close-cart-btn">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground font-mono text-sm space-y-4">
                  <p>YOUR CART IS EMPTY</p>
                  <Button variant="outline" onClick={onClose} className="rounded-none border-white/10 uppercase tracking-widest text-xs">
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border border-white/10 bg-white/5">
                    <div>
                      <h4 className="font-bold text-white uppercase text-sm">{item.name}</h4>
                      <p className="text-muted-foreground font-mono text-xs mt-1">QTY: {item.qty}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-black text-white font-mono">${(item.price * item.qty).toFixed(2)}</span>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-white/50 hover:text-white transition-colors"
                        data-testid={`remove-item-${item.id}`}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="mt-auto pt-6 border-t border-white/10 space-y-6">
                <div className="flex items-center justify-between text-white">
                  <span className="font-bold uppercase tracking-widest text-sm">Subtotal</span>
                  <span className="font-black font-mono text-xl">${cartTotal.toFixed(2)}</span>
                </div>
                <Button 
                  className="w-full bg-white text-black hover:bg-white/90 rounded-none h-14 font-black uppercase tracking-wider text-sm"
                  onClick={() => alert("Checkout coming soon!")}
                >
                  Checkout Now
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
