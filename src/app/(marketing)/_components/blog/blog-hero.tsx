"use client";
import { motion } from "framer-motion";
import { Button } from "@components/ui/button";
import Image from "next/image";

export default function BlogHero() {
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
          className="h-full w-full object-cover"
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
        <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">News</h1>
        <p className="max-w-xl text-lg sm:text-xl">
          Join us on a journey through the compliance world, and get insights
          into the latest automation trends.
        </p>
        <Button>Start Reading</Button>
      </div>
    </section>
  );
}
