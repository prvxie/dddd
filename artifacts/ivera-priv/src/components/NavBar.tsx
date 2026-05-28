import { Link } from "wouter";

export function NavBar() {
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
          <div className="flex gap-6">
            <button onClick={() => scrollTo('top')} className="hover:text-white transition-colors">Home</button>
            <button onClick={() => scrollTo('products')} className="hover:text-white transition-colors">Products</button>
            <button onClick={() => scrollTo('faq')} className="hover:text-white transition-colors">FAQ</button>
          </div>
        </div>
      </div>
    </nav>
  );
}
