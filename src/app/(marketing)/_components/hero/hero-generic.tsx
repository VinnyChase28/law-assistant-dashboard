"use client";
import { motion } from "framer-motion";
import Image from "next/image";

interface BlogHeroProps {
  title: string;
  description: string;
}

export default function GenericHero({ title, description }: BlogHeroProps) {
  return (
    <section className="relative h-[500px] w-full overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }} // You can adjust the duration as needed
        className="absolute inset-0 h-full w-full"
      >
        <Image
          alt="Background Image"
          className="h-full w-full rounded-md object-cover"
          height="500"
          src="/images/black-bg.jpg"
          style={{
            aspectRatio: "1920/500",
            objectFit: "cover",
          }}
          width="1920"
        />
      </motion.div>
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-4 bg-black/40 p-4 text-center text-white">
        <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">{title}</h1>
        <p className="max-w-xl text-lg sm:text-xl">{description}</p>
      </div>
    </section>
  );
}
