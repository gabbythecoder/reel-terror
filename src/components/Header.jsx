import Link from "next/link";
import CustomUserAvatar from "./CustomUserAvatar.jsx";

import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header>
      <h1>ReelTerror</h1>

      <nav>
        <Link href={"/"}>HOME</Link>
        <Link href={"/posts"}>POSTS</Link>
      </nav>
      <SignedIn>
        <CustomUserAvatar />
      </SignedIn>

      <SignedOut>
        <SignInButton>
          <button>Sign In</button>
        </SignInButton>
        <SignUpButton>
          <button>Sign Up</button>
        </SignUpButton>
      </SignedOut>
    </header>
  );
}
