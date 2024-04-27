import prisma from "@/lib/db/prisma";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "AiNotes - Notes",
  description: "a note taking app that uses AI to help you take notes",
};
export default async function NotesPage() {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const allNotes = await prisma.note.findMany({
    where: {
      userId,
    },
  })
  
  return <div>{JSON.stringify(allNotes)}</div>;
}
