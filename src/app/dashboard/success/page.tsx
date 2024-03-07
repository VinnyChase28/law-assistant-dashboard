import Link from "next/link";

const SuccessPage = () => {
  return (
    <section className="mt-10 flex flex-col gap-8">
      <header className="flex w-full flex-col gap-3">
        <h1 className="text-center text-4xl font-extrabold tracking-tight">
          Thanks for Joining! We hope you enjoy your stay.
        </h1>
        <div className="mx-auto flex w-1/2 flex-row justify-between">
          <Link href="/dashboard" className="w-full text-center font-bold">
            Dashboard
          </Link>
        </div>
      </header>
    </section>
  );
};

export default SuccessPage;
