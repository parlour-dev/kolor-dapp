import React from "react";
import styles from "../Navbar/Navbar.module.css";
import { useHistory } from "react-router-dom";
import { useEthers } from "@usedapp/core";

const Navbar = () => {
  const history = useHistory();
  const { activateBrowserWallet, account } = useEthers();

  return (
    <div>
      <div className={styles.navbar}>
        <button
          className={[styles.navbarButtonLeft, styles.animation].join(" ")}
          onClick={() => history.push("/create")}
        >
          Create
        </button>
        <button className={styles.logo} onClick={() => history.push("/")}>
          The Content Protocol
        </button>
        {/* ConnetWalletButton */}
        <div>
          <button
            className={[styles.navbarButtonRight, styles.animation].join(" ")}
            onClick={() => activateBrowserWallet()}
          >
            Log In
          </button>
          <span className={styles.walletAddress}>
            {account && <p>Hello {account.substr(0, 16)}...</p>}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;