import Link from "next/link";

const SuccessPage = () => {
  return (
    <section className="mt-10 flex flex-col gap-8">
      <header className="flex w-full flex-col gap-3">
        <h1 className="text-center text-4xl font-extrabold tracking-tight">
          Thanks for Joining
        </h1>
        <div className="mx-auto flex w-1/2 flex-row justify-between">
          <Link href="/" className="w-full text-center font-bold">
            Home
          </Link>
        </div>
      </header>
    </section>
  );
};

export default SuccessPage;
