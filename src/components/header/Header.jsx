import Link from "next/link";
import CustomUserAvatar from "../customuseravatar/CustomUserAvatar.jsx";
import Nav from "./Nav.jsx";
import "./Header.css";
import reelterror from "@/../public/reelterror-logo.png";
import Image from "next/image";

import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header>
      <div className="header-container">
        <Image 
          src={reelterror}
          alt="Reel Terror Logo"
          placeholder="blur"
          className="logo-image"
        />

        <Nav />

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
