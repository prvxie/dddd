import { useState } from "react";
import { NavBar } from "@/components/NavBar";
import { CategoryHero } from "@/components/CategoryHero";
import { ProductCard } from "@/components/ProductCard";
import { CartDrawer } from "@/components/CartDrawer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

const PRODUCTS = [
  {
    id: "script",
    category: "script",
    name: "ivera.priv Script",
    tagline: "The ultimate Roblox script — dominate every server.",
    price: 9.99,
    originalPrice: 19.99,
    stock: 3,
    badge: "SALE",
    description: "ivera.priv Script is a premium, undetected Roblox exploit script delivering game-breaking advantages across hundreds of supported games. Auto-updates ensure you're always ahead.",
    features: ["Aimbot & Target Tracking", "ESP / Wallhack", "Speed & Jump Hacks", "Auto-farm & Teleport", "God Mode (Supported Games)", "500+ Experiences Supported", "Lifetime Auto-updates"],
    delivery: "Instant via Email",
    requirements: "Roblox Account, Windows 10/11, Executor (Synapse X / KRNL)",
    note: "Never use on main account. Use alt account for safety."
  },
  {
    id: "external",
    category: "external",
    name: "ivera.priv External",
    tagline: "External overlay — undetectable by any anti-cheat.",
    price: 14.99,
    originalPrice: 29.99,
    stock: 5,
    badge: "NEW",
    description: "ivera.priv External is a fully external Roblox overlay tool that operates outside the game process, making it completely undetectable. Includes ESP, aimbot, and radar.",
    features: ["Fully External (no injection)", "Player & Item ESP", "Silent Aimbot", "Radar Overlay", "Stream-proof Mode", "Instant Updates", "24/7 Support"],
    delivery: "Instant via Email",
    requirements: "Roblox Account, Windows 10/11, Admin Rights",
    note: "Safest option — recommended for main accounts."
  }
];

const FAQS = [
  {
    q: "Is the ivera.priv script safe to use?",
    a: "We prioritize security and undetectability. The script is regularly updated to bypass standard anti-cheats. However, we strongly recommend using it only on secondary or 'alt' accounts to protect your primary account."
  },
  {
    q: "What executors are supported?",
    a: "ivera.priv supports leading PC executors like Synapse X, KRNL, and Script-Ware. Mobile executors are currently not supported."
  },
  {
    q: "Do I get updates for free?",
    a: "Yes. Once purchased, you receive lifetime access to updates for the script. As games patch vulnerabilities, our developers push automatic updates."
  },
  {
    q: "How fast will I receive the script after paying?",
    a: "Cryptocurrency payments are processed automatically after network confirmations (usually under 15 minutes). Robux payments require manual verification and take roughly 10-15 minutes."
  },
  {
    q: "Can I get a refund?",
    a: "Due to the nature of digital exploits, all sales are final. If the script is entirely non-functional and our support cannot resolve the issue, contact us."
  }
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("script");
  const [cartOpen, setCartOpen] = useState(false);
  const { addToCart } = useCart();

  const filteredProducts = PRODUCTS.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-[100dvh] bg-background text-foreground font-sans selection:bg-white/20 selection:text-white">
      <NavBar onCartOpen={() => setCartOpen(true)} />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      
      <main className="container mx-auto px-4 py-8 space-y-20">
        {/* CATEGORIES */}
        <section id="categories" className="scroll-mt-24 pt-4">
          <CategoryHero 
            selectedCategory={selectedCategory} 
            onSelectCategory={setSelectedCategory} 
          />
        </section>

        {/* PRODUCTS */}
        <section id="products" className="scroll-mt-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter">
              Products — <span className="text-white/50">{selectedCategory === "script" ? "Script" : "External"}</span>
            </h2>
          </motion.div>
          
          <div className="space-y-6">
            {filteredProducts.map(p => (
              <ProductCard 
                key={p.id} 
                product={p} 
                onAddToCart={(prod) => {
                  addToCart({ id: prod.id, name: prod.name, price: prod.price, qty: 1 });
                  setCartOpen(true);
                }} 
              />
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="relative max-w-3xl mx-auto scroll-mt-24 pb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">FAQ</h2>
          </motion.div>
          
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-white/10">
                <AccordionTrigger className="text-left text-white hover:text-white/80 transition-colors text-base font-bold uppercase tracking-widest py-6">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm font-mono leading-relaxed pb-6">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-background border-t border-white/10 py-12 mt-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-white tracking-tighter uppercase">
              IVERA<span className="text-muted-foreground">.PRIV</span>
            </h2>
            <p className="font-mono text-xs text-muted-foreground mt-2 uppercase tracking-widest">Premium Digital Exploits</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 font-mono text-xs text-muted-foreground mb-8 uppercase tracking-widest">
            <button onClick={() => {window.scrollTo({ top: 0, behavior: 'smooth' })}} className="hover:text-white transition-colors">Home</button>
            <button onClick={() => {document.getElementById('categories')?.scrollIntoView({behavior: 'smooth'})}} className="hover:text-white transition-colors">Products</button>
            <button onClick={() => {document.getElementById('faq')?.scrollIntoView({behavior: 'smooth'})}} className="hover:text-white transition-colors">FAQ</button>
            <a href="#" className="hover:text-white transition-colors">Discord</a>
          </div>
          
          <p className="font-mono text-[10px] text-white/30 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} IVERA.PRIV. ALL RIGHTS RESERVED. NOT AFFILIATED WITH ROBLOX CORP.
          </p>
        </div>
      </footer>
    </div>
  );
}
