import Image from "next/image";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default function Home() {
  const { userId } = auth();
  if (userId) {
    redirect("/notes")
  }
  
  return (
    <main className="flex h-screen flex-col justify-center gap-5">
      <div className="flex items-center gap-4">
        <Image src={logo} alt="ai notes logo" width={100} height={100} />
        <span className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          AiNotes
        </span>
      </div>
      <p className="max-w-prose text-center">
        AiNotes is a simple note-taking app that uses AI to help you organize
        your notes, on top of OpenAI, Pinecone, Next.js, Shadcn UI, Clerk
      </p>
      <Button size="lg" asChild>
        <Link href="/notes" className="mr-2"> Open </Link>
      </Button>
    </main>
  );
}
