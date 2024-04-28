import { permanentRedirect } from "next/navigation";

import { api } from "@/trpc/server";
import ChatBubble from "@components/bubble/bubble";
import { SiteHeader } from "@components/navigation/site-header";

export const dynamic = "force-dynamic";


export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const hasAcceptedTerms = await api.user.hasAcceptedTerms.query();
  if (!hasAcceptedTerms) {
    permanentRedirect("/accept-terms");
  }

  return (
    <>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <ChatBubble />
    </>
  );
}
