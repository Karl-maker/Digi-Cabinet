import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import withPrivateRoute from "../../utils/private/withPrivateRoute";
import logo from "../../public/img/logo.png";
import { AccountContext } from "../contextWrapper";
import getConfig from "../../config/config";
import { isLoggedIn } from "../../api/auth";

const config = getConfig();

function Header() {
  const user = useContext(AccountContext);
  return (
    <header>
      <div>
        <Image src={logo} alt="Digi-Cabinet Logo" width={100} height={100} />
      </div>
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
      <div>
        {user.isLoggedIn ? (
          <div>
            <h5>{`Welcome, ${user.first_name} ${user.last_name}!`}</h5>
            <img
              src={`${config.api.BASE_URL}${user.profile_picture}`}
              alt="User Profile Picture"
              width={100}
              height={100}
            />
          </div>
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
