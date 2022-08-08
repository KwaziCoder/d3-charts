import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <div>
      <nav style={{display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
        <Link to="/">Staked Bar Chart</Link>
        <Link to="/curvedLineChart">Curved Line Chart</Link>
        <Link to="/barChart">Bar Chart</Link>
      </nav>
    </div>
  )
}

export default Header;