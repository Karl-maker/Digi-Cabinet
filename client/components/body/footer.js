import Link from "next/link";
import Image from "next/image";
import logo from "../../public/img/logo.png";

const Footer = () => {
  return (
    <footer>
      <div className="footer-logo">
        <Link href="/">
          <Image src={logo} alt="Digi-Cabinet Logo" />
        </Link>
      </div>
      <div>
        <p>© 2021 Digi Cabinet, Inc</p>
      </div>
    </footer>
  );
};

export default Footer;
