import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <div>
      <nav style={{display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
        <Link to="/">Curved Line Chart</Link>
        <Link to="/barChart">Bar Chart</Link>
      </nav>
    </div>
  )
}

export default Header;