import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <header>

        <Link className="logo" to="/">
          <h2 className="neon">
            React Website
          </h2>
        </Link>

        <nav>
          <ul>
            <li className="first">
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/Products">Products</Link>
            </li>
            <li className="last">
              <Link to="/Contact">Contact</Link>
            </li>
          </ul>
        </nav>

      </header>
    );
  }
}

export default Header;
