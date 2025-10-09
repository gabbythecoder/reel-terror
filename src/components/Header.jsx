import Link from "next/link";

import {
  UserButton,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";

import { currentUser } from "@clerk/nextjs/server";

export default async function Header() {
  const user = await currentUser();

//   if (!user) {
//     return <p>Not signed in</p>;
//   }

  return (
    <header>
      <h1>ReelTerror</h1>

      <nav>
        <Link href={"/"}>HOME</Link>
        <Link href={"/posts"}>POSTS</Link>
      </nav>
      <SignedIn>
        <UserButton />
        <p>Hello, {user?.firstName}!</p>
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
