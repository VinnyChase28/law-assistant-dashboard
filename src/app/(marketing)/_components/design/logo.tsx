"use client";

import * as React from "react";
import type { SVGProps } from "react";

import { useTheme } from "next-themes";

// Import the logo components
import SvgLaLogo from "./la-logo";
import SvgLaLogoLight from "./la-logo-light";

const ThemedLogo: React.FC<SVGProps<SVGSVGElement>> = () => {
  const { theme } = useTheme();

  return <div>{theme === "dark" ? <SvgLaLogoLight /> : <SvgLaLogo />}</div>;
};

export default ThemedLogo;
