import { motion } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  baseDelay?: number;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, baseDelay = 0 }) => {
  const textVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        duration: 0.1, // Reduced from 0.25s to 0.1s
        delay: baseDelay + i * 0.1, // Reduced from 0.2s to 0.1s
      },
    }),
  };

  const words = text.split(" ").map((word, index) => (
    <motion.span
      key={index}
      initial="hidden"
      animate="visible"
      custom={index}
      variants={textVariants}
    >
      {word + " "}
    </motion.span>
  ));

  return <>{words}</>;
};

export default AnimatedText;
