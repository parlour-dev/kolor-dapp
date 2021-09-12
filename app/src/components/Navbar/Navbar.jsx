import React from "react";
import "../Navbar/Navbar.css";
import { useHistory } from 'react-router-dom';

const Navbar = () => {

  const history = useHistory();

  return (
    <div>
      <div className='navbar'>

          <button className='navbar-button' onClick={() => history.push('/create')}>Create</button>



          <button className='logo' onClick={() => history.push('/')}>The Content Protocol</button>
      </div>
    </div>
  );
};

export default Navbar;
