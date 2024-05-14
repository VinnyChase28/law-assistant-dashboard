import { AI } from "@/lib/chat/actions";
import { nanoid } from "@/lib/utils";
import { getServerAuthSession } from "@/server/auth";

import { getMissingKeys } from "./actions";
import { Chat } from "./components/chat";

export const metadata = {
  title: "Next.js AI Chatbot",
};

export default async function IndexPage() {
  const id = nanoid();
  const session = await getServerAuthSession();
  const missingKeys = await getMissingKeys();

  return (
    <AI initialAIState={{ chatId: id, messages: [] }}>
      <Chat id={id} session={session || undefined} missingKeys={missingKeys} />
    </AI>
  );
}
