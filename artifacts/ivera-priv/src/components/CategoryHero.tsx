import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import robloxCharImg from "@assets/image_(1)_1780006855729.png";
import { Button } from "@/components/ui/button";

export function CategoryHero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const imgTransform = `translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)`;
  const textTransform = `translate(${mousePos.x * -8}px, ${mousePos.y * -8}px)`;

  const scrollToProduct = () => {
    document.getElementById("product")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative w-full min-h-[80vh] bg-background overflow-hidden border border-white/5 rounded-3xl group flex items-center">
      {/* Background Noise & Glow */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-white opacity-[0.02] blur-[120px] rounded-full pointer-events-none" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="container mx-auto px-8 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Side Content */}
        <div className="relative z-20 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[10px] tracking-[0.2em] font-mono text-white/50 uppercase block mb-4">
              Category / Scripts
            </span>

            <div
              className="relative transition-transform duration-100 ease-out"
              style={{ transform: textTransform }}
            >
              <h1 className="text-8xl md:text-9xl font-black text-white/90 tracking-tighter leading-none mix-blend-exclusion">
                ROBLOX
              </h1>
            </div>

            <div className="mt-8 space-y-6">
              <div>
                <span className="text-white/60 uppercase text-sm font-bold tracking-widest block mb-2">Products:</span>
                <div className="flex items-center gap-3 text-white">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                  </span>
                  <span className="font-mono text-sm">1 AVAILABLE SCRIPT</span>
                </div>
              </div>

              <Button 
                onClick={scrollToProduct}
                className="bg-white text-black hover:bg-white/90 font-bold uppercase tracking-wider px-8 h-12 rounded-none"
              >
                Browse Now
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Right Side Image */}
        <div className="relative z-10 flex justify-center md:justify-end h-[60vh] md:h-full items-center pointer-events-none">
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="w-full max-w-lg transition-transform duration-100 ease-out"
            style={{ transform: imgTransform }}
          >
            <img
              src={robloxCharImg}
              alt="Roblox Character"
              className="w-full h-auto object-contain drop-shadow-[0_0_40px_rgba(255,255,255,0.15)]"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
