import React from "react";
import "../Navbar/Navbar.css";
import { useHistory } from 'react-router-dom';
import { useEthers, useEtherBalance } from "@usedapp/core";

const Navbar = () => {

  const history = useHistory();
  const { activateBrowserWallet, account } = useEthers()

  return (
    <div>
      <div className='navbar'>

          <button className='navbarButtonLeft animation' onClick={() => history.push('/create')}>Create</button>
          <button className='logo' onClick={() => history.push('/')}>The Content Protocol</button>
          {/* ConnetWalletButton */}
          <div>
          <span>{account && <p>Account: {account}</p>}</span>
        <button className='navbarButtonRight animation'  onClick={() => activateBrowserWallet()}>Log In</button>
      </div>
      </div>
    </div>
  );
};

export default Navbar;
