import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  name: string;
  hook: string;
  price: number;
  stock: number | string;
  stockText: string;
  description: string;
  features: string[];
  delivery: string;
  requirements: string;
  notes?: string;
}

export function ProductCard({ product, index }: { product: Product; index: number }) {
  const isOutOfStock = product.stock === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-card border border-white/5 rounded-xl overflow-hidden hover:border-primary/50 transition-colors duration-300"
      data-testid={`product-card-${product.id}`}
    >
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="details" className="border-none">
          <div className="p-6 pb-0 flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{product.name}</h3>
                <p className="text-sm text-muted-foreground">{product.hook}</p>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-primary">${product.price.toFixed(2)}</div>
                <div className={`text-xs mt-1 font-medium ${isOutOfStock ? 'text-destructive' : 'text-primary/80'}`}>
                  {product.stockText}
                </div>
              </div>
            </div>
            
            <AccordionTrigger className="py-4 hover:no-underline text-sm font-medium text-muted-foreground hover:text-white">
              View Details
            </AccordionTrigger>
          </div>

          <AccordionContent className="px-6 pb-6 pt-2">
            <div className="space-y-4 text-sm text-muted-foreground">
              <p className="text-white/80">{product.description}</p>
              
              <div>
                <strong className="text-white block mb-2">Features:</strong>
                <ul className="list-disc pl-4 space-y-1">
                  {product.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                <div>
                  <span className="block text-white/50 text-xs uppercase mb-1">Delivery</span>
                  <span className="text-white">{product.delivery}</span>
                </div>
                <div>
                  <span className="block text-white/50 text-xs uppercase mb-1">Requirements</span>
                  <span className="text-white">{product.requirements}</span>
                </div>
                {product.notes && (
                  <div className="col-span-2">
                    <span className="block text-white/50 text-xs uppercase mb-1">Notes</span>
                    <span className="text-white/80 italic">{product.notes}</span>
                  </div>
                )}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <div className="p-6 pt-0 mt-4">
        <Button 
          className="w-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground border border-primary/20"
          disabled={isOutOfStock}
          data-testid={`product-purchase-${product.id}`}
        >
          {isOutOfStock ? "Out of Stock" : "Purchase"}
        </Button>
      </div>
    </motion.div>
  );
}
