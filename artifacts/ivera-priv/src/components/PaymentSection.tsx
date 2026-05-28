import { motion } from "framer-motion";
import { SiBitcoin, SiLitecoin, SiEthereum } from "react-icons/si";
import { Zap } from "lucide-react";

const methods = [
  {
    id: "btc",
    name: "Bitcoin (BTC)",
    icon: <SiBitcoin className="w-6 h-6 text-[#F7931A]" />,
    color: "group-hover:border-[#F7931A]/50",
    steps: [
      "Add your item to cart and select BTC at checkout",
      "Copy our BTC wallet address shown on the order page",
      "Send exact amount from your Bitcoin wallet",
      "Wait for 1 blockchain confirmation (~10 min)",
      "Receive your product automatically"
    ]
  },
  {
    id: "ltc",
    name: "Litecoin (LTC)",
    icon: <SiLitecoin className="w-6 h-6 text-[#345D9D]" />,
    color: "group-hover:border-[#345D9D]/50",
    steps: [
      "Add your item to cart and select LTC at checkout",
      "Copy our LTC wallet address shown on the order page",
      "Send exact amount from your Litecoin wallet",
      "Wait for confirmation (~2.5 min)",
      "Receive your product automatically"
    ]
  },
  {
    id: "eth",
    name: "Ethereum (ETH)",
    icon: <SiEthereum className="w-6 h-6 text-[#627EEA]" />,
    color: "group-hover:border-[#627EEA]/50",
    steps: [
      "Add your item to cart and select ETH at checkout",
      "Copy our ETH wallet address shown on the order page",
      "Send exact amount from your Ethereum wallet",
      "Wait for confirmation (~15 seconds)",
      "Receive your product automatically"
    ]
  },
  {
    id: "robux",
    name: "Robux",
    icon: <Zap className="w-6 h-6 text-white" />,
    color: "group-hover:border-white/50",
    steps: [
      "Add item to cart, select Robux at checkout",
      "You'll receive a Roblox gamepass link or group fund request",
      "Purchase the gamepass or donate to group",
      "Send proof of purchase to our support",
      "Product delivered within 15 minutes"
    ]
  }
];

export function PaymentSection() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {methods.map((method, i) => (
        <motion.div
          key={method.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className={`group bg-card border border-white/5 rounded-xl p-6 transition-colors duration-300 ${method.color}`}
          data-testid={`payment-method-${method.id}`}
        >
          <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
            <div className="p-3 bg-white/5 rounded-lg">
              {method.icon}
            </div>
            <h3 className="text-xl font-bold text-white">{method.name}</h3>
          </div>
          <ol className="space-y-4">
            {method.steps.map((step, stepIdx) => (
              <li key={stepIdx} className="flex gap-4 text-sm text-muted-foreground">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-xs font-medium text-white/50">
                  {stepIdx + 1}
                </span>
                <span className="mt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </motion.div>
      ))}
    </div>
  );
}
