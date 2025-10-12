import Image from "next/image";
import homepagelogo from "@/../public/homepage-logo.png";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="homepage-container">
      <h1 className="homepage-welcome">WELCOME TO</h1>

      <Image
        src={homepagelogo}
        alt="ReelTerror home page logo"
        className="homepage-logo"
        placeholder="blur"
      />

      <div className="homepage-text">
        <p>The ultimate horror movie fan zone.</p>
        <p>
          Share your thoughts, rate films and connect with others who love a
          good scare.
        </p>

        <div className="homepage-join">
          <p>Ready to join the horror hive?</p>
          <p>
            <Link href={"/sign-up"} className="homepage-buttons">SIGN UP</Link> to get started - or{" "}
            <Link href={"/sign-in"} className="homepage-buttons">SIGN IN</Link> if you&apos;re already one of
            us!
          </p>
        </div>
      </div>
    </div>
  );
}
