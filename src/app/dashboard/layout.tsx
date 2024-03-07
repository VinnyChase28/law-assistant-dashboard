import { MainNavigation } from "@/components/main-navigation";
import { UserNav } from "@/components/user-nav";
import ChatBubble from "@/components/bubble/bubble";


export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <header className="flex w-full items-center justify-between px-4 py-2 shadow-md">
        <MainNavigation />
        <UserNav /> {/* Pass session to components as needed */}
      </header>
      {children}
      <ChatBubble />
    </section>
  );
}
