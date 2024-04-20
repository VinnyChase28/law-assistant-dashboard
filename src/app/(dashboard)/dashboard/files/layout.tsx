export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      {/* Main content area with padding and flex-grow to take up remaining space */}
      <main className="flex-grow">
        <div className="max-w-7xl py-6 sm:px-6 lg:px-8">
          {/* Replace 'children' with your dynamic content */}
          {children}
        </div>
      </main>
    </div>
  );
}
