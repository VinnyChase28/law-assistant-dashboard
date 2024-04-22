import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t py-6">
      <div className="container mx-auto flex flex-col items-center justify-between px-4 md:flex-row">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          © 2024 Acme Inc. All rights reserved.
        </p>
        <nav className="mt-2 flex space-x-4 md:mt-0">
          <Link
            className="text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            href=""
          >
            Privacy Policy
          </Link>
          <Link
            className="text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            href="#"
          >
            Terms of Use
          </Link>
        </nav>
      </div>
    </footer>
  );
}
