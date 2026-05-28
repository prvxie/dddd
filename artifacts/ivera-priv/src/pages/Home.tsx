import { NavBar } from "@/components/NavBar";
import { ProductCard } from "@/components/ProductCard";
import { PaymentSection } from "@/components/PaymentSection";
import { Shield, Package, Zap } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";

const PRODUCTS = [
  {
    id: "premium-cheats",
    name: "Premium Cheats",
    hook: "Undetected aim & visuals for competitive edge.",
    price: 14.99,
    stock: 50,
    stockText: "In Stock ✓",
    description: "Industry-leading internal client with highly customizable aim assistance and visual overlays. Built for security and performance.",
    features: ["Customizable Aim logic", "ESP / Wallhacks", "Stream-proof rendering", "Auto-updates"],
    delivery: "Instant via Email",
    requirements: "Windows 10/11 only",
    notes: "Use responsibly on secondary accounts."
  },
  {
    id: "account-booster",
    name: "Account Booster",
    hook: "Rapid rank progression by top 1% players.",
    price: 49.99,
    stock: 5,
    stockText: "Limited: 5 left",
    description: "Hand-played rank boosting service. Our verified professionals will securely play on your account to achieve your desired rank.",
    features: ["Offline mode enabled", "VPN matching your location", "No cheats used", "Daily progress updates"],
    delivery: "Within 24 hours start",
    requirements: "Account credentials required",
    notes: "Please disable 2FA temporarily."
  },
  {
    id: "private-configs",
    name: "Private Configs",
    hook: "Optimized settings for max performance.",
    price: 5.99,
    stock: 999,
    stockText: "In Stock ✓",
    description: "Expertly tuned configuration files to minimize latency, maximize FPS, and improve input registry.",
    features: ["FPS unlocking", "Network optimization", "Clean registry tweaks", "Revert scripts included"],
    delivery: "Instant delivery",
    requirements: "Administrator access",
  },
  {
    id: "vip-membership",
    name: "VIP Membership",
    hook: "Access to private Discord and early releases.",
    price: 24.99,
    stock: 0,
    stockText: "Out of Stock",
    description: "Join the elite tier. Get priority support, early access to new tools, and access to our private community hub.",
    features: ["Private Discord role", "20% off all future purchases", "Direct developer support", "Beta testing access"],
    delivery: "Instant Discord integration",
    requirements: "Discord account",
  }
];

const FAQS = [
  {
    q: "Is this safe?",
    a: "We prioritize security. All our tools are rigorously tested, and we provide clear instructions to ensure maximum safety. However, digital goods of this nature carry inherent risks."
  },
  {
    q: "How fast is delivery?",
    a: "Most products are delivered instantly via email and to your customer dashboard upon payment confirmation."
  },
  {
    q: "What if I have issues?",
    a: "We offer 24/7 support via our Discord server. Create a ticket, and our staff will assist you promptly."
  },
  {
    q: "Do you offer refunds?",
    a: "Due to the nature of digital goods, all sales are final. Exceptions are made only if the product is fundamentally defective."
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
      <NavBar />
      
      <main>
        {/* HERO */}
        <section id="hero" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white mb-6">
                Premium Digital <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/50">
                  Goods Storefront
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                Exclusive, sharp, and highly secure. The underground marketplace for premium digital tools and services.
              </p>
              
              <div className="flex flex-wrap justify-center gap-6">
                <div className="flex items-center gap-2 text-sm font-medium text-white/70 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                  <Shield className="w-4 h-4 text-primary" /> Trusted Service
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-white/70 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                  <Zap className="w-4 h-4 text-primary" /> Fast Delivery
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-white/70 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                  <Package className="w-4 h-4 text-primary" /> 24/7 Support
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* PRODUCTS */}
        <section id="products" className="py-24 bg-card/30 border-y border-white/5 relative">
          <div className="container mx-auto px-4">
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">Featured Products</h2>
              <div className="h-1 w-20 bg-primary rounded-full" />
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
              {PRODUCTS.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* PAYMENT */}
        <section id="payment" className="py-24 relative">
          <div className="container mx-auto px-4">
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">How to Pay</h2>
              <p className="text-muted-foreground max-w-2xl">We support entirely private cryptocurrency and alternative payment methods.</p>
              <div className="h-1 w-20 bg-primary rounded-full mt-4" />
            </div>
            
            <PaymentSection />
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-24 bg-card/30 border-t border-white/5 relative">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
              <div className="h-1 w-20 bg-primary rounded-full mx-auto" />
            </div>
            
            <Accordion type="single" collapsible className="w-full text-left">
              {FAQS.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-white/10">
                  <AccordionTrigger className="text-left text-white hover:text-primary transition-colors text-lg font-medium py-6">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base pb-6 leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-background border-t border-white/5 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              <span className="text-primary">ivera</span>.priv
            </h2>
            <p className="text-sm text-muted-foreground mt-2">Premium digital goods, delivered securely.</p>
          </div>
          
          <div className="flex justify-center gap-6 text-sm text-muted-foreground mb-8">
            <button onClick={() => {document.getElementById('products')?.scrollIntoView({behavior: 'smooth'})}} className="hover:text-white transition-colors">Products</button>
            <button onClick={() => {document.getElementById('payment')?.scrollIntoView({behavior: 'smooth'})}} className="hover:text-white transition-colors">How to Pay</button>
            <button onClick={() => {document.getElementById('faq')?.scrollIntoView({behavior: 'smooth'})}} className="hover:text-white transition-colors">FAQ</button>
            <a href="#" className="hover:text-white transition-colors">Contact (Discord)</a>
          </div>
          
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} ivera.priv. All rights reserved. Not affiliated with any referenced third-party companies.
          </p>
        </div>
      </footer>
    </div>
  );
}
