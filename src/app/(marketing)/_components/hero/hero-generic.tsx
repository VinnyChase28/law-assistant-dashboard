import ImageContainer from "@/app/_components/image/image-container";

interface BlogHeroProps {
  title: string;
  description: string;
}

export default function GenericHero({ title, description }: BlogHeroProps) {
  return (
    <section className="relative h-[500px] w-full overflow-hidden">
      <ImageContainer
        src="black-bg.jpg"
        alt="Background"
        className="z-0"
        objectFit="cover"
        layout="fill"
      />

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-4 bg-black/40 p-4 text-center text-white">
        <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">{title}</h1>
        <p className="max-w-xl text-lg sm:text-xl">{description}</p>
      </div>
    </section>
  );
}
