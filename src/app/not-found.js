import Link from "next/link";

export default function NotFoundPage() {
    return (
        <div>
            <h2>404 - Page Not Found</h2>
            <p>You&apos;ve wandered into the wrong part of the woods... and this page doesn&apos;t exist...</p>
            <p>Don&apos;t panic - not every dead end leads to a jump scare.</p>
            <p>Head back before the final girl leaves without you.</p>

            <Link href={"/"}>Return to Safety</Link>
        </div>
    )
}