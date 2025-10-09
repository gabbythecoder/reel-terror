import Link from "next/link";

export default function Header() {
    return (
        <header>
            <h1>ReelTerror</h1>

            <nav>
                <Link href={"/"}>HOME</Link>
            </nav>
        </header>
    )
}