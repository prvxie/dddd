import { Link } from "wouter";

export function NavBar() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tighter text-white flex items-center gap-2 uppercase">
          <span className="text-primary font-extrabold">IVERA</span><span className="text-muted-foreground">.PRIV</span>
        </Link>
        <div className="hidden md:flex gap-6 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          <button onClick={() => scrollTo('hero')} className="hover:text-white transition-colors">Home</button>
          <button onClick={() => scrollTo('product')} className="hover:text-white transition-colors">Products</button>
          <button onClick={() => scrollTo('payment')} className="hover:text-white transition-colors">How to Pay</button>
          <button onClick={() => scrollTo('faq')} className="hover:text-white transition-colors">FAQ</button>
        </div>
      </div>
    </nav>
  );
}
