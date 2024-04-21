import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Header Section */}
      <header className="flex items-center justify-between bg-white p-5 shadow-md">
        <Link href="/">
          <a>
            <img src="/logo.png" alt="LawAssistant.ai Logo" className="h-10" />
          </a>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/services">
                <a>Services</a>
              </Link>
            </li>
            <li>
              <Link href="/features">
                <a>Features</a>
              </Link>
            </li>
            <li>
              <Link href="/pricing">
                <a>Pricing</a>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <a>Contact</a>
              </Link>
            </li>
          </ul>
        </nav>
        <button className="rounded bg-blue-500 px-4 py-2 text-white">
          Schedule a Demo
        </button>
      </header>

      {/* Welcome Section */}
      <section
        className="bg-cover bg-center p-10 text-center"
        style={{ backgroundImage: "url(/background.jpg)" }}
      >
        <h1 className="text-4xl font-bold text-white">
          Welcome to LawAssistant.ai
        </h1>
        <p className="mt-4 text-xl text-gray-300">
          Revolutionizing business compliance using AI
        </p>
      </section>

      {/* How We Work Section */}
      <section className="flex flex-wrap items-center justify-around p-10">
        <div>
          <img src="/icon-data.png" alt="Data Sources" className="h-12 w-12" />
          <p>Integration with multiple data sources</p>
        </div>
        <div>
          <img
            src="/icon-regulation.png"
            alt="Regulatory Databases"
            className="h-12 w-12"
          />
          <p>Access to up-to-date regulatory databases</p>
        </div>
        <div>
          <img
            src="/illustration.png"
            alt="Platform Illustration"
            className="h-24 w-24"
          />
          <p>Real-time compliance scanning and insights</p>
        </div>
      </section>

      {/* Additional sections can be added following the same pattern */}
    </div>
  );
}
