import Link from "next/link";
import CustomUserAvatar from "../CustomUserAvatar.jsx";
import "./Header.css";

import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header>
      <div className="header-container">
        <h1>ReelTerror</h1>

        <nav className="nav-bar">
          <Link href={"/"} className="nav-link">HOME</Link>
          <Link href={"/posts"} className="nav-link">POSTS</Link>
          <Link href={"/new-post"} className="nav-link">NEW POSTS</Link>
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
      </div>
    </header>
  );
}
