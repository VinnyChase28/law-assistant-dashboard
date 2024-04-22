"use client";

import * as React from "react";

import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { motion } from "framer-motion";

import { cn } from "src/lib/utils";

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref,
  ) => {
    const variants = {
      hidden: { scaleX: 0 },
      visible: {
        scaleX: 1,
        transition: {
          duration: 1.5,
          ease: "easeInOut",
        },
      },
    };

    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        style={{ originX: 0 }}
      >
        <SeparatorPrimitive.Root
          ref={ref}
          decorative={decorative}
          orientation={orientation}
          className={cn(
            "shrink-0 bg-border",
            orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
            className,
          )}
          {...props}
        />
      </motion.div>
    );
  },
);
Separator.displayName = "Separator";

export { Separator };
