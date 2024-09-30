import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { useSignIn } from "@clerk/nextjs";
import { RedirectToSignUp } from "@clerk/nextjs";

import PrimaryBtn from "./PrimaryBtn";
import "../styles/Landing.css";
import SecBtn from "./SecBtn";

const Landing = () => {
  // const { openSignIn } = useAuth();
  // const { signIn } = useSignIn();
  const router = useRouter();

  const handleSignIn = () => {
    router.push("/sign-up");
  };

  return (
    <section className="landingContainer">
      <nav className="navbar">
        <div>
          <Link href="/">
            <div className="logo link">PENDI</div>
          </Link>
        </div>
        <div>
          <ul className="navItems">
            <li className="link">
              <Link href={"/about"}> About us </Link>
            </li>
            <li className="link">
              <Link href={"/hiw"}> How it works </Link>
            </li>
            <li className="link">
              <Link href={"/pricing"}> Pricing </Link>
            </li>
          </ul>
        </div>

        <button onClick={handleSignIn}>
          <PrimaryBtn name={"log in"} />
        </button>
      </nav>

      <section className="hero">
        <div className="heroText">
          <h1>Find your focus, Fuel your Progress</h1>
          <p>
            find focus through seamless collaboration, our platform empowers
            teams and individuals to conquer challenges and achieve collective
            brilliance effortlessly
          </p>
          <div className="btns">
            <button onClick={() => router.push("/about")}>
              <SecBtn name={"learn more"} />
            </button>
            <button onClick={handleSignIn}>
              <PrimaryBtn name={"Get started"} />
            </button>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Landing;
