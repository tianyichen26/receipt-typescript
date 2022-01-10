import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CSS from 'csstype';

const navbarstyle: CSS.Properties = {
    backgroundColor: 'White',
    position: 'static',
    color:"white"
  };

  const navitemstyle: CSS.Properties = {

    color:"white"
  };

export default class Navbar extends Component {

    render() {
        return (
            <nav style={navbarstyle} className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">MyCookbook</Link>
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">Recipes</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/create" className="nav-link">Create a new Recipe</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/user" className="nav-link">Create User</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}