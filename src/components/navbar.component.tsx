import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CSS from 'csstype';
import styles from './navbar.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from '@fortawesome/free-solid-svg-icons';

const navbarstyle: CSS.Properties = {
    position: 'static',
    color: "white"
};

const navitemstyle: CSS.Properties = {

    color: "white"
};

export default class Navbar extends Component {

    render() {
        return (
            <nav style={ navbarstyle }
                 className={ `${ styles[ 'navbar-custom' ] } navbar navbar-dark navbar-expand-lg` }>
                <Link to="/" className={ `${ styles[ 'navbar-brand-custom' ] } navbar-brand` }>
                    <FontAwesomeIcon icon={ faUtensils } className={ `${ styles[ 'navbar-brand-icon' ] }` }/>
                    My CookBook
                </Link>
                <div className={ `${ styles[ 'navbar-custom_collapse' ] } collpase navbar-collapse` }>
                    <ul className="navbar-nav">
                        <li className="navbar-item">
                            <Link to="/" className={ `${ styles[ 'nav_link-custom' ] } nav-link` }>Recipes</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/create" className={ `${ styles[ 'nav_link-custom' ] } nav-link` }>New
                                Recipe</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/user" className={ `${ styles[ 'nav_link-custom' ] } nav-link` }>Create
                                User</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}