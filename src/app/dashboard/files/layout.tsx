export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Main content area with padding and flex-grow to take up remaining space */}
      <main className="flex-grow">
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {/* Replace 'children' with your dynamic content */}
          {children}
        </div>
      </main>

      {/* Footer with padding and border-top for separation */}
      <footer className="border-t bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          Footer Content
        </div>
      </footer>
    </div>
  );
}
