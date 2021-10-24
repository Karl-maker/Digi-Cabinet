import Link from "next/link";
import getConfig from "../../config/config";

const config = getConfig();

const Footer = () => {
  return (
    <footer>
      <div>
        <Link href="/">
          <img
            src={`${config.api.BASE_URL}${config.default.LOGO}`}
            alt="Digi-Cabinet Logo"
          />
        </Link>
      </div>
      <div>
        <p>© 2021 Software Engineers United, Inc</p>
      </div>
    </footer>
  );
};

export default Footer;
