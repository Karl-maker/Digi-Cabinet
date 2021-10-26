import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import { AccountContext } from "../state-machines/authStateProvider";
import getConfig from "../../config/config";
import { useActor } from "@xstate/react";

//css

const config = getConfig();

function Header() {
  const data = useContext(AccountContext);
  const [state] = useActor(data.authService);
  const { context } = state;

  console.log(context);

  return (
    <header className="header-bar">
      <div>
        <div className="logo-header">
          <Link href="/">
            <img
              src={`${config.api.BASE_URL}${config.default.LOGO}`}
              alt="Digi-Cabinet Logo"
            />
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
        {state.matches("private") ? (
          <>
            <div>
              <p>{`Welcome, ${context.user.first_name} ${context.user.last_name}`}</p>
            </div>
            <div>
              <Link href={`/user/${context.user._id}`}>
                <img
                  className="profile-picture"
                  src={`${config.api.BASE_URL}${context.user.profile_picture}`}
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
