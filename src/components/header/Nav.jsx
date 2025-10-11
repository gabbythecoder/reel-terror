"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import "./Header.css";

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="nav-bar">
      <Link
        href="/"
        className={pathname === "/" ? "nav-link active" : "nav-link"}
      >
        HOME
      </Link>
      <Link
        href="/posts"
        className={pathname === "/posts" ? "nav-link active" : "nav-link"}
      >
        POSTS
      </Link>
    </nav>
  );
}
