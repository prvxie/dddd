import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import robloxCharImg from "@assets/image_(1)_1780006855729.png";

export function ProductCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full max-w-5xl mx-auto bg-card border border-white/10 rounded-none overflow-hidden hover:border-white/30 transition-colors duration-500"
      data-testid="product-card-ivera-priv"
    >
      <div className="flex flex-col md:flex-row md:items-center p-8 gap-8 border-b border-white/5">
        {/* Left: Icon/Image */}
        <div className="w-24 h-24 shrink-0 bg-background/50 border border-white/10 rounded flex items-center justify-center p-2 relative overflow-hidden">
          <div className="absolute inset-0 bg-white/5" />
          <img src={robloxCharImg} alt="Icon" className="w-full h-full object-contain relative z-10" />
        </div>

        {/* Center: Info */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-2xl font-bold tracking-tight text-white uppercase">ivera.priv Script</h3>
            <span className="px-2 py-0.5 bg-white/10 text-white text-[10px] uppercase tracking-widest font-mono border border-white/10">Premium</span>
          </div>
          <p className="text-muted-foreground font-medium mb-4">The ultimate Roblox script — dominate every server.</p>
          <div className="flex items-center gap-4">
            <div className="text-2xl font-black text-white">$9.99</div>
            <div className="text-sm font-mono text-white/50 line-through">$19.99</div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-white/80 bg-white/5 px-2 py-1 border border-white/10">
              <Zap className="w-3 h-3" />
              In Stock (3 Left)
            </div>
          </div>
        </div>

        {/* Right: CTA */}
        <div className="shrink-0 flex flex-col justify-center">
          <Button 
            className="bg-white text-black hover:bg-white/90 font-bold uppercase tracking-wider px-8 h-12 rounded-none shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all"
            data-testid="product-purchase-ivera-priv"
            onClick={() => {
              const payment = document.getElementById("payment");
              if (payment) payment.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Purchase
          </Button>
        </div>
      </div>

      <Accordion type="single" collapsible className="w-full px-8 py-4">
        <AccordionItem value="details" className="border-none">
          <AccordionTrigger className="hover:no-underline py-2 text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-white">
            View Details & Requirements
          </AccordionTrigger>
          <AccordionContent className="pt-6 pb-4">
            <div className="grid md:grid-cols-2 gap-8 text-sm">
              <div className="space-y-6">
                <div>
                  <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-2">Description</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    ivera.priv Script is a premium, undetected Roblox exploit script delivering game-breaking advantages across hundreds of supported games. Auto-updates ensure you're always ahead.
                  </p>
                </div>
                <div>
                  <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-2">Features</h4>
                  <ul className="text-muted-foreground space-y-1 font-mono text-xs">
                    <li>• Aimbot & Target Tracking</li>
                    <li>• ESP / Wallhack (Players & Items)</li>
                    <li>• Speed & Jump Hacks</li>
                    <li>• Auto-farm & Teleport</li>
                    <li>• God Mode (Supported Games)</li>
                    <li>• Supports 500+ Experiences</li>
                    <li>• Seamless Auto-updates</li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="p-4 border border-white/10 bg-background/50 space-y-3 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-white/50">Delivery</span>
                    <span className="text-white text-right">Instant via Email</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Requirements</span>
                    <span className="text-white text-right">Roblox Account<br/>Windows 10/11<br/>Executor (Synapse X / KRNL)</span>
                  </div>
                  <div className="flex justify-between border-t border-white/10 pt-3 mt-3">
                    <span className="text-white/50">Security Note</span>
                    <span className="text-white text-right text-[10px] leading-tight max-w-[150px]">Never use on main account. Use alt for safety.</span>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </motion.div>
  );
}
