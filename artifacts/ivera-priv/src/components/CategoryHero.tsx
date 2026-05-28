import { useState } from "react";
import { motion } from "framer-motion";
import robloxCharImg from "@assets/image_(1)_1780006855729.png";
import { Button } from "@/components/ui/button";

interface CategoryHeroProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

function CategoryCard({ 
  id, 
  title, 
  label, 
  count, 
  isSelected, 
  onClick 
}: { 
  id: string; 
  title: string; 
  label: string; 
  count: string; 
  isSelected: boolean; 
  onClick: () => void; 
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x: x * 2, y: y * 2 });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const imgTransform = `translate(${mousePos.x * 10}px, ${mousePos.y * 10}px)`;

  return (
    <div
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full h-[400px] bg-card overflow-hidden border cursor-pointer group flex items-center transition-colors duration-300 ${isSelected ? "border-white/40" : "border-white/10 hover:border-white/20"}`}
    >
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      <div className="relative z-20 flex-1 pl-8 space-y-4">
        <span className="text-[10px] tracking-[0.2em] font-mono text-white/50 uppercase block">
          {label}
        </span>
        <h3 className="text-4xl font-black text-white tracking-tighter leading-none uppercase">
          {title}
        </h3>
        <p className="font-mono text-xs text-white/70 uppercase tracking-widest">{count}</p>
        <Button 
          variant={isSelected ? "default" : "outline"}
          className={`mt-4 rounded-none font-bold uppercase tracking-wider text-xs px-6 ${isSelected ? 'bg-white text-black hover:bg-white/90' : 'border-white/20 text-white hover:bg-white hover:text-black'}`}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          Browse
        </Button>
      </div>

      <div className="absolute right-0 top-0 bottom-0 w-1/2 flex items-center justify-center pointer-events-none pr-4">
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="w-full max-w-[200px] transition-transform duration-100 ease-out"
          style={{ transform: imgTransform }}
        >
          <img
            src={robloxCharImg}
            alt="Category"
            className="w-full h-auto object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.1)] opacity-80 group-hover:opacity-100 transition-opacity"
          />
        </motion.div>
      </div>
    </div>
  );
}

export function CategoryHero({ selectedCategory, onSelectCategory }: CategoryHeroProps) {
  return (
    <div className="w-full space-y-6">
      <div className="text-center">
        <span className="text-[10px] tracking-[0.2em] font-mono text-white/50 uppercase block">
          CATEGORIES
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CategoryCard 
          id="script"
          title="Script"
          label="ROBLOX / SCRIPTS"
          count="1 Product"
          isSelected={selectedCategory === "script"}
          onClick={() => onSelectCategory("script")}
        />
        <CategoryCard 
          id="external"
          title="External"
          label="ROBLOX / EXTERNALS"
          count="1 Product"
          isSelected={selectedCategory === "external"}
          onClick={() => onSelectCategory("external")}
        />
      </div>
    </div>
  );
}
