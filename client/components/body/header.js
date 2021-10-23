import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import withPrivateRoute from "../../utils/private/withPrivateRoute";
import logo from "../../public/img/logo.png";
import { AccountContext } from "../contextWrapper";
import getConfig from "../../config/config";
import { isLoggedIn } from "../../api/auth";

//css

const config = getConfig();

function Header() {
  const user = useContext(AccountContext);
  return (
    <header className="header-bar">
      <div>
        <div className="logo-header">
          <Link href="/">
            <Image src={logo} alt="Digi-Cabinet Logo" />
          </Link>
        </div>
        <div>
          <nav>
            <ul>
              <li>
                <Link href="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link href="/institution">Institutions</Link>
              </li>
              <li>
                <a href="https://github.com/Karl-maker/Digi-Cabinet">
                  Documentation
                </a>
              </li>
              <li>
                <a href="https://karljohan6.wixsite.com/my-site-2">About Us</a>
              </li>
            </ul>
          </nav>
        </div>
        {user.isLoggedIn ? (
          <>
            <div>
              <p>{`Welcome, ${user.first_name} ${user.last_name}`}</p>
            </div>
            <div>
              <Link href={`/user/${user._id}`}>
                <img
                  className="profile-picture"
                  src={`${config.api.BASE_URL}${user.profile_picture}`}
                  alt="User Profile Picture"
                />
              </Link>
            </div>
          </>
        ) : (
          <div>
            <button>Sign Up</button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
