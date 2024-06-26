import { type FC } from "react";

import Image from "next/image";

type ImageContainerProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  layout?: "fill" | "fixed";
  objectFit?: "cover" | "contain" | "none" | "scale-down" | "fill";
  className?: string;
};

const ImageContainer: FC<ImageContainerProps> = ({
  src,
  alt,
  width,
  height,
  layout,
  objectFit = "cover", // Default to cover if not specified
  className = "",
}) => {
  const baseImagePath = `/images/${src}`;
  const extension = src.split(".").pop();
  const blurredImagePath = `/images/${src.replace(`.${extension}`, `-blurred.${extension}`)}`;

  if (layout === "fill") {
    return (
      <div>
        <Image
          src={baseImagePath}
          alt={alt}
          layout="fill"
          objectFit={objectFit}
          className={className}
          placeholder="blur"
          blurDataURL={blurredImagePath}
        />
      </div>
    );
  } else {
    return (
      <Image
        src={baseImagePath}
        alt={alt}
        height={height}
        width={width}
        className={className}
        placeholder="blur"
        blurDataURL={blurredImagePath}
      />
    );
  }
};

export default ImageContainer;
