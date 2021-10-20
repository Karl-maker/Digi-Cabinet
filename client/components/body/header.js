import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div></div>
      <div>
        <nav>
          <ul>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/about">About Us</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
