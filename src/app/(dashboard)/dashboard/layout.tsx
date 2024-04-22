import ChatBubble from "@components/bubble/bubble";
import { SiteHeader } from "@components/navigation/site-header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <ChatBubble />;
    </>
  );
}
