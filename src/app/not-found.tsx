import { Construction } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800">Under Construction</h1>

        <div className="mt-8 flex justify-center">
          <Construction className="h-24 w-24 text-yellow-500" />
        </div>

        <p className="mt-4 text-xl text-gray-600">
          We&apos;re still building this page
        </p>
        <Link href="/">
          <a className="mt-2 text-blue-500 hover:text-blue-700">
            Go back to Home
          </a>
        </Link>
      </div>
    </div>
  );
}