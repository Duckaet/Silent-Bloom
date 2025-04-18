import { motion } from "framer-motion";

const FloatingCell = ({ size, color, xOffset, yOffset }) => {
  return (
    <motion.div
      initial={{
        x: xOffset,
        y: yOffset,
      }}
      animate={{
        y: [yOffset, yOffset - 30, yOffset],
        x: [xOffset, xOffset + 20, xOffset],
      }}
      transition={{
        repeat: Infinity,
        duration: 8,
        ease: "easeInOut",
        delay: Math.random() * 3,
      }}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        borderRadius: "50%",
        position: "absolute",
      }}
    />
  );
};

export default FloatingCell;
