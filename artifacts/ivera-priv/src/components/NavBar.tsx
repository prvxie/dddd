import { Link } from "wouter";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function NavBar({ onCartOpen }: { onCartOpen: () => void }) {
  const { cartCount } = useCart();

  const scrollTo = (id: string) => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tighter text-white flex items-center gap-2 uppercase">
          <span className="text-primary font-extrabold">IVERA</span><span className="text-muted-foreground">.PRIV</span>
        </Link>
        <div className="flex items-center gap-6 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          <div className="hidden md:flex gap-6">
            <button onClick={() => scrollTo('top')} className="hover:text-white transition-colors">Home</button>
            <button onClick={() => scrollTo('categories')} className="hover:text-white transition-colors">Products</button>
            <button onClick={() => scrollTo('faq')} className="hover:text-white transition-colors">FAQ</button>
          </div>
          
          <button 
            onClick={onCartOpen}
            className="relative text-white hover:text-white/80 transition-colors flex items-center justify-center w-10 h-10"
            data-testid="cart-button"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-white text-black text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
