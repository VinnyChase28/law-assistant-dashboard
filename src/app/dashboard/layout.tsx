import { MainNavigation } from "@/components/main-navigation";
import { UserNav } from "@/components/user-nav";
import ChatBubble from "@/components/bubble/bubble";


export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="">
      <header className="flex w-full items-center justify-between px-4 py-2 shadow-md">
        <MainNavigation />
        <UserNav /> {/* Pass session to components as needed */}
      </header>
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        {children}
        <ChatBubble />
      </div>
    </section>
  );
}
