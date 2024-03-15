import { MainNavigation } from "@/components/main-navigation";
import { UserNav } from "@/components/user-nav";
import ChatBubble from "@/components/bubble/bubble";


export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        {children}
        <ChatBubble />
      </div>
    </div>
  );
}
