import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

const FloatingCell = ({ size , color, xOffset, yOffset }) => {
  return (
    <motion.div
      initial={{
        x: xOffset,
        y: yOffset,
      }}
      animate={{
        y: [yOffset, yOffset , yOffset],
        x: [xOffset, xOffset + 30, xOffset],
      }}
      transition={{
        repeat: Infinity,
        duration: 6,
        ease: "easeInOut",
        delay: Math.random() * 2,
      }}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        borderRadius: "50%",
        position: "absolute",
        boxShadow: `0 4px 15px rgba(0, 0, 0, 0.2)`, 
      }}
    />
  );
};

export default function HomePage() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/50 overflow-hidden">
      {/* Floating Cells Background */}
      {[...Array(20)].map((_, i) => ( // Increased number of circles
        <FloatingCell
          key={i}
          size={`${60 + Math.random() * 80}px`} // Larger size range
          color={`rgba(156, 55, 250 ${0.07 + Math.random() * 0.3})`} // More vibrant blue with less transparency
          xOffset={Math.random() * window.innerWidth} // Spread across the full width
          yOffset={Math.random() * window.innerHeight} // Spread across the full height
        />
      ))}

      <div className="container px-4 py-16 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
          AI-Powered Cancer Detection
          <br />
          Secured by Blockchain
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          We use deep learning models to detect Breast, Skin, and Lung Cancer from
          medical images and log every prediction on the blockchain for full
          transparency and trust.
        </p>
        <Button
          size="lg"
          className="animate-bounce"
          variant="outline"
          onClick={() => {
            document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <ArrowDown className="mr-2 h-4 w-4" />
          Learn More
        </Button>
      </div>
    </section>
  );
}
