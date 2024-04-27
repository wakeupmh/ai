import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AiNotes - Sign In",
  description: "a note taking app that uses AI to help you take notes",
}
export default function SignInPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <SignIn appearance={{ variables: { colorPrimary: "#0F172A" }}}/>
    </div>
  );
}