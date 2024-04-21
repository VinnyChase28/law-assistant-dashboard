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
        duration: 0.25,
        delay: baseDelay + i * 0.2,
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
