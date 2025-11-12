import CustomUserAvatar from "../customuseravatar/CustomUserAvatar.jsx";
import Nav from "./Nav.jsx";
import "./Header.css";
import reelterror from "@/../public/reelterror-logo.png";
import reelterrorsmall from "@/../public/reelterror-logo-small.png";
import Image from "next/image";
import Link from "next/link";

import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header>
      <div className="header-container">
        <Link href={"/"} className="cursor-pointer">
          <Image
            src={reelterror}
            alt="Reel Terror Logo"
            placeholder="blur"
            className="logo-image"
          />

          <Image
            src={reelterrorsmall}
            alt="Reel Terror Logo Small"
            placeholder="blur"
            className="logo-image-small"
          />
        </Link>

        <Nav />

        <div className="auth-actions">
          <SignedIn>
            <div className="auth-avatar">
              <CustomUserAvatar />
            </div>
          </SignedIn>

          <SignedOut>
            <div className="auth-buttons">
              <SignInButton>
                <button className="signin-button">SIGN IN</button>
              </SignInButton>
              <SignUpButton>
                <button className="signup-button">SIGN UP</button>
              </SignUpButton>
            </div>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}
